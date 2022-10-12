const fs = require("fs");
const Discord = require("discord.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const tictactoe = require("../slashcommand/tictactoe");

module.exports = {
  customId: "tic",
  async execute(interaction, client) {
    //console.log(interaction.message);
    //read database
    const database = JSON.parse(fs.readFileSync(`./src/utils/data/tictactoe.json`));
    //const database = require(`../../src/utils/data/tictactoe.json`);
    let status = interaction.customId.split("-")[1];
    let key = interaction.customId.split("-")[2];

    //find location of key on database
    let index = database.gameArray.findIndex((element) => element.key === key);
    //if key is not found, return
    if (index === -1) {
      await interaction.reply({ content: "Game finished", ephemeral: true });
      return;
    }
    console.log("game id:" + index);
    let game = database.gameArray[index];
    game.timeEnded = new Date().getTime() + 60000;
    //embed
    let embed = new Discord.MessageEmbed()
      .setTitle("Tic Tac Toe")
      .setDescription(
        `player 1 (X - red): <@${game.player1}> \n player 2 (O - green): <@${
          game.player2
        }> \n gameEnds: <t:${game.timeEnded.toString().slice(0, -3)}:R>`
      )
      .setColor("#0099ff")
      .setTimestamp();

    //accept status
    if (status === "accept") {
      if (interaction.user.id === game.player2) {
        acceptStatus(interaction, game, embed, database);
      } else {
        await interaction.reply({
          content: "You are not player 2",
          ephemeral: true,
        });
      }
    }
    //console.log(game);
    //await interaction.update();
    if (status === "play") {
      let player = game.turn;
      if (player === 1) {
        player = game.player1;
      }
      if (player === 2) {
        player = game.player2;
      }
      if (interaction.user.id === player) {
        playClicked(interaction, game, embed, database, index);
      }
    }
  },
};

function turn(game) {
  let string = "";
  if (game.turn === 1) {
    string = `<@${game.player1}> turn`;
  } else {
    string = `<@${game.player2}> turn`;
  }
  return string;
}

async function acceptStatus(interaction, game, embed, database) {
  let key = interaction.customId.split("-")[2];
  game.player2Aceepted = true;
  //generate a number from 1 to 2
  let random = Math.floor(Math.random() * 2) + 1;
  game.turn = random;
  let dataJSON = JSON.stringify(database, null, 2);
  fs.writeFileSync(`./src/utils/data/tictactoe.json`, dataJSON);

  const top = [];
  const middle = [];
  const bottom = [];
  for (let i = 0; i < 3; i++) {
    const button = new MessageButton()
      .setLabel("[ ]")
      .setStyle("PRIMARY")
      .setCustomId("tic-play-" + key + "-0-" + i);
    top.push(button);
  }
  for (let i = 0; i < 3; i++) {
    const button = new MessageButton()
      .setLabel("[ ]")
      .setStyle("PRIMARY")
      .setCustomId("tic-play-" + key + "-1-" + i);
    middle.push(button);
  }
  for (let i = 0; i < 3; i++) {
    const button = new MessageButton()
      .setLabel("[ ]")
      .setStyle("PRIMARY")
      .setCustomId("tic-play-" + key + "-2-" + i);
    bottom.push(button);
  }
  let row1 = new MessageActionRow().addComponents(top);
  let row2 = new MessageActionRow().addComponents(middle);
  let row3 = new MessageActionRow().addComponents(bottom);
  let rows = [row1, row2, row3];

  embed.addField("Current turn", turn(game));
  await interaction.update({ embeds: [embed], components: rows });
}

async function playClicked(interaction, game, embed, database, index) {
  let player = interaction.user.id;
  let playernum = game.turn;
  let row = interaction.customId.split("-")[3];
  let column = interaction.customId.split("-")[4];
  //get board
  let square = game.board[row][column];
  if (square === 0) {
    if (playernum === 1) {
      game.board[row][column] = 1;
      game.turn = 2;
    } else {
      game.board[row][column] = 2;
      game.turn = 1;
    }
    let rows = [];
    //rows = generateBoard(rows, game)
    embed.addField("Current turn", turn(game));
    //save to file
    let winner = checkGameOver(game);
    if (winner === 1 || winner === 2 || winner === 3) {
      game.gameOver = true;
      game.winner = winner;
      GameEnded(interaction, game, database);
      //remove game from database
      database.gameArray.splice(index, 1);
      database.finished = database.finished + 1;
    } else {
      await interaction.update({
        embeds: [embed],
        components: generateBoard(rows, game),
      });
    }
    let dataJSON = JSON.stringify(database, null, 2);
    fs.writeFileSync(`./src/utils/data/tictactoe.json`, dataJSON);
  }
  //console.log(square);
}

function generateBoard(rows, game) {
  let board = game.board;
  for (let i = 0; i < 3; i++) {
    let row = new MessageActionRow();
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 1) {
        let button = new MessageButton()
          .setLabel("[X]")
          .setStyle("DANGER")
          .setCustomId("tic-play-" + game.key + "-" + i + "-" + j)
          .setDisabled(true);
        row.addComponents(button);
      } else if (board[i][j] === 2) {
        let button = new MessageButton()
          .setLabel("[O]")
          .setStyle("SUCCESS")
          .setCustomId("tic-play-" + game.key + "-" + i + "-" + j)
          .setDisabled(true);
        row.addComponents(button);
      } else {
        let button = new MessageButton()
          .setLabel("[ ]")
          .setStyle("PRIMARY")
          .setCustomId("tic-play-" + game.key + "-" + i + "-" + j);
        row.addComponents(button);
      }
    }
    rows.push(row);
  }
  return rows;
}

