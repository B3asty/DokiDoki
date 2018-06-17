const pg = require('pg');

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  idleTimeoutMillis: 50000
};

var pool = new pg.Pool(config);

module.exports = pool;
