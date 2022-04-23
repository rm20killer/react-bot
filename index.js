/* eslint-disable no-inline-comments */

const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const fs = require('fs');
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
    partials: [
        `CHANNEL`,
        `MESSAGE`,
        `REACTION`
    ],
    autoReconnect: true,
});

const fetch = require("node-fetch");
const mongose= require("mongoose");
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const { GiveawaysManager } = require('discord-giveaways');
// Starts updating currents giveaways
client.giveawaysManager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉',
        lastChance: {
            enabled: true,
            content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
            threshold: 5000,
            embedColor: '#FF0000'
        }
    }
});


const users = {};

const config = require("./config");
const prefixl = config.prefix
const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
const Hprefixl = config.Hprefixl
//Discord.js v13+ is needed for this to work

//required
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands')
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}


const dmchecker = require('./AutoMod/dmchecker');
const antiw = require('./AutoMod/malchecker');
const submitclip = require('./AutoMod/submitclip');
const streamerrole = require('./AutoMod/streamerrole');
const accountchecker = require('./AutoMod/accountchecker');
const attachmentD = require('./AutoMod/attachment');
const youtubechecker = require('./AutoMod/youtubeChecker');
const { youtube } = require('./AutoMod/youtubeChecker');
const table = require('./AutoMod/tablechecker')
const userjoined  = require('./AutoMod/UserJoined');
const mutechecker = require("./AutoMod/mutecheck")
const pingriz = require('./AutoMod/pingriz');
const perspective = require('./AutoMod/perspective.js');
const ReactionChecker = require('./AutoMod/ReactionChecker');
const CheckName = require('./AutoMod/CheckName');

//const detector = require('./commands/others/detector')
const ticketmanger = require('./interaction/ticketmanger');
const slashcommand = require('./interaction/slashcommand');
const selectmenu = require('./interaction/selectmenu');
const contextmenu = require('./interaction/contextmenu');
const button = require('./interaction/button');
const rolechecker = require('./interaction/rolechecker');
const bancheck = require('./AutoMod/bancheck');
//database 

/*
mongose.connect(config.Mongoose_SRV,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to the database")
}).catch((error)=>{console.log(error)});
*/

//bot
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`your clips`, { type: "WATCHING" });
    //client.user.setPresence({ activity: [{ name: 'Testing discord.js v13' }], status: 'Online', type: "WATCHING" })
    //console.log(    client.api.applications(client.user.id).commands.get())
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "Report Message",
            type: 3
        }
    })
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "Ticket Ban",
            type: 2
        }
    })
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "Streamer Role",
            type: 2
        }
    })
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
    mutechecker.mutechecker(client)
    bancheck.backcheck(client)
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
    userjoined.userjoined(member,client)
    CheckName.CheckName(member,client)
    return;
});

