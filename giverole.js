/* eslint-disable no-inline-comments */

const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
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
const config = require("./config");
//bot
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`your clips`, { type: "WATCHING" });
});
const memberrole = "710128390547701876";

const pronoun = "994725428415701152"
const notification = "994724549209899073"
const level = "994724373120426107"
const special = "994724909525770333"
const staff = "857763887713353758"


//user message
client.on("message", async (message) => {
  //if message is "startRole"
  //if message not from admin return
  if (message.author.bot) return;
  if (message.content === "([*!*])startRole") {
    // fetch all members without a role
    const members = await message.guild.members.fetch({
    });
    console.log(members.size);

    const totalMembers = message.guild.memberCount;
    console.log(totalMembers);
    console.log(members.size);
    // message.channel.send(`giving ${members.size} memeber role out of ${totalMembers} total members`);
    let count = 0;
    let failed = 0;
    //for each member
    await members.forEach(async (member) => {
      //if member does not have member role
      if (member.roles.cache.has(memberrole)) {
        try {
          member.roles.add(pronoun);
          member.roles.add(notification);
          member.roles.add(level);
          const isSpecialBool = await isSpecial(member);
          if (isSpecialBool) {
            member.roles.add(special);
          }
          count++;
        } catch {
          console.log("adding member role error");
          failed++;
          return;
        }
      }
    });
    console.log(`${count} members got the role`);
    console.log(`${totalMembers - count} members did not get the role`);
    message.channel.send(`${count} members got the role`);
    message.channel.send(`failed to give ${failed} members the role`);
  }
});

// client.login(process.env.token);
client.login(config.BotToken);

async function isSpecial(member) {
  if (member.roles.cache.find((r) => r.name === "Server Booster")) {
    return true
  }
  if (member.roles.cache.find((r) => r.name === "Streamers")) {
    return true
  }
  if (member.roles.cache.find((r) => r.name === "Giveaway Sponsor")) {
    return true
  }
  if (member.roles.cache.find((r) => r.name === "Event winners")) {
    return true
  }
  if (member.roles.cache.find((r) => r.name === "Influencer")) {
    return true
  }
  return false
}