/*
  __  __           _         
 |  \/  |         | |    _   
 | \  / | ___   __| |  _| |_ 
 | |\/| |/ _ \ / _` | |_   _|
 | |  | | (_) | (_| |   |_|  
 |_|  |_|\___/ \__,_|                          
*/
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});
const config = require("../../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
module.exports = {
  name: "createvoicechat",
  aliases: ["createvc"],
  description: "will create voice chats",
  usage: "`*createvc <number> [max]`",
  example: "`*createvc 5 2`",
  async execute(message, args) {
    if (args[0] === null) {
      return;
    }
    message.reply("Creating channels");
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      // CODE GOES HERE 🡫
      let num = parseInt(args[0]);
      if (args[1]) {
        let max = parseInt(args[1]);
        if (num) {
          for (var x = 1; x <= num; x++) {
            createChannel(x, message, max);
          }
        }
      } else {
        if (num) {
          for (var x = 1; x <= num; x++) {
            createChannel(x, message);
          }
        }
      }
      message.reply(num + "   channels created");
    } else {
      message.reply("You lack perms for this command");
    }
  },
};

async function createChannel(x, message) {
  message.guild.channels
    .create(`7663 party-${x}`, {
      type: "GUILD_VOICE",
      bitrate: 8000,
    })
    .then(async (c) => {
      let parent = "934125042348986368";
      await c.setParent(parent);
      //await c.setTopic("53747265616d65722047616d6573")
    });
}

async function createChannel(x, message, max) {
  message.guild.channels
    .create(`7663 party-${x}`, {
      type: "GUILD_VOICE",
      bitrate: 8000,
      userLimit: max,
    })
    .then(async (c) => {
      let parent = "934125042348986368";
      await c.setParent(parent);
      //await c.setTopic("53747265616d65722047616d6573")
    });
}
