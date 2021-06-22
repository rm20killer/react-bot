
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports ={
    antiworm: function(messa,message,client){
        // Some sort of worm has been spread which uses messages like this to spread.
	    const malregex = /(creator|publisher).+(enter|participate).+(beta|closed beta).+(bonus|reward).+(download|install).+(link|file)/i
	    const strx = messa;
        let mal;
        if ((mal = malregex.exec(strx)) !== null || strx.indexOf(".ru/tradeoffer/") !== -1) {
            // The result can be accessed through the `mal`-variable.
            // steancommunity.ru is a PHISHING SITE, note that it is stean, not steam, and yes the link is sent as http:// for some reason and not https://
            message.reply("Run a Windows Defender scan and change your password immediately.");
		    message.author.send("We noticed you've been compromised by self-spreading malware (a worm) which takes over your account to send download links to this worm to others.\nAs a precaution, the bot has kicked you from the Gamers React server.\nYou must run a Windows Defender full scan and change your password.\nTo join back, use this invite link: https://discord.gg/SnBhUmqSf8");
		    //message.author.kick();
		    //Do not enable kicking until it's been tested and is working
            //will keep off unless many people are sending it
            const channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
            let time = message.createdTimestamp
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(time * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            console.log(formattedTime);

            const embed = new Discord.MessageEmbed()
            .setTitle('A user may be compromised')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0xFF0000)
            .setDescription(message.content)
            .addField('person id', message.author.id)
            .addField("person name ", message.author.tag)
            .setFooter("today at "+formattedTime)

            channel.send(embed);
		    message.delete();
        }
    }
}
