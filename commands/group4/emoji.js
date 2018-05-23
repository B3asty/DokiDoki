const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class emojiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'emoji',
			aliases: ['moji', 'emote'],
			group: 'group4',
			memberName: 'emoji',
			description: 'Shows a Users emoji.',
			examples: ['emoji @...'],

			args: [
				{
					key: 'moji',
					label: 'emoji',
					prompt: 'What emoji would you like to see?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
		const embed = new RichEmbed()
			var mes = args.moji;
			if(/\<a?\:.+\:[0-9]+\>/.test(mes)){
				var mojiID = mes.substring(1,mes.length-1).substring(mes.lastIndexOf(":"),mes.length)
	            //console.log(mes)
	            //console.log(mojiID)
	            //console.log(mes.charAt(1))

	            if(mes.charAt(1) == 'a'){
	            	var link = "https://cdn.discordapp.com/emojis/"+mojiID+".gif"
	            }else{
	            	var link = "https://cdn.discordapp.com/emojis/"+mojiID+".png"
	            }
	            embed.setImage(link)
	            msg.channel.send(embed)
			}else{
				const moo = require('twemoji')
				var tx = moo.parse(' :poop: ')
				tx = tx.substring(tx.indexOf('src=')+5, tx.lastIndexOf('"'));
				embed.setImage(tx)
				msg.channel.send(embed)
			}

            
       
}
};
