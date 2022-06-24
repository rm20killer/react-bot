/* eslint-disable no-inline-comments */

const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
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

const fetch = require("node-fetch");
const mongose = require("mongoose");
const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");
const wait = require("util").promisify(setTimeout);
const { GiveawaysManager } = require("discord-giveaways");
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

const users = {};

// ["commandHandler","buttonHandler"]
//     .filter(Boolean)
//     .forEach(h => {
//       require(`./handler/${h}`)(client);
// });

const config = require("./config");
client.config = config;
const prefixl = config.prefix;
const youtubeKey = config.youtubeKey;
const youtubeUser = config.youtubeUser;
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
const Hprefixl = config.Hprefixl;
const memberRole = "710128390547701876";
//Discord.js v13+ is needed for this to work

//required
client.interactions = new Discord.Collection();

client.button = new Discord.Collection();
const buttonFolders = fs
  .readdirSync("./interaction/Buttons/")
  .filter((file) => file.endsWith(".js"));
for (const file of buttonFolders) {
  const button = require(`./interaction/Buttons/${file}`);
  client.button.set(button.customId, button);
}

client.slashcommand = new Discord.Collection();
const slashcommandFolder = fs
  .readdirSync(`./interaction/slashcommand`)
  .filter((file) => file.endsWith(".js"));

