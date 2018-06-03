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
		  	console.log(result)
		  // 	if(result.anime.length > 1){
		  // 		var titles = "";
		  // 		var titles2 = "";
		  // 		embed.setTitle("Multiple Anime found");
		  // 		embedst2.setTitle("Multiple Anime found");
		  // 		if(result.anime.length < 30){
		  // 			for (var i = 0; i < result.anime.length; i++) {  			
			 //  			titles = titles + "**["+ (i+1) + "]** " + result.anime[i].sn.replace(/\_/g," ") + "\n";
			 //  		}

			 //  		titles = titles+"\n**Please enter the number of the Anime you want to view** \n**Or type** `cancel` **to cancel the command**"
			 //  		embed.setDescription(titles)

			 //  		msg.channel.send(embed)
		  // 		}else{
		  // 			for (var i = 0; i < 30; i++) {  			
			 //  			titles = titles + "**["+ (i+1) + "]** " + result.anime[i].sn.replace(/\_/g," ") + "\n";
			 //  		}

			 //  		titles = titles+"\n**Please enter the number of the Anime you want to view** \n**Or type** `cancel` **to cancel the command**"
			 //  		embed.setDescription(titles)

			 //  		msg.channel.send(embed)

			 //  		for (var i = 30; i < result.anime.length; i++) {  			
			 //  			titles2 = titles2 + "**["+ (i+1) + "]** " + result.anime[i].sn.replace(/\_/g," ") + "\n";
			 //  		}

			 //  		titles2 = titles2+"\n**Please enter the number of the Anime you want to view** \n**Or type** `cancel` **to cancel the command**"
			 //  		embedst2.setDescription(titles2)

			 //  		msg.channel.send(embedst2)
		  // 		}
		  		
				// inputAn(result.anime)

		 //  	}else {
		 //  		var embed2 = new RichEmbed()
	  //               	result.anime[0].fetch()
	  //               	.then(csn => {
	  //               		embed2.setTitle(csn.title)
		 //                	embed2.setDescription(csn.description)
		 //                	embed2.setThumbnail(csn.cover)
		                	
		                	

			// 				malScraper.getInfoFromName(csn.title)
			// 				  .then(res => {
			// 				  	embed2.addField("English Title", res.englishTitle, true)
			// 				  	embed2.addField("Japanese Title", res.japaneseTitle, true)
			// 				  	embed2.addField("Synonyms", res.synonyms, true)
			// 				  	embed2.addField("Episodes", res.episodes, true)
			// 				  	embed2.addField("Type", res.type, true)
			// 				  	embed2.addField("Status", res.status, true)
			// 				  	embed2.addField("Source", res.source, true)
			// 				  	embed2.setFooter(res.aired)

			// 				  	var genres = "`"
			// 				  	for (var i = 0; i < res.genres.length; i++) {
			// 				  		genres = genres + res.genres[i] + "`";
			// 				  		if(i+1 < res.genres.length){
			// 				  			genres = genres + ", `"
			// 				  		}
			// 				  	}
			// 				  	embed2.addField("Genres", genres)
			// 				  	embed2.addField("Rating", res.rating)
			// 				  	embed2.addField("Link", "https://myanimelist.net/"+csn.path)
			// 				  	embed2.addField("Ranked", "#"+csn.ranked, true)
		 //                		embed2.addField("Score", csn.score, true)

			// 					msg.channel.send(embed2)
			// 				  })
			// 				  .catch(err => {
			// 				  	console.log(err)
			// 				  })

							
	  //               	})
	  //               	.catch(err => {
	  //               		console.log(err)
	  //               	})
			// }

		   }

		   ) // contains the json result on success
		   .catch(err => {
		   	msg.channel.send("Something went wrong, please try again.")
		   	console.log(err);
		   });




		//   function inputAn(anarr){

		//   	msg.channel.awaitMessages(m => m.author.id == msg.author.id, { max: 1, time: 30000, errors: ['time'] })
  //           .then(collected => {
  //           		console.log(collected.first().content)
  //           		if(collected.first().content == 'cancel'){
  //           			msg.channel.send('Command canceled.')
  //           		}else if(parseInt(collected.first().content,10)-1 == 'NaN' || parseInt(collected.first().content,10)-1 < 0){
  //           			msg.channel.send('This is not a valid number, please try again.')
  //           			inputAn(anarr)
  //           		}else{
  //           			var embed2 = new RichEmbed()
	 //                	anarr[parseInt(collected.first().content,10)-1].fetch()
	 //                	.then(csn => {
	 //                		console.log(csn)
	 //                		embed2.setTitle(csn.title)
		//                 	embed2.setDescription(csn.description)
		//                 	embed2.setThumbnail(csn.cover)
		                	
		                	

		// 					malScraper.getInfoFromName(csn.title)
		// 					  .then(res => {
		// 					  	console.log(res)
		// 					  	embed2.addField("English Title", res.englishTitle, true)
		// 					  	embed2.addField("Japanese Title", res.japaneseTitle, true)
		// 					  	embed2.addField("Synonyms", res.synonyms, true)
		// 					  	embed2.addField("Episodes", res.episodes, true)
		// 					  	embed2.addField("Type", res.type, true)
		// 					  	embed2.addField("Status", res.status, true)
		// 					  	embed2.addField("Source", res.source, true)
		// 					  	embed2.setFooter(res.aired)

		// 					  	var genres = "`"
		// 					  	for (var i = 0; i < res.genres.length; i++) {
		// 					  		genres = genres + res.genres[i] + "`";
		// 					  		if(i+1 < res.genres.length){
		// 					  			genres = genres + ", `"
		// 					  		}
		// 					  	}
		// 					  	embed2.addField("Genres", genres)
		// 					  	embed2.addField("Rating", res.rating)
		// 					  	embed2.addField("Link", "https://myanimelist.net/"+csn.path)
		// 					  	embed2.addField("Ranked", "#"+csn.ranked, true)
		//                 		embed2.addField("Score", csn.score, true)

		// 						msg.channel.send(embed2)
		// 					  })
		// 					  .catch(err => {
		// 					  	console.log(err)
		// 					  })

							
	 //                	})
	 //                	.catch(err => {
	 //                		console.log(err)
	 //                	})


	 //                }
 
		//   })
  //         .catch(err => {
  //         	console.log(err)
  //         })
		// }
	}

}