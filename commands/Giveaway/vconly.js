const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);
const ms = require('ms');
const { GiveawaysManager } = require('discord-giveaways');

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'vcgstart',
    aliases: [`gvcstart`],
    description: '',
    usage: '``',
    example: '``',
    async execute(message, args, client) {
        // CODE GOES HERE 🡫 
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            let giveawayChannel = message.mentions.channels.first();
            if (!giveawayChannel) {
                let giveawayChannelid = args[0]
                //fetches the channel
                giveawayChannel = await message.guild.channels.cache.find(channel => channel.id === giveawayChannelid);
                if (!giveawayChannel) {
                    message.reply(`Could not find channel`)
                    return
                }
            }
            let time = args[1]
            let winnerCount = args[2]
            winnerCount = parseInt(winnerCount)

            console.log(winnerCount)
            let prize = args.slice(3).join(' ');
            if (!winnerCount) {
                message.reply(`Please enter a number of winners`)
                return
            }
            if (!time) {
                message.reply(`Please specify a time`)
                return
            }
            if (!prize) {
                message.reply(`Please specify a prize`)
                return
            }
            //if message contains a mention
            let hostedBy = message.author
            let target = message.mentions.members.first();
            if (target) {
                hostedBy = target
                //remove world in prize
                prize = prize.replace(`<@${target.id}>`, ``)
            }
            //create a new giveaway
            client.giveawaysManager.start(giveawayChannel, {
                duration: ms(time),
                winnerCount,
                prize,
                hostedBy: hostedBy,
                exemptMembers: (member) => !member.roles.cache.some((r) => r.id === '966097737823178762')
            }).then(() => {
                message.reply(`Giveaway created in <#${giveawayChannel.id}>`)
            }).catch(err => {
                console.log(`giveaway error ${err}`)
                message.reply(`Error creating giveaway`)
            })
        }
        else {
            message.reply(`You lack perms for this command`)
        }
    }
}