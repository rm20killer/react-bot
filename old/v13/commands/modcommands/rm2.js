const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const config = require("../../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
module.exports = {
  name: "rm2",
  aliases: ["rm2"],
  description: "rm2",
  usage: "`*rm2`",
  example: "`*rm2`",
  async execute(message, args) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      // CODE GOES HERE 🡫
      message.channel.send(
        "https://media.giphy.com/media/eiNLAAmHNZuy5nsKKq/giphy.gif"
      );
      message.delete().catch((error) => {
        console.log(error);
      });
    } else {
      message.reply("You lack perms for this command");
    }
  },
};
