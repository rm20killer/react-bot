const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
  name: 'rolecolour',
  aliases: [``],
  description: '',
  usage: '``',
  example: '``',
  async execute(message, args, client) {
    // CODE GOES HERE 🡫 
    if (message.member.roles.cache.find(r => r.name === adminid)) {
        var role = message.guild.roles.cache.find(role => role.name === "Admin");
        role.edit({
            color: args[0]
        })
    }
    else 
    {
    message.reply(`You lack perms for this command`)
    }
  }
}