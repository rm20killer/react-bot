/* eslint-disable no-inline-comments */
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config");
const prefixl = config.prefix

//youtube api
const YouTube = require("discord-youtube-api"); 
const youtube = new YouTube(config.youtubeAPI);

async function testAll() {
    const video1 = await youtube.getVideo("https://www.youtube.com/watch?v=5NPBIwQyPWE");
    const video2 = await youtube.getVideoByID("5NPBIwQyPWE");
    const video3 = await youtube.searchVideos("big poppa biggie smalls");
    const videoArray1 = await youtube.getPlaylist("https://www.youtube.com/playlist?list=PLxyf3paml4dNMlJURcEOND0StDN1Q4yWz");
    const videoArray2 = await youtube.getPlaylistByID("PLxyf3paml4dNMlJURcEOND0StDN1Q4yWz");
 
    console.log(video1, video2, video3, videoArray1, videoArray2);
}


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
        msg.reply('pong');
    }
    if(cmd=== 'madeby') {
        msg.channel.send('This was made by RM20 with the help from RootAtKali');
    }
    if(cmd === 'requirements') {
    	msg.channel.send('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 Kbps\n> Audio bitrate: At least 150 Kbps');
        console.log('&requirements');
    }
})


client.on('message', message => {
    if (message.channel.id === config.ChannelID) {
        if (message.content=== "www.youtube.com") {
            console.log("youtube video recsived")

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
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Video resolution too low!')
                    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                    .setColor(0xff0000)
                    .setDescription('Video resolution is less than 720p.\nSubmissions must be 1280x720 or greater.\nType &requirements for more info.')
                    .addField('Bad submission by', message.author.username)
                    message.channel.send(embed);
                    message.delete();
                } else if ((Mwidth / Mheight) < 1.6 || (Mwidth/Mheight) > 2){
                	const embed = new Discord.MessageEmbed()
                    .setTitle('Video aspect ratio is bad!')
                    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                    .setColor(0xff0000)
                    .setDescription('Video aspect ratio is invalid.\nOnly ratios from 16:10 to 2:1 are accepted.\nType &requirements for more info.')
                    .addField('Bad submission by', message.author.username)
                    message.channel.send(embed);
                    message.delete();
                }
                console.log("bot checked",message.id);

            }
        }
    }
    
});

// client.login(process.env.token);
client.login(config.BotToken);