client.on('messageCreate', async message => {
    //console.log(message)
    if (message.guild === null) {
        //console.log(message)
        //dm checker
        dmchecker.dmchecker(message, client);
        return;
    }

    try {
        var channelParent = message.channel.parent.id
        var channelparname = message.channel.parent.name
    }
    catch {
        var channelParent = null
    }
    try {
        var role = message.member.roles.cache
    }
    catch {
        var role = null
    }
    if (message.guild.id === "629695220065239061" || message.guild.id === "898628981958537266") {
        if (role != null) {
            if (message.member.roles.cache.find(r => r.id === "712512117999271966")) {
                if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
                }
                else {
                    if (channelParent != '858354610367627284') {
                        message.delete().catch(error => { console.log(error) });
                    }
                }
            }
        }
        if (message.author.id === client.user.id) return;
        if (message.channel.id === '629695352454250508') {
            const channel = client.channels.cache.find(channel => channel.id === "707304184524832879");
            channel.send("Reminder: Publish message in <#629695352454250508>");

        }

        if (channelparname == '────💬 chatting 💬────' || channelparname == '────Bot commands────' || channelparname == '────🛠Support🛠────' || channelparname == "────Voice Channels────") {
            const messa = message.content.toLowerCase();
            //anti maleware
            antiw.antiworm(messa, message, client);
            //ping checker
            pingriz.pingriz(messa, message, client);

            //FAQbot but Submit clips
            submitclip.submitclip(messa, message, client);
            //FAQbot but Streamer role
            streamerrole.streamerrole(messa, message, client);
            if (messa.includes("i am")) {
                const mess = messa.split(/i am(.+)/)[1]
                if (mess === undefined) { return };
                //message.reply("Hi,"+ mess +" I am React Bot")
            }
            else if (messa.includes("i'm")) {
                const mess = messa.split(/i'm(.+)/)[1]
                if (mess === undefined) { return };
                //message.reply("Hi,"+ mess +" I'm React Bot")
            }
        }
        if (message.channel.id === "886864421140447232") {
            const messa = message.content.toLowerCase();
            if (messa.startsWith("thred")) {

            }
            else {
                if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {

                }
                else {
                    message.delete().catch(error => { console.log(error) });
                }
            }
        }
    }
    let attachments = Array.from(message.attachments);
    let attachmentss = attachments[0];
    if (attachmentss) {
        const attachment = attachmentss[1]
        //console.log(attachment[1])
        attachmentD.attachmentexe(attachment, message, client);
        if (channelParent === "906533207812476988") {
            attachmentD.imagechecker(attachment, message, client);
        }
    }
    if (channelparname != '────🛠Support🛠────') {
        if (channelparname != '──────🚨 mods 🚨──────') {
            var regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
            if (regexp.test(message.content)) {
                // at least 2 words consisting of letters
                perspective.analyzeText(message.content, message, client).catch(error => { console.log(error) });
            }
        }
    }
    //if(message.author.id==="646180114756796442"){
    //    message.reply("The Person Above Smells")
    //}

    //detector.detector(client,message,users)
    ////////////////////////////////////////////////
    //commands
    table.table(client, message);
    if (message.content.startsWith(prefixl)) {

        const args = message.content.slice(prefixl.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;
        try {
            console.log(`${message.content} sent by ${message.author.tag}`)
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply(error)
        }
    }
    //if (!message.content.startsWith(prefixl)) return;
    //const args = message.content.trim().split(/ +/g);
    //const cmd = args[0].slice(prefixl.length).toLowerCase();
    //cmds.commands(cmd,args,message,client);
});

////////////////////////////////////////////////
// roles
client.on('guildMemberUpdate', async function (oldMember, newMember) {
    if (newMember.guild.id != "629695220065239061") {
        return;
    }
    if (newMember.guild.id === "629695220065239061") {
        rolechecker.rolecheck(oldMember, newMember, client);
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

//client on reaction
client.on('messageReactionAdd', async function (reaction, user) {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
    ReactionChecker.ReactionChecker(reaction, user, client);
});

////////////////////////////////////////////////
// buttons
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    button.button(interaction, client).catch(error => { console.log(error) });
});


////////////////////////////////////////////////
// slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    slashcommand.slashcommand(interaction, client).catch(error => { console.log(error) });
});
//select menu
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
    selectmenu.selectmenu(interaction, client).catch(error => { console.log(error) });
});
//context menu
client.on('interactionCreate', async interaction => {
    if (!interaction.isContextMenu()) return;
    contextmenu.contextmenu(interaction, client).catch(error => { console.log(error) });
});

client.on('messageUpdate', (oldMessage, newMessage) => { // Old message may be undefined
    if (!oldMessage.author) return;
    if (oldMessage.channel.id === "886864421140447232") {
        const messa = newMessage.content.toLowerCase();
        if (messa.startsWith("thred")) {

        }
        else {
            //newMessage.delete().catch(error => {console.log(error)});
            if (newMessage.member.roles.cache.find(r => r.name === modid) || newMessage.member.roles.cache.find(r => r.name === adminid)) {

            }
            else {
                newMessage.delete().catch(error => { console.log(error) });
            }
        }
    }

})

// client.login(process.env.token);
client.login(config.BotToken);
client.giveawaysManager.on('giveawayDeleted', (giveaway) => {
    const channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
    channel.send('Giveaway with message Id ' + giveaway.messageId + ' was deleted.')
});

client.on('voiceStateUpdate', (oldState, newState) => {
    //return
    console.log("user joined vc")
    const txtChannel = client.channels.cache.get('966101775226634340'); //manually input your own channel
    const newChannelID = newState.channelId;
    const oldChannelID = oldState.channelId;
    //console.log(oldState)
    if (oldChannelID === "629695220065239066") { //manually put the voice channel ID
        txtChannel.send(`role removed - ${newState.id}`);
        let role = newState.guild.roles.cache.get("966097737823178762"); //added this
        newState.member.roles.remove(role).catch(console.error);
    } else if (newChannelID === "629695220065239066") {
        txtChannel.send(`role given - ${newState.id}`);
        let role = oldState.guild.roles.cache.get("966097737823178762"); //change this somewhat
        oldState.member.roles.add(role).catch(console.error); //adding a catch method is always good practice
    }
})
