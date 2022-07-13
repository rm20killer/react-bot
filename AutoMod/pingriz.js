const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("../config");
const warn = require("../commands/mod/warn");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
module.exports = {
  pingriz: function (messa, message, client) {
    if (messa.includes("@!144567396835917824")) {
      //227490301688676354  riz=144567396835917824
      if (
        message.member.roles.cache.find((r) => r.name === modid) ||
        message.member.roles.cache.find((r) => r.name === adminid) ||
        message.member.roles.cache.find((r) => r.id === helper)
      ) {
        return;
      }
      const channel = client.channels.cache.find(
        (channel) => channel.id === "844273354318938174"
      );
      const embed = new Discord.MessageEmbed()
        .setTitle("someone pinged the big man")
        .setAuthor(
          "Gamers React",
          "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
        )
        .setColor(0xff0000)
        .setDescription(message.author.tag + " pinged riz")
        .setFooter(
          "user: " + message.author.tag + " | user id: " + message.author.id
        );

      channel.send({ embeds: [embed] });
      message.reply(
        "dont ping riz, If you need help feel free to ask <@&696134129497931857>"
      );
      message.channel.send(
        "https://media.giphy.com/media/QTi0jJ17OTHwEqkEIA/giphy.gif"
      );
      console.log("pinged");
      //message.delete();
    }
    if (
      messa === "dead chat" ||
      messa === "chat dead" ||
      messa === "dead-chat" ||
      messa === "chat-dead" ||
      messa === "ded chat"
    ) {
      //message.reply("you're dead");
      if (
        message.member.roles.cache.find((r) => r.name === modid) ||
        message.member.roles.cache.find((r) => r.name === adminid) ||
        message.member.roles.cache.find((r) => r.id === helper)
      ) {
        return;
      }

      message.delete().catch((error) => {
        console.log(error);
      });
    }
    if (messa.includes("@!127863778233548801")) {
      if (message.author.id === "624264821621260308") {
        message.author.id = "127863778233548801";
        message.member.user.id = "127863778233548801";
        warn.warn(
          message,
          [
            "@!624264821621260308",
            "how dare you ping me, just spam my dm's or something smhh xD",
          ],
          client
        );
      } else {
        return;
      }
    }
  },
};
