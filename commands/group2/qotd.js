const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class qotdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'qotd',
            aliases: [],
            group: 'group2',
            memberName: 'qotd',
            description: "Sends a quote in a fancy manner. \nUse `-a` to define the Author and where it's from.",
            examples: ['<qotd This is my Quote -a Discord'],
			args: [
				{
					key: 'quote',
					label: 'quote',
					prompt: 'What is your quote?',
					type: 'string'
				}
			]
        });
    }
	async run(msg, args) {
        if(msg.member.hasPermission('ADMINISTRATOR', 'MANAGE_MESSAGES')){
            var infos = args.quote;

            const embed = new RichEmbed()

            if(infos.indexOf('-a ')){
                    embed.setFooter(infos.substring(infos.indexOf('-a ')+3, infos.length)) 
                    embed.setDescription(infos.substring(0,infos.indexOf('-a '))) 
            }else{
                embed.setDescription(infos)            
            }

            embed.setThumbnail("https://img00.deviantart.net/a56c/i/2013/170/3/e/cute_speech_bubble_render_by_klleiachan-d69rv96.png")      
            embed.setTitle("Quote of the day")

            const chann = msg.guild.channels.find('name','qotd');
            if(chann){
                chann.sendMessage(embed)
            }else{
                msg.channel.send(embed)
            }
            msg.delete()
        }else{
            const embed = new RichEmbed()
            embed.setDescription("You need to be Admin to use this")
            embed.setColor(0x23ff12)
            msg.channel.send(embed);
        }
    }
}

