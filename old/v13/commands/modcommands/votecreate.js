const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../config`);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

const imageData = [
  "https://cdn.discordapp.com/attachments/982977292747808798/982977874837524500/unknown.png",
  "https://cdn.discordapp.com/attachments/982977292747808798/982977928272949268/unknown.png",
  "https://cdn.discordapp.com/attachments/982977292747808798/982977956760653875/unknown.png",
  "https://cdn.discordapp.com/attachments/982977292747808798/982977999420940328/unknown.png",
  "https://cdn.discordapp.com/attachments/982977292747808798/982978018693754890/unknown.png",
  "https://cdn.discordapp.com/attachments/982977292747808798/982978035022176306/unknown.png",
  "https://cdn.discordapp.com/attachments/982977292747808798/982978195701764136/unknown.png",
  "https://cdn.discordapp.com/attachments/982977292747808798/982978210511867944/unknown.png",
  "https://cdn.discordapp.com/attachments/982977292747808798/982978234989838356/unknown.png",
  "https://cdn.discordapp.com/attachments/982977292747808798/982978250932383844/unknown.png",
];

module.exports = {
  name: "votecreate",
  aliases: [`createvote`],
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
      //create 10 buttons
      let buttons = [];
      for (let i = 1; i <= 10; i++) {
        buttons.push(
          new Discord.MessageButton()
            .setStyle(`SUCCESS`)
            .setCustomId(`vote-${i}`)
            .setLabel(`Vote ${i}`)
        );
      }
      //create a row and assign first 5 buttons to it
      let row = new Discord.MessageActionRow();
      for (let i = 0; i < 5; i++) {
        row.addComponents(buttons[i]);
      }
      //create a row and assign last 5 buttons to it
      let row2 = new Discord.MessageActionRow();
      for (let i = 5; i < 10; i++) {
        row2.addComponents(buttons[i]);
      }
      //create a message and assign the menu to it
      let embed = new Discord.MessageEmbed()
        .setTitle(`Vote Creation`)
        .setDescription(`Please select a vote to create`)
        .setColor(`#0099ff`);

      //for each imageData create an field and assign it to the embed
      for (let i = 0; i < imageData.length; i++) {
        embed.addField(`Vote ${i + 1}`, `(${imageData[i]})`);
      }
      //send the message with the menu
      message.channel.send({ embeds: [embed], components: [row, row2] });
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};
