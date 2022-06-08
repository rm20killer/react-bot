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
const ms = require('ms');

const warnSchema = require('../../Models/warn-schema');
const muteSchema = require('../../Models/mute-schema');

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
  name: 'infractions',
  aliases: [`warnings`],
  description: 'get warnings',
  usage: '`*infractions <@user> [-m] [warn id] `',
  example: '``',
  async execute(message, args, client) {
    if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
      // CODE GOES HERE 🡫 
      if (!args[0]) { return message.reply(`enter a user`) }
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
      if (args[1] === '-m') {
        if (!args[2]) {
          getMuteData(message, target)
        }
        else {
          getMuteDataDetial(message, target, args[2])
        }
        return
      }
      const guildId = message.guildId
      const userId = target.id
      let warningNumber
      if (args[1]) {
        let warnId = parseInt(args[1])
        if (warnId != 0) { if (!warnId) { return message.reply("No warn id found") } }
        getInfractionsDetial(message, target, warnId)
      }
      else {
        getInfractions(message, target)
      }
    }
    else {
      message.reply(`You lack perms for this command`)
    }
  }
}
const getInfractions = async (message, target) => {
  const guildId = message.guildId
  const userId = target.id
  var warningNumber = 0
  var past24hours = 0
  var past7day = 0
  let arrayResult = []
  var result = ""
  await mongo().then(async mongoose => {
    try {
      const results = await warnSchema.findOne({
        guildId,
        userId
      })
      //console.log(warnings)
      if (results) {
        let warnings = results.warnings
        warningNumber = warnings.length;
        //if(warningNumber<1){return message.reply(`No warnings found`)}
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
      }
      let i = 0
      for (let n = warningNumber; n >= 0; n = n - 1) {
        if (i < 11) {
          reason = arrayResult[n]
          if (reason) {
            result = result + `ID: \`${n}\`) \`${reason}\`\n`
          }
        }
        i = i + 1
      }
    } finally {
      if (!result) {
        result = "No result found"
      }
      //mongoose.connection.close()
      avatarURL = target.user.avatarURL({ format: 'png' })
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${target.user.tag} infractions`, avatarURL)
        .setColor(0x0774f8)
        .addField("Total warns", `${String(warningNumber)}`, true)
        .addField("Past 24 hours", `${String(past24hours)}`, true)
        .addField("Past 7 days", `${String(past7day)}`, true)
        .addField("last 10 warnings", result)
        .setFooter("id: " + target.id)
      message.reply({ embeds: [embed] })
    }
  })
  return;
}

const getInfractionsDetial = async (message, target, warnId) => {
  const guildId = message.guildId
  const userId = target.id
  await mongo().then(async mongoose => {
    try {
      const results = await warnSchema.findOne({
        guildId,
        userId
      })
      let warnings1 = results.warnings
      let warningDetail = warnings1[warnId]
      if (!warningDetail) { return message.reply(`No Warning found for ${target.user.tag} with ID ${warnId}`) }
      const { author, timestamp, reason, Last10Messages } = warningDetail
      let UNIXTimestamp = Math.round(timestamp / 1000);
      avatarURL = target.user.avatarURL({ format: 'png' })
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${target.user.tag} infractions detail for ID: ${warnId}`, avatarURL)
        .setColor(0x0774f8)
        .addField("reason", `${reason}`)
        .addField("original mod", `<@${author}>`)
        .addField("At time", `<t:${UNIXTimestamp}:f>`)
        .setFooter("id: " + target.id)
      for (let i = 0; i < Last10Messages.length; i++) {
        const element = Last10Messages[i];
        embed.addField(`Message before warning ${i}`, `${element}`);
      }
      message.reply({ embeds: [embed] })
    } finally {
      //mongoose.connection.close()
    }
  })
}


const getMuteData = async (message, target) => {
  const guildId = message.guildId
  const userId = target.id
  var mutesAmounr = 0
  var past24hours = 0
  var past7day = 0
  let arrayResult = []
  let arrayResultDuration = []
  var result = ""
  await mongo().then(async mongoose => {
    try {
      const results = await muteSchema.findOne({
        guildId,
        userId
      })
      //console.log(warnings)
      if (results) {
        let mutes = results.mutes
        mutesAmounr = mutes.length;
        //if(warningNumber<1){return message.reply(`No warnings found`)}
        //console.log(warningNumber)
        var timeStamp = Math.round(new Date().getTime() / 1000);
        var timeStampYesterday = timeStamp - (24 * 3600);
        var timeStamp7Days = timeStamp - (24 * 3600 * 7);

        for (const mute of mutes) {
          const { author, timestamp, reason, duration } = mute
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
          arrayResultDuration.push(duration)
          //console.log(warning)
          //result=result+`${n}) \`${reason}\` \n`

        }
      }
      let i = 0
      for (let n = mutesAmounr; n >= 0; n = n - 1) {
        if (i < 11) {
          reason = arrayResult[n]
          if (reason) {
            result = result + `ID: \`${n}\`) \`${reason}\` | Duration: \`${arrayResultDuration[n]}\`\n`
          }
        }
        i = i + 1
      }
    } finally {
      if (!result) {
        result = "No result found"
      }
      //mongoose.connection.close()
      avatarURL = target.user.avatarURL({ format: 'png' })
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${target.user.tag} infractions (mute)`, avatarURL)
        .setColor(0x0774f8)
        .addField("Total mutes", `${String(mutesAmounr)}`, true)
        .addField("Past 24 hours", `${String(past24hours)}`, true)
        .addField("Past 7 days", `${String(past7day)}`, true)
        .addField("last 10 mutes", result)
        .setFooter("id: " + target.id)
      message.reply({ embeds: [embed] })
    }
  })
  return;
}

const getMuteDataDetial = async (message, target, warnId) => {
  const guildId = message.guildId
  const userId = target.id
  await mongo().then(async mongoose => {
    try {
      const results = await muteSchema.findOne({
        guildId,
        userId
      })
      let mute1 = results.mutes
      let muteDetail = mute1[warnId]
      if (!muteDetail) { return message.reply(`No mutes found for ${target.user.tag} with ID ${warnId}`) }
      const { author, timestamp, reason, Last10Messages,duration } = muteDetail
      let UNIXTimestamp = Math.round(timestamp / 1000);
      avatarURL = target.user.avatarURL({ format: 'png' })
      const embed = new Discord.MessageEmbed()
        .setAuthor(`${target.user.tag} mute detail for ID: ${warnId}`, avatarURL)
        .setColor(0x0774f8)
        .addField("reason", `${reason}`)
        .addField("original mod", `<@${author}>`)
        .addField("At time", `<t:${UNIXTimestamp}:f>`)
        .addField("Duration", `${duration}`)
        .setFooter("id: " + target.id)
      for (let i = 0; i < Last10Messages.length; i++) {
        const element = Last10Messages[i];
        embed.addField(`Message before mute ${i}`, `${element}`);
      }
      message.reply({ embeds: [embed] })
    } finally {
      //mongoose.connection.close()
    }
  })
}