const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);
const fs = require('fs');

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'raidmode',
    aliases: [`rc`],
    description: '',
    usage: '``',
    example: '``',
    async execute(message, args, client) {
        // CODE GOES HERE 🡫
        if (message.member.roles.cache.find(r => r.id === config.srmods) || message.member.roles.cache.find(r => r.name === adminid)) {
            if (!args[0]) {
                return message.reply(`to configure raid mode, use \`*raidmode <on/off>\``)
            }
            let raidmode = require(`../../utils/data/raidmode.json`)
            if (args[0] === 'on') {
                message.channel.send(`Raid mode is now on\nMake sure to do \`dc.settings mode 1\``)
                //get 700789384131379371 channel and make it visible to everyone
                let channel = client.channels.cache.get('700789384131379371')
                channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                    VIEW_CHANNEL: true
                })
                //change raidmode.json to true
                raidmode.raidmode = true
                fs.writeFileSync('./utils/data/raidmode.json', JSON.stringify(raidmode))
                let logchannel = client.channels.cache.get('844273354318938174')
                logchannel.send(`Raid mode is now on by ${message.author.username}`)
            }
            else if (args[0] === 'off') {
                message.channel.send(`Raid mode is now off\nMake sure to do \`dc.settings mode 0\``)
                //get 700789384131379371 channel and make it invisible to everyone
                let channel = client.channels.cache.get('700789384131379371')
                channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
                    VIEW_CHANNEL: false
                })
                //change raidmode.json to false
                raidmode.raidmode = false
                fs.writeFileSync('./utils/data/raidmode.json', JSON.stringify(raidmode))
                //send message to log channel
                let logchannel = client.channels.cache.get('844273354318938174')
                logchannel.send(`Raid mode is now off by ${message.author.username}`)
            }
            else if (args[0] === 'status') {
                if (raidmode.raidmode === true) {
                    message.reply(`raid mode is on`)
                }
                else {
                    message.reply(`raid mode is off`)
                }
            }
            else {
                message.reply(`invalid argument`)
            }
        }
        else {
            message.reply(`You lack perms for this command`)
        }
    }
}