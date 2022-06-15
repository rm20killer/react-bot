const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const config = require("../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
module.exports = {
  name: "stafflock",
  aliases: ["tsl"],
  description: "will stafflock a ticket",
  usage: "`*stafflock <reson>`",
  example: "`*stafflock saving for proff`",
  async execute(message, args) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      if (message.channel.parent.id === "858354610367627284") {
        // CODE GOES HERE 🡫
        return;
        //not working anymore
        const id = message.channel.topic;
        const type = "member";
        if (
          message.channel.permissionOverwrites.edit.find(
            (o) => o.type === type && o.id === id
          ) != undefined
        ) {
          message.channel.permissionOverwrites.edit
            .find((o) => o.type === type && o.id === id)
            .delete();
          let reason = message.content.slice(10);
          if (!reason) reason = "No Reason Specified";

          const embed = new Discord.MessageEmbed()
            .setDescription(`${message.channel} has been staff locked`)
            .addField("Locked by:", message.author.tag, true)
            .addField("Reason:", reason, true)
            .setColor(0x4287f5);

          message.channel.send({ embeds: [embed] }).catch((err) => {
            console.log(err);
          });
        } else {
          message.reply("error, don't ask why");
        }
      }
    } else {
      message.reply("You lack perms for this command");
    }
  },
};
