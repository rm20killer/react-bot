/* eslint-disable no-inline-comments */

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
    partials:[
        `CHANNEL`,
        `MESSAGE`
    ],
    autoReconnect: true,
});

const fetch = require("node-fetch");
const { MessageActionRow, MessageButton } = require('discord.js');


const config = require("./config");
const prefixl = config.prefix
const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser
const modid = config.ModID
const adminid = config.AdminID
//Discord.js v13+ is needed for this to work

//required
const cmds = require('./commands/cmd');

const slash = require('./commands/slash');
const dmchecker = require('./commands/dmchecker');
const antiw = require('./commands/malchecker');
const submitclip = require('./commands/submitclip');
const streamerrole = require('./commands/streamerrole');
const accountchecker = require('./commands/accountchecker');
const attachmentD = require('./commands/attachment');
const rolechecker = require('./commands/rolechecker');
const log = require('./commands/logs');
const youtubechecker = require('./commands/youtubeChecker');
const slashcoms = require('./commands/slashcommands');
const { youtube } = require('./commands/youtubeChecker');

const ticketmanger= require('./commands/ticket/ticketmanger');

//start 
client.on("ready", async () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`with discord.js v13`, { type: "PLAYING"});
    //client.user.setPresence({ activity: [{ name: 'Testing discord.js v13' }], status: 'Online', type: "WATCHING" })
    
    const data = {
        name: 'ping',
        description: 'Replies with Pong!',
    };

    //const command = await client.application?.commands.create(data);
    //console.log(command);
});

////////////////////////////////////////////////
// user join
client.on("guildMemberAdd", async member => {
    //console.log("guildMemberAdd works")
    //accountchecker.accountchecker(client,member);
    return;
});

client.on('messageCreate', async message => {
    //console.log(message)
    if(message.guild === null) {
    
        //dm checker
        dmchecker.dmchecker(message,client);
        return;
    }
    //everything else
    try
    {
        var channelParent = message.channel.parent.id
        var role = message.member.roles.cache
    }
    catch{
        //console.log("message not sent in catoragy");
        var channelParent = null
        var role = null
    }
    if(role != null){
        if (message.member.roles.cache.find(r=>r.id === "712512117999271966")){
            if (message.member.roles.cache.find(r=>r.id === modid)||message.member.roles.cache.find(r=>r.id === adminid)){

            }
            else{
                if (channelParent !='858354610367627284'){
                    message.delete();
                }
            }
        }
    }
    if (message.guild.id === "629695220065239061") { 
        if (message.channel.id==='629695352454250508') {
            const channel = client.channels.cache.find(channel => channel.id === "707304184524832879");
            channel.send("Reminder: Publish message in <#629695352454250508>");
            
        }
        
        if (channelParent =='629695220065239063'||channelParent=='716754944472121516'||channelParent=='629695220065239065'||channelParent=="858354610367627284") {
            const messa = message.content.toLowerCase();
            
            antiw.antiworm(messa,message,client);
            //antiw.antiunderage(messa,message,client);
            //End anti-worm code.
        
            if(messa.includes("@!144567396835917824")) { //227490301688676354  riz=144567396835917824
                const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
                const embed = new Discord.MessageEmbed()
                .setTitle('someone pinged the big man')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription(message.author.tag +' pinged riz')
                .setFooter("user: " + message.author.tag +" | user id: "+ message.author.id)
        
                channel.send({ embeds: [embed] });
                message.reply('dont ping riz, If you need help feel free to ask <@&696134129497931857>');
                message.channel.send("https://media.giphy.com/media/QTi0jJ17OTHwEqkEIA/giphy.gif");
                console.log("pinged");
                //message.delete();
            }
            if(messa.includes("dead chat")   || messa.includes("chat dead")   || messa.includes("dead-chat")|| messa.includes("chat-dead")|| messa.includes("ded chat")){
                message.reply("you're dead");
            }
    
            //FAQbot but Submit clips
            submitclip.submitclip(messa,message,client);
    
            //FAQbot but Streamer role
            streamerrole.streamerrole(messa,message,client);
        }
    }

    if (message.channel.id === config.ChannelID) {
        //checks for links
        let links =["www.dropbox.com/","https://drive.google.com/","www.mediafire.com/file","www.awesomescreenshot.com/","mega.nz/file/","http://somup.com/","https://screencast-o-matic.com/","https://fb.watch/","medal.tv"]
    
        const messa = message.content.toLowerCase();
        for (var i = 0; i < links.length; i++) {
            if (messa.includes(links[i])) {
                const embed = new Discord.MessageEmbed()
                .setTitle('Video must be playable on discord!')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('Submissions must be viewable on discord.\nType /requirements for more info.\nuse /compress for easy compress or youtube to upload big file')
                .addField('Bad submission by', message.author.username)
                message.channel.send({ embeds: [embed] });
            message.delete();
            break;
            }
        }
        if(messa.includes("https://youtu.be/")||messa.includes("https://www.youtube.com/watch?v=")){
            youtubechecker.youtube(message,client)
        }
        if(messa.includes("https://youtube.com/shorts/")){
            const embed = new Discord.MessageEmbed()
                .setTitle('Video aspect ratio is bad!')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('Video is set as short.\nThe ratio of a short does not meet requirements\n Upload the video as a normal video and not a short.\nType /requirements for more info.')
                .addField('Bad submission by', message.author.username)
            message.channel.send({ embeds: [embed] });
            message.delete();
        }
        const attachments = Array.from(message.attachments);
        const attachmentss = attachments[0]; 
        if (attachmentss) {
            const attachment = attachmentss[1]
            //console.log(attachment[1])
            attachmentD.attachmentchecker(attachment,message,client);
        }
    }
    const attachments = Array.from(message.attachments);
    const attachmentss = attachments[0]; 
    if (attachmentss) {
        const attachment = attachmentss[1]
        //console.log(attachment[1])
        attachmentD.attachmentexe(attachment,message,client);
    }


    if(message.channel.id === "876177694944026674"){
        const messa = message.content.toLowerCase();
        if(messa.includes("uwu")){
            
        }
        else{
            message.delete();
        }
    }
    ////////////////////////////////////////////////
    //commands
    if (!message.content.startsWith(prefixl)) return;
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefixl.length).toLowerCase();
    cmds.commands(cmd,args,message,client);
});

