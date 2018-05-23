const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
const path = require('path');
//const DBL = require("dblapi.js");
//const dbl = new DBL('process.env.dbl');
const client = new CommandoClient({
    commandPrefix: '<<',
    unknownCommandResponse: true,
    owner: ['193021560792154112', '111469545637605376'],
    disableEveryone: true
});

sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db));
});

// Command Groups

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['group1', 'Emotions'],
        ['group2', 'Fun'],
        ['group3', 'Random'],
	['group4', 'Util'],
	['group5', 'Administration'],
	['group6', 'NSFW'],

])	
// Console.Log and other stuff -.-
    .registerDefaultGroups()
    .registerDefaultCommands({
	help: false,
	ping: false,
	prefix: true,
	eval: true
})
    .registerCommandsIn(path.join(__dirname, 'commands'));
  client	 
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log)
	.on('ready', () => {
		console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	  	client.user.setActivity(`with ${client.guilds.size} Servers`);
	  	//setInterval(() => {
		//dbl.postStats(client.guilds.size);
   		 //}, 1800000);
	})

// Random Shits
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
client.on("message", message => {
pool.connect();
const query = pool.query(
	const userid = message.author.id
  'SELECT * FROM XP WHERE userid ="${message.author.id}"').then(row => {
    if (!row) {
      pool.query("INSERT INTO XP (userid, xp, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    } else {
      let curLevel = Math.floor(0.01 * Math.sqrt(row.points + 0.1));
      if (curLevel > row.level) {
        row.level = curLevel;
        pool.query(`UPDATE XP SET level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`You've leveled up to level **${curLevel}**!`);
      }
      pool.run(`UPDATE XP SET points = ${row.points + 0.1} WHERE userId = ${message.author.id}`);
    }
  });
});

client.login(process.env.token);
