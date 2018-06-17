const PG = require('pg');

const pg = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

pg.connect();

pg.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
})

module.exports = pool;
