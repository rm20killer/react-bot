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
  name: "rename",
  aliases: ["trn"],
  description: "will rename a ticket",
  usage: "`*rename <new name>`",
  example: "`*remove cool ticket`",
  async execute(message, args) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      if (message.channel.parent.id === "858354610367627284") {
        // CODE GOES HERE 🡫
        let name = message.content.slice(7);
        if (!name) return message.channel.send("messing name");

        const embed = new Discord.MessageEmbed()
          .setDescription(`This channel has renamed to \`${name}\``)
          .addField("Renamed by:", message.author.tag)
          .setColor(0x4287f5);

        message.channel.setName(name);
        message.channel.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });
      }
    } else {
      message.reply("You lack perms for this command");
    }
  },
};
