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

const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    dmchecker: function(message,client){
        let row23 = new MessageActionRow()
        .addComponents(new MessageButton()
            .setStyle('LINK')
            .setLabel('GR Website')
            .setURL("https://gamersreact.com/"))
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
                message.reply({content: "**Submit clips our website:** \nClick button below to vist the site", components: [row23]}); //Otherwise say this
	        }
    	    //if ( editorprojs.indexOf(attEx) != -1 ) {
  	        //    message.reply("That's a video editor project, and I can't watch that. Render it to MP4, WebM, or MOV before submitting it in <#696131644871933972>.");
    	    //}
            //if ( unsupported.indexOf(attEx) != -1 ) {
		    //    message.reply("tf did you just send me? I can't open this type of file.");
	        //}
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
            message.reply({content: "**Submit clips our website:** \nClick button below to vist the site", components: [row23]}); //Otherwise say this
            return;
        }

        const regex = /(how|where|want).+(submit|post|share|send|subit|give).+(clip|video)/i;
        const messa = message.content.toLowerCase();
        const str = messa;
        let m;
        if ((m = regex.exec(str)) !== null) {
            message.reply({content: "**Submit clips our website:** \nClick button below to vist the site", components: [row23]}); //Otherwise say this
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
