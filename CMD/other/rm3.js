const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    name: 'rm3',
    aliases: [ "rm3" ],
    description: 'rm3',
    usage: '`*rm3`',
    example: '`*rm3`',
    async execute(message, args) {
        message.channel.send("https://cdn.discordapp.com/attachments/629695220065239064/844968694550626334/5aatpw.gif");
        message.delete();
    }
}