////////////////////////////////////////////////
// roles
client.on('guildMemberUpdate', async function(oldMember, newMember){
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

////////////////////////////////////////////////
// buttons
client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
    //return
	//console.log(interaction.member);
    const id = interaction.customId;
    //console.log(id);
    if(id==="General"||id==="BanAppeal"||id==="Player"){
        if (interaction.member.roles.cache.find(r=>r.id === "865548571327070268")){
            console.log("ticket banned " + interaction.user.id)
            await interaction.reply(`you are ticket-banned`);
            interaction.deleteReply();
            return
        }
        ticketmanger.ticketmanger(interaction,client)
    }
});


////////////////////////////////////////////////
// slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'compress') {
        await interaction.reply('To compress size so you send on discord you can use: https://8mb.video/ \n **You must** enable the `Extra quality (slower)` option.\nYour video cannot be longer than 40 seconds to meet requirements.\nUse the trim options to accomplish this.');
    }
    if (interaction.commandName === 'madeby') {
        await interaction.reply('This was made by RM20 with the help from RootAtKali, you can sponsor this bot and source code can be found at https://github.com/rm20killer/react-bot');
    }
    if (interaction.commandName === 'youtubetrimmer') {
        await interaction.reply('If it on your channel you can download the video and trim it a editing software. \nIf the video is not from your channel you can use the clip button on youtube if that video does not have the clip button you can use youtube-dl`');
    }
    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
    if (interaction.commandName === 'requirements') {
        const embed = new Discord.MessageEmbed()
        .setTitle('Requirements')
        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
        .setColor(0xff0000)
        .setDescription('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 kbps (x264 medium)\n> Audio bitrate: At least 150 kbps (AAC-LC)\n> Must embed on discord\n> Must be under 2 minutes. No timestamps!\nDeliberately scaling or padding a video to fool me\ndoes **not** pass the requirements.')

        await interaction.reply({ embeds: [embed]});
    }
});


// client.login(process.env.token);
client.login(config.BotToken);
