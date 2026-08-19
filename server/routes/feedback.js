const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/validate/:token', (req, res) => {
  const { token } = req.params;

  if (!token || token.length < 10) {
    return res.status(400).json({ valid: false, message: 'Ungültiger Link' });
  }

  const row = db.prepare('SELECT * FROM tokens WHERE token = ?').get(token);

  if (!row) {
    return res.status(404).json({ valid: false, message: 'هذا الرابط غير صالح' });
  }

  if (row.used) {
    return res.status(400).json({ valid: false, message: 'تم استخدام هذا الرابط بالفعل. شكرًا لك.' });
  }

  res.json({ valid: true });
});

router.post('/submit/:token', (req, res) => {
  const { token } = req.params;

  if (!token || token.length < 10) {
    return res.status(400).json({ error: 'Ungültiger Link' });
  }

  const row = db.prepare('SELECT * FROM tokens WHERE token = ?').get(token);

  if (!row) {
    return res.status(404).json({ error: 'هذا الرابط غير صالح' });
  }

  if (row.used) {
    return res.status(400).json({ error: 'تم استخدام هذا الرابط بالفعل. شكرًا لك.' });
  }

  const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = req.body;

  if (!q1 || !q1.trim()) {
    return res.status(400).json({ error: 'يرجى الإجابة على السؤال 1' });
  }
  if (!q2 || !q2.trim()) {
    return res.status(400).json({ error: 'يرجى الإجابة على السؤال 2' });
  }
  if (!q4 || !q4.trim()) {
    return res.status(400).json({ error: 'يرجى الإجابة على السؤال 4' });
  }
  if (!q5 || !q5.trim()) {
    return res.status(400).json({ error: 'يرجى الإجابة على السؤال 5' });
  }
  if (!q6 || !q6.trim()) {
    return res.status(400).json({ error: 'يرجى الإجابة على السؤال 6' });
  }
  if (!q7 || !q7.trim()) {
    return res.status(400).json({ error: 'يرجى الإجابة على السؤال 7' });
  }

  try {
    const insertFeedback = db.prepare(`
      INSERT INTO feedbacks (token, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const markToken = db.prepare(`
      UPDATE tokens SET used = 1, used_at = datetime('now') WHERE token = ?
    `);

    const transaction = db.transaction(() => {
      insertFeedback.run(token, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);
      markToken.run(token);
    });

    transaction();

    res.json({ success: true, message: 'شكراً لك على وقتك وعلى ملاحظاتك الصريحة. تم إرسال ملاحظاتك بنجاح.' });
  } catch (err) {
    console.error('Feedback speichern Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Speichern. Bitte versuchen Sie es erneut.' });
  }
});

module.exports = router;
