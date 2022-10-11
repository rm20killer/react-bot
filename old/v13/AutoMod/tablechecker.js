const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const fs = require("fs");
const fileName = "./file.json";
const file = require("../file.json");
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
  table: async function (client, message) {
    if (message.content === "(╯°□°）╯︵ ┻━┻") {
      //let n = parseFloat(ctopic, 10)
      let n = parseFloat(file.tableflip) + 1;
      //console.log(file.tableflip)
      file.tableflip = n;
      //fs.writeFileSync(fileName, JSON.stringify(file));
      fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        //console.log(JSON.stringify(file));
        //console.log('writing to ' + fileName);
      });
    } else if (message.content === "┬─┬ ノ( ゜-゜ノ)") {
      //let n = parseFloat(ctopic, 10)
      let n = parseFloat(file.tableflip) - 1;
      file.tableflip = n;
      //fs.writeFileSync(fileName, JSON.stringify(file));
      fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        //console.log(JSON.stringify(file));
        //console.log('writing to ' + fileName);
      });
    } else {
      return;
    }
  },
};
