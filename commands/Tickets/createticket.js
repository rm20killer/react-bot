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
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
module.exports = {
    name: 'createticket',
    aliases: ["tcreate2"],
    description: 'create ticket menu',
    usage: '`*createticket`',
    example: '`*createticket`',
    async execute(message, args) {
        //admin only
        if (message.member.roles.cache.find(r => r.name === adminid)) {
            // CODE GOES HERE 🡫 
            let btn = new MessageButton()
                .setStyle('SECONDARY')
                .setLabel('General Support')
                .setCustomId('ticket-General');
            let btn3 = new MessageButton()
                .setStyle('DANGER')
                .setLabel('Mute Appeal')
                .setCustomId('ticket-BanAppeal');

            let btn5 = new MessageButton()
                .setStyle('DANGER')
                .setLabel('User Report')
                .setCustomId('ticket-Player');
            let row = new MessageActionRow()
                .addComponents([btn])
                .addComponents([btn3])
                .addComponents([btn5])

            let row23 = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setStyle('SUCCESS')
                    .setLabel('General Support')
                    .setCustomId('ticket-General'))
                .addComponents(new MessageButton()
                    .setStyle('SUCCESS')
                    .setLabel('Mute Appeal')
                    .setCustomId('ticket-BanAppeal'))
                .addComponents(new MessageButton()
                    .setStyle('DANGER')
                    .setLabel('User Report')
                    .setCustomId('ticket-Player'));

            const embed = new Discord.MessageEmbed()
                .setTitle(`**Welcome to ${message.guild.name}!**`)
                .setColor(0x2f3136)
                .setDescription("Click on one of the buttons below to start your ticket: \nA ticket is a private chat with mods to ask questions, user reports, mute appeal, and requesting streamer role if you been in a video. \nCreating a ticket without a reason will lead to a warning and a ticket ban.\n\nIf the issue is related to the Gamers React minecraft server use `/grmc` in <#716755030757081108> to get help with grmc\n\n**DO NOT CREATE A TICKET TO SUBMIT CLIPS**");
            message.channel.send({ embeds: [embed], components: [row23] }).catch(console.error);
            //message.channel.send({ embed: embed, component: row })
            //ticketmanger.ticketmess(message,client);
        }
        else {
            message.reply("You lack perms for this command")
        }
    }
}
