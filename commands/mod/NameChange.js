const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../config`);
const unidecode = require("unidecode");
const { covertText } = require("../../utils/func/uniecode");

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

module.exports = {
  name: "namechange",
  aliases: [`rename`, `nickname`, `nick`],
  description: "",
  usage: "``",
  example: "``",
  async execute(message, args, client) {
    // CODE GOES HERE 🡫
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
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
        if (args[1]) {
          let name1 = args.slice(1).join(" ");
          //if name1 is more then 32 characters long, it will be cut off
          if (name1.length > 32) {
            name1 = name1.slice(0, 32);
          }
          target.setNickname(name1);
          const embed = new Discord.MessageEmbed().setDescription(
            `Your nickname has been changed to ${name1} in Gamers React.`
          );
          try {
            target.send({ embeds: [embed] }).catch((error) => {
              message.channel.send(`could not dm ${target.user.tag}`);
            });
          } catch {
            message.channel.send(`could not dm <@${target.user.id}>`);
          }
          message.channel.send(
            `changed <@${target.user.id}> nickname to ${name1}`
          );
        } else {
          var name = target.user.username;
          let name2 = await covertText(name);
          if (name != name2) {
            //if name2 is more then 32 characters long, it will be cut off
            if (name2.length > 32) {
              name2 = name2.slice(0, 32);
            }
            target.setNickname(name2);
            const embed = new Discord.MessageEmbed().setDescription(
              `Your nickname has been changed to ${name2} in Gamers React.`
            );
            try {
              target.send({ embeds: [embed] }).catch((error) => {
                console.log(`could not dm user ${name}`);
              });
            } catch {
              message.channel.send(`could not dm <@${target.user.id}>`);
            }
            //channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
            message.channel.send(
              `changed <@${target.user.id}> nickanme to ${name2}`
            );
          } else {
            target.setNickname("");
            message.channel.send(`Reset <@${target.user.id}> nickanme`);
          }
        }
      } catch {
        console.log("Error in CheckName");
        message.channel.send("Error in CheckName");
      }
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};
