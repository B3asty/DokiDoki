const pg = require('pg');
const parse = require("pg-connection-string");

const config = {
  connectonString: process.env.DATABASE_URL.parse,
  port: 5432,
  host: "ec2-54-225-96-191.compute-1.amazonaws.com",
  database: "d3u98tvto5gblt",
  user: "mncmdnttojdsku",
  ssl: true,
  idleTimeoutMillis: 50000
};

var pool = new pg.Pool(config);
  pool.connect();

pool.query('SELECT * FROM xp', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  pool.end();
})  
module.exports = pool;
