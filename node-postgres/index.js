const { Client } = require('pg',"discord.js","discord.js-commando");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();
client.query('SELECT * FROM XP', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

-client.on("message", message => {
-pool.connect();
-const  query = pool.query(`SELECT * FROM XP WHERE userid = ${message.author.id}`).then(row => {
-    if (!row) { pool.query("INSERT INTO XP (userid, xp, level) VALUES (?, ?, ?)", [message.author.id, 0, 0]);
-    } else {
-      let curLevel = Math.floor(0.01 * Math.sqrt(11 + 0.01));
-      if (curLevel > row.level) {		
-        row.level = curLevel;
-        pool.query(`UPDATE XP SET level = ${row.level} WHERE userid = ${message.author.id}`);
-        message.reply(`You've leveled up to level **${curLevel}**!`);
-      }
-  };
-})
-});
