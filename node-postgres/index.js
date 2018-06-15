const { Pool, Client } = require('pg');
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
})
const client = new Client({
  connectionString: connectionString,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

client.connect();
client.query('SELECT * FROM XP', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})
