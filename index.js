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
  if (message.author.bot) return;
    const { Pool } = require ('pg');    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL.parse,
      port: 5432,
      host: process.env.dbhost,
      database: process.env.db,
      user: process.env.user,
      password: process.env.password,
      ssl: true,
    });
    
    pool.connect(err => {
      if(err) throw err; 
      console.log('Connected to PostgresSQL');
    })

    pool.query(`SELECT xp, level FROM xp WHERE userid = '193021560792154112'`, (err, result) => {
      console.log(result)
      console.log(result.rows[0])
      pool.end(err => {
        if(err) throw err; 
        console.log('Logged to PostgresSQL');

    });
  });
});

	    
//Login 
client.login(process.env.token);
