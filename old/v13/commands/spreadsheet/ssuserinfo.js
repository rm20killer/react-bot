const fetch = require("node-fetch");
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const { GoogleSpreadsheet } = require("google-spreadsheet");

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

const { MessageActionRow, MessageButton } = require("discord.js");

const config = require("../../../config");
const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
const creds = require("../../src/utils/googlekey.json");
//const doc = new GoogleSpreadsheet(config.spreadsheet);
const doc = new GoogleSpreadsheet(
  "1keR2ubqTVfkrkEuDTSAa5fbZm_U08gTNfE-75bUcVX4"
);

module.exports = {
  name: "ssuserinfo",
  aliases: ["ssuser"],
  description: "will get info from spreadsheet",
  usage: "`*ssuserinfo`",
  example: "`*ssuserinfo`",
  async execute(message, args) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      // CODE GOES HERE 🡫
      await ssuserinfo(message, args).catch((error) => console.log(error));
    } else {
      message.reply("You lack perms for this command");
    }
  },
};

var ssuserinfo = async function (message, client, args) {
  if (args === null) {
    return message.reply("no number to look up");
  }
  let number = args[0];
  if (number === "1") {
    return message.reply("Can not use `1` as a input");
  }
  testnum = number - 1;
  var resMsg = await message.channel.send(
    "Getting info. It might take a minute"
  );
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  console.log(doc.title + " has been opened");
  const info = await doc.getInfo();
  const sheet = doc.sheetsByIndex[0];
  //console.log(sheet)
  console.log(number);
  await sheet
    .loadCells("A" + number + ":F" + number)
    .then(console.log("loaded cells"))
    .catch((error) => console.log(error));
  //i=sheet.rowCount
  const discordname = sheet.getCell(testnum, 1).value;
  const discordID = sheet.getCell(testnum, 2).value;
  const Javaorbedrock = sheet.getCell(testnum, 3).value;
  let mcingo = sheet.getCell(testnum, 4).value;
  let mcBedrockingo = sheet.getCell(testnum, 5).value;
  if (mcingo === null) {
    mcingo = "{blank}";
  }
  if (mcBedrockingo === null) {
    mcBedrockingo = "{blank}";
  }
  const embed = await new Discord.MessageEmbed()
    .setTitle(`Event Signup info for` + number)
    .setAuthor(
      "React Bot",
      "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
    )
    .setColor(0x00ff00)
    .addField("discord name:", discordname)
    .addField("discord ID:", discordID)
    .addField("Java or bedrock:", Javaorbedrock)
    .addField("Java IGN:", mcingo)
    .addField("bedrock IGN:", mcBedrockingo);
  message.channel.send({ embeds: [embed] });
  resMsg.delete();
};
