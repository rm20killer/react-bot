const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fetch = require("node-fetch");

const config = require("../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;

const DISCORD_EPOCH = 1420070400000;

module.exports = {
  name: "age",
  aliases: ["accountage"],
  description: "will get age of user/message",
  usage: "`*age <@user>`",
  example: "`*age @rm20#2000`",
  async execute(message, args) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      // CODE GOES HERE 🡫
      let member = message.mentions.members.first();
      if (!member) {
        let id = args[0];
        try {
          member = await message.guild.members.fetch(id);
        } catch {}
      }
      if (!member) {
        try {
          timestamp = validateSnowflake(args[0], DISCORD_EPOCH);
          const embed = new Discord.MessageEmbed()
            .setTitle("account age of " + args[0])
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .addField("creation date ", `<t:${timestamp}:f>`);
          message.channel.send({ embeds: [embed] });
        } catch {
          console.log("error with snowfalse");
        }
      } else {
        let accage = member.user.createdTimestamp;
        let joindate = member.joinedTimestamp;
        accage = accage.toString().slice(0, -3);
        joindate = joindate.toString().slice(0, -3);

        const embed = new Discord.MessageEmbed()
          .setTitle("account age of " + member.user.username)
          .setAuthor(
            "Gamers React",
            "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
          )
          .setColor(0xff0000)
          .addField("creation date ", `<t:${accage}:f>`)
          .addField("join date ", `<t:${joindate}:f>`)
          .setFooter(
            "user: " + member.user.tag + " | user id: " + member.user.id
          );
        message.channel.send({ embeds: [embed] });
      }
    } else {
      message.reply("You lack perms for this command");
    }
  },
};

const convertSnowflakeToDate = function (snowflake, epoch = DISCORD_EPOCH) {
  const milliseconds = BigInt(snowflake) >> 22n;
  return new Date(Number(milliseconds) + epoch);
};

const validateSnowflake = function (snowflake, epoch) {
  if (!Number.isInteger(Number(snowflake))) {
    throw new Error(
      "That doesn't look like a snowflake. Snowflakes contain only numbers."
    );
  }

  if (snowflake < 4194304) {
    throw new Error(
      "That doesn't look like a snowflake. Snowflakes are much larger numbers."
    );
  }

  let timestamp = convertSnowflakeToDate(snowflake, epoch);
  if (Number.isNaN(timestamp.getTime())) {
    throw new Error(
      "That doesn't look like a snowflake. Snowflakes have fewer digits."
    );
  }
  timestamp = parseInt(parseInt(timestamp.getTime() / 1000));
  console.log(timestamp);
  return timestamp;
};
