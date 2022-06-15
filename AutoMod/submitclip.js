const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  submitclip: function (messa, message, client) {
    const regex = /(how|where|want).+(submit|post|share|send).+(clip|video)/i;
    const str = messa;
    let m;
    let row23 = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("GR Website")
        .setURL("https://gamersreact.com/")
    );
    if ((m = regex.exec(str)) !== null) {
      // The result can be accessed through the `m`-variable.
      if (message.channel.id === "878531760386871327") {
        message.reply(
          "Simply post your link or file here. Make sure clips meet `/requirements` \nMake sure to not repost ever"
        ); //If the question was in #submit-clips say this
        return;
      } else {
        message.reply({
          content:
            "**Submit clips on our website:** \nClick button below to vist the site",
          components: [row23],
        }); //Otherwise say this
        return;
      }
    }

    const regex2 = /(what).+(is|are).+(ticket|tickets)/i;
    let mx;
    if ((mx = regex2.exec(str)) !== null) {
      message.reply(
        "A ticket is a private chat with mods to ask questions, user reports, mute appeal, and requesting streamer role if you been in a video."
      );
    }
  },
};
