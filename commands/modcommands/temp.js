const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'temp',
    aliases: [``],
    description: '',
    usage: '``',
    example: '``',
    async execute(message, args, client) {
        // CODE GOES HERE 🡫 
        if (message.member.roles.cache.find(r => r.name === "914952404083036170") || message.member.roles.cache.find(r => r.name === adminid)) {
            const msg = message.channel.messages.fetch(args[0])
            //fetch all reactions from the message
            //const reactions = await msg.reactions.cache.map(r => r.emoji.name)
            //log all reactions
            console.log(msg)
        }
        else {
            message.reply(`You lack perms for this command`)
        }

    }
}