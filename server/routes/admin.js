const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const { db } = require('../db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Benutzername und Passwort erforderlich' });
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Falsche Anmeldedaten' });
  }
});

router.post('/logout', (req, res) => { res.clearCookie('token'); res.json({ success: true }); });
router.get('/check', auth, (req, res) => { res.json({ authenticated: true }); });

router.get('/stats', auth, async (req, res) => {
  try {
    const totalTokens = await db.execute('SELECT COUNT(*) as count FROM tokens');
    const usedTokens = await db.execute('SELECT COUNT(*) as count FROM tokens WHERE used = 1');
    const disabledTokens = await db.execute('SELECT COUNT(*) as count FROM tokens WHERE disabled = 1');
    const totalFeedbacks = await db.execute('SELECT COUNT(*) as count FROM feedbacks');

    const feedbacks = await db.execute('SELECT answers FROM feedbacks');
    const optionStats = {};
    for (const row of feedbacks.rows) {
      try {
        const answers = JSON.parse(row.answers || '{}');
        for (const [k, v] of Object.entries(answers)) {
          if (!optionStats[k]) optionStats[k] = {};
          if (!optionStats[k][v]) optionStats[k][v] = 0;
          optionStats[k][v]++;
        }
      } catch (e) {}
    }

    res.json({
      totalTokens: totalTokens.rows[0]?.count || 0,
      usedTokens: usedTokens.rows[0]?.count || 0,
      disabledTokens: disabledTokens.rows[0]?.count || 0,
      totalFeedbacks: totalFeedbacks.rows[0]?.count || 0,
      responseRate: totalTokens.rows[0]?.count > 0 ? Math.round((usedTokens.rows[0]?.count / totalTokens.rows[0]?.count) * 100) : 0,
      optionStats
    });
  } catch (err) {
    console.error('Stats Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden der Statistiken' });
  }
});

router.get('/feedbacks', auth, async (req, res) => {
  try {
    const { search } = req.query;
    let sql = 'SELECT f.id, f.token, f.answers, f.created_at, t.used_at, t.used, t.disabled FROM feedbacks f JOIN tokens t ON f.token = t.token';
    const args = [];
    if (search) {
      sql += ' WHERE f.answers LIKE ?';
      args.push(`%${search}%`);
    }
    sql += ' ORDER BY f.created_at DESC';
    const result = await db.execute({ sql, args });
    res.json(result.rows);
  } catch (err) {
    console.error('Feedbacks laden Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden der Feedbacks' });
  }
});

