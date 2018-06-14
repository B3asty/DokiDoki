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

/*client.on("message", (message) => {
    const newxp = Math.random(Math.floor() * 1);
    console.log(newxp);
    const { Pool, Client } = require('pg');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true
    });
    pool.connect();
    pool.query('select * from XP where userid ='+message.author.id+'')
    .then(row => {
      //console.log(row)
      if(!row){
        pool.query('INSERT INTO XP (userid, xp, level) VALUES ('+message.author.id+', 1, 0,)');
        var res = pool.query('select * from XP where userid ='+message.author.id+'').then(res => console.log("A"+res.xp))
      }else{
        var res = pool.query('select xp from XP where userid ='+message.author.id+'').then(res => console.log(res[0]))
       // pool.query('update XP set xp = '+(row.xp+newxp)+' where userid ='+message.author.id+'')
        //console.log(row.xp)
        let curlevel = Math.floor(0.1 * Math.sqrt(row.xp + 0.1));
          row.level = curlevel;
        if (curlevel > row.level) {     
          pool.query('UPDATE XP SET level = '+curlevel+' WHERE userid ='+message.author.id+'')
          msg.channel.send('You leveled Up!')
         // console.log(row.level)
        }
      }    
      pool.end()
    })


});*/



/*client.on("message", (message) => {
pool.connect();
const  query = pool.query(`SELECT * FROM XP WHERE userid = ${message.author.id}`).then(row => {
    if (!row) { pool.query("INSERT INTO XP (userid, xp, level) VALUES (?, ?, ?)", [message.author.id, 0, 0]);
    } else {
      let curLevel = Math.floor(0.01 * Math.sqrt(11 + 0.01));
      if (curLevel > row.level) {		
        row.level = curLevel;
        pool.query(`UPDATE XP SET level = ${row.level} WHERE userid = ${message.author.id}`)
        message.reply(`You've leveled up to level **${curLevel}**!`)
     		 }
 	 }
});
});*/

//Login 
client.login(process.env.token);
