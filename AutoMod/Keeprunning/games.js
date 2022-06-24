const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const fs = require("fs");
module.exports = {
  async gameCheck(client) {
    const gameChecks = async () => {
      const database = JSON.parse(
        fs.readFileSync(`./utils/data/tictactoe.json`)
      );
      for (const game of database.gameArray) {
        if (game.timeEnded < new Date().getTime()) {
          database.gameArray.splice(database.gameArray.indexOf(game), 1);
          console.log("ended a game");
          database.timeout = database.timeout + 1;
        }
      }
      fs.writeFileSync(
        `./utils/data/tictactoe.json`,
        JSON.stringify(database, null, 2)
      );
      setTimeout(gameChecks, 1000 * 10);
    };
    gameChecks();
  },
};
