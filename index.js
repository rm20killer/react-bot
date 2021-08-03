/* eslint-disable no-inline-comments */

const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
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

//start 
client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`with discord.js v13`, { type: "PLAYING"});
    //client.user.setPresence({ activity: [{ name: 'Testing discord.js v13' }], status: 'Online', type: "WATCHING" })
});

client.on('messageCreate', async message => {
    
    ////////////////////////////////////////////////
    //commands
    if (!message.content.startsWith(prefixl)) return;
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefixl.length).toLowerCase();
    if (message.member.roles.cache.find(r=>r.id === modid)||message.member.roles.cache.find(r=>r.id === adminid)){
        if (cmd ==="buttontest"){
            const button1 = new MessageButton()
            .setCustomId('test')
            .setLabel('TEST')
            .setStyle('PRIMARY')
            message.reply({
                components: button1,
                embeds: [{
                  color: "0x2f3136",
                  description: `somes stuff here`
                }]
            });
        }
    }
    cmds.commands(cmd,args,message,client);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'button') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
	}
});


// client.login(process.env.token);
client.login(config.BotToken);
