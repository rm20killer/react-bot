/* eslint-disable no-inline-comments */

const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//const disbut = require('discord-buttons')(client);
const fetch = require("node-fetch");

const config = require("./config");
const prefixl = config.prefix

//Discord.js v13+ is needed for this to work

//required


//start 
client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`with discord.js v13`, { type: "PLAYING"});
    //client.user.setPresence({ activity: [{ name: 'Testing discord.js v13' }], status: 'Online', type: "WATCHING" })
});
client.on('interactionCreate', interaction => {
	console.log(interaction);
});

client.on('messageCreate', async message => {
    if (!client.application?.owner) await client.application?.fetch();

    if (!message.content.startsWith(prefixl)) return;
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefixl.length).toLowerCase();

    if(cmd==="ping"){
        message.reply("i have ponged")
    }
});

// client.login(process.env.token);
client.login(config.BotToken);