//[1,0,0]
//[1,0,0]
//[1,0,0]
//check if game is over
function checkGameOver(game) {
  let board = game.board;
  let gameOver = false;
  let winner = 0;
  //check rows
  for (let i = 0; i < 3; i++) {
    let row = board[i];
    if (row[0] === row[1] && row[1] === row[2]) {
      if (row[0] === 1) {
        winner = 1;
      } else if (row[0] === 2) {
        winner = 2;
      }
      gameOver = true;
    }
  }
  //check columns
  for (let i = 0; i < 3; i++) {
    let column = [board[0][i], board[1][i], board[2][i]];
    if (column[0] === column[1] && column[1] === column[2]) {
      if (column[0] === 1) {
        winner = 1;
      } else if (column[0] === 2) {
        winner = 2;
      }
      gameOver = true;
    }
  }
  //check diagonals
  let diag1 = [board[0][0], board[1][1], board[2][2]];
  let diag2 = [board[0][2], board[1][1], board[2][0]];
  if (diag1[0] === diag1[1] && diag1[1] === diag1[2]) {
    if (diag1[0] === 1) {
      winner = 1;
    } else if (diag1[0] === 2) {
      winner = 2;
    }
    gameOver = true;
  }
  if (diag2[0] === diag2[1] && diag2[1] === diag2[2]) {
    if (diag2[0] === 1) {
      winner = 1;
    } else if (diag2[0] === 2) {
      winner = 2;
    }
    gameOver = true;
  }
  //check if there is a tie
  if (!gameOver) {
    //count number of empty squares
    let emptySquares = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          emptySquares++;
          break;
        }
      }
    }
    if (emptySquares === 0) {
      gameOver = true;
      winner = 3;
    }
  }
  return winner;
}

async function GameEnded(interaction, game, database) {
  let winner = game.winner;
  let playerWon;
  let playerLost;
  let embed = new Discord.MessageEmbed()
    .setTitle("Game over")
    .setColor("#00ff00")
    .setTimestamp();
  if (winner === 1) {
    embed.setDescription(`<@${game.player1}> won!`);
    playerWon = game.player1;
    playerLost = game.player2;
  } else if (winner === 2) {
    embed.setDescription(`<@${game.player2}> won!`);
    playerWon = game.player2;
    playerLost = game.player1;
  } else if (winner === 3) {
    embed.setDescription("Tie!");
    await savetie(game.player2);
    await savetie(game.player1);
  }
  await saveWiner(playerWon);
  await saveLost(playerLost);
  let rows = [];
  await interaction.update({
    embeds: [embed],
    components: generateBoard(rows, game),
  });
}

async function saveWiner(player) {
  if (!player) return;
  let database = JSON.parse(fs.readFileSync(`./src/utils/data/userGame.json`));
  //if player is not in database add them

  if (!database.hasOwnProperty(player)) {
    let tictactoe = {
      game: "tictactoe",
      wins: 1,
      loses: 0,
      ties: 0,
    };
    let game = [];
    game.push(tictactoe);
    database[player] = game;
  } else {
    let game = database[player];
    let tictactoe = game.find((x) => x.game === "tictactoe");
    tictactoe.wins = tictactoe.wins + 1;
  }
  let dataJSON = JSON.stringify(database, null, 2);
  fs.writeFileSync(`./src/utils/data/userGame.json`, dataJSON);
}

async function saveLost(player) {
  if (!player) return;
  let database = JSON.parse(fs.readFileSync(`./src/utils/data/userGame.json`));
  //if player is not in database add them
  if (!database.hasOwnProperty(player)) {
    let tictactoe = {
      game: "tictactoe",
      wins: 0,
      loses: 1,
      ties: 0,
    };
    let game = [];
    game.push(tictactoe);
    database[player] = game;
  } else {
    let game = database[player];
    let tictactoe = game.find((x) => x.game === "tictactoe");
    tictactoe.loses = tictactoe.loses + 1;
  }
  let dataJSON = JSON.stringify(database, null, 2);
  fs.writeFileSync(`./src/utils/data/userGame.json`, dataJSON);
}

async function savetie(player) {
  if (!player) return;
  let database = JSON.parse(fs.readFileSync(`./src/utils/data/userGame.json`));
  //if player is not in database add them
  if (!database.hasOwnProperty(player)) {
    let tictactoe = {
      game: "tictactoe",
      wins: 0,
      loses: 0,
      ties: 1,
    };
    let game = [];
    game.push(tictactoe);
    database[player] = game;
  } else {
    let game = database[player];
    let tictactoe = game.find((x) => x.game === "tictactoe");
    tictactoe.ties = tictactoe.ties + 1;
  }
  let dataJSON = JSON.stringify(database, null, 2);
  fs.writeFileSync(`./src/utils/data/userGame.json`, dataJSON);
}
