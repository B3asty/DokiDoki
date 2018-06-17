const pg = require('pg');

const config = {
  connectString: process.env.DATABASE_URL,
  port: 5432,
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
