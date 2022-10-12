const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'QOTD',
    aliases: [`qotd`,],
    description: '',
    usage: '``',
    example: '``',
    async execute(message, args, client) {
        // CODE GOES HERE 🡫
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            //day =  amount of days since 29/06/2022
            let day = Math.floor(Math.abs(new Date() - new Date("2022-06-29")) / (1000 * 60 * 60 * 24));
            const responseMessage = args.join(" ");
            const response = `**Question of the day** DAY ${day} ❓\n\n> ${responseMessage} \n\n*Answer in the thread below!* \n|| <@&991712040802582539> ||`;

            message.channel.send(response);
            message.delete().catch((error) => {
                console.log(error);
            });
        }
        else {
            message.reply(`You lack perms for this command`)
        }
    }
}