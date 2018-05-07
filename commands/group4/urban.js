const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class UrbanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'urban',
            aliases: ['ub'],
            group: 'group4',
            memberName: 'urban',
            description: 'Search Something on Urban',
            examples: ['{prifix}urban [text]'],
            guildOnly: true,
            args:[
                {
                    key: 'text',
                    prompt: 'what to search for',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }     
    async run(msg,args) {
        const urban = require('relevant-urban','urban');
        if (!args.text) msg.channel.send(`***Please specify some text!***`);
        let res = await urban(args.text).catch(e => { 
          return msg.channel.send('***Sorry, that word was not found!***');
        });
        const embed = new RichEmbed()
          embed.setColor('RANDOM') 
          embed.setTitle(res.urbanURL) 
          embed.setDescription(`**Definition of ${res.word}:**\n${res.definition}`)
          embed.addField('**Examples:**',` ${res.example}`)
          embed.addField('Author', res.author, true) 
          embed.addField('Rating', `**\:thumbsup: \`Upvotes: ${res.thumbsUp}\` | :thumbsdown: \`Downvotes: ${res.thumbsDown}\`**`)
          console.log(res.tags)
          //embed.addField('Tags', res.tags.join(', '), true)
        return msg.channel.send(embed);
      
      }
};