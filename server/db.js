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
    disabled INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    used_at TEXT
  )`);

  const cols = await db.execute("PRAGMA table_info(tokens)");
  const hasDisabled = cols.rows.some(c => c.name === 'disabled');
  if (!hasDisabled) {
    await db.execute("ALTER TABLE tokens ADD COLUMN disabled INTEGER DEFAULT 0");
  }

  await db.execute(`CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE NOT NULL,
    q1 TEXT, q2 TEXT, q3 TEXT, q4 TEXT, q5 TEXT,
    q6 TEXT, q7 TEXT, q8 TEXT, q9 TEXT, q10 TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (token) REFERENCES tokens(token)
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS rate_limits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    timestamp INTEGER NOT NULL
  )`);
}

async function checkRateLimit(ip, endpoint, windowMs, maxRequests) {
  const cutoff = Date.now() - windowMs;
  await db.execute({ sql: 'DELETE FROM rate_limits WHERE ip = ? AND endpoint = ? AND timestamp < ?', args: [ip, endpoint, cutoff] });
  const result = await db.execute({ sql: 'SELECT COUNT(*) as count FROM rate_limits WHERE ip = ? AND endpoint = ?', args: [ip, endpoint] });
  const count = result.rows[0]?.count || 0;
  if (count >= maxRequests) return false;
  await db.execute({ sql: 'INSERT INTO rate_limits (ip, endpoint, timestamp) VALUES (?, ?, ?)', args: [ip, endpoint, Date.now()] });
  return true;
}

module.exports = { db, initDB, checkRateLimit };
