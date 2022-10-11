const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../config`);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

module.exports = {
  name: "glist",
  aliases: [`giveawaylist`, `giveawaylist`, `giveaway`, `giveaways`],
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
      if (args[0]) {
        if (args[0] == "all") {
          const allGiveaways = client.giveawaysManager.giveaways;
          console.log(allGiveaways);

          const embed = new Discord.MessageEmbed()
            .setTitle(`All Giveaways`)
            .setColor(`#0099ff`)
            .setDescription(
              `${allGiveaways
                .map(
                  (giveaway) =>
                    `**${giveaway.messageId}**: ${giveaway.prize} end*ed* on ` +
                    unixToDate(giveaway.endAt)
                )
                .join("\n")}`
            );
          message.channel.send({ embeds: [embed] });
        } else if (args[0] == "active") {
          const notEnded = client.giveawaysManager.giveaways.filter(
            (g) => !g.ended
          );
          const embed = new Discord.MessageEmbed()
            .setTitle(`Active Giveaways`)
            .setColor(`#0099ff`)
            .setDescription(
              `${notEnded
                .map(
                  (giveaway) =>
                    `**${giveaway.messageId}**: ${giveaway.prize} end on ` +
                    unixToDate(giveaway.endAt)
                )
                .join("\n")}`
            );
          if (notEnded.length == 0) {
            embed.setDescription(`There are no active giveaways`);
          }
          message.channel.send({ embeds: [embed] });
        }
      } else {
        const notEnded = client.giveawaysManager.giveaways.filter(
          (g) => !g.ended
        );
        const embed = new Discord.MessageEmbed()
          .setTitle(`Active Giveaways`)
          .setColor(`#0099ff`)
          .setDescription(
            `${notEnded
              .map(
                (giveaway) =>
                  `**${giveaway.messageId}**: ${giveaway.prize} end on ` +
                  unixToDate(giveaway.endAt)
              )
              .join("\n")}`
          );
        if (notEnded.length == 0) {
          embed.setDescription(`There are no active giveaways`);
        }
        message.channel.send({ embeds: [embed] });
      }
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};

//turn unix time into a readable date
function unixToDate(unix) {
  var date = new Date(unix * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
}
