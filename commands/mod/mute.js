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
const ms = require('ms');

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

const muterole = "712512117999271966"

const mongo = require('../../utils/mongo')
const muteSChema = require("../../Models/mute-schema");

module.exports = {
  name: 'mute',
  aliases: [`tempmute`],
  description: 'mutes a user',
  usage: '`@mute <@user>`',
  example: '`@mute RM20#2000`',
  async execute(message, args, client) {
    // CODE GOES HERE 🡫 
    if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
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
      if (target.id === message.author.id) { return message.reply(`You can't mute yourself.`) }
      try {
        if (message.member.roles.cache.find(r => r.name === adminid)) { }
        else {
          if (target.roles.cache.find(r => r.name === modid) || target.roles.cache.find(r => r.name === adminid) || target.roles.cache.find(r => r.id === helper)) {
            return message.reply("Can not mute a mod");
          }
        }
      } catch {
        console.log(target.id + " has no roles")
      }
      if (target.user.bot) { return message.reply("You can't mute bots.") }
      const targetmember = (await message.guild.members.fetch()).get(target.id)
      const guildId = message.guildId
      const userId = target.id;
      let reason = args.slice(1).join(" ")
      if (!reason) {
        reason = "No Reason Provided"
      }
      let currentmuted = false
      await mongo().then(async mongoose => {
        try {
          const previousMutes = await muteSChema.findOne({
            guildId,
            userId
          })
          if (previousMutes) {
            if (previousMutes.current === true) {
              message.reply("That user is already muted.")
              currentmuted = true
              return;
            }
          }
          else if (targetmember.roles.cache.find(r => r.id === muterole)) {
            message.reply("This user has the mute role but not in my database. Remove role before trying to mute.")
            currentmuted = true
            return;
          }
        } finally {
        }
      })
      if (currentmuted) { return }
      let time = null
      if (!args[1]) {

      }
      else {
        time = ms(args[1])
      }
      //time = ms(args[1])
      console.log(time)
      if (!time) {
        const expires = new Date()
        expires.setUTCFullYear(3000)
        mute(message, client, targetmember, reason, expires);
      }
      else {
        time = time / 1000
        //console.log(time)
        const expires = new Date()
        expires.setSeconds(expires.getSeconds() + time)
        console.log(expires)
        reason = removeFirstWord(reason);
        //console.log(reason)
        tempmute(message, client, targetmember, time, reason, expires);
      }
      if (message.channel.parent.id === "709806849725038634") {

      }
      else {
        message.delete().catch(error => { console.log(error) });
      }
    }
    else {
      message.reply(`You lack perms for this command`)
    }

  }
}
const tempmute = async function (message, client, targetmember, time, reason, expires) {
  var Last10Messages = []
  await message.channel.messages.fetch({
    limit: 100, // Change `100` to however many messages you want to fetch
    before: message.id
  }).then((message) => {
    const botMessages = []
    message.filter(m => m.author.id === targetmember.id).forEach(msg => botMessages.push(msg.content))
    //console.log(botMessages);
    if (botMessages.length === 0) {
    }
    else {
      for (let i = 0; i < botMessages.length; i++) {
        if (i < 10) {
          if (botMessages[i]) {
            //console.log(botMessages[i])
            Last10Messages.push(botMessages[i])
          }
        }
      }
    }
  });
  //console.log("tempmuteing")
  let messagetime = message.createdTimestamp
  const mute = {
    author: message.member.user.id,
    timestamp: messagetime,
    duration: time,
    reason,
    Last10Messages
  }
  const guildId = message.guildId
  const userId = targetmember.id;
  await mongo().then(async mongoose => {
    try {
      await muteSChema.findOneAndUpdate({
        guildId,
        userId
      }, {
        guildId,
        userId,
        expires,
        current: true,
        $push: {
          mutes: mute
        }
      }, {
        upsert: true
      })
    } finally {
      //mongoose.connection.close()
    }
  })
  try {
    var role = targetmember.guild.roles.cache.find(role => role.id === muterole);
    targetmember.roles.add(role);
  }
  catch {
    message.reply("An error has happened while muting.")
    return
  }
  var date = new Date(messagetime * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  var timeString = toHHMMSS(time)
  const embed = new Discord.MessageEmbed()
    .setTitle(`[TEMPMUTED] ${targetmember.user.tag} for ${timeString}`)
    .setColor(0xFF0000)
    .setDescription(`muted for \`${reason}\` for ${timeString}`)
    .addField("muted by", `<@${message.author.id}>`)
    .setFooter("id: " + targetmember.id + " | today at " + formattedTime)
  channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
  channel.send({ embeds: [embed] });
  const embed2 = new Discord.MessageEmbed()
    .setDescription(`<@${targetmember.user.id}> has been muted for ${timeString}`);
  message.channel.send({ embeds: [embed2] });
  DMUser(targetmember, message, reason, timeString)
}

const mute = async function (message, client, targetmember, reason, expires) {
  //console.log("perma mute")
  var Last10Messages = []
  message.channel.messages.fetch({
    limit: 100, // Change `100` to however many messages you want to fetch
    before: message.id
  }).then((message) => {
    const botMessages = []
    message.filter(m => m.author.id === targetmember.id).forEach(msg => botMessages.push(msg))
    for (let i = 0; i < botMessages.length || i < 10; i++) {
      //Last10Messages=Last10Messages+botMessages[i].content+"\n"
      if (botMessages[i]) {
        Last10Messages.push(botMessages[i].content)
      }
    }

  });
  //console.log("tempmuteing")
  let messagetime = message.createdTimestamp
  const mute = {
    author: message.member.user.id,
    timestamp: messagetime,
    duration: "perma",
    reason,
    Last10Messages
  }
  const guildId = message.guildId
  const userId = targetmember.id;
  await mongo().then(async mongoose => {
    try {
      await muteSChema.findOneAndUpdate({
        guildId,
        userId
      }, {
        guildId,
        userId,
        expires,
        current: true,
        $push: {
          mutes: mute
        }
      }, {
        upsert: true
      })
    } finally {
      //mongoose.connection.close()
    }
  })
  try {
    var role = targetmember.guild.roles.cache.find(role => role.id === muterole);
    targetmember.roles.add(role);
  }
  catch {
    message.reply("an error has happened while muting")
    return
  }
  var date = new Date(messagetime * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  //var timeString = toHHMMSS(time)
  const embed = new Discord.MessageEmbed()
    .setTitle(`[MUTED] ${targetmember.user.tag}`)
    .setColor(0xFF0000)
    .setDescription(`muted for \`${reason}\``)
    .addField("muted by", `<@${message.author.id}>`)
    .setFooter("id: " + targetmember.id + " | today at " + formattedTime)
  channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
  channel.send({ embeds: [embed] });
  const embed2 = new Discord.MessageEmbed()
    .setDescription(`<@${targetmember.user.id}> has been muted`)
  message.channel.send({ embeds: [embed2] });
  DMUser(targetmember, message, reason)
}

function removeFirstWord(str) {
  const indexOfSpace = str.indexOf(' ');

  if (indexOfSpace === -1) {
    return "No Reason Provided";
  }

  return str.substring(indexOfSpace + 1);
}


function toHHMMSS(time) {
  var sec_num = parseInt(time, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}

function DMUser(targetmember, message, reason) {
  //split reason into array
  var reasonArray = reason.split(" ");
  //get last word
  var lastarray = reasonArray[reasonArray.length - 1];
  const funcation = lastarray.split("");
  if (funcation[0] === "-") {
    if (funcation[1] === "a") {
      return
    }
    else {
    }
  }
  const embed3 = new Discord.MessageEmbed()
    .setDescription(`You were muted in Gamers React for ${reason}`);
  targetmember.send({ embeds: [embed3] }).catch(error => {
    message.channel.send(`Could not dm ${targetmember.user.tag}`)
    console.log(error);
    return
  });
}

function DMUser(targetmember, message, reason, time) {
  //split reason into array
  var reasonArray = reason.split(" ");
  //get last word
  var lastarray = reasonArray[reasonArray.length - 1];
  const funcation = lastarray.split("");
  if (funcation[0] === "-") {
    if (funcation[1] === "a") {
      return
    }
    else {
    }
  }
  const embed3 = new Discord.MessageEmbed()
    .setDescription(`You were tempmuted  in Gamers React for ${time}| ${reason}`);
  targetmember.send({ embeds: [embed3] }).catch(error => {
    message.channel.send(`Could not dm ${targetmember.user.tag}`)
    console.log(error);
    return
  });
}
