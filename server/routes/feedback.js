const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/questions', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM questions WHERE required = 1 OR required = 0 ORDER BY sort_order ASC');
    const settings = await db.execute('SELECT * FROM settings');
    const s = {};
    for (const row of settings.rows) s[row.key] = row.value;
    res.json({ questions: result.rows, settings: s });
  } catch (err) {
    console.error('Fragen laden Fehler:', err);
    res.status(500).json({ error: 'Serverfehler' });
  }
});

router.get('/validate/:token', async (req, res) => {
  const { token } = req.params;
  if (!token || token.length < 10) return res.status(400).json({ valid: false, message: 'Ungültiger Link' });

  try {
    const result = await db.execute({ sql: 'SELECT * FROM tokens WHERE token = ?', args: [token] });
    const row = result.rows[0];
    if (!row) return res.status(404).json({ valid: false, message: 'هذا الرابط غير صالح' });
    if (row.disabled) return res.status(400).json({ valid: false, message: 'تم تعطيل هذا الرابط.' });
    if (row.used) return res.status(400).json({ valid: false, message: 'تم استخدام هذا الرابط بالفعل. شكرًا لك.' });
    res.json({ valid: true });
  } catch (err) {
    console.error('Token validieren Fehler:', err);
    res.status(500).json({ valid: false, message: 'Serverfehler' });
  }
});

router.post('/submit/:token', async (req, res) => {
  const { token } = req.params;
  if (!token || token.length < 10) return res.status(400).json({ error: 'Ungültiger Link' });

  try {
    const tokenResult = await db.execute({ sql: 'SELECT * FROM tokens WHERE token = ?', args: [token] });
    const row = tokenResult.rows[0];
    if (!row) return res.status(404).json({ error: 'هذا الرابط غير صالح' });
    if (row.disabled) return res.status(400).json({ error: 'تم تعطيل هذا الرابط.' });
    if (row.used) return res.status(400).json({ error: 'تم استخدام هذا الرابط بالفعل. شكرًا لك.' });

    const questionsResult = await db.execute('SELECT * FROM questions WHERE required = 1 ORDER BY sort_order');
    const requiredKeys = questionsResult.rows.map(q => q.key);

    const { answers } = req.body;
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Keine Antworten gesendet' });
    }

    for (const q of questionsResult.rows) {
      const val = answers[q.key];
      if (!val || (typeof val === 'string' && !val.trim())) {
        return res.status(400).json({ error: `يرجى الإجابة على السؤال ${q.sort_order}` });
      }
    }

    await db.execute({
      sql: 'INSERT INTO feedbacks (token, answers) VALUES (?, ?)',
      args: [token, JSON.stringify(answers)]
    });
    await db.execute({
      sql: "UPDATE tokens SET used = 1, used_at = datetime('now') WHERE token = ?",
      args: [token]
    });

    if (process.env.NOTIFICATION_WEBHOOK) {
      try {
        fetch(process.env.NOTIFICATION_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: `Neues Feedback eingegangen!`, answers })
        }).catch(() => {});
      } catch (e) {}
    }

    res.json({ success: true, message: 'شكراً لك على وقتك وعلى ملاحظاتك الصريحة. تم إرسال ملاحظاتك بنجاح.' });
  } catch (err) {
    console.error('Feedback speichern Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Speichern. Bitte versuchen Sie es erneut.' });
  }
});

module.exports = router;
