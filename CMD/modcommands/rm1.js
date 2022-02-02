const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
module.exports = {
    name: 'rm1',
    aliases: [ "rm1" ],
    description: 'rm1',
    usage: '`*rm1`',
    example: '`*rm1`',
    async execute(message, args) {
        if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){
            // CODE GOES HERE 🡫 
            message.channel.send("RM is busy and does not check/rate clips");
            message.delete().catch(error => {console.log(error)});
        }
       else{
           message.reply("You lack perms for this command")
       }
    }
}