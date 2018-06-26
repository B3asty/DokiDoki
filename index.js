const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
const path = require('path');
const client = new CommandoClient({
    commandPrefix: '<<',
    unknownCommandResponse: false,
    owner: ['193021560792154112', '111469545637605376'],
    disableEveryone: true,      
});


sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db));
});
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
     .registerDefaultGroups()
     .registerDefaultCommands({help: false, ping: false, prefix: true, eval: true})
     .registerCommandsIn(path.join(__dirname, 'commands'));
	   client.on('error', console.error)
	   client.on('warn', console.warn)
	   client.on('debug', console.log)
	   client.on('ready', () => {
		    console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	  	client.user.setActivity(`Testing Stuff`);
	})


client.on("message", (message) => {
if (!usersOnCooldown.has(message.author.id)){
if (message.author.bot) return;
if (message.channel.type === "dm") return;
  const usersOnCooldown = new Set();
  const { Pool } = require ('pg');    
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, port: 5432, host: process.env.dbhost, database: process.env.db, user: process.env.user, password: process.env.password, ssl: true, });  
  pool.connect(err => {
    if(err) throw err; 
    console.log('Connected to PostgresSQL');
  })
let xp, level;
  pool.query(`SELECT xp, level FROM xp WHERE userid = '${message.author.id}'`,null,{useArray: true}, (err, result) => {
    console.log(result)
    console.log(result.rows[0])
  if (!result.rows[0]){
    level = 1;
    pool.query(`INSERT INTO xp(userid, xp, level) VALUES('${message.author.id}', ${level}, 0)`)
  }else{
    level = parseInt(result.rows[0][0]);

    const xpgen = parseFloat(result.rows[0][2]) + Math.floor(Math.random() * (14 - 8) + 8);
    xp = result.rows([0][2]);
    pool.query(`UPDATE xp SET xp = ${xp + xpgen} WHERE userid = '${message.author.id}'`)
  }
pool.end(err => {
  if(err) throw err; 
console.log('Logged to PostgresSQL');
    });
usersOnCooldown.add(message.author.id);
  setTimeout(() => { usersOnCooldown.delete(message.author.id); }, 60000);
  });
}
});
	    
//Login 
client.login(process.env.token);
