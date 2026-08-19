const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const auth = require('../middleware/auth');
const db = require('../db');

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

router.get('/feedbacks', auth, (req, res) => {
  try {
    const feedbacks = db.prepare(`
      SELECT
        f.id,
        f.token,
        f.q1, f.q2, f.q3, f.q4, f.q5,
        f.q6, f.q7, f.q8, f.q9, f.q10,
        f.created_at,
        t.used_at
      FROM feedbacks f
      JOIN tokens t ON f.token = t.token
      ORDER BY f.created_at DESC
    `).all();

    res.json(feedbacks);
  } catch (err) {
    console.error('Feedbacks laden Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden der Feedbacks' });
  }
});

router.get('/feedbacks/:id', auth, (req, res) => {
  try {
    const feedback = db.prepare(`
      SELECT
        f.id,
        f.token,
        f.q1, f.q2, f.q3, f.q4, f.q5,
        f.q6, f.q7, f.q8, f.q9, f.q10,
        f.created_at,
        t.used_at
      FROM feedbacks f
      JOIN tokens t ON f.token = t.token
      WHERE f.id = ?
    `).get(req.params.id);

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback nicht gefunden' });
    }

    res.json(feedback);
  } catch (err) {
    console.error('Feedback laden Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden des Feedbacks' });
  }
});

router.delete('/feedbacks/:id', auth, (req, res) => {
  try {
    const feedback = db.prepare('SELECT * FROM feedbacks WHERE id = ?').get(req.params.id);

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback nicht gefunden' });
    }

    const transaction = db.transaction(() => {
      db.prepare('DELETE FROM feedbacks WHERE id = ?').run(req.params.id);
      db.prepare('UPDATE tokens SET used = 0, used_at = NULL WHERE token = ?').run(feedback.token);
    });

    transaction();

    res.json({ success: true });
  } catch (err) {
    console.error('Feedback löschen Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Löschen' });
  }
});

router.post('/tokens', auth, (req, res) => {
  try {
    const token = crypto.randomBytes(16).toString('hex');

    db.prepare('INSERT INTO tokens (token) VALUES (?)').run(token);

    res.json({ success: true, token });
  } catch (err) {
    console.error('Token erstellen Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Erstellen des Tokens' });
  }
});

router.get('/tokens', auth, (req, res) => {
  try {
    const tokens = db.prepare('SELECT * FROM tokens ORDER BY created_at DESC').all();
    res.json(tokens);
  } catch (err) {
    console.error('Tokens laden Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Laden der Tokens' });
  }
});

router.delete('/tokens/:token', auth, (req, res) => {
  try {
    const tokenRow = db.prepare('SELECT * FROM tokens WHERE token = ?').get(req.params.token);

    if (!tokenRow) {
      return res.status(404).json({ error: 'Token nicht gefunden' });
    }

    if (tokenRow.used) {
      return res.status(400).json({ error: 'Verwendete Tokens können nicht gelöscht werden. Löschen Sie zuerst das zugehörige Feedback.' });
    }

    db.prepare('DELETE FROM tokens WHERE token = ?').run(req.params.token);
    res.json({ success: true });
  } catch (err) {
    console.error('Token löschen Fehler:', err);
    res.status(500).json({ error: 'Fehler beim Löschen' });
  }
});

module.exports = router;
