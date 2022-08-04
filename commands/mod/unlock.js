/*
  _    _      _                         
 | |  | |    | |                    _   
 | |__| | ___| |_ __   ___ _ __   _| |_ 
 |  __  |/ _ \ | '_ \ / _ \ '__| |_   _|
 | |  | |  __/ | |_) |  __/ |      |_|  
 |_|  |_|\___|_| .__/ \___|_|           
               | |                      
               |_|                      
*/
const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../config`);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

module.exports = {
  name: "unlock",
  aliases: [``],
  description: "unlock a the discord channel",
  usage: "`unlock`",
  async execute(message, args, client) {
    // CODE GOES HERE 🡫
    let counter = 0;
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      //create emebed
      const embed = new Discord.MessageEmbed()
        .setTitle("Unlocking the server")
        .setDescription("Unlocking the server...")
        .setAuthor(
          "Gamers React",
          "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
        )
        .setColor(0x00ae86);
      //fetch all channels
      const memberRole = await message.guild.roles.cache.find(
        (r) => r.id === "710128390547701876"
      );
      const channels1 = await message.guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_TEXT"
      );
      //console.log(channels1)
      //loop through all channels
      for (const channel of channels1) {
        //is channel in catoargy
        //console.log(channel[1].name)
        if (
          channel[1].parentId === "629695220065239063" ||
          channel.parentID === "716754944472121516"
        ) {
          if (
            channel[1].id === "788078716546318418" ||
            channel[1].id === "906508002796925009"
          ) {
          } else {
            //console.log(channel)
            //make channel read only
            //fetch channel
            const channel1 = await message.guild.channels.cache.find(
              (ch) => ch.id === channel[1].id
            );
            channel1.permissionOverwrites.edit(memberRole, {
              SEND_MESSAGES: true,
            });
            //ADD one to the counter
            counter++;
            //send emebed
            channel1.send({ embeds: [embed] });
          }
        }
      }
      //send message
      message.channel.send(`Unlocked ${counter} channels`);
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};
