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

pool.query('SELECT * FROM xp', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  pool.end();
}) 

module.exports = pool;
