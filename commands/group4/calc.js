const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class CalcCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'calc',
            aliases: ['calculate'],
            group: 'group4',
            memberName: 'calc',
            description: 'Calculate Nnumbers',
            examples: ['Calculate 1+1'],
            guildOnly: true,
            args: [
                {
                    key: '0',
                    prompt: 'what to calculate',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }
async run(msg, args){
        const embed = new RichEmbed()
            .setColor('RANDOM');
        if (!args[0]) {
            embed.setDescription('Please input an expression.');
            return msg.channel.send(embed);
        }
        let result;
        try {
            result = math.eval(args.join(' '));
        } catch (e) {
            result = 'Error: "Invalid Input"';
        }
        embed.addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
            .addField('Output', `\`\`\`js\n${result}\`\`\``);
        return msg.channel.send(embed);
        
    }
};