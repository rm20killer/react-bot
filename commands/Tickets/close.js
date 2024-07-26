const Discord = require("discord.js");
const { Client, Intents, MessageAttachment } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const discordTranscripts = require("discord-html-transcripts");
const config = require("../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
const AllowedParent = ["1131260044743278634","858354610367627284","1128367437981687868","1231960706681802832","1245007948812652594"]
module.exports = {
  name: "close",
  aliases: ["tclose", "tend"],
  description: "will close a ticket",
  usage: "`*close [reason]`",
  example: "`*close inactive`",
  async execute(message, args, client) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      //console.log("closing ticket")
      if(AllowedParent.includes(message.channel.parent.id)){
        // CODE GOES HERE 🡫
        const channelParent = message.channel.parent.id;
        const channel = client.channels.cache.find(
          (channel) => channel.id === "844273354318938174"
        );

        if (!channel) return;

        let reason = message.content.slice(6);
        if (!reason) reason = "No Reason Specified";
        const attachment = await discordTranscripts.createTranscript(message.channel);
        message.channel.messages.fetch({ limit: 100 }).then((msgs) => {
        
          const embed = new Discord.MessageEmbed()
          .setTitle("**Ticket Closed**")
          .addField("Ticket Owner", `<@${message.channel.topic}>`, true)
          .addField("Ticket Name:", message.channel.name, true)
          .addField("Closed by:", message.author.tag, true)
          .addField("Close Reason", `\`\`\`${reason}\`\`\``)
          .setFooter(message.guild.name)
          .setColor(0x4287f5);
          
          channel
          .send({
            content: `transcript for ticket ${message.channel.name}-${message.channel.id} `,
            embeds: [embed],
            files: [attachment],
          })
          .catch((err) => {
            console.log(err);
          });
        });

        setTimeout(() => {
          message.channel.delete().catch((err) => console.log(err));
        }, 2000);
      } else {
        message.reply("Only works in tickets");
      }
    } else {
      message.reply("You lack perms for this command");
    }
  },
};

async function fetchMore(channel, limit = 250) {
  if (!channel) {
    throw new Error(`Expected channel, got ${typeof channel}.`);
  }
  if (limit <= 100) {
    return channel.messages.fetch({
      limit,
    });
  }

  let collection = new Discord.Collection();
  let lastId = null;
  let options = {};
  let remaining = limit;

  while (remaining > 0) {
    options.limit = remaining > 100 ? 100 : remaining;
    remaining = remaining > 100 ? remaining - 100 : 0;

    if (lastId) {
      options.before = lastId;
    }

    let messages = await channel.messages.fetch(options);

    if (!messages.last()) {
      break;
    }

    collection = collection.concat(messages);
    lastId = messages.last().id;
  }
  return collection;
}
