/*
  __  __           _         
 |  \/  |         | |    _   
 | \  / | ___   __| |  _| |_ 
 | |\/| |/ _ \ / _` | |_   _|
 | |  | | (_) | (_| |   |_|  
 |_|  |_|\___/ \__,_|                          
*/

const fetch = require("node-fetch");
const Discord = require("discord.js");
const ms = require("ms");
const { Client, Intents, MessageAttachment } = require("discord.js");
const discordTranscripts = require("discord-html-transcripts");
const sequelize = require("../../utils/Database/sequelize");
const { Sequelize, DataTypes, Model, Op } = require("sequelize");
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("../../config");
const tempbans = require("../../utils/Database/Models/tempban-schema")(
  sequelize,
  DataTypes
);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

/* The code below does the following:
1. Checks that the user calling the command has the required role.
2. If a user is mentioned then the user will be banned.
3. If a user is not mentioned then the ID of the user will be used.
4. If a user is not found then the bot will reply to the user with a message. */
module.exports = {
  name: "ban",
  aliases: ["tempban"],
  description: "will ban a user",
  usage: "`*ban <@user> [reason] [Function]`",
  example: "`*ban @rm20#2000`",
  async execute(message, args, client) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid)
    ) {
      // CODE GOES HERE 🡫
      if (!args[0]) {
        return message.reply(`enter a user`);
      }
      let target = message.mentions.members.first();
      if (!target) {
        let id = args[0];
        try {
          target = await message.guild.members.fetch(id);
        } catch {
          return message.reply(`I can't find that member`);
        }
      }
      if (!target) {
        return message.reply(`I can't find that member`);
      }
      //console.log(target)
      if (target.id === message.author.id) {
        return message.reply(`You cant ban yourself`);
      }

      try {
        if (
          target.roles.cache.find((r) => r.name === modid) ||
          target.roles.cache.find((r) => r.name === adminid) ||
          target.roles.cache.find((r) => r.id === helper)
        ) {
          return message.reply("Can not mute a mod");
        }
      } catch {
        console.log(target.id + " has no roles");
      }
      if (target.user.bot) {
        return message.reply("you cant ban bots");
      } else {
        let reason = args.slice(1).join(" ");
        if (!reason) {
          reason = "No Reason Provided";
        }

        if (target.bannable) {
          //let durationstext = reason.split(" ")[0];
          //let durationstext = durationstext.join();
          //let durationsarray = durationstext.split("")
          //let suffix = durationsarray.slice(-1)[0];
          //let testTime = args[1]
          //console.log(durationsarray)
          //console.log(suffix)
          let time = null;
          if (!args[1]) {
          } else {
            time = ms(args[1]);
          }
          //time = ms(args[1])
          console.log(time);
          if (!time) {
            banUser(client, message, args, target, reason);
          } else {
            time = time / 1000;
            const expires = new Date();
            expires.setSeconds(expires.getSeconds() + time);
            reason = removeFirstWord(reason);
            tempban(client, message, args, target, reason, expires, time);
          }
        } else {
          return message.reply(`I can't ban that user`);
        }
      }
    } else {
      message.reply("You lack perms for this command");
    }
  },
};

