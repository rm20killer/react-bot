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

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const sequelize = require("../../utils/Database/sequelize");
const kicksSchema = require("../../utils/Database/Models/kick-schema")(
  sequelize,
  DataTypes
);

module.exports = {
  name: "kick",
  aliases: [``],
  description: "kick a user",
  usage: "`*kick <@user>`",
  async execute(message, args, client) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
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
      if (target.id === message.author.id) {
        return message.reply(`you cant kick yourself`);
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
        return message.reply("you cant kick bots");
      }
      let reason = args.slice(1).join(" ");
      if (!reason) {
        reason = "No Reason Provided";
      }
      if (target.kickable) {
        let lastElement1 = args.slice(-1)[0];
        //console.log(lastElement1)
        //onsole.log(lastElement1)
        const Lastarray = lastElement1.split("");
        if (Lastarray[0] === "-") {
          if (Lastarray.length > 2) {
            if (Lastarray[1] === "a") {
            } else {
              try {
                const embed3 = new Discord.MessageEmbed().setDescription(
                  `you have been kicked for ${reason}`
                );

                target.send({ embeds: [embed3] }).catch((error) => {
                  message.channel.send(`could not dm ${target.user.tag}`);
                });
              } catch {
                console.log(`could not dm ${target.user.tag}`);
              }
            }
          }
        } else {
          try {
            const embed3 = new Discord.MessageEmbed().setDescription(
              `you have been kicked for ${reason}`
            );

            target.send({ embeds: [embed3] }).catch((error) => {
              message.channel.send(`could not dm ${target.user.tag}`);
            });
          } catch {
            console.log(`could not dm ${target.user.tag}`);
          }
        }
        var channelParent = message.channel.parent.id;
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
        let time = message.createdTimestamp;
        const kick = {
          author: message.member.user.id,
          timestamp: time,
          reason,
          Last10Messages,
        };

        const guildId = message.guildId;
        const userId = target.id;
        const userTag = target.user.tag;
        try {
          const kicksdata = await kicksSchema.findOne({
            where: { guildId: guildId, userId: target.id },
          });
          if (kicksdata) {
            //console.log(warnings);
            //push warning to array
            kicksdata.kicks.push(kick);
            newKick = kicksdata.kicks;
            //save to database
            const updatedRows = await kicksSchema.update(
              {
                kicks: newKick,
              },
              {
                where: { guildId: guildId, userId: target.id },
              }
            );
            //await warnings.save();
          } else {
            const userKick = await kicksSchema.create({
              guildId: guildId,
              userId: target.id,
              kicks: [kick],
            });
          }
        } catch (error) {
          console.log(error);
          return message.reply(
            "An error has happened while kicking. kick not saved."
          );
        }
        var date = new Date(time * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime =
          hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        const embed = new Discord.MessageEmbed()
          .setTitle(`[KICKED] ${userTag}`)
          .setColor(0xff0000)
          .setDescription(`kicked for \`${reason}\``)
          .addField("kicked by", `<@${message.author.id}>`)
          .setFooter("id: " + userId + " | today at " + formattedTime);
        try {
          target.kick(`${reason}`);
          channel = client.channels.cache.find(
            (channel) => channel.id === "710123089094246482"
          );
          channel.send({ embeds: [embed] });
          const embed2 = new Discord.MessageEmbed().setDescription(
            `<@${userId}> has been kicked`
          );
          message.channel.send({ embeds: [embed2] });
        } catch {
          message.reply("an error has happened while kicking");
          return;
        }
        if (message.channel.parent.id === "709806849725038634") {
        } else {
          message.delete().catch((error) => {
            console.log(error);
          });
        }
      } else {
        message.reply("I can't kick that user");
      }
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};
