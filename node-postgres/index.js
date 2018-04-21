const { Pool } = require('pg');
const pool = new Pool({
  connectionString: "postgres://mncmdnttojdsku:3849194dc1c60408b302cd9991f3ce27e08827998d5029ae25080e6bf09ee779@ec2-54-225-96-191.compute-1.amazonaws.com:5432/d3u98tvto5gblt",
  ssl: true
});

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('CREATE test_table');
    res.render('pages/db', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
