const Discord = require("discord.js");


const config = require("../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
module.exports = {
  name: "embed",
  aliases: ["embed"],
  description: "embed",
  usage: "`*embed`",
  example: "`*embed`",
  async execute(message, args) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      if (args.length === 0) {
        const embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("Upload Notifications")
          .setDescription("want to be notified when a video is uploaded \n\nReact with the 🔔emote")
          .setAuthor({name: "Gamers React" , iconURL: "https://cdn.discordapp.com/emojis/764541981560537110.png"})
        message.channel.send({embeds: [embed]});
        return
      }
      else {
        if(args[0] === "notify"){
          // CODE GOES HERE 🡫
          const roleEmbed = new Discord.MessageEmbed()
          .setTitle("Discord Notifications")
          .setAuthor({name: "Gamers React" , iconURL: "https://cdn.discordapp.com/emojis/764541981560537110.png"})
          .setColor("#ff0000")
          .setDescription("React with the correct emoji to add or remove yourself from the notification list")
          .addField("Events Notifications", "<:creeper:859806815332204555>")
          .addField("Giveaway Notifications", "🎁")
          .addField("Question of the Day Notifications", "❓")
  
          message.channel.send({embeds: [roleEmbed]})
          return
        }
    }
    return

    } else {
      message.reply("You lack perms for this command");
    }
  },
};

