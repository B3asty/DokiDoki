const pg = require('pg');
const parse = require("pg-connection-string");

var config = {
  connectionString: process.env.DATABASE_URL.parse,
  port: 5432,
  host: process.env.dbhost,
  database: process.env.db,
  user: process.env.user,
  password: process.env.password,
  ssl: true,
  idleTimeoutMillis: 50000
};

var pool = new pg.Pool(config);

module.exports = pool;
