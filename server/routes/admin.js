const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const { db } = require('../db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Benutzername und Passwort erforderlich' });
  }

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Falsche Anmeldedaten' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

router.get('/check', auth, (req, res) => {
  res.json({ authenticated: true });
});

router.get('/stats', auth, async (req, res) => {
  try {
    const totalTokens = await db.execute('SELECT COUNT(*) as count FROM tokens');
    const usedTokens = await db.execute('SELECT COUNT(*) as count FROM tokens WHERE used = 1');
    const disabledTokens = await db.execute('SELECT COUNT(*) as count FROM tokens WHERE disabled = 1');
    const totalFeedbacks = await db.execute('SELECT COUNT(*) as count FROM feedbacks');

    const q4Stats = await db.execute(`SELECT q4, COUNT(*) as count FROM feedbacks WHERE q4 IS NOT NULL GROUP BY q4`);
    const q5Stats = await db.execute(`SELECT q5, COUNT(*) as count FROM feedbacks WHERE q5 IS NOT NULL GROUP BY q5`);
    const q6Stats = await db.execute(`SELECT q6, COUNT(*) as count FROM feedbacks WHERE q6 IS NOT NULL GROUP BY q6`);
    const q7Stats = await db.execute(`SELECT q7, COUNT(*) as count FROM feedbacks WHERE q7 IS NOT NULL GROUP BY q7`);

    const recentFeedbacks = await db.execute(`SELECT created_at FROM feedbacks ORDER BY created_at DESC LIMIT 30`);

    res.json({
      totalTokens: totalTokens.rows[0]?.count || 0,
      usedTokens: usedTokens.rows[0]?.count || 0,
      disabledTokens: disabledTokens.rows[0]?.count || 0,
      totalFeedbacks: totalFeedbacks.rows[0]?.count || 0,
      responseRate: totalTokens.rows[0]?.count > 0
        ? Math.round((usedTokens.rows[0]?.count / totalTokens.rows[0]?.count) * 100)
        : 0,
      q4Stats: q4Stats.rows,
      q5Stats: q5Stats.rows,
      q6Stats: q6Stats.rows,
      q7Stats: q7Stats.rows,
      recentFeedbacks: recentFeedbacks.rows
    });
  } catch (err) {
    console.error('Stats Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden der Statistiken' });
  }
});

router.get('/feedbacks', auth, async (req, res) => {
  try {
    const { search, status } = req.query;
    let sql = `
      SELECT f.id, f.token, f.q1, f.q2, f.q3, f.q4, f.q5,
             f.q6, f.q7, f.q8, f.q9, f.q10, f.created_at, t.used_at, t.used, t.disabled
      FROM feedbacks f
      JOIN tokens t ON f.token = t.token
    `;
    const args = [];
    const conditions = [];

    if (search) {
      conditions.push(`(f.q1 LIKE ? OR f.q2 LIKE ? OR f.q3 LIKE ? OR f.q8 LIKE ? OR f.q9 LIKE ? OR f.q10 LIKE ?)`);
      const s = `%${search}%`;
      args.push(s, s, s, s, s, s);
    }

    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
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
    const result = await db.execute(`
      SELECT f.id, f.token, f.q1, f.q2, f.q3, f.q4, f.q5,
             f.q6, f.q7, f.q8, f.q9, f.q10, f.created_at, t.used_at
      FROM feedbacks f
      JOIN tokens t ON f.token = t.token
      ORDER BY f.created_at DESC
    `);

    const headers = ['ID', 'Token', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Datum', 'Beantwortet am'];
    const escapeCSV = (val) => {
      if (val == null) return '';
      const s = String(val);
      if (s.includes(',') || s.includes('"') || s.includes('\n')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };

    let csv = '\uFEFF' + headers.join(',') + '\n';
    for (const row of result.rows) {
      csv += [row.id, row.token, row.q1, row.q2, row.q3, row.q4, row.q5, row.q6, row.q7, row.q8, row.q9, row.q10, row.created_at, row.used_at].map(escapeCSV).join(',') + '\n';
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
      sql: `SELECT f.id, f.token, f.q1, f.q2, f.q3, f.q4, f.q5,
                   f.q6, f.q7, f.q8, f.q9, f.q10, f.created_at, t.used_at
            FROM feedbacks f
            JOIN tokens t ON f.token = t.token
            WHERE f.id = ?`,
      args: [parseInt(req.params.id)]
    });

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Feedback nicht gefunden' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Feedback laden Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden des Feedbacks' });
  }
});

router.delete('/feedbacks/:id', auth, async (req, res) => {
  try {
    const feedbackResult = await db.execute({
      sql: 'SELECT * FROM feedbacks WHERE id = ?',
      args: [parseInt(req.params.id)]
    });

    if (!feedbackResult.rows.length) {
      return res.status(404).json({ error: 'Feedback nicht gefunden' });
    }

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
    const tokenResult = await db.execute({
      sql: 'SELECT * FROM tokens WHERE token = ?',
      args: [req.params.token]
    });

    if (!tokenResult.rows.length) {
      return res.status(404).json({ error: 'Token nicht gefunden' });
    }

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
    const tokenResult = await db.execute({
      sql: 'SELECT * FROM tokens WHERE token = ?',
      args: [req.params.token]
    });

    if (!tokenResult.rows.length) {
      return res.status(404).json({ error: 'Token nicht gefunden' });
    }

    const tokenRow = tokenResult.rows[0];

    if (tokenRow.used) {
      return res.status(400).json({ error: 'Verwendete Tokens können nicht gelöscht werden.' });
    }

    await db.execute({ sql: 'DELETE FROM tokens WHERE token = ?', args: [req.params.token] });
    res.json({ success: true });
  } catch (err) {
    console.error('Token löschen Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Löschen' });
  }
});

module.exports = router;
