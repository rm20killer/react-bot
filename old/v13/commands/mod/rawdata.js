const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const fs = require("fs");
const { AmariBot } = require("amaribot.js");

const config = require(`../../../config`);
const mongo = require("../../src/utils/mongo");
const warnSchema = require("../../Models/warn-schema");
const muteSchema = require("../../Models/mute-schema");
const kickSchema = require("../../Models/kick-schema");

const amaribot = new AmariBot(config.amariAPIKey);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

module.exports = {
  name: "rawdata",
  aliases: [`rawData`],
  description: "get raw data of a user",
  usage: "`*rawData <@user>]`",
  example: "``",
  async execute(message, args, client) {
    if (message.member.roles.cache.find((r) => r.name === adminid)) {
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

      const warnings = await getInfractionsDetial(message, target);
      const mutes = await getMuteDetial(message, target);
      const kicks = await getkickDetial(message, target);

      //console.log(warnings)
      //console.log(mutes)
      //console.log(kicks)
      let level;
      try {
        level = await amaribot.getUserLevel(message.guildId, target.id);
      } catch (error) {
        console.log(error);
        level = {
          level: "error",
          error: error,
        };
      }

      //console.log(level)
      //combine all the data
      let combined = {
        user: target,
        level,
        warnings: warnings,
        mutes: mutes,
        kicked: kicks,
      };
      //covert to json
      let json = JSON.stringify(combined, null, 2);
      //fomat the json
      //let formatted = JSON.parse(json)

      //save json to file tempararyly
      fs.writeFile(`./temp/rawdata.json`, json, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
      //send file to user
      const attachment = await new Discord.MessageAttachment(
        `./temp/rawdata.json`,
        `RawData-${target.id}.json`
      );
      message.reply({
        content: `Here is the raw data for ${target.user.tag}`,
        files: [attachment],
      });
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};

const getInfractionsDetial = async (message, target) => {
  const guildId = message.guildId;
  const userId = target.id;
  let results;
  await mongo().then(async (mongoose) => {
    try {
      const results = await warnSchema.findOne({
        guildId,
        userId,
      });
      result = !results
        ? {
            warnings: ["No warnings"],
          }
        : {
            warnings: results.warnings,
          };
    } catch (error) {
      console.log(error);
    }
  });
  //console.log(result)
  return result;
};
const getMuteDetial = async (message, target) => {
  const guildId = message.guildId;
  const userId = target.id;
  let results;
  await mongo().then(async (mongoose) => {
    try {
      const results = await muteSchema.findOne({
        guildId,
        userId,
      });
      //console.log(results)
      result = !results
        ? {
            mutes: ["No mutes"],
          }
        : {
            mutes: results.mutes,
            expires: results.expires,
            createdAt: results.createdAt,
            updatedAt: results.updatedAt,
            current: results.current,
          };
    } catch (error) {
      console.log(error);
    }
  });
  //console.log(result)
  return result;
};

const getkickDetial = async (message, target) => {
  const guildId = message.guildId;
  const userId = target.id;
  let results;
  await mongo().then(async (mongoose) => {
    try {
      const results = await kickSchema.findOne({
        guildId,
        userId,
      });
      //console.log(results)
      result = !results
        ? {
            kicks: ["No kicks"],
          }
        : {
            kicks: results.kicks,
          };
    } catch (error) {
      console.log(error);
    }
  });
  //console.log(result)
  return result;
};
