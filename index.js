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
	  	client.user.setActivity(`with ${client.guilds.size} Servers`);
	})
// Guild Join / Leave 
  client.on("guildCreate", (guildCreate) => { 
      client.user.setPresence({ game: { name: `With ${client.guilds.size} Servers!` }, status: 'online' })

      const channel1 = client.guilds.find("name", "DokiDoki Support").channels.find('name','server-join-leave');
      const joinembed = new RichEmbed()
            joinembed.setAuthor(client.user.username + ' Joined the Guild')
            joinembed.setDescription(`${guildCreate.name}`)
            joinembed.addField(`Guild ID` , `${guildCreate.id}`)
            joinembed.addField('Member Count', `${guildCreate.memberCount}`, true)
            joinembed.addField('Channel Count ' , ` ${guildCreate.channels.array().length}`, true)
            var jownerTag = guildCreate.members.get(guildCreate.ownerID).user.username+"#"+guildCreate.members.get(guildCreate.ownerID).user.discriminator+" ("+guildCreate.ownerID+")"
           joinembed.addField('Server Owner ', jownerTag)
            joinembed.setThumbnail(guildCreate.iconURL)
            joinembed.setColor(`#00FF00`)
            joinembed.setFooter(client.user.username + ' \(' + client.user.id + '\)')
       channel1.send(joinembed)
  });
  client.on("guildDelete", (guildDelete) => {
      client.user.setPresence({ game: { name: `With ${client.guilds.size} Servers!` }, status: 'online' })

      const channel1 = client.guilds.find("name", "DokiDoki Support").channels.find('name','server-join-leave');
        const leaveembed = new RichEmbed()
            leaveembed.setAuthor(client.user.username + ' Left the Guild')
            leaveembed.setDescription(`${guildDelete.name}`)
            leaveembed.addField(`Guild ID` , `${guildDelete.id}`)
            var lownerTag = guildDelete.members.get(guildDelete.ownerID).user.username+"#"+guildDelete.members.get(guildDelete.ownerID).user.discriminator+" ("+guildDelete.ownerID+")"      
            leaveembed.addField('Server Owner: ', lownerTag)
            leaveembed.setThumbnail(guildDelete.iconURL)
            leaveembed.setColor(`#FF0000`)
            leaveembed.setFooter(client.user.username + ' \(' + client.user.id + '\)')
       channel1.send(leaveembed)
  });



client.on("message", async (message) => {
if (message.author.bot) return;
	const parse = require("pg-connection-string");
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

    pool.query(`SELECT * FROM xp WHERE userid = '${message.author.id}'`, {useArray: true}, (err, rows) => {
      const curlvl = Math.floor(0.1 * Math.sqrt(rows.xp + 0.1));
      const xp = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
      if(err) throw err;
      let sql;
       if (!rows < 1){
	sql = `INSERT INTO xp(userid, xp, level) VALUES(${message.author.id}, 0, 0)`
      } else {
        let xp = rows.xp;
        sql = `UPDATE xp SET xp = ${xp + xp} WHERE userid = '${message.author.id}'`
      }
      pool.query(sql, console.log);
     pool.end(err => {
      if(err) throw err; 
      console.log('Logged to PostgresSQL');
	});
  });
});
	    
//Login 
client.login(process.env.token);
