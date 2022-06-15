const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});
const config = require("../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");
module.exports = {
  contextmenu: async function (interaction, client) {
    if (interaction.commandName === "Ticket Ban") {
      await interaction.reply("ticket banning");
      interaction.deleteReply();
      if (
        interaction.member.roles.cache.find((r) => r.name === modid) ||
        interaction.member.roles.cache.find((r) => r.name === adminid) ||
        interaction.member.roles.cache.find((r) => r.id === helper)
      ) {
        let member = interaction.member;
        const hasRole = member.roles.cache.find(
          (role) => role.id === "865548571327070268"
        );
        const channel = client.channels.cache.find(
          (channel) => channel.id === "844273354318938174"
        );

        if (hasRole) {
          member.roles.remove("865548571327070268").catch((error) => {
            console.log(error);
          });
          const embed = new Discord.MessageEmbed()
            .setTitle("Ticket Ban role taken away by, " + interaction.user.tag)
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription("To: " + member.tag)
            .setFooter("id: " + member.id);
          channel.send({ embeds: [embed] }).catch((error) => {
            console.log(error);
          });
        } else {
          member.roles.add("865548571327070268").catch((error) => {
            console.log(error);
          });
          //console.log(interaction)
          const embed = new Discord.MessageEmbed()
            .setTitle("Ticket Ban role given by, " + interaction.user.tag)
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription("To: " + member.tag)
            .setFooter("id: " + member.id);
          channel.send({ embeds: [embed] }).catch((error) => {
            console.log(error);
          });
        }
      } else {
        return;
      }
    }
    if (interaction.commandName === "Streamer Role") {
      await interaction.reply("Streamer Role");
      interaction.deleteReply();
      if (
        interaction.member.roles.cache.find((r) => r.name === modid) ||
        interaction.member.roles.cache.find((r) => r.name === adminid) ||
        interaction.member.roles.cache.find((r) => r.id === helper)
      ) {
        let member = interaction.member;
        const hasRole = member.roles.cache.find(
          (role) => role.id === "696133979748958309"
        );
        const channel = client.channels.cache.find(
          (channel) => channel.id === "844273354318938174"
        );
        if (hasRole) {
          member.roles.remove("696133979748958309").catch((error) => {
            console.log(error);
          });
          const embed = new Discord.MessageEmbed()
            .setTitle("streamer role taken away by, " + interaction.user.tag)
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription("To: " + member.tag)
            .setFooter("id: " + member.id);
          channel.send({ embeds: [embed] }).catch((error) => {
            console.log(error);
          });
        } else {
          member.roles.add("696133979748958309").catch((error) => {
            console.log(error);
          });
          //console.log(interaction)
          const channel = client.channels.cache.find(
            (channel) => channel.id === "844273354318938174"
          );
          const embed = new Discord.MessageEmbed()
            .setTitle("streamer role given by, " + interaction.user.tag)
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription("To: " + member.tag)
            .setFooter("id: " + member.id);
          channel.send({ embeds: [embed] }).catch((error) => {
            console.log(error);
          });
        }
      } else {
        return;
      }
    }

    if (interaction.commandName === "Report Message") {
      await interaction.reply(`reporting`);
      interaction.deleteReply();
      let user = interaction.user;
      //console.log(interaction)
      if (
        interaction.member.roles.cache.find(
          (r) => r.id === "892831889264619530"
        )
      ) {
        return;
      }
      let message = interaction.options.getMessage("message");
      //console.log(message)
      if (message.author.bot) {
        return;
      }
      if (
        message.member.roles.cache.find((r) => r.name === modid) ||
        message.member.roles.cache.find((r) => r.name === adminid)
      ) {
        return;
      }
      if (!message.content) {
        return;
      }
      let channel = client.channels.cache.find(
        (channel) => channel.id === "892816609712930836"
      ); //892816609712930836
      if (interaction.guildId != "629695220065239061") {
        //gr
        channel = client.channels.cache.find(
          (channel) => channel.name === "user-reports"
        ); //test server
      }
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Message Link")
          .setStyle("LINK")
          .setURL(message.url)
      );
      const embed = new Discord.MessageEmbed()
        .setTitle("Message Report by, " + user.tag)
        .setAuthor(
          "Gamers React",
          "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
        )
        .setColor(0xff0000)
        .setDescription(message.author.tag + " | " + message.author.id)
        .addField("Message", message.content)
        .setURL(message.url)
        .setFooter("reporter id: " + user.id);
      channel.send({ embeds: [embed], components: [row] }).catch((error) => {
        console.log(error);
      });
    }
  },
};
