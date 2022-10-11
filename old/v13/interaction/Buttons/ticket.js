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

const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");
module.exports = {
  customId: "ticket",
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.find((r) => r.id === "865548571327070268")
    ) {
      console.log("ticket banned " + interaction.user.id);
      await interaction.reply(`you are ticket-banned`);
      interaction.deleteReply();
      return;
    }
    let parent = "858354610367627284";
    if (interaction.guild.id === "898628981958537266") {
      parent = "898628983271337997";
    }
    let member = interaction.user;
    //console.log(member)
    let limit = 0;
    const id = interaction.customId;
    if (id === "ticket-Player") {
      //user report
      var ids = "User Report";
    }
    if (id === "ticket-BanAppeal") {
      //mute Appeal
      var ids = "Mute Appeal";
    }
    if (id === "ticket-General") {
      //General
      var ids = "General";
    }
    let mess = await interaction.reply(`Creating a ${ids} ticket`);
    interaction.guild.channels.cache.forEach((c) => {
      //console.log("interaction got")
      try {
        var channelParent = c.parent.id;
      } catch {
        var channelParent = 1;
      }

      if (channelParent === parent) {
        if (c.topic === member.id) {
          limit++;
        }
      }
    });

    if (limit === 1) {
      //mess.delete();
      interaction.deleteReply();
      return member
        .send(
          member.tag +
            " , You have reached the maximum amount of tickets opened"
        )
        .catch((error) => {
          console.log(error);
        });
    } else {
      createChannel(id, interaction, member, parent);
      interaction.deleteReply();
      //mess.delete();
    }
  },
};

async function createChannel(id, interaction, member, parent) {
  if (id === "ticket-Player") {
    //user report
    var format = "```diff\n- Discord ID:\n- Issue:```";
    var ids = "User Report";
  }
  if (id === "ticket-BanAppeal") {
    //mute Appeal
    var format = "```diff\n- Mute Reason:\n- Appeal:```";
    var ids = "Mute Appeal";
  }
  if (id === "ticket-General") {
    //General
    var format = "```diff\n- Question:```";
    var ids = "General";
  }
  let memberrole = "629695220065239061";
  let modrole = "696134129497931857";
  let helperrole = "884656687372464179";
  let muteappeal = "914952404083036170";
  //let jrmodrole = "901136474068619275"
  if (interaction.guild.id === "898628981958537266") {
    memberrole = "898628981958537275";
    modrole = "898628981971103847";
  }
  interaction.guild.channels
    .create(`ticket-${member.username}`, "text")
    .then(async (c) => {
      await c.setTopic(member.id);
      await c.setParent(parent);

      await c.permissionOverwrites
        .edit(memberrole, {
          VIEW_CHANNEL: false,
        })
        .catch((err) => console.log(err));
      await c.permissionOverwrites
        .edit(member.id, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
        })
        .catch((err) => console.log(err));
      await c.permissionOverwrites
        .edit(modrole, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
        })
        .catch((err) => console.log(err));
      await c.permissionOverwrites
        .edit(helperrole, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
        })
        .catch((err) => console.log(err));
      if (id === "BanAppeal") {
        //mute Appeal
        await c.send(`<@&${muteappeal}>`).then((msg) => msg.delete());
      } else {
        await c.send(`<@&${modrole}>`).then((msg) => msg.delete());
        await c.send(`<@&${helperrole}>`).then((msg) => msg.delete());
      }

      const embed = new Discord.MessageEmbed()
        .setDescription(
          "Thank you for creating a ticket! Our support team will be with you shortly."
        )
        .addField("Format", `${format}`, true)
        .addField("Topic", `${ids}`, true)
        .setTimestamp()
        .setColor(0xff0000);

      c.send(`<@${member.id}>`);
      c.send({ embeds: [embed] });
    });
}
