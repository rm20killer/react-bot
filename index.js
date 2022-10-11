/* eslint-disable no-inline-comments */

//imports modules
const Discord = require("discord.js");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
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
// [`eventHandler`,"commandHandler","buttonHandler", "textCommandsHandler"]
[`eventHandler`]
    .filter(Boolean)
    .forEach(h => {
      require(`./src/handler/${h}`)(client);
});
//import handlers ends

//start client
client.login(config.BotToken);


// giveaway code starts here \\

// Starts updating currents giveaways
// client.giveawaysManager = new GiveawaysManager(client, {
//   storage: "./giveaways.json",
//   default: {
//     botsCanWin: false,
//     embedColor: "#FF0000",
//     embedColorEnd: "#000000",
//     reaction: "🎉",
//     lastChance: {
//       enabled: true,
//       content: "⚠️ **LAST CHANCE TO ENTER !** ⚠️",
//       threshold: 5000,
//       embedColor: "#FF0000",
//     },
//   },
// });

// client.giveawaysManager.on("giveawayDeleted", (giveaway) => {
//   const channel = client.channels.cache.find(
//     (channel) => channel.id === "710123089094246482"
//   );
//   channel.send(
//     "Giveaway with message Id " + giveaway.messageId + " was deleted."
//   );
// });
// giveaway code ends here \\