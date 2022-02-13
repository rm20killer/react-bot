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
      if(message.member.roles.cache.find(r => r.name === adminid)){}
      else{
          if (target.roles.cache.find(r => r.name === modid) || target.roles.cache.find(r => r.name === adminid) || target.roles.cache.find(r => r.id === helper)) {
              return message.reply("Can not mute a mod");
          }
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
          mongoose.connection.close()
        }
      })
      if (currentmuted) { return }
      let durationstext = reason.split(" ")[0];
      //let durationstext = durationstext.join();
      let durationsarray = durationstext.split("")
      let suffix = durationsarray.slice(-1)[0];
      //console.log(durationsarray)
      //console.log(suffix)
      if (suffix === "s" || suffix === "m" || suffix === "h" || suffix === "d") {
        let time = durationstext.slice(0, -1);
        if (suffix === "s") {
          time = time * 1
        }
        else if (suffix === "m") {
          time = time * 60
        }
        else if (suffix === "h") {
          time = time * 60 * 60
        }
        else if (suffix === "d") {
          time = time * 60 * 60 * 24
        }
        else {
          time = null;
        }
        if (time) {
          //console.log(time)
          const expires = new Date()
          expires.setSeconds(expires.getSeconds() + time)
          //console.log(expires)
          reason = removeFirstWord(reason);
          //console.log(reason)
          tempmute(message, client, targetmember, time, reason, expires);
        }
        else {
          //mute();
        }
      }
      else {
        const expires = new Date()
        expires.setUTCFullYear(3000)
        mute(message, client, targetmember, reason, expires);
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
      mongoose.connection.close()
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
  const embed3 = new Discord.MessageEmbed()
    .setDescription(`You were tempmuted in Gamers React | ${reason} ${timeString}`);
  targetmember.send({ embeds: [embed3] }).catch(error => { message.reply(`Could not dm ${target.user.tag}`) });
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
  const embed3 = new Discord.MessageEmbed()
  .setDescription(`You were muted in Gamers React for ${reason}`);
  targetmember.send({ embeds: [embed3] }).catch(error => { message.reply(`Could not dm ${target.user.tag}`) });
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