router.get('/feedbacks/export/csv', auth, async (req, res) => {
  try {
    const questions = await db.execute('SELECT key, label FROM questions ORDER BY sort_order');
    const feedbacks = await db.execute('SELECT f.id, f.token, f.answers, f.created_at, t.used_at FROM feedbacks f JOIN tokens t ON f.token = t.token ORDER BY f.created_at DESC');

    const headers = ['ID', 'Token', ...questions.rows.map(q => q.label), 'Datum', 'Beantwortet am'];
    const escapeCSV = (val) => {
      if (val == null) return '';
      const s = String(val);
      return (s.includes(',') || s.includes('"') || s.includes('\n')) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };

    let csv = '\uFEFF' + headers.map(escapeCSV).join(',') + '\n';
    for (const row of feedbacks.rows) {
      const answers = JSON.parse(row.answers || '{}');
      const cols = [row.id, row.token, ...questions.rows.map(q => answers[q.key] || ''), row.created_at, row.used_at];
      csv += cols.map(escapeCSV).join(',') + '\n';
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="feedbacks_${new Date().toISOString().slice(0,10)}.csv"`);
    res.send(csv);
  } catch (err) {
    console.error('CSV Export Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Exportieren' });
  }
});

router.get('/feedbacks/:id', auth, async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT f.id, f.token, f.answers, f.created_at, t.used_at FROM feedbacks f JOIN tokens t ON f.token = t.token WHERE f.id = ?',
      args: [parseInt(req.params.id)]
    });
    if (!result.rows.length) return res.status(404).json({ error: 'Feedback nicht gefunden' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Feedback laden Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden des Feedbacks' });
  }
});

router.delete('/feedbacks/:id', auth, async (req, res) => {
  try {
    const feedbackResult = await db.execute({ sql: 'SELECT * FROM feedbacks WHERE id = ?', args: [parseInt(req.params.id)] });
    if (!feedbackResult.rows.length) return res.status(404).json({ error: 'Feedback nicht gefunden' });
    const feedback = feedbackResult.rows[0];
    await db.execute({ sql: 'DELETE FROM feedbacks WHERE id = ?', args: [parseInt(req.params.id)] });
    await db.execute({ sql: 'UPDATE tokens SET used = 0, used_at = NULL WHERE token = ?', args: [feedback.token] });
    res.json({ success: true });
  } catch (err) {
    console.error('Feedback löschen Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Löschen' });
  }
});

router.post('/tokens', auth, async (req, res) => {
  try {
    const token = crypto.randomBytes(16).toString('hex');
    await db.execute({ sql: 'INSERT INTO tokens (token) VALUES (?)', args: [token] });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Token erstellen Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Erstellen des Tokens' });
  }
});

router.post('/tokens/batch', auth, async (req, res) => {
  try {
    const count = Math.min(parseInt(req.body.count) || 1, 50);
    const tokens = [];
    for (let i = 0; i < count; i++) {
      const token = crypto.randomBytes(16).toString('hex');
      await db.execute({ sql: 'INSERT INTO tokens (token) VALUES (?)', args: [token] });
      tokens.push(token);
    }
    res.json({ success: true, tokens });
  } catch (err) {
    console.error('Batch Token Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Erstellen der Tokens' });
  }
});

router.get('/tokens', auth, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM tokens ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Tokens laden Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden der Tokens' });
  }
});

router.put('/tokens/:token/disable', auth, async (req, res) => {
  try {
    const tokenResult = await db.execute({ sql: 'SELECT * FROM tokens WHERE token = ?', args: [req.params.token] });
    if (!tokenResult.rows.length) return res.status(404).json({ error: 'Token nicht gefunden' });
    const current = tokenResult.rows[0].disabled;
    await db.execute({ sql: 'UPDATE tokens SET disabled = ? WHERE token = ?', args: [current ? 0 : 1, req.params.token] });
    res.json({ success: true, disabled: !current });
  } catch (err) {
    console.error('Token deaktivieren Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Deaktivieren' });
  }
});

router.delete('/tokens/:token', auth, async (req, res) => {
  try {
    const tokenResult = await db.execute({ sql: 'SELECT * FROM tokens WHERE token = ?', args: [req.params.token] });
    if (!tokenResult.rows.length) return res.status(404).json({ error: 'Token nicht gefunden' });
    if (tokenResult.rows[0].used) return res.status(400).json({ error: 'Verwendete Tokens können nicht gelöscht werden.' });
    await db.execute({ sql: 'DELETE FROM tokens WHERE token = ?', args: [req.params.token] });
    res.json({ success: true });
  } catch (err) {
    console.error('Token löschen Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Löschen' });
  }
});

router.get('/questions', auth, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM questions ORDER BY sort_order ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fragen laden Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden der Fragen' });
  }
});

router.post('/questions', auth, async (req, res) => {
  try {
    const { key, type, label, label_en, label_ar, required, options } = req.body;
    if (!key || !label) return res.status(400).json({ error: 'Key und Label sind erforderlich' });

    const existing = await db.execute({ sql: 'SELECT id FROM questions WHERE key = ?', args: [key] });
    if (existing.rows.length) return res.status(400).json({ error: 'Diese Frage-Existiert bereits' });

    const maxOrder = await db.execute('SELECT MAX(sort_order) as max_order FROM questions');
    const nextOrder = (maxOrder.rows[0]?.max_order || 0) + 1;

    await db.execute({
      sql: 'INSERT INTO questions (key, type, label, label_en, label_ar, required, options, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      args: [key, type || 'text', label, label_en || label, label_ar || label, required ? 1 : 0, options || null, nextOrder]
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Frage erstellen Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Erstellen der Frage' });
  }
});

router.put('/questions/:id', auth, async (req, res) => {
  try {
    const { label, label_en, label_ar, required, options, type } = req.body;
    await db.execute({
      sql: 'UPDATE questions SET label = ?, label_en = ?, label_ar = ?, required = ?, options = ?, type = ? WHERE id = ?',
      args: [label, label_en || label, label_ar || label, required ? 1 : 0, options || null, type || 'text', parseInt(req.params.id)]
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Frage bearbeiten Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Bearbeiten der Frage' });
  }
});

router.delete('/questions/:id', auth, async (req, res) => {
  try {
    await db.execute({ sql: 'DELETE FROM questions WHERE id = ?', args: [parseInt(req.params.id)] });
    res.json({ success: true });
  } catch (err) {
    console.error('Frage löschen Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Löschen der Frage' });
  }
});

router.put('/questions/reorder', auth, async (req, res) => {
  try {
    const { order } = req.body;
    if (!Array.isArray(order)) return res.status(400).json({ error: 'Ungültiges Format' });
    for (let i = 0; i < order.length; i++) {
      await db.execute({ sql: 'UPDATE questions SET sort_order = ? WHERE id = ?', args: [i, order[i]] });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Reorder Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Sortieren' });
  }
});

router.get('/settings', auth, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM settings');
    const settings = {};
    for (const row of result.rows) settings[row.key] = row.value;
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Fehler' });
  }
});

router.put('/settings', auth, async (req, res) => {
  try {
    for (const [key, value] of Object.entries(req.body)) {
      await db.execute({ sql: 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', args: [key, value] });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Fehler' });
  }
});

module.exports = router;
