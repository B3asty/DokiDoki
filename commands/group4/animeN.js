const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');
var mal = require('maljs');
const MALjs = require('MALjs');

module.exports = class animenCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'animen',
			aliases: ['an'],
			group: 'group4',
			memberName: 'animen',
			description: 'Shows an anime.',
			examples: ['anime Name'],

			args: [
				{
					key: 'name',
					label: 'user',
					prompt: 'Which anime would you like to see?',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {

		const months = {
				"00": "",
	            "01": "January ",
	            "02": "February ",
	            "03": "March ",
	            "04": "April ",
	            "05": "May ",
	            "06": "June ",
	            "07": "July ",
	            "08": "August ",
	            "09": "September ",
	            "10": "October ",
	            "11": "November ",
	            "12": "December "
	        }
	     const days = {
	     		"00": "",
	            "01": "1st, ",
	            "02": "2nd, ",
	            "03": "3rd, ",
	            "04": "4th, ",
	            "05": "5th, ",
	            "06": "6th, ",
	            "07": "7th, ",
	            "08": "8th, ",
	            "09": "9th, ",
	            "10": "10th, ",
	            "11": "11th, ",
	            "12": "12th, ",
	            "13": "13th, ",
	            "14": "14th, ",
	            "15": "15th, ",
	            "16": "16th, ",
	            "17": "17th, ",
	            "18": "18th, ",
	            "19": "19th, ",
	            "20": "20th, ",
	            "21": "21st, ",
	            "22": "22nd, ",
	            "23": "23rd, ",
	            "24": "24th, ",
	            "25": "25th, ",
	            "26": "26th, ",
	            "27": "27th, ",
	            "28": "28th, ",
	            "29": "29th, ",
	            "30": "30th, ",
	            "32": "31st, "
	        }


	    var anm = args.name+'';
	    var embed = new RichEmbed()
	    var embedst2 = new RichEmbed()

	    const malScraper = require('mal-scraper')

		malScraper.getResultsFromSearch(anm)
		  .then(res => {
		  	console.log(res[0])
		  	console.log(res.length)

		  	var animes = {};

		  	for (var i = 0; i < res.length; i++) {
		  		if(res.type == 'anime'){
		  			animes.add(res[i])
		  		}
		  	}

 
		  	if(res.length > 1){ //more than 1 result
		  		if(res.length < 30){ //less than 30 results

		  		}else{

		  		}

		  		inputAn(res)
		  	}else{ //Only 1 result

		  	}


		  })
		  .catch(err => {
		  	console.log(err)
		  })

		  function inputAn(anarr){


		  }

	}
}