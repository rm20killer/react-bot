/*
  _    _      _                         
 | |  | |    | |                    _   
 | |__| | ___| |_ __   ___ _ __   _| |_ 
 |  __  |/ _ \ | '_ \ / _ \ '__| |_   _|
 | |  | |  __/ | |_) |  __/ |      |_|  
 |_|  |_|\___|_| .__/ \___|_|           
               | |                      
               |_|                      
*/

const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);
const mongo = require('../../utils/mongo')
const WarnSchema = require("../../Models/warn-schema");
const warnSchema = require('../../Models/warn-schema');

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
  name: 'infractions',
  aliases: [`warnings`],
  description: 'get warnings',
  usage: '`*infractions <@user>`',
  example: '``',
  async execute(message, args, client) {
    if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
      // CODE GOES HERE 🡫 
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

      const guildId = message.guildId
      const userId = target.id
      let warningNumber
      await mongo().then(async mongoose => {
        try {
          const results = await warnSchema.findOne({
            guildId,
            userId
          })
          let warnings = results.warnings
          warningNumber = warnings.length;
          let arrayResult = [] 
          var result = ""
          //console.log(warningNumber)
          for (const warning of warnings) {
            const { author, timestamp, reason } = warning
            arrayResult.push(reason)  
            //console.log(warning)
            //result=result+`${n}) \`${reason}\` \n`
          
          }
          for (let n = 0; n < 10; n++) {
            {
              reason = arrayResult[n]
              if(reason){
                result=result+`${n+1}) \`${reason}\` \n`
              }
            }
          }
        } finally {
          mongoose.connection.close()
          avatarURL=target.avatarURL({ format: 'png'})
          const embed = new Discord.MessageEmbed()
            .setAuthor(`${target.user.tag} infractions`,avatarURL)
            .setColor(0x0774f8)
            .addField("Total warns", `${warningNumber}`)
            .addField("last 10 warnings",result)
            .setFooter("id: " + target.id)
          message.reply({embeds: [embed]})
        }
      })
    }
    else {
      message.reply(`You lack perms for this command`)
    }
  }
}