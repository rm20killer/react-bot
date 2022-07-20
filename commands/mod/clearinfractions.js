/*
  __  __           _         
 |  \/  |         | |    _   
 | \  / | ___   __| |  _| |_ 
 | |\/| |/ _ \ / _` | |_   _|
 | |  | | (_) | (_| |   |_|  
 |_|  |_|\___/ \__,_|                          
*/

const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../config`);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
const srmods = config.srmods;

const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../../utils/Database/sequelize");
const WarnSchema = require("../../utils/Database/Models/warn-schema")(
  sequelize,
  DataTypes
);
module.exports = {
  name: "clearinfractions",
  aliases: [`removewarning`, "removeinfractions", "clearwarning"],
  description: "remove warnings from a user",
  usage: "`*clearinfractions <@user> <infraction number>`",
  example: "``",
  async execute(message, args, client) {
    if (
      message.member.roles.cache.find((r) => r.id === srmods) ||
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
      if (!args[1]) {
        return message.reply("No warn id found");
      }

      let lastElement1 = args.slice(-1)[0];
      const Lastarray = lastElement1.split("");
      if (Lastarray[0] === "-") {
        //console.log(Lastarray)
        if (Lastarray.length > 2) {
        } else {
          //var dmed=0
          try {
            if (Lastarray[1] === "a") {
              removeall(message, target, args).catch((error) => {
                console.log(error);
              });
            }
          } catch {
            console.log(`failed to clear warns for ${target.user.tag}`);
            message.reply(`failed to clear warns for ${target.user.tag}`);
          }
          return;
        }
      } else {
        let warnId = parseInt(args[1]);
        if (warnId != 0) {
          if (!warnId) {
            return message.reply("No warn id found");
          }
        }
        removeOne(message, target, args, warnId);
      }
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};
const removeall = async (message, target, args) => {
  const guildId = message.guildId;
  const userId = target.id;
  let passed = false;
  try {
    WarnSchema.destroy({ where: { guildId: guildId, userId: target.id } });
    passed = true;
  } catch (error) {
    console.log(error);
    return message.reply(`failed to clear warns for ${target.user.tag}`);
  } finally {
    if (!passed) {
      return;
    }
    avatarURL = target.user.avatarURL({ format: "png" });
    const embed = new Discord.MessageEmbed()
      .setAuthor({
        name: `removed all warning for ${target.user.tag}`,
        iconURL: avatarURL,
      })
      .setColor(0x0774f8)
      .addField("executor", `${message.author.tag}`)
      .setFooter({ text: "id: " + target.id });
    message.reply({ embeds: [embed] });
  }
};

const removeOne = async (message, target, args, warnId) => {
  const guildId = message.guildId;
  const userId = target.id;
  let passed = false;
  try {
    let warnings = await WarnSchema.findOne({
      where: { guildId: guildId, userId: target.id },
    });
    if (warnings) {
      let newWarning = warnings.warnings;
      if (newWarning[warnId]) {
        newWarning.splice(warnId, 1);
      } else {
        return message.reply(`No warn id found`);
      }
      await WarnSchema.update(
        { warnings: newWarning },
        { where: { guildId: guildId, userId: target.id } }
      );
    }
    passed = true;
  } catch (error) {
    console.log(error);
    return message.reply(`failed to clear warns for ${target.user.tag}`);
  } finally {
    if (!passed) {
      return;
    }
    avatarURL = target.user.avatarURL({ format: "png" });
    const embed = new Discord.MessageEmbed()
      .setAuthor({
        name: `${target.user.tag} infractions removed by ${message.author.tag}`,
        iconURL: avatarURL,
      })
      .setColor(0x0774f8)
      .addField("reason", `${reason}`)
      .addField("original mod", `<@${author}>`)
      .addField("At time", `<t:${timestamp}:f>`)
      .setFooter({ text: "id: " + target.id });
    message.reply({ embeds: [embed] });
  }
};
