const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const oakdexPokedex = require('oakdex-pokedex');

module.exports = class pokemonCommand extends Command {
    constructor(client) {
      super(client, {
            name: 'pokemon',
            aliases: ['pokedex', 'pkmn', 'dex'],
            group: 'group4',
            memberName: 'pokemon',
            description: 'Gives you information about a Pokemon',
            args: [
                {
                    key: 'name',
                    prompt: 'Please name a Pokemon, or enter an ID',
                    type: 'string'
                }
            ]
        });
    }

	async run(msg, args) {
           const embed = new RichEmbed()
           var poke = args.name.charAt(0).toUpperCase() + args.name.slice(1);
            oakdexPokedex.findPokemon(poke, function(p) {
                console.log(p);
              embed.setTitle('#'+p.national_id+ " "+p.names.en)
              var sprite = "../../node_modules/oakdex-pokedex-sprites/icons/"+p.national_id+".png";
              embed.setThumbnail(sprite)

              msg.channel.send(embed)
               
            });    
        }
	};
