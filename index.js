/* eslint-disable no-inline-comments */

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");

const config = require("./config");
const prefixl = config.prefix

//Discord.js v12+ is needed for this to work

//required
const slash = require('./commands/slash');
const dmchecker = require('./commands/dmchecker');
const antiw = require('./commands/malchecker');
const submitclip = require('./commands/submitclip');
const streamerrole = require('./commands/streamerrole');
//const kill = require('./commands/kill');
const attachmentD = require('./commands/attachment');
const rolechecker = require('./commands/rolechecker');
const log = require('./commands/logs');
const cmds = require('./commands/cmd');
const slashcoms = require('./commands/slashcommands');
//youtube api

//youtube stuff not working yet
const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser
const modid = config.ModID
const adminid = config.AdminID
//EnderEyeGames/RootAtKali: save username of the last user to submit something, so the bot can scold people for submitting two inadequate submissions.
//RM: This is not fully working and causing an error when trying to call the var. I think I know a work around which should be added when I add slash commands
var lastBadSumbissionBy = "NONE YET";

//start 
client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("your Clips", { type: "WATCHING"})
    //client.user.setPresence({ game: { name: 'Videos' , type: 'WATCHING' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);

    const Guilds = client.guilds.cache.map(guild => guild.id);
    const nGuilds = client.guilds.cache.map(guild => guild.name);
    console.log(nGuilds +" - "+Guilds);
    //-
    
    console.log(client.api.applications(client.user.id).commands.get())
    console.log(client.api.applications(client.user.id).guilds(`629695220065239061`).commands.get())
    
    //this is for slash commands to work
    //slash.slashfun(client);


    //
});
//all below are the same just removed the !(command)

client.on('message', message => {
    if(message.guild === null) {
        //dm checker
        dmchecker.dmchecker(message,client);
        return;
    }
    //everything else
    try
    {
        var channelParent = message.channel.parent.id
    }
    catch{
        console.log("message not sent in catoragy");
    }
    if (message.guild.id === "629695220065239061") { 
        if(message.channel.id==="710123089094246482"){ 
        log.log(message,client)
        }
        if (message.channel.id==='629695352454250508') {
            const channel = client.channels.cache.find(channel => channel.id === "707304184524832879");
            channel.send("Reminder: Publish message in <#629695352454250508>");
            
        }
        
        if (channelParent =='629695220065239063'||channelParent=='716754944472121516'||channelParent=='629695220065239065') {
            const messa = message.content.toLowerCase();
            
            antiw.antiworm(messa,message,client);
            //End anti-worm code.
        
            if(messa.includes("@!144567396835917824")) { //227490301688676354  riz=144567396835917824
                message.reply('dont ping riz, If you need help feel free to ask <@&696134129497931857>');
                message.channel.send("https://media.giphy.com/media/QTi0jJ17OTHwEqkEIA/giphy.gif");
                console.log("pinged");
                //message.delete();
            }
    
            //FAQbot but Submit clips
            submitclip.submitclip(messa,message,client);
    
            //FAQbot but Streamer role
            streamerrole.streamerrole(messa,message,client);
        }
    }


    if (!message.content.startsWith(prefixl)) return;
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefixl.length).toLowerCase();

    if (message.member.roles.cache.find(r=>r.id === adminid)){
        if(cmd==`kill`){
            //kill command ONLY TO BE USED BY HOST (RM)
            let filter = m => m.author.id === message.author.id
            message.channel.send(`Are you sure you want to kill? \`YES\` / \`NO\``).then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 5000,
                errors: ['time']
            })
            .then(message => {
            message = message.first()
            if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                message.channel.send(`shutting down`);
                console.log("kill command")
                process.exit();
                setTimeout(() => { client.destroy(); }, 500);
                } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
                    message.channel.send(`Terminated`)
                } else {
                    message.channel.send(`Terminated: Invalid Response`)
                }
            })
            .catch(collected => {
                message.channel.send('Timeout');
                });
            })
        }
    }
    
    cmds.commands(cmd,args,message,client);

})


client.on('message', message => {
    if (message.channel.id === config.ChannelID) {
        //checks for links
        let links =["www.dropbox.com/","https://drive.google.com/","www.mediafire.com/file","www.awesomescreenshot.com/","mega.nz/file/","http://somup.com/","https://screencast-o-matic.com/","https://fb.watch/"]
	
        const messa = message.content.toLowerCase();
        for (var i = 0; i < links.length; i++) {
            if (messa.includes(links[i])) {
                const embed = new Discord.MessageEmbed()
                .setTitle('Video must be playable on discord!')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('Submissions must be viewable on discord.\nType /requirements for more info.\nuse /compress for easy compress or youtube to upload big file')
                .addField('Bad submission by', message.author.username)
                message.channel.send(embed);
            message.delete();
            break;
            }
        }
	
        //checks attachments
        const attachments = (message.attachments).array(); // Get list of attachments
        const attachment = attachments[0]; // Take the first attachment
        if (attachments.length !== 0) {
            attachmentD.attachmentchecker(attachment,message,client);
        }
    }
});
//youtube bash

//boost checker
client.on('guildMemberUpdate', function(oldMember, newMember){
    rolechecker.rolecheck(oldMember,newMember,client);
`
if (!shadRole && shasRole) {
    const boostedUsers = newMember.guild.members.cache.array().filter(member => member.roles.cache.find(role => role.name === 'Streamers'));
    console.log(boostedUsers.length); // how many members are boosted
    for (var i = 0; i < boostedUsers.length; i++) {
      newMember.guild.channels.cache.get("841018811657355354").send("<@"+boostedUsers[i].id+ "> has got into a gamer react video");
    }
  }
`
});



// client.login(process.env.token);
client.login(config.BotToken);
client.ws.on('INTERACTION_CREATE', async interaction => {
    //slashcom(interaction,client);
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;
    if (command === 'madeby'){ 
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "This was made by RM20 with the help from RootAtKali, sponser and source code can be found at https://github.com/rm20killer/react-bot"
                }
            }
        })
    }
    if (command === 'compress'){ 
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "To compress size so you send on discord you can use: https://8mb.video/ \n **You must** enable the `Extra quality (slower)` option.\nYour video cannot be longer than 40 seconds to meet requirements.\nUse the trim options to accomplish this."
                }
            }
        })
    }
    if (command === 'requirements'){
        const embed = new Discord.MessageEmbed()
        .setTitle('Requirements')
        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
        .setColor(0xff0000)
        .setDescription('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 kbps (x264 medium)\n> Audio bitrate: At least 150 kbps (AAC-LC)\n> Must embed on discord\n> Must be under 2 minutes. No timestamps!\nDeliberately scaling or padding a video to fool me\ndoes **not** pass the requirements.')

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: await createAPImessage(interaction, embed)
            }
        })
    }

});

module.exports = {
    killclient: function(client){
        process.exitCode = 1
        setTimeout(() => { client.destroy(); }, 500);
        process.exit(1)
    }
}

async function createAPImessage(interaction,content){
    const apimessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id),content) 
        .resolveData()
        .resolveFiles();

    return  {...apimessage.data, files: apimessage.files};
}
