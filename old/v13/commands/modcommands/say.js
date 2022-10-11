const Discord = require("discord.js");
const { Client, Intents, MessageAttachment } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const config = require("../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
module.exports = {
  name: "say",
  aliases: ["repeat"],
  description: "will make the bot say something",
  usage: "`*say [text]`",
  example: "`*say you are the best`",
  async execute(message, args) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find(
        (r) => r.id === helper || message.author.id === "214519834606698496"
      )
    ) {
      // CODE GOES HERE 🡫
      const say = message.content.slice(4);
      if (say) {
        message.channel.send(say);
        message.delete().catch((error) => {
          console.log(error);
        });
      } else {
        message.reply("nothing to say");
      }
      return;
    } else {
      message.reply("You lack perms for this command");
    }
  },
};
