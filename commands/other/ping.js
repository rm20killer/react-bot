const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const file = require("../../file.json");
module.exports = {
  name: "ping",
  aliases: ["pong"],
  description: "will show how many tables been flipped",
  usage: "`*ping`",
  example: "`*ping`",
  async execute(message, args) {
    var resMsg = await message.channel.send("Ping is being appreciated...");
    const ping = resMsg.createdTimestamp - message.createdTimestamp;
    //console.log(client.ws.ping);
    resMsg.edit("Ping: " + ping + " ms");
    //message.reply('pong, ' + `${Date.now() - message.createdTimestamp}` + ' ms');
    return;
  },
};

const ping = async (message) => {
  var resMsg = await message.channel.send("Ping is being appreciated...");
  const ping = resMsg.createdTimestamp - message.createdTimestamp;
  //console.log(client.ws.ping);
  resMsg.edit("Ping: " + ping + " ms");
  //message.reply('pong, ' + `${Date.now() - message.createdTimestamp}` + ' ms');
  return;
};
