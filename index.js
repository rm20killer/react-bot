/* eslint-disable no-inline-comments */

//imports modules
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
  partials: [`CHANNEL`, `MESSAGE`, `REACTION`],
  autoReconnect: true,
});
const { GiveawaysManager } = require("discord-giveaways");
//imports ends

//imports config
const config = require("./config");
client.config = config;
//config ends

//collections started
client.interactions = new Discord.Collection();
client.button = new Discord.Collection();
client.slashcommand = new Discord.Collection();
client.commands = new Discord.Collection();
//collections ended

//import handlers
[`eventHandler`,"commandHandler","buttonHandler", "textCommandsHandler"]
    .filter(Boolean)
    .forEach(h => {
      require(`./handler/${h}`)(client);
});
//import handlers ends

//start client
client.login(config.BotToken);


// giveaway code starts here \\

// Starts updating currents giveaways
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    embedColorEnd: "#000000",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: "⚠️ **LAST CHANCE TO ENTER !** ⚠️",
      threshold: 5000,
      embedColor: "#FF0000",
    },
  },
});

client.giveawaysManager.on("giveawayDeleted", (giveaway) => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === "710123089094246482"
  );
  channel.send(
    "Giveaway with message Id " + giveaway.messageId + " was deleted."
  );
});
// giveaway code ends here \\