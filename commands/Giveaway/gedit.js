const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'gedit',
    aliases: [`gedit`],
    description: '',
    usage: '``',
    example: '``',
    async execute(message, args, client) {
        // CODE GOES HERE 🡫 
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            let messageId = args[0]
            let winnerCount = args[1]
            winnerCount = parseInt(winnerCount)

            console.log(winnerCount)
            let prize = args.slice(2).join(' ');
            if(!messageId){
                message.reply(`Please provide a message ID`)
                return
            }
            if (!winnerCount) {
                message.reply(`Please enter a number of winners`)
                return
            }
            if (!prize) {
                message.reply(`Please specify a prize`)
                return
            }
            client.giveawaysManager.edit(messageId, {
                newWinnerCount: winnerCount,
                newPrize: prize
            }).then(() => {
                message.channel.send('Success! Giveaway updated!');
            }).catch((err) => {
                message.channel.send(`An error has occurred, please check and try again.\n\`${err}\``);
            });
        }
        else {
            message.reply(`You lack perms for this command`)
        }
    }
}