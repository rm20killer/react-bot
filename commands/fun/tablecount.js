const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const file = require("../../file.json");
module.exports = {
  name: "tablecount",
  aliases: ["tc"],
  description: "will show how many tables been flipped",
  usage: "`*tablecount`",
  example: "`*tablecount`",
  async execute(message, args) {
    message.reply(file.tableflip + " tables have been fliped");
  },
};
