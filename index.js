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
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const wait = require('util').promisify(setTimeout);

const config = require("./config");
const prefixl = config.prefix
const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
//Discord.js v13+ is needed for this to work

//required
const cmds = require('./commands/cmd');

const faq = require('./commands/faq');
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
    client.user.setActivity(`your clips`, { type: "WATCHING"});
    //client.user.setPresence({ activity: [{ name: 'Testing discord.js v13' }], status: 'Online', type: "WATCHING" })
    //console.log(    client.api.applications(client.user.id).commands.get())
    client.api.applications(client.user.id).commands.post({data: {
        name: "Report Message",
        type: 3
    }})
    client.api.applications(client.user.id).commands.post({data: {
        name: "Ticket Ban",
        type: 2
    }})
    client.api.applications(client.user.id).commands.post({data: {
        name: "Streamer Role",
        type: 2
    }})
    const permissions = [
        {
            id: '696134129497931857',
            type: 'ROLE',
            permission: true,
        },
        {
            id: '884656687372464179',
            type: 'ROLE',
            permission: true,
        },
    ];
    //client.api.applications(client.user.id).commands.get()  //903237399193190460 903243965187391519
    //client.application.commands.delete('903237399193190460')
    //.then(console.log)
    //.catch(console.error);
    //client.application.commands.delete('903243965187391519')
    //.then(console.log)
    //.catch(console.error);

    //client.application.commands.cache.find(c=>c.name==="Ticket Ban").delete();
    //client.application.commands.cache.find(c=>c.name==="Streamer Role").delete();


    //const command = await client.application?.commands.create(data);
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
        console.log(message)
        //dm checker
        dmchecker.dmchecker(message,client);
        return;
    }

    try
    {
        var channelParent = message.channel.parent.id
        var channelparname = message.channel.parent.name
    }
    catch{
        var channelParent = null
        
    }
    try{
        var role = message.member.roles.cache
    }
    catch{
        var role = null
    }
    //grmc
    if(message.guild.id === "880560625166741544"||message.guild.id==="898628981958537266"){
        faq.faq(message,client);
        if (channelParent =='880560625556815873'||channelParent=='880560625556815879'||channelParent=='880560626043330632') {
            const messa = message.content.toLowerCase();
            antiw.antiworm(messa,message,client);
        }
    }
    //everything else
    if (message.guild.id === "629695220065239061"||message.guild.id==="898628981958537266") { 
        if(role != null){
            if (message.member.roles.cache.find(r=>r.id === "712512117999271966")){
                if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){
                }
                else{
                    if (channelParent !='858354610367627284'){
                        message.delete().catch(error => {console.log(error)});
                    }
                }
            }
        }
        if(message.author.id === client.user.id) return;
        if (message.channel.id==='629695352454250508') {
            const channel = client.channels.cache.find(channel => channel.id === "707304184524832879");
            channel.send("Reminder: Publish message in <#629695352454250508>");
            
        }
        
        if (channelparname =='────💬 chatting 💬────'||channelparname=='────Bot commands────'||channelparname=='────🛠Support🛠────'||channelparname=="────Voice Channels────") {
            const messa = message.content.toLowerCase();
            
            antiw.antiworm(messa,message,client);
            //antiw.antiunderage(messa,message,client);
            //End anti-worm code.
        
            if(messa.includes("@!144567396835917824")) { //227490301688676354  riz=144567396835917824
                if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){return}
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
            if(messa==="dead chat" || messa === "chat dead" || messa==="dead-chat"|| messa==="chat-dead"|| messa==="ded chat"){
                //message.reply("you're dead");
                if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){return}
            
                message.delete().catch(error => {console.log(error)})
            }
    
            //FAQbot but Submit clips
            submitclip.submitclip(messa,message,client);
            //FAQbot but Streamer role
            streamerrole.streamerrole(messa,message,client);
            if(messa.includes("i am")){
                const mess = messa.split(/i am(.+)/)[1]
                if(mess===undefined){return};
                //message.reply("Hi,"+ mess +" I am React Bot")
            }
            else if(messa.includes("i'm")){
                const mess = messa.split(/i'm(.+)/)[1]
                if(mess===undefined){return};
                //message.reply("Hi,"+ mess +" I'm React Bot")
            }
        }

        if (message.channel.name === config.ChannelID) {
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
                message.delete().catch(error => {console.log(error)});
                break;
                }
            }
            if(messa.includes("https://youtu.be/")||messa.includes("https://www.youtube.com/watch?v=")||messa.includes("https://m.youtube.com/watch?v=")){ 
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
                message.delete().catch(error => {console.log(error)});
            }
            let attachments = Array.from(message.attachments);
            let attachmentss = attachments[0]; 
            if (attachmentss) {
                const attachment = attachmentss[1]
                //console.log(attachment[1])
                attachmentD.attachmentchecker(attachment,message,client);
            }
        }    
        if(message.channel.id === "886864421140447232"){
            const messa = message.content.toLowerCase();
            if(messa.startsWith("thred")){
                
            }
            else{
                if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){

                }
                else{
                    message.delete().catch(error => {console.log(error)});
                }
            }
        }
    }
    let attachments = Array.from(message.attachments);
    let attachmentss = attachments[0]; 
    if (attachmentss) {
        const attachment = attachmentss[1]
        //console.log(attachment[1])
        attachmentD.attachmentexe(attachment,message,client);
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
    if(newMember.guild.id!="629695220065239061"){
        return;
    }
    if(newMember.guild.id==="629695220065239061"){
        rolechecker.rolecheck(oldMember,newMember,client);
    }
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
        //const command = interaction.guild.commands.fetch();
        //console.log(command)
    }
    if (interaction.commandName === 'requirements') {
        const embed = new Discord.MessageEmbed()
        .setTitle('Requirements')
        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
        .setColor(0xff0000)
        .setDescription('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 kbps (x264 medium)\n> Audio bitrate: At least 150 kbps (AAC-LC)\n> Must embed on discord\n> Must be under 2 minutes. No timestamps!\nDeliberately scaling or padding a video to fool me\ndoes **not** pass the requirements.')

        await interaction.reply({ embeds: [embed]});
    }
    if(interaction.commandName==="grmc"){
        let row23 = new MessageActionRow()
        .addComponents(new MessageButton()
            .setStyle('LINK')
            .setLabel('GRMC Discord')
            .setURL("https://discord.gg/mvpPdqTmJh"))
        .addComponents(new MessageButton()
            .setStyle('LINK')
            .setLabel('GRMC Website')
            .setURL("https://www.gamersreact.net"))
        const embed = new Discord.MessageEmbed()
        .setTitle(`GRMC`)
        .setColor(2374108)
        .setDescription(`If you need help with the minecraft  server ask on the Gamer React Minecraft discord or website`)
        .addField("IP:" , "`play.gamersreact.net`")
        .addField("Version:" , "Premium Java only, 1.16.5 with support from 1.8 to 1.17")
        await interaction.reply({ embeds: [embed], components: [row23] }).catch(console.error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
    let res = "an error happened."
    let rule1="**1. Be Kind/Respectful to others.** \n> Don't be rude to other Users. You can make jokes but there is a fine line between banter and being mean. Don't be offensive towards someone's race, sexuality and gender…ect. treat them like people. Any homophobic/racist/sexist behavior will not be tolerated in this server." 
    let rule2="**2. No Nonsense.** \n> Do not Spam, Swear, Flood channels with stuff such as long Copy pasted messages. Don't ping Riz if you require any sort of assistance feel free to open up a ticket in <#858354762855874560> or you may ping <@&696134129497931857> for any issue happening in the server!" 
    let rule3="**3. This is a PG-13 Server.** \n> Considering this is a PG-13 Server do not post porn, gore, NSFW, explicit content, child abuse, animal abuse, gambling of any sort or scams. Make sure to keep any Controversial topics to a minimum or not at all, you may use DM's for that." 
    let rule4="**4. Assistance from the Staff team** \n> If you have any Question or need support of any kind feel free to open up a ticket through <#858354762855874560>, make sure to read the rules before doing so. Any tickets created without a reason will most likely result in a <@&865548571327070268> . If you have been featured in a Gamers React video then create a `General Support` with Timestamp and Link to the video to acquire the <@&696133979748958309> role! The <@&696133979748958309> role also gives you access to special channels." 
    let rule5="**5. Submit clips to get a chance to be in the next Gamers React video!** \n>>> You may submit any clips you have in the <#878531760386871327> channel for a chance to get into the next Gamers React video! Here are a few basic rules for submitting clips: \n*-Do not resubmit a clip thinking you had submitted a clip a long time ago and it got lost OR that sending it twice will give you a better chance to get into a video, rather it will only hurt your chances of getting featured.\n-Make sure that your clips meet the basic requirements, you may view the requirements by doing /requirements.\n-Users are not allowed to view the channel history of the <#878531760386871327> channel due to circumstances, so keep in mind that your clip wasn't deleted it is still visible to the Mods. \n-All of the Clip submissions are gone through, so don't think you were left out or your clip got lost in other messages.*"
    let rule6="**6. A few basic rules to look out for** \n> Speak ONLY in English, use the correct channels for the correct chats, remember that me or the Staff have the final say you may justify yourself by opening a ticket through <#858354762855874560> if you think you were punishment wasn't fair."
    if (interaction.customId === 'Rules') {
        if(interaction.values[0]==="DM_rule") {
            let dontlog = "3ADB63D1"
            res = dontlog +"\n\n" + rule1 +"\n"+ rule2 +"\n"+ rule3 +"\n"+ rule4
            let res2 = dontlog +"\n\n" + rule5 +"\n\n"+ rule6
            interaction.user.send({ content: res, components: [] }).catch(error => {console.log(error)});
            interaction.user.send({ content: res2, components: [] }).catch(error => {console.log(error)});
            return
        }
        if(interaction.values[0]==="rule_1") {
            res=rule1
        }
        if(interaction.values[0]==="rule_2") {
            res=rule2
        }
        if(interaction.values[0]==="rule_3") {
            res=rule3
        }
        if(interaction.values[0]==="rule_4") {
            res=rule4
        }
        if(interaction.values[0]==="rule_5") {
            res=rule5
        }
        if(interaction.values[0]==="rule_6") {
            res=rule6
        }
        await interaction.deferUpdate();
        await interaction.editReply({ content: res, components: [] });
		await wait(4000);
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('Rules')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'DM all rules',
                        description: 'I will dm you all the rules',
                        value: 'DM_rule',
                    },
                    {
                        label: 'Rule 1',
                        description: 'Be Kind/Respectful to others.',
                        value: 'rule_1',
                    },
                    {
                        label: 'Rule 2',
                        description: 'No Nonsense',
                        value: 'rule_2',
                    },
                    {
                        label: 'Rule 3',
                        description: 'This is a PG-13 Server.',
                        value: 'rule_3',
                    },
                    {
                        label: 'Rule 4',
                        description: 'Assistance from the Staff team',
                        value: 'rule_4',
                    },
                    {
                        label: 'Rule 5',
                        description: 'Submit clips to get a chance to be in the next Gamers React video!',
                        value: 'rule_5',
                    },
                    {
                        label: 'Rule 6',
                        description: 'A few basic rules to look out for',
                        value: 'rule_6',
                    },
                ]),
        );
		await interaction.editReply({ content: 'To find out more information about a rule select the rule in the menu below!', components: [row] });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isContextMenu()) return;
    if(interaction.commandName==="Ticket Ban"){
        await interaction.reply("ticket banning")
        interaction.deleteReply();
        if (interaction.member.roles.cache.find(r=>r.name === modid)||interaction.member.roles.cache.find(r=>r.name === adminid)||interaction.member.roles.cache.find(r=>r.id === helper)){
            let member = interaction.member
            const hasRole = member.roles.cache.find(role => role.id === '865548571327070268');
            const channel = client.channels.cache.find(channel => channel.id === "844273354318938174")

            if(hasRole){
                member.roles.remove("865548571327070268").catch(error => {console.log(error)});
                const embed = new Discord.MessageEmbed()
                .setTitle('Ticket Ban role taken away by, ' + interaction.user.tag)
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('To: ' + member.tag)
                .setFooter("id: "+member.id)
                channel.send({ embeds: [embed]}).catch(error => {console.log(error)});
            }
            else{
                member.roles.add("865548571327070268").catch(error => {console.log(error)});
                //console.log(interaction)
                const embed = new Discord.MessageEmbed()
                .setTitle('Ticket Ban role given by, ' + interaction.user.tag)
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('To: ' + member.tag)
                .setFooter("id: "+member.id)
                channel.send({ embeds: [embed]}).catch(error => {console.log(error)});
            }
        }
        else{
            return
        }
    }
    if(interaction.commandName==="Streamer Role"){
        await interaction.reply("Streamer Role")
        interaction.deleteReply();
        if (interaction.member.roles.cache.find(r=>r.name === modid)||interaction.member.roles.cache.find(r=>r.name === adminid)||interaction.member.roles.cache.find(r=>r.id === helper)){
            let member = interaction.member
            const hasRole = member.roles.cache.find(role => role.id === '696133979748958309');
            const channel = client.channels.cache.find(channel => channel.id === "844273354318938174")
            if(hasRole){
                member.roles.remove("696133979748958309").catch(error => {console.log(error)});
                const embed = new Discord.MessageEmbed()
                .setTitle('streamer role taken away by, ' + interaction.user.tag)
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('To: ' + member.tag)
                .setFooter("id: "+member.id)
                channel.send({ embeds: [embed]}).catch(error => {console.log(error)});
            }
            else{
                member.roles.add("696133979748958309").catch(error => {console.log(error)});
                //console.log(interaction)
                const channel = client.channels.cache.find(channel => channel.id === "844273354318938174")
                const embed = new Discord.MessageEmbed()
                .setTitle('streamer role given by, ' + interaction.user.tag)
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('To: ' + member.tag)
                .setFooter("id: "+member.id)
                channel.send({ embeds: [embed]}).catch(error => {console.log(error)});
            }
        }
        else{
            return
        }
    }

    if(interaction.commandName==="Report Message"){
        await interaction.reply(`reporting`);
        interaction.deleteReply();
        let user = interaction.user
        //console.log(interaction)
        if(interaction.member.roles.cache.find(r=>r.id === "892831889264619530")){
            return
        }
        let message = interaction.options.getMessage('message');
        //console.log(message)
        if(message.author.bot){return}
        if(message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)){return}
        if(!message.content){return}
        let channel = client.channels.cache.find(channel => channel.id === "892816609712930836"); //892816609712930836
        if(interaction.guildId != "629695220065239061"){ //gr
            channel = client.channels.cache.find(channel => channel.name === "user-reports"); //test server
        }
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel("Message Link")
                .setStyle("LINK")
                .setURL(message.url)
            )
        const embed = new Discord.MessageEmbed()
        .setTitle('Message Report by, ' + user.tag)
        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
        .setColor(0xff0000)
        .setDescription(message.author.tag + " | " +message.author.id )
        .addField('Message', message.content)
        .setURL(message.url)
        .setFooter("reporter id: "+user.id)
        channel.send({ embeds: [embed] ,components: [row] }).catch(error => {console.log(error)});
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => { // Old message may be undefined
    if (!oldMessage.author) return;
    if(oldMessage.channel.id === "886864421140447232"){
        const messa = newMessage.content.toLowerCase();
        if(messa.startsWith("thred")){
            
        }
        else{
            //newMessage.delete().catch(error => {console.log(error)});
            if(newMessage.member.roles.cache.find(r=>r.name === modid)||newMessage.member.roles.cache.find(r=>r.name === adminid)){

            }
            else{
                newMessage.delete().catch(error => {console.log(error)});
            }
        }
    }

 })

// client.login(process.env.token);
client.login(config.BotToken);
