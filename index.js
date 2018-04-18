const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
/*
const { Pool } = require('pg')
const connectionString = require(process.env.DATABASE_URL)
*/
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
const path = require('path');
//const DBL = require("dblapi.js");
//const dbl = new DBL('process.env.dbl');
const client = new CommandoClient({
    commandPrefix: '<<',
    unknownCommandResponse: true,
    owner: ['193021560792154112', '111469545637605376'],
    disableEveryone: true, 
    //connectionString: connectionString,
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

client.login(process.env.token);
