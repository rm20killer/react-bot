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
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../config`);
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../utils/Database/sequelize');
const muteSchema = require('../../utils/Database/Models/mute-schema')(sequelize, DataTypes);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

const muterole = "712512117999271966";

module.exports = {
  name: "unmute",
  aliases: [``],
  description: "unmute a user",
  usage: "`*unmute <@user>`",
  example: "``",
  async execute(message, args, client, mongoose) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      // CODE GOES HERE 🡫
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
      try {
        if (!target.roles.cache.find((r) => r.id === muterole)) {
          message.reply("User is not muted");
          return;
        }
      } catch {
        message.reply("User is not muted");
        return;
      }
      unmute(message, target, args, client)
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};

function DMUser(targetmember, message) {
  //split reason into array
  var reasonArray = message.content.split(" ");
  //get last word
  var lastarray = reasonArray[reasonArray.length - 1];
  const funcation = lastarray.split("");
  if (funcation[0] === "-") {
    if (funcation[1] === "a") {
      return;
    }
  } else {
    const embed3 = new Discord.MessageEmbed().setDescription(
      `You were unmuted in Gamers React`
    );
    targetmember.send({ embeds: [embed3] }).catch((error) => {
      message.channel.send(`Could not dm ${targetmember.user.tag}`);
    });
  }
}

async function unmute(message, target, args, client) {
  const guildId = message.guildId;
  const userId = target.id;
  const muteData = await muteSchema.findOne({
    where: {
      guildId: guildId,
      userId: userId,
    },
  });
  if (muteData) {
    if (muteData.current === false) {
      message.reply("User is not muted by me");
      return;
    } else {
      try {
        const newMutedata = await muteSchema.update(
          {
            current: false,
          },
          {
            where: {
              guildId: guildId,
              userId: userId,
            },
          }
        );
        let messagetime = message.createdTimestamp;
        var role = message.guild.roles.cache.find(
          (role) => role.id === muterole
        );
        target.roles.remove(role);
        var date = new Date(messagetime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime =
          hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        const embed = new Discord.MessageEmbed()
          .setTitle(`[UNMUTED] ${target.user.tag}`)
          .setColor(0xff0000)
          .setDescription(`unmuted <@${target.user.id}>`)
          .addField("unmuted by", `<@${message.author.id}>`)
          .setFooter("id: " + target.id + " | today at " + formattedTime);
        channel = client.channels.cache.find(
          (channel) => channel.id === "710123089094246482"
        );
        channel.send({ embeds: [embed] });
        const embed2 = new Discord.MessageEmbed().setDescription(
          `<@${target.user.id}> has been unmuted`
        );
        message.channel.send({ embeds: [embed2] });
        DMUser(target, message);
      }
      catch (error) {
        message.reply("Error unmuting user");
        return;
      }
    }
    if (message.channel.parent.id === "709806849725038634") {
    } else {
      message.delete().catch((error) => {
        console.log(error);
      });
    }
  }
  else{
    message.reply("No mute data found");
  };
}