/*
                       _           _                     _       
              /\      | |         (_)                   | |      
             /  \   __| |_ __ ___  _ _ __     ___  _ __ | |_   _ 
            / /\ \ / _` | '_ ` _ \| | '_ \   / _ \| '_ \| | | | |
           / ____ \ (_| | | | | | | | | | | | (_) | | | | | |_| |
          /_/    \_\__,_|_| |_| |_|_|_| |_|  \___/|_| |_|_|\__, |
                                                            __/ |
                                                           |___/  
*/
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
module.exports = {
    name: 'event',
    aliases: [""],
    description: 'event',
    usage: '`*event`',
    example: '`*event`',
    async execute(message, args) {
        //admin only
        if (message.member.roles.cache.find(r => r.name === adminid)) {
            // CODE GOES HERE 🡫 
            if (args[0] === null) {
                return
            }

            if (args[0] === "1") {
                const creeperEmote = client.emojis.cache.get(`859806815332204555`);
                const embed = new Discord.MessageEmbed()
                    .setTitle('Events Notifications')
                    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                    .setColor(0xFF0000)
                    .setDescription(`Want to get a notifcation when we do an event,\n\n React with the ${creeperEmote} emote`)
                message.channel.send({ embeds: [embed] });
            }
            if (args[0] === "2") {
                const embed = new Discord.MessageEmbed()
                    .setTitle('Giveaway Notifications')
                    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                    .setColor(0xFF0000)
                    .setDescription(`Want to get a notifcation when we do an Giveaway,\n\n React with the 🎁 emote`)
                message.channel.send({ embeds: [embed] });
            }
        }
        else {
            message.reply("You lack perms for this command")
        }
    }
}