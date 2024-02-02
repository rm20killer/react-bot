const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const config = require("../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
module.exports = {
  name: "userinfo",
  aliases: ["userinfo"],
  description: "userinfo",
  usage: "`*userinfo`",
  example: "`*userinfo`",
  async execute(message, args) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
        let member = message.mentions.members.first();
        if (!member) {
          let id = args[0];
          try {
            member = await message.guild.members.fetch(id);
          } catch {
            return message.reply(`I can't find that member`);
          }
        }
        if (!member) {
          return message.reply(`I can't find that member`);
        }

        console.log(member);
    } else {
      message.reply("You lack perms for this command");
    }
  },
};
