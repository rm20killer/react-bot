const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});

module.exports = {
    dmchecker: function(message,client){
        let dontlog = "3ADB63D1"
        //console.log("dm")
        const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
        const channel2 = client.channels.cache.find(channel => channel.id === "885144925509914654");
        const attachments = Array.from(message.attachments);
        const attachmentss = attachments[0];
        if(message.author.bot && message.content.includes("3ADB63D1")){
            //console.log("test");
            return
        }
        //console.log(attachmentss)
        if (attachmentss !== undefined){
            const attachment = attachmentss[1]
            const embed = new Discord.MessageEmbed()
            .setTitle('Someone DMed me')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0x4287f5)
            .setDescription(message.content)
            .addField("attachment", attachment.url)
            .addField('person id', message.author.id)
            .setFooter("person name " + message.author.tag)
            channel.send({ embeds: [embed] });
            //channel2.send({ embeds: [embed] });

	        //auto respond
    	    const nameArray = attachment.name.split('.'); // Split the name 
            const attEx = nameArray[nameArray.length - 1].toLowerCase();
	        const videos = ["webm","mkv","mov","mp4","mpg","avi","m4v","wmv","mxf","flv"];
    	    const editorprojs = ["wfp","prproj","kdenlive","mlt","vpj"];
	        const unsupported = ["ofr","y4m"]; //obscure files that mods just straight up can't open
	        if ( videos.indexOf(attEx) != -1 ) {
                message.reply("You don't need to DM me the videos, Just send them in <#878531760386871327>, to get access to this channel read the <#700789384131379371>")
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
            channel.send({ embeds: [embed] });
            //channel2.send({ embeds: [embed] });
        }
        if(message.author.bot) return;
        
        if(message.content.includes("https://")){
            message.reply("Submit clips in <#878531760386871327>. Make sure clips meet `/requirements`. To get access to this channel read the <#700789384131379371>");
            return;
        }

        const regex = /(how|where|want).+(submit|post|share|send|subit|give).+(clip|video)/i;
        const messa = message.content.toLowerCase();
        const str = messa;
        let m;
        if ((m = regex.exec(str)) !== null) {
            message.reply("Submit clips in <#878531760386871327>. Make sure clips meet `/requirements`. To get access to this channel read the <#700789384131379371>");
            return;
        }

        const sregex = /(how|where|want).+(streamer|content creator|youtuber).+(role|rank)/i;
        if ((m = sregex.exec(str)) !== null) {
            // The result can be accessed through the `m`-variable.
            message.reply("The streamer role is given to users featured in a Gamers React compilation.\nIf you have been featured, message a mod with a timestamp and link to the video.");
            return;
        }

    }
}
