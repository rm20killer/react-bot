const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../../config`);
const { AmariBot, Leaderboard } = require("amaribot.js");

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
const amaribot = new AmariBot(config.amariAPIKey);

const levelrank = {
  5: "994314077939712030",
  10: "994314167181918259",
  20: "994314192880410714",
  30: "994314203034824874",
  40: "994314309054255145",
  50: "994314345322401883",
  75: "994314359171985488",
  100: "994314373663293560",
};
module.exports = {
  name: "amari",
  aliases: [`amari`],
  description: "amari",
  usage: "`amari`",
  example: "amari``",
  async execute(message, args, client) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      // CODE GOES HERE 🡫

      let total = 0;
      let failed = 0;
      let skipped = 0;
      let Leaderboard = await amaribot.getGuildLeaderboard(message.guildId, {
        limit: 200,
      });
      let users = Leaderboard.data;
      //for each user in the leaderboard
      message.reply(`giving rank roles for ${users.length} users`);
      for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let userId = user.id;
        let userLevel = user.level;
        let roundeduserLevel;
        //round down user level to nearest 10 if under 50
        if (userLevel < 50) {
          //if over 5 but less than 10 round down to 5
          if (userLevel > 5 && userLevel < 10) {
            roundeduserLevel = 5;
          } else {
            roundeduserLevel = Math.floor(userLevel / 10) * 10;
          }
        }

        //console.log(highestLevelRank);
        //find the role for the user's level
        let role = levelrank[roundeduserLevel];

        //if role is not undefined
        if (role) {
          //check if user is in the discord
          let member = message.guild.members.cache.find((m) => m.id === userId);
          if (member) {
            let rankrole = message.guild.roles.cache.find((r) => r.id === role);
            member.roles.add(rankrole);
            console.log(`added ${rankrole.name} to ${member.user.tag}`);
          } else {
            failed++;
          }
        } else {
          skipped++;
        }
        console.log(`${userId} - ${userLevel} - ${roundeduserLevel} - ${role}`);
      }
      message.reply(
        `finished giving rank roles for ${
          users.length
        } users \n- ${failed} failed \n- ${skipped} skipped \n- ${
          total - failed - skipped
        } successful`
      );
      //console.log(Leaderboard);
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};
