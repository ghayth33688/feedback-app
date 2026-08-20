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
    answers TEXT NOT NULL DEFAULT '{}',
    q1 TEXT, q2 TEXT, q3 TEXT, q4 TEXT, q5 TEXT,
    q6 TEXT, q7 TEXT, q8 TEXT, q9 TEXT, q10 TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (token) REFERENCES tokens(token)
  )`);

  const fCols = await db.execute("PRAGMA table_info(feedbacks)");
  const hasAnswers = fCols.rows.some(c => c.name === 'answers');
  if (!hasAnswers) {
    await db.execute("ALTER TABLE feedbacks ADD COLUMN answers TEXT NOT NULL DEFAULT '{}'");
  }

  const oldFeedbacks = await db.execute("SELECT id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 FROM feedbacks WHERE answers = '{}' AND q1 IS NOT NULL");
  for (const row of oldFeedbacks.rows) {
    const answers = {};
    if (row.q1) answers.q1 = row.q1;
    if (row.q2) answers.q2 = row.q2;
    if (row.q3) answers.q3 = row.q3;
    if (row.q4) answers.q4 = row.q4;
    if (row.q5) answers.q5 = row.q5;
    if (row.q6) answers.q6 = row.q6;
    if (row.q7) answers.q7 = row.q7;
    if (row.q8) answers.q8 = row.q8;
    if (row.q9) answers.q9 = row.q9;
    if (row.q10) answers.q10 = row.q10;
    await db.execute({ sql: 'UPDATE feedbacks SET answers = ? WHERE id = ?', args: [JSON.stringify(answers), row.id] });
  }

  await db.execute(`CREATE TABLE IF NOT EXISTS rate_limits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    timestamp INTEGER NOT NULL
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL DEFAULT 'text',
    label TEXT NOT NULL,
    label_en TEXT,
    label_ar TEXT,
    required INTEGER DEFAULT 1,
    options TEXT,
    sort_order INTEGER DEFAULT 0
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )`);

  const qCount = await db.execute('SELECT COUNT(*) as count FROM questions');
  if (qCount.rows[0].count === 0) {
    const defaults = [
      { key: 'q1', type: 'text', label: 'ما أكثر شيء أعجبك في العمل معنا؟', label_en: 'What did you like most about working with us?', label_ar: 'ما أكثر شيء أعجبك في العمل معنا؟', required: 1, options: null, sort_order: 1 },
      { key: 'q2', type: 'text', label: 'ما الشيء الذي لم يعجبك أو تعتقد أنه يحتاج إلى تحسين؟', label_en: 'What didn\'t you like or think needs improvement?', label_ar: 'ما الشيء الذي لم يعجبك أو تعتقد أنه يحتاج إلى تحسين؟', required: 1, options: null, sort_order: 2 },
      { key: 'q3', type: 'text', label: 'هل هناك شيء في طريقة العمل أو التعامل معنا لم يكن جيدًا بالنسبة لك؟', label_en: 'Was there anything about the work style or how we treat you that wasn\'t good?', label_ar: 'هل هناك شيء في طريقة العمل أو التعامل معنا لم يكن جيدًا بالنسبة لك؟', required: 0, options: null, sort_order: 3 },
      { key: 'q4', type: 'radio', label: 'كيف تقيّم ساعات وأوقات العمل بالنسبة لك؟', label_en: 'How do you rate the work hours?', label_ar: 'كيف تقيّم ساعات وأوقات العمل بالنسبة لك؟', required: 1, options: 'ممتازة|جيدة|مقبولة|تحتاج إلى تحسين', sort_order: 4 },
      { key: 'q5', type: 'radio', label: 'كيف تقيّم التعامل والاحترام داخل العمل؟', label_en: 'How do you rate treatment and respect at work?', label_ar: 'كيف تقيّم التعامل والاحترام داخل العمل؟', required: 1, options: 'ممتاز|جيد|مقبول|يحتاج إلى تحسين', sort_order: 5 },
      { key: 'q6', type: 'radio_with_detail', label: 'هل تشعر أن التعامل معك كان عادلًا؟', label_en: 'Do you feel you were treated fairly?', label_ar: 'هل تشعر أن التعامل معك كان عادلًا؟', required: 1, options: 'نعم|إلى حد ما|لا|أريد أن أوضح السبب', sort_order: 6 },
      { key: 'q7', type: 'radio_with_detail', label: 'هل كانت الأمور واضحة وشفافة بالنسبة لك؟', label_en: 'Was everything clear and transparent for you?', label_ar: 'هل كانت الأمور واضحة وشفافة بالنسبة لك؟', required: 1, options: 'نعم|إلى حد ما|لا|أريد أن أوضح السبب', sort_order: 7 },
      { key: 'q8', type: 'text', label: 'هل شعرت أن هناك شيئًا غير عادل أو غير واضح؟', label_en: 'Did you feel anything was unfair or unclear?', label_ar: 'هل شعرت أن هناك شيئًا غير عادل أو غير واضح؟', required: 0, options: null, sort_order: 8 },
      { key: 'q9', type: 'text', label: 'ما الشيء الذي تتمنى أن يتغير أو يتحسن في المستقبل؟', label_en: 'What do you wish would change or improve?', label_ar: 'ما الشيء الذي تتمنى أن يتغير أو يتحسن في المستقبل؟', required: 0, options: null, sort_order: 9 },
      { key: 'q10', type: 'text', label: 'هل لديك أي ملاحظات أو اقتراحات أخرى؟', label_en: 'Do you have any other comments or suggestions?', label_ar: 'هل لديك أي ملاحظات أو اقتراحات أخرى؟', required: 0, options: null, sort_order: 10 },
    ];
    for (const q of defaults) {
      await db.execute({
        sql: 'INSERT INTO questions (key, type, label, label_en, label_ar, required, options, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        args: [q.key, q.type, q.label, q.label_en, q.label_ar, q.required, q.options, q.sort_order]
      });
    }
  }

  const hasTitle = await db.execute({ sql: "SELECT value FROM settings WHERE key = 'form_title'", args: [] });
  if (!hasTitle.rows.length) {
    await db.execute({ sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('form_title', 'استبيان الرأي')", args: [] });
    await db.execute({ sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('form_title_en', 'Feedback Survey')", args: [] });
    await db.execute({ sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('form_title_ar', 'استبيان الرأي')", args: [] });
    await db.execute({ sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('form_subtitle', 'نقدّر وقتك وصراحتك. إجاباتك ستبقى سرّية.')", args: [] });
    await db.execute({ sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('form_subtitle_en', 'We value your time and honesty. Your answers remain confidential.')", args: [] });
    await db.execute({ sql: "INSERT OR IGNORE INTO settings (key, value) VALUES ('form_subtitle_ar', 'نقدّر وقتك وصراحتك. إجاباتك ستبقى سرّية.')", args: [] });
  }
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
