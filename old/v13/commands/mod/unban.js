/*
  __  __           _         
 |  \/  |         | |    _   
 | \  / | ___   __| |  _| |_ 
 | |\/| |/ _ \ / _` | |_   _|
 | |  | | (_) | (_| |   |_|  
 |_|  |_|\___/ \__,_|                          
*/

const fetch = require("node-fetch");
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");

//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("../../../config");

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

module.exports = {
  name: "unban",
  aliases: ["unban"],
  description: "will unban a user",
  usage: "`*unban <@user> [reason]`",
  example: "`*unban @rm20#2000`",
  async execute(message, args, client) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      // CODE GOES HERE 🡫
      let id = args[0];
      //try {
      //    await message.guild.members.unban(id).catch(error => { message.reply(`Error: Cant unban`); return});
      //} catch {
      //    message.reply(`Error: Cant unban`)
      //    return
      //}
      let target = message.mentions.members.first();
      if (!target) {
        let id = args[0];
        try {
          target = await message.guild.members.fetch(id);
        } catch {}
      }
      if (target) {
        return message.reply(`Error: Cant unban someone that isnt banned`);
      }
      let reason = args.slice(1).join(" ");
      if (!reason) {
        reason = "No Reason Provided";
      }
      channel = client.channels.cache.find(
        (channel) => channel.id === "710123089094246482"
      );
      let time = message.createdTimestamp;
      var date = new Date(time * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      const embed = new Discord.MessageEmbed()
        .setTitle(`[UNBANNED] <@${id}>`)
        .setColor(0xff0000)
        .setDescription(`🔓Unbanned for \`${reason}\``)
        .addField("unbanned by", `<@${message.author.id}>`)
        .setFooter("id: " + id + " | today at " + formattedTime);
      try {
        try {
          await message.guild.members.unban(id).catch((error) => {
            return message.reply(`Error: Cant unban`);
          });
        } finally {
          channel.send({ embeds: [embed] });
          const embed2 = new Discord.MessageEmbed().setDescription(
            `<@${id}> has been unbanned`
          );
          message.channel.send({ embeds: [embed2] });
        }
      } catch {
        message.reply("an error has happened while sending embed");
        return;
      }
    } else {
      message.reply("You lack perms for this command");
    }
  },
};
