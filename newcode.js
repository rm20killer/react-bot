/* eslint-disable no-inline-comments */
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config");
const prefixl = config.prefix

//Discord.js v12+ is needed for this to work

//youtube api

//youtube stuff not working yet
//const YouTube = require("discord-youtube-api"); 
//const youtube = new YouTube(config.youtubeAPI);

//EnderEyeGames/RootAtKali: save username of the last user to submit something, so the bot can scold people for submitting two inadequate submissions.
//RM: This is not fully working and causing an error when trying to call the var.
var lastBadSumbissionBy = "NONE YET";


client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("your Clips", { type: "WATCHING"})
    //client.user.setPresence({ game: { name: 'Videos' , type: 'WATCHING' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);
    //-
    //this is for slash commands to work
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "madeby",
            description: "find out who made me",
        } 
    });
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "requirements",
            description: "get clips requirements"
        } 
    });



    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if (command === 'madeby'){ 
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "This was made by RM20 with the help from RootAtKali, source code can be found at https://github.com/rm20killer/react-bot"
                    }
                }
            })
        }
        if (command === 'requirements'){
            const embed = new Discord.MessageEmbed()
            .setTitle('Requirements')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0xff0000)
            .setDescription('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 Kbps\n> Audio bitrate: At least 150 Kbps\n> Must be viewable from discord\n> Youtube video: must be under 2 min')
            .addField('THIS IS A TEST VERSION')

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPImessage(interaction, embed)
                }
            })
        }
    });
    //-
});

//all below are the same just removed the !(command)
client.on('message', msg => {
    if (!msg.content.startsWith(prefixl)) return;
    const args = msg.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefixl.length).toLowerCase();

    if(cmd === 'ping') {
        msg.reply('pong, ' + `${Date.now() - msg.createdTimestamp}` + ' ms');
    }
})


client.on('message', message => {
    if (message.channel.id === config.ChannelID) {
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
                    //lastBadSubmissionBy = message.author.username;
                    message.delete();
                }  
                else if ((Mwidth / Mheight) < 1.6 || (Mwidth/Mheight) > 2){
                	    const embed = new Discord.MessageEmbed()
                        .setTitle('Video aspect ratio is bad!')
                        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                        .setColor(0xff0000)
                        .setDescription('Video aspect ratio is invalid.\nOnly ratios from 16:10 to 2:1 are accepted.\nType &requirements for more info.\nPlease do not resubmit, scale, or letterbox this video.')
                        .addField('Bad submission by', message.author.username)
                        message.channel.send(embed);
                    
                    //lastBadSubmissionBy = message.author.username;
                    message.delete();
                }
                else if (nameArray[0].length > 10 && nameArray[0].slice(-10) == "_Trim_Trim"){
					message.channel.send("Imagine using an online video trimmer twice :Hhhhhheee:");
					// You can omit this if you want.
					// I just find it rather funny when someone uses that instead of a video editor.
					// FFmpeg is also a better choice, and probably what the online trimmer uses, but internet is slower than an SSD.
					// ffmpeg -ss 00:13:37 -i too_long_video.mp4 -t 15 -c copy trimmed_video_15seconds.mp4
				}
                console.log("bot checked",message.id);
            }
            else if (attEx == "mkv" || attEx == "avi" || attEx == "mpg" || attEx == "m4v") {
				var convertTip = "OBS Studio can convert MKV to MP4.\nGo to File -> Remux Recordings.";
				if (attEx != "mkv"){
					convertTip = "Use FFmpeg or Handbrake to convert your video\nto MP4, WebM, or MOV format. *Avoid online tools.*";
				}
				const embed = new Discord.MessageEmbed()
				.setTitle('Video format unsupported!')
				.setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
				.setColor(0xff0000)
				.setDescription('Video format unsupported.\nFile submissions must preview in Discord.\n' + convertTip)
				.addField('Bad submission by', message.author.username)
				message.channel.send(embed);
				message.delete();
				console.log("bot checked",message.id);
			}
        }
    }
    
});
//this is for slash commands
async function createAPImessage(interaction,content){
    const apimessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id),content) 
        .resolveData()
        .resolveFiles();

    return  {...apimessage.data, files: apimessage.files};
}

// client.login(process.env.token);
client.login(config.BotToken);
