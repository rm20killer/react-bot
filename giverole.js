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

const pronoun = "994725428415701152";
const notification = "994724549209899073";
const level = "994724373120426107";
const special = "994724909525770333";
const staff = "857763887713353758";

//user message
client.on("message", async (message) => {
  //if message is "startRole"
  //if message not from admin return
  if (message.author.bot) return;
  if (message.content === "([*!*])startRole") {
    // fetch all members without a role
    const members = await message.guild.members.fetch({
      //filter for members without member role
      filter: (m) => m.roles.cache.find((r) => r.id === "926624669799424051"),
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
      //check if member is special
      if (isSpecial(member)) {
        //check if member has special role
        if (!member.roles.cache.find((r) => r.id === special)) {
          //if not give special role
          try {
            await member.roles.add(special).catch((error) => {
              console.log(error);
              failed++;
            });
          } catch (error) {
            console.log(error);
            failed++;
          }
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
    return true;
  }
  if (member.roles.cache.find((r) => r.name === "Streamers")) {
    return true;
  }
  if (member.roles.cache.find((r) => r.name === "Giveaway Sponsor")) {
    return true;
  }
  if (member.roles.cache.find((r) => r.name === "Event winners")) {
    return true;
  }
  if (member.roles.cache.find((r) => r.name === "Influencer")) {
    return true;
  }
  return false;
}
