const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
const path = require('path');
const client = new CommandoClient({
    commandPrefix: '<',
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
            var joiedguild = this.client.guilds.get('${guildCreate.id}')
            var joinedownerTag = joinedguild.members.get(joinedguild.ownerID).username+'#'+guild.members.get(joinedguild.ownerID).discriminator
            joinembed.addField('Server Owner ', joinedownerTag)
            joinembed.setThumbnail(guildCreate.iconURL)
            joinembed.setColor(`RANDOM`)
            joinembed.setFooter(client.user.username + ' \(' + client.user.id + '\)')
       channel1.sendMessage(joinembed)
  });
  client.on("guildDelete", (guildDelete) => {
      client.user.setPresence({ game: { name: `With ${client.guilds.size} Servers!` }, status: 'online' })

      const channel1 = client.guilds.find("name", "DokiDoki Support").channels.find('name','server-join-leave');
        const leaveembed = new RichEmbed()
            leaveembed.setAuthor(client.user.username + ' Left the Guild')
            leaveembed.setDescription(`${guildDelete.name}`)
            leaveembed.addField(`Guild ID` , `${guildDelete.id}`)
            leaveembed.addField('Server Owner: ', guildDelete.owner)
            leaveembed.setThumbnail(guildDelete.iconURL)
            leaveembed.setColor(`RANDOM`)
            leaveembed.setFooter(client.user.username + client.user.id)
       channel1.sendMessage(leaveembed)
  });

//Login 
client.login(process.env.token);
