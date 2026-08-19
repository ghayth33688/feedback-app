require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const crypto = require('crypto');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbDir = path.dirname(path.resolve(process.env.SQLITE_PATH || './data/feedback.db'));
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.resolve(process.env.SQLITE_PATH || './data/feedback.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE NOT NULL,
    used INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    used_at TEXT
  );
  CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE NOT NULL,
    q1 TEXT, q2 TEXT, q3 TEXT, q4 TEXT, q5 TEXT,
    q6 TEXT, q7 TEXT, q8 TEXT, q9 TEXT, q10 TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (token) REFERENCES tokens(token)
  );
`);

const count = parseInt(process.argv[2]) || 1;

console.log(`\nErstelle ${count} Feedback-Link(s)...\n`);

for (let i = 0; i < count; i++) {
  const token = crypto.randomBytes(16).toString('hex');

  try {
    db.prepare('INSERT INTO tokens (token) VALUES (?)').run(token);
    const url = `${process.env.APP_URL || 'http://localhost:3000'}/feedback/${token}`;
    console.log(`  Link ${i + 1}: ${url}`);
    console.log(`  Token: ${token}\n`);
  } catch (err) {
    console.error(`  Fehler beim Erstellen des Tokens: ${err.message}`);
  }
}

db.close();
console.log('Fertig!');
