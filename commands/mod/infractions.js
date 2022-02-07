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
          //console.log(warnings)
          warningNumber = warnings.length;
          let arrayResult = []
          var past24hours = 0
          var past7day = 0
          var result = ""
          //console.log(warningNumber)
          var timeStamp = Math.round(new Date().getTime() / 1000);
          var timeStampYesterday = timeStamp - (24 * 3600);
          var timeStamp7Days = timeStamp - (24 * 3600 * 7);

          for (const warning of warnings) {
            const { author, timestamp, reason } = warning
            var is24 = timestamp >= new Date(timeStampYesterday * 1000).getTime();
            var is7 = timestamp >= new Date(timeStamp7Days * 1000).getTime();
            if (is24) {
              past24hours++
            }
            if (is7) {
              past7day++
            }
            //console.log(`${past24hours} ${past7day}`)
            arrayResult.push(reason)
            //console.log(warning)
            //result=result+`${n}) \`${reason}\` \n`

          }
          for (let n = warningNumber; n >= 0; n=n-1) {
              reason = arrayResult[n]
              if (reason) {
                result = result + `ID: \`${n}\`) \`${reason}\`\n`
              }
          }
        } finally {
          mongoose.connection.close()
          avatarURL = target.user.avatarURL({ format: 'png' })
          const embed = new Discord.MessageEmbed()
            .setAuthor(`${target.user.tag} infractions`, avatarURL)
            .setColor(0x0774f8)
            .addField("Total warns", `${warningNumber}`, true)
            .addField("Past 24 hours", `${past24hours}`, true)
            .addField("Past 7 days", `${past7day}`, true)
            .addField("last 10 warnings", result)
            .setFooter("id: " + target.id)
          message.reply({ embeds: [embed] })
        }
      })
    }
    else {
      message.reply(`You lack perms for this command`)
    }
  }
}