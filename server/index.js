require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');

const { initDB } = require('./db');

const feedbackRoutes = require('./routes/feedback');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
    }
  }
}));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Zu viele Anfragen.' }
});

const feedbackSubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Zu viele Versuche.' }
});

app.use('/api/', apiLimiter);
app.use('/api/feedback/submit', feedbackSubmitLimiter);

app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

app.get('/feedback/:token', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'feedback.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'feedback.html'));
});

// Init DB and start server (local dev only)
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
