/*
                       _           _                     _       
              /\      | |         (_)                   | |      
             /  \   __| |_ __ ___  _ _ __     ___  _ __ | |_   _ 
            / /\ \ / _` | '_ ` _ \| | '_ \   / _ \| '_ \| | | | |
           / ____ \ (_| | | | | | | | | | | | (_) | | | | | |_| |
          /_/    \_\__,_|_| |_| |_|_|_| |_|  \___/|_| |_|_|\__, |
                                                            __/ |
                                                           |___/  
*/
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
  name: "ssgiverole",
  aliases: ["ssgive"],
  description: "will give roles from spreadsheet",
  usage: "`*ssgiverole`",
  example: "`*ssgiverole`",
  async execute(message, args) {
    if (message.member.roles.cache.find((r) => r.name === modid)) {
      // CODE GOES HERE 🡫
      await ssrolegive(message, args).catch((error) => console.log(error));
    } else {
      message.reply("You lack perms for this command");
    }
  },
};

/* The code below does the following:
1. Opens the Google Spreadsheet.
2. Gets the info.
3. Checks if the user exists.
4. Checks if the user has the role.
5. Gives the role to the user.
6. Sends a message to the user.
7. Sends a message to the console. */
var ssrolegive = async function (message, args) {
  let failed = 0;
  let SUCCESS = 0;
  var resMsg = await message.channel.send(
    "Getting info. It might take a minute"
  );
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  console.log(doc.title + " has been opened");
  const info = await doc.getInfo();
  const sheet = doc.sheetsByIndex[2];
  n = 48;
  console.log(n);
  await sheet.loadCells("A1:D" + n).then(console.log("loaded cells"));
  n = 9;
  while (n > 0) {
    //39
    const discordID = sheet.getCell(n, 2).value;
    console.log(discordID);
    //console.log(n);
    //console.log(searcher);
    if (discordID !== null) {
      const User = message.guild.members.cache.get(discordID); // Getting the user by ID.
      //const shadRole = User.roles.cache.find(role => role.name === 'Streamers');
      if (User != undefined) {
        // Checking if the user exists.
        if (User.roles.cache.find((role) => role.name === "Streamers")) {
          //message.reply("<@"+ discordID +"> is streamer skipping")
          //User.send("sorry, You cant take part in testing as your a streamer").catch(console.error);
          //failed=failed+1
          User.roles
            .add("895081132549369856") //895081132549369856 922126446066012231
            .catch(console.error);
          SUCCESS = SUCCESS + 1;
        } else {
          //User.roles.add('895081132549369856') //895081132549369856 922126446066012231
          //.catch(console.error);
          //SUCCESS=SUCCESS+1
          failed = failed + 1;
        }
      } else {
        message.reply("<@" + discordID + "> failed to give role");
        failed = failed + 1;
        console.log(n);
      }
    } else {
      message.reply(sheet.getCell(n, 2).value + " failed to give role");
      failed = failed + 1;
      console.log(n);
    }
    n = n - 1;
  }
  message.reply("success: " + SUCCESS + "\nFailed: " + failed);
  resMsg.delete();
};