const commands = [];
for (const file of slashcommandFolder) {
  const slashcommand = require(`./interaction/slashcommand/${file}`);
  commands.push(slashcommand.data.toJSON());
  client.slashcommand.set(slashcommand.data.name, slashcommand);
}
client.once("ready", () => {
  // Registering the commands in the client
  const rest = new REST({
    version: "9",
  }).setToken(client.config.BotToken);
  (async () => {
    try {
      if (client.config.slashGlobal || !client.config.testGuildID) {
        await rest.put(Routes.applicationCommands(client.user.id), {
          body: commands,
        });
        console.log("Loaded Slash Commands (GLOBAL)");
      } else {
        await rest.put(
          Routes.applicationGuildCommands(
            client.user.id,
            client.config.testGuildID
          ),
          {
            body: commands,
          }
        );
        console.log("Loaded Slash Commands (DEVELOPMENT)");
      }
    } catch (e) {
      console.error(e);
    }
  })();
});
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`);
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

const dmchecker = require("./AutoMod/Checks/dmchecker");
const antiw = require("./AutoMod/Checks/malchecker");
const submitclip = require("./AutoMod/submitclip");
const streamerrole = require("./AutoMod/streamerrole");
const accountchecker = require("./AutoMod/Checks/accountchecker");
const attachmentD = require("./AutoMod/attachment");
const youtubechecker = require("./AutoMod/Checks/youtubeChecker");
const { youtube } = require("./AutoMod/Checks/youtubeChecker");
const table = require("./AutoMod/tablechecker");
const userjoined = require("./AutoMod/UserJoined");
const mutechecker = require("./AutoMod/Checks/mutecheck");
const pingriz = require("./AutoMod/pingriz");
const perspective = require("./AutoMod/perspective.js");
const ReactionChecker = require("./AutoMod/Checks/ReactionChecker");
const CheckName = require("./AutoMod/Checks/CheckName");
const rolechecker = require("./AutoMod/Checks/rolechecker");
const bancheck = require("./AutoMod/Checks/bancheck");

const interactionFile = require("./interaction/interaction");

//const detector = require('./commands/others/detector')
// const ticketmanger = require('./old/ticketmanger');
// const slashcommand = require('./old/slashcommand');
// const selectmenu = require('./old/selectmenu');
// const contextmenu = require('./old/contextmenu');
// const button = require('./old/button');

const mee6 = require("./Other/mee6");
const gameCheck = require("./AutoMod/Keeprunning/games");
//database

/* 
mongose.connect(config.Mongoose_SRV,{ 
    useNewUrlParser:true, 
    useUnifiedTopology:true 
}).then(()=>{ 
    console.log("connected to the database") 
}).catch((error)=>{console.log(error)}); 
*/

//bot
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`your clips`, { type: "WATCHING" });
  mutechecker.mutechecker(client);
  bancheck.backcheck(client);
  gameCheck.gameCheck(client);
});

////////////////////////////////////////////////
// user join
client.on("guildMemberAdd", async (member) => {
  //console.log("guildMemberAdd works")
  //accountchecker.accountchecker(client,member);
  userjoined.userjoined(member, client);
  CheckName.CheckName(member, client);
  return;
});

client.on("messageCreate", async (message) => {
  //console.log(message)
  if (message.guild === null) {
    //console.log(message)
    //dm checker
    dmchecker.dmchecker(message, client);
    return;
  }

  try {
    var channelParent = message.channel.parent.id;
    var channelparname = message.channel.parent.name;
  } catch {
    var channelParent = null;
  }
  try {
    var role = message.member.roles.cache;
  } catch {
    var role = null;
  }
  //if role is null then return
  if (role === null) {
    //const channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
    //let messageContent = "**no message**"
    //messageContent = message.content
    //const embed = new Discord.MessageEmbed()
    //    .setDescription(`${message.author.tag} has no role but sent a message in ${message.channel.name}`);
    console.log(
      `${message.author.tag} has no role but sent a message in #${message.channel.name}`
    );
    //channel.send({ embeds: [embed] })
    return;
  }

  if (
    message.guild.id === "629695220065239061" ||
    message.guild.id === "898628981958537266"
  ) {
    if (role !== null) {
      if (
        message.member.roles.cache.find((r) => r.id === "712512117999271966")
      ) {
        if (
          message.member.roles.cache.find((r) => r.name === modid) ||
          message.member.roles.cache.find((r) => r.name === adminid) ||
          message.member.roles.cache.find((r) => r.id === helper)
        ) {
        } else {
          if (channelParent != "858354610367627284") {
            message.delete().catch((error) => {
              console.log(error);
            });
          }
        }
      }
    }
    if (message.author.id === client.user.id) return;
    if (message.channel.id === "629695352454250508") {
      const channel = client.channels.cache.find(
        (channel) => channel.id === "707304184524832879"
      );
      channel.send("Reminder: Publish message in <#629695352454250508>");
    }

    if (
      channelparname == "────💬 chatting 💬────" ||
      channelparname == "────Bot commands────" ||
      channelparname == "────🛠Support🛠────" ||
      channelparname == "────Voice Channels────"
    ) {
      const messa = message.content.toLowerCase();
      //anti maleware
      antiw.antiworm(messa, message, client);
      //ping checker
      pingriz.pingriz(messa, message, client);

      //FAQbot but Submit clips
      submitclip.submitclip(messa, message, client);
      //FAQbot but Streamer role
      streamerrole.streamerrole(messa, message, client);
      if (messa.includes("i am")) {
        const mess = messa.split(/i am(.+)/)[1];
        if (mess === undefined) {
          return;
        }
        //message.reply("Hi,"+ mess +" I am React Bot")
      } else if (messa.includes("i'm")) {
        const mess = messa.split(/i'm(.+)/)[1];
        if (mess === undefined) {
          return;
        }
        //message.reply("Hi,"+ mess +" I'm React Bot")
      }
    }
    if (message.channel.id === "886864421140447232") {
      const messa = message.content.toLowerCase();
      if (messa.startsWith("thred")) {
      } else {
        if (
          message.member.roles.cache.find((r) => r.name === modid) ||
          message.member.roles.cache.find((r) => r.name === adminid) ||
          message.member.roles.cache.find((r) => r.id === helper)
        ) {
        } else {
          message.delete().catch((error) => {
            console.log(error);
          });
        }
      }
    }
  }
  let attachments = Array.from(message.attachments);
  let attachmentss = attachments[0];
  if (attachmentss) {
    const attachment = attachmentss[1];
    //console.log(attachment[1])
    attachmentD.attachmentexe(attachment, message);
  }
  if (channelParent === "906533207812476988") {
    if (attachmentss) {
      const attachment = attachmentss[1];
      attachmentD.imagechecker(attachment, message);
    } else {
      if (
        message.member.roles.cache.find((r) => r.name === modid) ||
        message.member.roles.cache.find((r) => r.name === adminid) ||
        message.member.roles.cache.find((r) => r.id === helper)
      ) {
      } else {
        message.delete().catch((error) => {
          console.log(error);
        });
      }
    }
  }
  if (channelparname != "────🛠Support🛠────") {
    if (channelparname != "──────🚨 mods 🚨──────") {
      var regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
      if (regexp.test(message.content)) {
        // at least 2 words consisting of letters
        perspective
          .analyzeText(message.content, message, client)
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
  //if(message.author.id==="646180114756796442"){
  //    message.reply("The Person Above Smells")
  //}

  //detector.detector(client,message,users)
  ////////////////////////////////////////////////
  //commands
  table.table(client, message);
  if (message.content.startsWith(prefixl)) {
    const args = message.content.slice(prefixl.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;
    try {
      console.log(`${message.content} sent by ${message.author.tag}`);
      command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      return message.reply(error);
    }
  }
  if (message.content.startsWith("!")) {
    mee6.mee6(client, message);
  }
  //if (!message.content.startsWith(prefixl)) return;
  //const args = message.content.trim().split(/ +/g);
  //const cmd = args[0].slice(prefixl.length).toLowerCase();
  //cmds.commands(cmd,args,message,client);
});

////////////////////////////////////////////////
// roles
client.on("guildMemberUpdate", async function (oldMember, newMember) {
  if (newMember.pending === false) {
    try {
      newMember.roles.add(memberRole).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
      return;
    }
  }
  if (newMember.guild.id != "629695220065239061") {
    return;
  }
  if (newMember.guild.id === "629695220065239061") {
    rolechecker.rolecheck(oldMember, newMember, client);
  }
});

//client on reaction
client.on("messageReactionAdd", async function (reaction, user) {
  // When a reaction is received, check if the structure is partial
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  ReactionChecker.ReactionChecker(reaction, user, client);
});

client.on("interactionCreate", async function (interaction) {
  interactionFile.execute(interaction, client);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  // Old message may be undefined
  if (!oldMessage.author) return;
  if (oldMessage.channel.id === "886864421140447232") {
    const messa = newMessage.content.toLowerCase();
    if (messa.startsWith("thred")) {
    } else {
      //newMessage.delete().catch(error => {console.log(error)});
      if (
        newMessage.member.roles.cache.find((r) => r.name === modid) ||
        newMessage.member.roles.cache.find((r) => r.name === adminid)
      ) {
      } else {
        newMessage.delete().catch((error) => {
          console.log(error);
        });
      }
    }
  }
});

// client.login(process.env.token);
client.login(config.BotToken);
client.giveawaysManager.on("giveawayDeleted", (giveaway) => {
  const channel = client.channels.cache.find(
    (channel) => channel.id === "710123089094246482"
  );
  channel.send(
    "Giveaway with message Id " + giveaway.messageId + " was deleted."
  );
});

client.on("voiceStateUpdate", (oldState, newState) => {
  //return
  console.log("user joined vc");
  const txtChannel = client.channels.cache.get("966101775226634340"); //manually input your own channel
  const newChannelID = newState.channelId;
  const oldChannelID = oldState.channelId;
  if (newChannelID == oldChannelID) return;
  //console.log(oldState)
  if (oldChannelID === "629695220065239066") {
    //manually put the voice channel ID
    txtChannel.send(`role removed - ${newState.id}`);
    let role = newState.guild.roles.cache.get("966097737823178762"); //added this
    newState.member.roles.remove(role).catch(console.error);
  } else if (newChannelID === "629695220065239066") {
    txtChannel.send(`role given - ${newState.id}`);
    let role = oldState.guild.roles.cache.get("966097737823178762"); //change this somewhat
    oldState.member.roles.add(role).catch(console.error); //adding a catch method is always good practice
  }
});
