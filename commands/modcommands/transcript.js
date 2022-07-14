const Discord = require("discord.js");
const { Client, Intents, MessageAttachment } = require("discord.js");
const discordTranscripts = require("discord-html-transcripts");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const config = require("../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
module.exports = {
  name: "transcript",
  aliases: ["script"],
  description: "will create an transcript",
  usage: "`*transcript [number]`",
  example: "`*transcript 50`",
  async execute(message, args) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      // CODE GOES HERE 🡫
      if (args[0]) {
        //message.reply("getting specific amount is currenly broken.");
        //check if args[0] is a number
        if (isNaN(args[0])) {
          message.reply("please enter a number");
          return;
        }
        let amount = args[0];
        const channel = message.channel;
        if (amount < 100) {
          const attachment = await discordTranscripts.createTranscript(channel);
          message.reply({
            content: `trascript for <#${channel.id}>`,
            files: [attachment],
          });
        } else {
          const messages = await fetchMore(channel, amount);
          const attachment = await discordTranscripts.generateFromMessages(
            messages,
            channel
          );
          channel.send({
            content: `trascript for <#${channel.id}>`,
            files: [attachment],
          });
        }
      } else {
        const channel = message.channel;
        const attachment = await discordTranscripts.createTranscript(channel);
        message.reply({
          content: `trascript for <#${channel.id}>`,
          files: [attachment],
        });
      }
    } else {
      message.reply("You lack perms for this command");
    }
  },
};

async function fetchMore(channel, limit = 250) {
  if (!channel) {
    throw new Error(`Expected channel, got ${typeof channel}.`);
  }
  if (limit <= 100) {
    return channel.messages.fetch({
      limit,
    });
  }

  let collection = new Discord.Collection();
  let lastId = null;
  let options = {};
  let remaining = limit;

  while (remaining > 0) {
    options.limit = remaining > 100 ? 100 : remaining;
    remaining = remaining > 100 ? remaining - 100 : 0;

    if (lastId) {
      options.before = lastId;
    }

    let messages = await channel.messages.fetch(options);

    if (!messages.last()) {
      break;
    }

    collection = collection.concat(messages);
    lastId = messages.last().id;
  }
  return collection;
}
