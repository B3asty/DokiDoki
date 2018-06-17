const pg = require('pg');

const config = {
  user: process.env.DATABASE_URL,
  database: process.env.DATABASE_URL,
  password: process.env.DATABASE_URL,
  host: process.env.DATABASE_URL,
  port: 5432,
  max: 10,
  ssl: true,
  idleTimeoutMillis: 50000
};

var pool = new pg.Pool(config);

module.exports = pool;
