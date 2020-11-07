/* eslint-disable no-inline-comments */
const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("your Clips", { type: "WATCHING"})
    //client.user.setPresence({ game: { name: 'Videos' , type: 'WATCHING' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);
 });
client.on('message', msg => {
    if(msg.content === '&ping') {
        msg.reply('pong');
        console.log('&ping');
    }
    if(msg.content === '!madeby') {
        console.log('!madeby');
        msg.channel.send('This was made by RM20 with the help from RootAtKali');
    }
    if(msg.content === '&requirements') {
    	msg.channel.send('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 Kbps\n> Audio bitrate: At least 150 Kbps');
    	console.log('&requirements');
    }
});

client.on('message', message => {
    if (message.channel.id === '696131644871933972') {
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
 client.login(process.env.token);
//client.login("TOkEN HERE");