const fbulkdeleteUser = async function (client, message, amount, target) {
  const channel = client.channels.cache.find(
    (channel) => channel.id === "710123089094246482"
  );
  const id = target.id;
  const attachment = await discordTranscripts.createTranscript(
    message.channel,
    {
      limit: amount,
    }
  );
  channel.send({
    content: `trascript for <#${channel.id}> messages from <@${target.user.id}> deleted`,
    files: [attachment],
  });
  message.channel.messages
    .fetch({
      limit: amount, // Change `100` to however many messages you want to fetch
      before: message.id,
    })
    .then((messages) => {
      const botMessages = [];
      messages
        .filter((m) => m.author.id === id)
        .forEach((msg) => botMessages.push(msg));
      message.channel.bulkDelete(botMessages).catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const banUser = async function (client, message, args, target, reason) {
  let lastElement1 = args.slice(-1)[0];
  const Lastarray = lastElement1.split("");
  if (Lastarray[0] === "-") {
    if (Lastarray.length > 3) {
    } else {
      //var dmed=0
      try {
        if (Lastarray[1] === "a" || Lastarray[2] === "a") {
          //dmed++
        } else {
          const embed3 = new Discord.MessageEmbed().setDescription(
            `You have been banned from Gamers React | ${reason}`
          );
          target.send({ embeds: [embed3] }).catch((error) => {
            message.channel.send(`could not dm ${target.user.tag}`);
          });
        }
      } catch {
        console.log(`could not dm ${target.user.tag}`);
      }
      try {
        if (Lastarray[1] === "c" || Lastarray[2] === "c") {
          fbulkdeleteUser(client, message, 100, target);
        } else {
        }
      } catch {
        console.log("could not delete messages");
      }
    }
  } else {
    try {
      const embed3 = new Discord.MessageEmbed().setDescription(
        `You have been banned from Gamers React | ${reason}`
      );

      target.send({ embeds: [embed3] }).catch((error) => {
        message.channel.send(`could not dm ${target.user.tag}`);
      });
    } catch {
      console.log(`could not dm ${target.user.tag}`);
    }
  }
  var channelParent = message.channel.parent.id;
  channel = client.channels.cache.find(
    (channel) => channel.id === "710123089094246482"
  );
  let time = message.createdTimestamp;
  var date = new Date(time * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  const embed = new Discord.MessageEmbed()
    .setTitle(`[BANNED] ${target.user.tag}`)
    .setColor(0xff0000)
    .setDescription(`🔒Banned for \`${reason}\``)
    .addField("banned by", `<@${message.author.id}>`)
    .setFooter("id: " + target.id + " | today at " + formattedTime);
  try {
    target.ban({ reason: `${reason}` });
    channel.send({ embeds: [embed] });
    const embed2 = new Discord.MessageEmbed().setDescription(
      `<@${target.user.id}> has been banned.`
    );
    message.channel.send({ embeds: [embed2] });
  } catch (error) {
    console.log(error);
    message.reply("an error has happened while banning");
    return;
  }

  if (channelParent === "709806849725038634") {
  } else {
    message.delete().catch((error) => {
      console.log(error);
    });
  }
};

const tempban = async function (
  client,
  message,
  args,
  target,
  reason,
  expires,
  Bantime
) {
  var Last10Messages = [];
  await message.channel.messages
    .fetch({
      limit: 100, // Change `100` to however many messages you want to fetch
      before: message.id,
    })
    .then((message) => {
      const botMessages = [];
      message
        .filter((m) => m.author.id === target.id)
        .forEach((msg) => botMessages.push(msg.content));
      //console.log(botMessages);
      if (botMessages.length === 0) {
      } else {
        for (let i = 0; i < botMessages.length; i++) {
          if (i < 10) {
            if (botMessages[i]) {
              //console.log(botMessages[i])
              Last10Messages.push(botMessages[i]);
            }
          }
        }
      }
    });
  //console.log("tempmuteing")
  let messagetime = message.createdTimestamp;
  const ban = {
    author: message.member.user.id,
    timestamp: messagetime,
    duration: Bantime,
    reason,
    Last10Messages,
  };
  const guildId = message.guildId;
  const userId = target.id;
  const userTag = target.user.tag;
  const banData = await tempbans.findOne({
    where: {
      guildId: guildId,
      userId: userId,
    },
  });
  if (banData) {
    banData.bans.push(ban);
    newBans = banData.bans;
    try {
      const newMutedata = await tempbans.update(
        {
          expires: expires,
          current: true,
          bans: newBans,
        },
        {
          where: { guildId: guildId, userId: userId },
        }
      );
    } catch (error) {
      console.log(error);
      return message.reply("an error has happened while banning");
    }
  } else {
    banArray = [ban];
    try {
      const newMutedata = await tempbans.create({
        guildId: guildId,
        userId: userId,
        expires: expires,
        current: true,
        bans: banArray,
      });
    } catch (error) {
      console.log(error);
      return message.reply("an error has happened while banning");
    }
  }
  var timeString = toHHMMSS(Bantime);
  let lastElement1 = args.slice(-1)[0];
  const Lastarray = lastElement1.split("");
  if (Lastarray[0] === "-") {
    if (Lastarray.length > 3) {
    } else {
      //var dmed=0
      try {
        if (Lastarray[1] === "a" || Lastarray[2] === "a") {
          //dmed++
        } else {
          const embed3 = new Discord.MessageEmbed().setDescription(
            `You have been banned from Gamers React for ${timeString} | ${reason}`
          );
          target.send({ embeds: [embed3] }).catch((error) => {
            message.channel.send(`could not dm ${target.user.tag}`);
          });
        }
      } catch {
        console.log(`could not dm ${target.user.tag}`);
      }
      try {
        if (Lastarray[1] === "c" || Lastarray[2] === "c") {
          fbulkdeleteUser(client, message, 100, target);
        } else {
        }
      } catch {
        console.log("could not delete messages");
      }
    }
  } else {
    try {
      const embed3 = new Discord.MessageEmbed().setDescription(
        `You have been banned from Gamers React for ${timeString} | ${reason}`
      );
      target.send({ embeds: [embed3] }).catch((error) => {
        message.channel.send(`could not dm ${target.user.tag}`);
      });
    } catch {
      console.log(`could not dm ${target.user.tag}`);
    }
  }
  var channelParent = message.channel.parent.id;
  channel = client.channels.cache.find(
    (channel) => channel.id === "710123089094246482"
  );
  let time = message.createdTimestamp;
  var date = new Date(time * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  const embed = new Discord.MessageEmbed()
    .setTitle(`[TEMPBAN] ${target.user.tag}`)
    .setColor(0xff0000)
    .setDescription(`🔒Temp Banned for \`${reason}\`  for ${timeString}`)
    .addField("banned by", `<@${message.author.id}>`)
    .setFooter("id: " + target.id + " | today at " + formattedTime);
  try {
    target.ban({ reason: `${reason}` });
    channel.send({ embeds: [embed] });
    const embed2 = new Discord.MessageEmbed().setDescription(
      `<@${target.id}> has been banned | ${timeString}`
    );
    message.channel.send({ embeds: [embed2] });
  } catch (error) {
    console.log(error);
    message.reply("an error has happened while banning");
    return;
  }

  if (channelParent === "709806849725038634") {
  } else {
    message.delete().catch((error) => {
      console.log(error);
    });
  }
};

function toHHMMSS(time) {
  var sec_num = parseInt(time, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}

function removeFirstWord(str) {
  const indexOfSpace = str.indexOf(" ");

  if (indexOfSpace === -1) {
    return "No Reason Provided";
  }

  return str.substring(indexOfSpace + 1);
}
