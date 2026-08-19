require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const crypto = require('crypto');
const { createClient } = require('@libsql/client');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN || undefined,
});

async function main() {
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

  const count = parseInt(process.argv[2]) || 1;
  console.log(`\nErstelle ${count} Feedback-Link(s)...\n`);

  for (let i = 0; i < count; i++) {
    const token = crypto.randomBytes(16).toString('hex');
    try {
      await db.execute({ sql: 'INSERT INTO tokens (token) VALUES (?)', args: [token] });
      const url = `${process.env.APP_URL || 'http://localhost:3000'}/feedback/${token}`;
      console.log(`  Link ${i + 1}: ${url}`);
      console.log(`  Token: ${token}\n`);
    } catch (err) {
      console.error(`  Fehler: ${err.message}`);
    }
  }

  console.log('Fertig!');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
