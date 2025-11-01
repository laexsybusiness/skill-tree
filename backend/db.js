const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS nodes (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      domain TEXT,
      level TEXT CHECK (level IN ('beginner','intermediate','expert')),
      description TEXT,
      estimated_hours INTEGER
    );

    CREATE TABLE IF NOT EXISTS edges (
      from_id INTEGER REFERENCES nodes(id) ON DELETE CASCADE,
      to_id INTEGER REFERENCES nodes(id) ON DELETE CASCADE,
      PRIMARY KEY (from_id, to_id)
    );

    CREATE TABLE IF NOT EXISTS user_progress (
      user_id TEXT,
      node_id INTEGER REFERENCES nodes(id),
      PRIMARY KEY (user_id, node_id),
      mastered BOOLEAN DEFAULT FALSE
    );
  `);
}

module.exports = { pool, init };
