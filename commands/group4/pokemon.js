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

        var poke = args.name.charAt(0).toUpperCase() + args.name.slice(1);
        oakdexPokedex.findPokemon(poke, function(p) {
            console.log(p);
          embed.setTitle('#'+p.national_id+ " "+p.names.en)

           
          var thum = "https://img.pokemondb.net/sprites/"
          if(p.pokedex_entries.Sun){
            embed.setDescription(p.pokedex_entries.Sun.en + "\n\n" + p.pokedex_entries.Moon.en)
            thum = thum + "/sun-moon/dex/normal/"
          }else if(p.pokedex_entries.X){
            embed.setDescription(p.pokedex_entries.X.en + "\n\n" + p.pokedex_entries.Y.en)
            thum = thum + "/x-y/dex/normal/"
          }else if(p.pokedex_entries.Black){
            embed.setDescription(p.pokedex_entries.Black.en + "\n\n" + p.pokedex_entries.White.en)
            thum = thum + "/black-white/dex/normal/"
          }else if(p.pokedex_entries.Diamond){
            embed.setDescription(p.pokedex_entries.Diamond.en + "\n\n" + p.pokedex_entries.Pearl.en + "\n\n" + p.pokedex_entries.Platinum.en)
            thum = thum + "/diamond-pearl/dex/normal/"
          }else if(p.pokedex_entries.Ruby){
            embed.setDescription(p.pokedex_entries.Ruby.en + "\n\n" + p.pokedex_entries.Sapphire.en+ "\n\n" + p.pokedex_entries.Emerald.en)
            thum = thum + "/ruby-sapphire/dex/normal/"
          }else if(p.pokedex_entries.Gold){
            embed.setDescription(p.pokedex_entries.Gold.en + "\n\n" + p.pokedex_entries.Silver.en+ "\n\n" + p.pokedex_entries.Crystal.en)
            thum = thum + "/silver/dex/normal/"
          }else if(p.pokedex_entries.Red){
            embed.setDescription(p.pokedex_entries.Red.en + "\n\n" + p.pokedex_entries.Yellow.en)
            thum = thum + "/red-blue/dex/normal/"
          }


          thum = thum+p.names.en.toLowerCase()+".png"

        embed.setThumbnail(thum)
          
          var names = "";

          if(p.names.jp){
            names = names + "**JP:** " + p.names.jp + "\n"
          }
          if(p.names.de){
            names = names + "**DE:** " + p.names.de + "\n"
          }
          if(p.names.fr){
            names = names + "**FR:** " + p.names.fr + "\n"
          }
          if(p.names.es){
            names = names + "**ES:** " + p.names.es + "\n"
          }
          if(p.names.it){
            names = names + "**IT:** " + p.names.it + "\n"
          }
          
          embed.addField("Names", names)

          msg.channel.send(embed)


          /* const embed = new RichEmbed()
           var poks = args.name.toLowerCase().replace(" ", "-");

           pok.getPokemon(args.name)
           .then(poki => {
                var poke = args.name.charAt(0).toUpperCase() + args.name.slice(1);
                oakdexPokedex.findPokemon(poki.id, function(p) {
                    console.log(p);
                  embed.setTitle('#'+p.national_id+ " "+p.names.en)
                  var sprite = poki.sprites.front_default;
                  embed.setThumbnail(sprite)

                  if(p.pokedex_entries.Sun){
                    embed.setDescription(p.pokedex_entries.Sun.en + "\n\n" + p.pokedex_entries.Moon.en)
                  }else if(p.pokedex_entries.X){
                    embed.setDescription(p.pokedex_entries.X.en + "\n\n" + p.pokedex_entries.Y.en)
                  }

                  var names = "";

                  if(p.names.jp){
                    names = names + "**JP:** " + p.names.jp + "\n"
                  }
                  if(p.names.de){
                    names = names + "**DE:** " + p.names.de + "\n"
                  }
                  if(p.names.fr){
                    names = names + "**FR:** " + p.names.fr + "\n"
                  }
                  if(p.names.es){
                    names = names + "**ES:** " + p.names.es + "\n"
                  }
                  if(p.names.it){
                    names = names + "**IT:** " + p.names.it + "\n"
                  }
                  
                  embed.addField("Names", names)
                  msg.channel.send(embed)
                   
                });    
           })
           .catch(err => {
            var poke = args.name.charAt(0).toUpperCase() + args.name.slice(1);
                oakdexPokedex.findPokemon(poke, function(p) {
                    console.log(p);
                  embed.setTitle('#'+p.national_id+ " "+p.names.en)
                  if(p.names.en == "Mimikyu"){
                    embed.setThumbnail("https://img.pokemondb.net/sprites/sun-moon/dex/normal/mimikyu.png")
                  }

                  if(p.pokedex_entries.Sun){
                    embed.setDescription(p.pokedex_entries.Sun.en + "\n\n" + p.pokedex_entries.Moon.en)
                  }else if(p.pokedex_entries.X){
                    embed.setDescription(p.pokedex_entries.X.en + "\n\n" + p.pokedex_entries.Y.en)
                  }
                  
                  var names = "";

                  if(p.names.jp){
                    names = names + "**JP:** " + p.names.jp + "\n"
                  }
                  if(p.names.de){
                    names = names + "**DE:** " + p.names.de + "\n"
                  }
                  if(p.names.fr){
                    names = names + "**FR:** " + p.names.fr + "\n"
                  }
                  if(p.names.es){
                    names = names + "**ES:** " + p.names.es + "\n"
                  }
                  if(p.names.it){
                    names = names + "**IT:** " + p.names.it + "\n"
                  }
                  
                  embed.addField("Names", names)

                  msg.channel.send(embed)
                   
                });
            console.log(err)
           })*/
           }
        }
	};
