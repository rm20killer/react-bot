
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    dmchecker: function(message,client){
        const attachments = (message.attachments).array(); // Get list of attachments
        const attachment = attachments[0]; // Take the first attachment
        if (attachment !== undefined){
            const embed = new Discord.MessageEmbed()
            .setTitle('Someone DMed me')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0x4287f5)
            .setDescription(message.content)
            .addField("attachment", attachment.url)
            .addField('person id', message.author.id)
            .setFooter("person name " + message.author.tag)
            const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
            channel.send(embed);

	        //auto respond
    	    const nameArray = attachment.name.split('.'); // Split the name 
            const attEx = nameArray[nameArray.length - 1].toLowerCase();
	        const videos = ["webm","mkv","mov","mp4","mpg","avi","m4v","wmv","mxf","flv"];
    	    const editorprojs = ["wfp","prproj","kdenlive","mlt"];
	        const unsupported = ["ofr","y4m"]; //obscure files that mods just straight up can't open
	        if ( videos.indexOf(attEx) != -1 ) {
                message.reply("You don't need to DM me the videos, Just send them in <#696131644871933972>, to get access to this channel read the <#700789384131379371>")
	        }
    	    if ( editorprojs.indexOf(attEx) != -1 ) {
  	            message.reply("That's a video editor project, and I can't watch that. Render it to MP4, WebM, or MOV before submitting it in <#696131644871933972>.");
    	    }
            if ( unsupported.indexOf(attEx) != -1 ) {
		        message.reply("tf did you just send me? I can't open this type of file.");
	        }
        }
        else{
            const embed = new Discord.MessageEmbed()
            .setTitle('Someone DMed me')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0x4287f5)
            .setDescription(message.content)
            .addField('person id', message.author.id)
            .setFooter("person name " + message.author.tag)    
            const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
            channel.send(embed);
        }
        if(message.author.bot) return;
        
        const regex = /(how|where|want).+(submit|post|share|send|subit|give).+(clip|video)/i;
        const messa = message.content.toLowerCase();
        const str = messa;
        let m;
        if ((m = regex.exec(str)) !== null) {
            message.reply("Submit clips in <#696131644871933972>. Make sure clips meet `/requirements`. To get access to this channel read the <#700789384131379371>");
        }

        const sregex = /(how|where|want).+(streamer|content creator|youtuber).+(role|rank)/i;
        if ((m = sregex.exec(str)) !== null) {
            // The result can be accessed through the `m`-variable.
            message.reply("The streamer role is given to users featured in a Gamers React compilation.\nIf you have been featured, message a mod with a timestamp and link to the video.");
        }
	    const bregex = /(who|what|how).+(is|does|this).+(work|bot|this)/i;
        //if ((m = bregex.exec(str)) !== null) {
            // The result can be accessed through the `m`-variable.
   	    // By RootAtKali
	    // Example: "how does the bot work", "what is this", "what does the bot do", may be a bit too sensitive
	    // perhaps a "troll mode" could be toggled per-user so this doesn't tell the truth?
        //    message.reply("React Bot's DM system relays your messages to moderators in a hidden channel.\nModerators can command React Bot to send messages to members.");
       // }

    }
}