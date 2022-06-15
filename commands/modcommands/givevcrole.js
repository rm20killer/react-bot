const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../config`);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

module.exports = {
  name: "givevcrole",
  aliases: [``],
  description: "",
  usage: "``",
  example: "``",
  async execute(message, args, client) {
    // CODE GOES HERE 🡫
    let i = 0;
    let role = message.guild.roles.cache.get("966097737823178762"); //added this
    let channelID = "629695220065239066";
    message.guild.channels.cache.get(channelID).members.forEach((member) => {
      //give role
      //if member has role skip
      if (member.roles.cache.find((r) => r.id === "966097737823178762")) {
      } else {
        i++;
        member.roles.add(role).catch(console.error);
      }
    });
    message.channel.send(`Success! I gave ${i} VC roles!`);
  },
};
