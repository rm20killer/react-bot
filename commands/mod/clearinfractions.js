/*
  __  __           _         
 |  \/  |         | |    _   
 | \  / | ___   __| |  _| |_ 
 | |\/| |/ _ \ / _` | |_   _|
 | |  | | (_) | (_| |   |_|  
 |_|  |_|\___/ \__,_|                          
*/

const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
  name: 'clearinfractions',
  aliases: [`removewarning`, "removeinfractions", "clearwarning"],
  description: 'remove warnings from a user',
  usage: '`*clearinfractions <@user> <infraction number>`',
  example: '``',
  async execute(message, args, client) {
    if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid)) {
      // CODE GOES HERE 🡫
      if(!args[0]){return message.reply(`enter a user`) }
      let target = message.mentions.members.first();
      if (!target) {
        let id = args[0]
        try {
          target = await message.guild.members.fetch(id);
        } catch {
          return message.reply(`I can't find that member`);
        }
      }

      if (!target) { return message.reply(`I can't find that member`) }
      if(!args[1]) {return message.reply("No warn id found")}
      const guildId = message.guildId
      const userId = target.id
      await mongo().then(async mongoose => {
        try {
          const results = await warnSchema.findOne({
            guildId,
            userId
          })
          let warnings = results.warnings
          warnings.splice(args[1], 1); 
        } finally {
          mongoose.connection.close()
        }


      })
    }
    else {
      message.reply(`You lack perms for this command`)
    }

  }
}