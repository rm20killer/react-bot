const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'gdelete',
    aliases: [`giveawaydelete`, `deletegiveaway`],
    description: '',
    usage: '``',
    example: '``',
    async execute(message, args, client) {
        // CODE GOES HERE 🡫 
        if (message.member.roles.cache.find(r => r.id === "914952404083036170") || message.member.roles.cache.find(r => r.name === adminid)) {
            if (!args[0]) {
                message.reply(`Please provide a message ID`)
                return
            }
            const messageId = args[0];
            client.giveawaysManager.delete(messageId).then(() => {
                message.channel.send('Success! Giveaway deleted!');
            })
            .catch((err) => {
                message.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
            });
        }
        else {
            message.reply(`You lack perms for this command`)
        }
    }
}