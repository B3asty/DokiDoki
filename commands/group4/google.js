const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');
var GoogleSearch = require('google-search');


module.exports = class googleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'google',
			aliases: ['search'],
			group: 'group4',
			memberName: 'google',
			description: 'Shows the first 5 results on Google',
			examples: ['google Anime'],

			args: [
				{
					key: 'query',
					label: 'query',
					prompt: 'What would you like to search?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {

		var google = require('google')
		 
		google.resultsPerPage = 8
		var nextCounter = 0
		 
		google(args.query, function (err, res){
		  if (err) console.error(err)

		  	console.log(res.links[0])
		 
		  for (var i = 0; i < res.links.length; ++i) {
		    var link = res.links[i];
		    //console.log(link.title + ' - ' + link.href)
		    //console.log(link.description + "\n")
		  }
		 
		  if (nextCounter < 4) {
		    nextCounter += 1
		    if (res.next) res.next()
		  }
		})

	}
}