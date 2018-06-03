const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');
var kitsu = require('node-kitsu')

module.exports = class animenCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'animen',
			aliases: ['nan'],
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
	    var embed2 = new RichEmbed()


	    kitsu.searchAnime(anm, 0)
		  .then(result => {
		  	//console.log(result[0])
		   	if(result.length > 1){
		   		var titles = "";
		   		var titles2 = "";
		   		embed.setTitle("Multiple Anime found");
		   		embedst2.setTitle("Multiple Anime found");
		   			for (var i = 0; i < result.length; i++) {  			
			   			titles = titles + "**["+ (i+1) + "]** " + result[i].attributes.canonicalTitle + "\n";
			   		}

			   		titles = titles+"\n**Please enter the number of the Anime you want to view** \n**Or type** `cancel` **to cancel the command**"
			   		embed.setDescription(titles)

			   		msg.channel.send(embed)
		  		
				inputAn(result)

		   	}else {
		 
			}

		   }

		   ) // contains the json result on success
		   .catch(err => {
		   	msg.channel.send("Something went wrong, please try again.")
		   	console.log(err);
		   });




		   function inputAn(anarr){

		   	msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 30000, errors: ['time'] })
             .then(collected => {
             		if(collected.first().content == 'cancel'){
             			msg.channel.send('Command canceled.')
             		}else if(parseInt(collected.first().content,10)-1 == 'NaN' || parseInt(collected.first().content,10)-1 < 0){
             			msg.channel.send('This is not a valid number, please try again.')
             			inputAn(anarr)
             		}else{
             			var embed2 = new RichEmbed()
	                 	var ani = anarr[parseInt(collected.first().content,10)-1]
	                 		var atts = ani.attributes
	                 		console.log(ani)
	                 		embed2.setTitle(atts.titles.en_jp)
		                 	embed2.setDescription(atts.synopsis)
		                 	embed2.setThumbnail(atts.posterImage[0])
		                 	console.log(atts.posterImage[0])
				

		 					embed2.addField("English Title", atts.titles.en, true)
							embed2.addField("Japanese Title", atts.titles.ja_jp, true)
		 					embed2.addField("Synonyms", atts.abbreviatedTitles, true)
		 					embed2.addField("Episodes", atts.episodeCount + " á " + atts.episodeLength + " minutes", true)
		 					embed2.addField("Type", atts.showType, true)
		 					embed2.addField("Status", atts.status, true)
		 					embed2.addField("Age Restrictions", atts.ageRating + " - " + atts.ageRatingGuide)
		 					embed2.addField("Link", ani.links.self)
		 					embed2.addField("Popularity Rank", "#"+atts.popularityRank, true)
		 					embed2.addField("Rating Rank", "#"+atts.ratingRank, true)
		                 	embed2.addField("Rating", atts.averageRating, true)

		 					embed2.setFooter(atts.startDate + " to " + atts.endDate)

		 					msg.channel.send(embed2)
	                 }
 
		   })
           .catch(err => {
           	console.log(err)
          })
		 }
	}

}