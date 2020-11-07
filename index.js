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
        msg.channel.send('this was made by RM20');
    }
});

client.on('message', message => {
    if (message.channel.id === '696131644871933972') {
        const attachments = (message.attachments).array(); // Get list of attachments
        const attachment = attachments[0]; // Take the first attachment
        if (attachments.length !== 0) {
            const nameArray = attachment.name.split('.'); //Split the name 
            const attEx = nameArray[nameArray.length - 1] //Grap the last value of the array.
            if (attEx == "mp4" || attEx == "webm" ||attEx == "MOV") {
                // Note this doesn't check the file it check the format of the file.
                const Mwidth = attachment.width;
                const Mheight = attachment.height;
                if (Mwidth < 1280 || Mheight <720) {
                    const embed = new Discord.MessageEmbed()
                    .setTitle('video resoultion too low')
                    .setAuthor('Gamer React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                    .setColor(0xff0000)
                    .setDescription('resoultion is less than 720p, only use resoultion at 1280 x 720 or higher')
                    .addField('message to', message.author.username)
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
