/* eslint-disable no-inline-comments */
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config");
const prefixl = config.prefix

//youtube api
const YouTube = require("discord-youtube-api"); 
const youtube = new YouTube(config.youtubeAPI);

//EnderEyeGames/RootAtKali: save username of the last user to submit something, so the bot can scold people for submitting two inadequate submissions.
var lastBadSumbissionBy = "NONE YET";


client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("your Clips", { type: "WATCHING"})
    //client.user.setPresence({ game: { name: 'Videos' , type: 'WATCHING' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefixl)) return;
    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefixl.length).toLowerCase();

    if(cmd === 'ping') {
        msg.reply('pong, ' + `${Date.now() - msg.createdTimestamp}` + ' ms');
    }
    if(cmd=== 'madeby') {
        msg.channel.send('This was made by RM20 with the help from RootAtKali');
    }
    if(cmd === 'requirements') {
        const embed = new Discord.MessageEmbed()
        .setTitle('Requirements')
        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
        .setColor(0xff0000)
        .setDescription('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 Kbps\n> Audio bitrate: At least 150 Kbps\n> Must be viewable from discord\n> Youtube video: must be under 2 min')
        .addField('requested by', msg.author.username)
        msg.channel.send(embed);
        console.log('&requirements');
    }
})


client.on('message', message => {
    if (message.channel.id === config.ChannelID) {
        if (message.content.includes('youtube.')) {
            console.log("youtube video recsived")
            console.log(YouTube.duration(message.content))
            try {
                var YTdur = YouTube.durationSeconds(message.content);
                if (YTdur>=150){
                    if (message.author.username == lastBadSubmissionBy){
                        message.channel.send('**Please do not re-submit inadequate clips.**');
                    }
                    else {
                        const embed = new Discord.MessageEmbed()
                        .setTitle('Video resolution too low!')
                        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                        .setColor(0xff0000)
                        .setDescription('Video longer than 2 min.\nSubmissions must be under 2 min.\nType &requirements for more info.')
                        .addField('Bad submission by', message.author.username)
                        message.channel.send(embed);
                    }
                    lastBadSubmissionBy === message.author.username;
                    message.delete();
                }
            }
            catch(e) {
                console.error
            }
        }
        const attachments = (message.attachments).array(); // Get list of attachments
        const attachment = attachments[0]; // Take the first attachment
        if (attachments.length !== 0) {
            const nameArray = attachment.name.split('.'); // Split the name 
            const attEx = nameArray[nameArray.length - 1].toLowerCase(); // Grab the last value of the array.
            if (attEx == "mp4" || attEx == "webm" || attEx == "mov") {
                // Note this doesn't check the file it check the format of the file.
                const Mwidth = attachment.width;
                const Mheight = attachment.height;
                if (Mwidth < 1280 || Mheight < 720) {
                    if (message.author.username == lastBadSubmissionBy){
                        message.channel.send('**Please do not re-submit inadequate clips.**');
                    }
                    else {
                        const embed = new Discord.MessageEmbed()
                        .setTitle('Video resolution too low!')
                        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                        .setColor(0xff0000)
                        .setDescription('Video resolution is less than 720p.\nSubmissions must be 1280x720 or greater.\nType &requirements for more info.')
                        .addField('Bad submission by', message.author.username)
                        message.channel.send(embed);
                    }
                    lastBadSubmissionBy = message.author.username;
                    message.delete();
                }  
                if ((Mwidth / Mheight) < 1.6 || (Mwidth/Mheight) > 2){
                    if (message.author.username == lastBadSubmissionBy){
                        message.channel.send('**Please do not re-submit inadequate clips.**');
                    }
                    else {
                	    const embed = new Discord.MessageEmbed()
                        .setTitle('Video aspect ratio is bad!')
                        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                        .setColor(0xff0000)
                        .setDescription('Video aspect ratio is invalid.\nOnly ratios from 16:10 to 2:1 are accepted.\nType &requirements for more info.\nPlease do not resubmit, scale, or letterbox this video.')
                        .addField('Bad submission by', message.author.username)
                        message.channel.send(embed);
                    }
                    lastBadSubmissionBy = message.author.username;
                    message.delete();
                }
                console.log("bot checked",message.id);
            }
            else if (attEx=="mkv") {
                const embed = new Discord.MessageEmbed()
                .setTitle('Video resolution too low!')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('Video format unsupported.\nSubmissions must viweable on discord.\nType &requirements for more info.')
                .addField('Bad submission by', message.author.username)
                message.delete();
                console.log("bot checked",message.id);
            }
        }
    }
    
});

// client.login(process.env.token);
client.login(config.BotToken);
