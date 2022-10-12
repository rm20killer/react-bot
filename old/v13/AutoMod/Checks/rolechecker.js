const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const config = require("../../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

module.exports = {
  rolecheck: function (oldMember, newMember, client) {
    console.log("role checking - " + newMember.id);
    const hadRole = oldMember.roles.cache.find(
      (role) => role.name === "Server Booster"
    ); //Server Booster
    const hasRole = newMember.roles.cache.find(
      (role) => role.name === "Server Booster"
    ); //Server Booster

    const shadRole = oldMember.roles.cache.find(
      (role) => role.name === "Streamers"
    ); //Streamers
    const shasRole = newMember.roles.cache.find(
      (role) => role.name === "Streamers"
    ); //Streamers

    const boostemote = client.emojis.cache.get(`832556719770566657`);
    //streamers
    if (!shadRole && shasRole) {
      newMember.guild.channels.cache
        .get("841018811657355354")
        .send("<@" + newMember.id + "> has gotten into a Gamers React video.");
      return;
    }
    //Server Booster
    if (!hadRole && hasRole) {
      newMember.guild.channels.cache
        .get("788078716546318418")
        .send(`${boostemote} ` + newMember.displayName + " boosted the server");
      newMember.roles.add("830069139770441728");
      return;
    }
    //does nothing if mod
    if (
      newMember.roles.cache.find((r) => r.name === modid) ||
      newMember.roles.cache.find((r) => r.name === adminid) ||
      newMember.roles.cache.find((r) => r.id === helper)
    ) {
      return;
    }
    //dj remove when not boosting
    if (hadRole && !hasRole) {
      //console.log("removing DJ")
      newMember.roles.remove("830069139770441728");
    }
  },
};
