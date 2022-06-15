const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../config`);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

const fs = require("fs");

const datafile = require(`../../utils/votedata.json`);
module.exports = {
  name: "votedata",
  aliases: [`getvotedata`],
  description: "",
  usage: "``",
  example: "``",
  async execute(message, args, client) {
    // CODE GOES HERE 🡫
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      //create 10 variables for the 10 votes
      let vote = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const dataArray = JSON.parse(fs.readFileSync(`./utils/votedata.json`));
      let data = dataArray.data;

      //get the voteID of all the votes
      for (let i = 0; i < data.length; i++) {
        vote[data[i].voteID - 1]++;
      }
      //create an emebed for the votes
      const embed = new Discord.MessageEmbed()
        .setTitle("Vote Data")
        .setColor("#0099ff");
      embed.addField(`Total Votes`, `${data.length + 1}`, false);

      //create a for loop to add the voteID to the embed
      for (let i = 0; i < vote.length; i++) {
        embed.addField(`Vote ${i + 1}`, `${vote[i]}`, true);
      }
      //send the embed & votedata.json file to the channel
      message.reply({
        embeds: [embed],
        files: [{ attachment: `./utils/votedata.json`, name: `votedata.json` }],
      });
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};
