const { createClient } = require('@libsql/client');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});

async function initDB() {
  await db.execute(`CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE NOT NULL,
    used INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    used_at TEXT
  )`);
  await db.execute(`CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE NOT NULL,
    q1 TEXT, q2 TEXT, q3 TEXT, q4 TEXT, q5 TEXT,
    q6 TEXT, q7 TEXT, q8 TEXT, q9 TEXT, q10 TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (token) REFERENCES tokens(token)
  )`);
}

module.exports = { db, initDB };
