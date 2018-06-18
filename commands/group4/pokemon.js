const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const oakdexPokedex = require('oakdex-pokedex');
const pok = require('pokemon-node');

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
           var poks = args.name.toLowerCase().replace(" ", "-");

           pok.getPokemon(poks)
           .then(poki => {
                var poke = args.name.charAt(0).toUpperCase() + args.name.slice(1);
                oakdexPokedex.findPokemon(poki.id, function(p) {
                    console.log(p);
                  embed.setTitle('#'+p.national_id+ " "+p.names.en)
                  var sprite = poki.sprites.front_default;
                  embed.setThumbnail(sprite)

                 // embed.setDescription(p.pokedex_entries.'Ultra Sun'.en + "\n" + p.pokedex_entries.'Ultra Moon'.en)

                  msg.channel.send(embed)
                   
                });    
           })
           .catch(err => {
            msg.channel.send("Pokemon not Found")
            console.log(err)
           })
           
        }
	};
