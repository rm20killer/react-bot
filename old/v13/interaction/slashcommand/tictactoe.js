const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const fs = require("fs");
const crypto = require("crypto");
const { generateKey } = require("crypto");

//player 1 num = 1
//player 2 num = 2
//player 1 symbol = X red
//player 2 symbol = O green

//undeicided = 0
module.exports = {
  data: new SlashCommandBuilder()
    .setName("tictactoe")
    .setDescription("play tic tac toe with someone")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("play against a user")
        .addUserOption((option) =>
          option.setName("target").setDescription("The user")
        )
    ),

  async execute(interaction, client) {
    if (interaction.options._hoistedOptions[0] == undefined) {
      interaction.reply({
        content: "You need to specify a user to play against",
        ephemeral: true,
      });
      return;
    }
    const database = require(`../../utils/data/tictactoe.json`);
    //console.log(database)
    let player1 = interaction.user.id;
    let player2 = interaction.options._hoistedOptions[0].user.id;
    if (player1 === player2) {
      return interaction.reply({
        content: "You can't play against yourself",
        ephemeral: true,
      });
    }
    if (interaction.options._hoistedOptions[0].user.bot) {
      return interaction.reply({
        content: "You can't play against a bot",
        ephemeral: true,
      });
    }
    //get data from database and and to file
    let data = await createdata(interaction, database);
    let dataJSON = JSON.stringify(data, null, 2);
    await fs.writeFileSync(`./utils/data/tictactoe.json`, dataJSON);

    //respond to user
    let time = Date.now() + 60000;
    let embed = new Discord.MessageEmbed()
      .setTitle("Tic Tac Toe")
      .setDescription(
        `you have started a game with <@${player2}>. \n  <@${player2}> must accept the game before you can play. \n  You can accept the game by pushing button`
      )
      .addField("Will time out", `<t:${time.toString().slice(0, -3)}:R>`)
      .setColor("#0099ff");

    let key = database.gameArray[database.gameArray.length - 1].key;
    let acceptButton = new MessageButton()
      .setLabel("Accept")
      .setStyle("SUCCESS")
      .setCustomId("tic-accept-" + key);
    //console.log(acceptButton)
    let row = new MessageActionRow().addComponents([acceptButton]);
    //create a button
    interaction.reply({ embeds: [embed], components: [row] });
    //return error("not implemented");
  },
};

//generate a sting using player1 and player2 and gameID and timeStarted
//return key
async function generateEcrypted(player1, player2, gameID, timeStarted) {
  let key = player1 + "-" + player2 + "-" + gameID + "-" + timeStarted;
  //console.log(key);
  //hash they with MD4
  let hash = crypto.createHash("md4").update(key).digest("hex");
  //console.log(hash);
  return hash;
}

async function createdata(interaction, database) {
  gameArray = database.gameArray;

  let gameID = gameArray.length++;
  let player1 = interaction.user.id;
  let player2 = interaction.options._hoistedOptions[0].user.id;
  let player2Aceepted = false;
  let turn = 0;
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let timeStarted = Date.now();
  //time end 10 minutes
  let timeEnded = timeStarted + 60000;
  let winner = 0;
  let gameover = false;

  let key = await generateEcrypted(player1, player2, gameID, timeStarted);
  //console.log(interaction);
  //save data to file
  let data = {
    gameID: gameID,
    key: key,
    player1: player1,
    player2: player2,
    player2Aceepted: player2Aceepted,
    turn: turn,
    board: board,
    timeStarted: timeStarted,
    timeEnded: timeEnded,
    winner: winner,
    gameover: gameover,
  };
  gameArray.push(data);
  //console.log(gameArray);
  //get rid of null in array
  let newArray = gameArray.filter(function (el) {
    return el != null;
  });
  //add 1 to total in database
  let total = database.total + 1;
  let finished = database.finished;
  let playing = database.playing + 1;
  let ammountInArray = newArray.length;
  let timeout = database.timeout;
  let data2 = {
    total: total,
    finished: finished,
    playing: playing,
    ammountInArray: ammountInArray,
    timeout: timeout,
    gameArray: newArray,
  };
  return data2;
}
