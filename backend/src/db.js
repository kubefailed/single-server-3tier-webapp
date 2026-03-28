const { Pool } = require('pg');

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: 'health_user',
  host: 'localhost',
  database: 'health_db',
  password: '12345',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});

// Test connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Database connected successfully at:', res.rows[0].now);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
