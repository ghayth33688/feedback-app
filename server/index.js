require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');

const { initDB, checkRateLimit } = require('./db');

const feedbackRoutes = require('./routes/feedback');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:"],
    }
  }
}));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/', async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const allowed = await checkRateLimit(ip, 'api', 15 * 60 * 1000, 200);
  if (!allowed) return res.status(429).json({ error: 'Zu viele Anfragen.' });
  next();
});

app.use('/api/feedback/submit', async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const allowed = await checkRateLimit(ip, 'submit', 60 * 60 * 1000, 5);
  if (!allowed) return res.status(429).json({ error: 'Zu viele Versuche.' });
  next();
});

app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

app.get('/feedback/:token', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'feedback.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server läuft auf Port ${PORT}`);
    });
  }).catch(err => {
    console.error('DB Init Fehler:', err);
    process.exit(1);
  });
}

module.exports = app;
