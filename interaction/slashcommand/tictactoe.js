const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const fs = require("fs");
const crypto = require('crypto');
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
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('play against a user')
                .addUserOption(option => option.setName('target').setDescription('The user'))),

    async execute(interaction, client) {
        const database = require(`../../utils/data/tictactoe.json`);
        //console.log(database)
        let player1 = interaction.user.id
        let player2 = interaction.options._hoistedOptions[0].user.id
        //get data from database and and to file
        let data = await createdata(interaction, database)
        let dataJSON = JSON.stringify(data, null, 2)
        fs.writeFileSync(`./utils/data/tictactoe.json`, dataJSON)

        //respond to user
        let embed = new Discord.MessageEmbed()
            .setTitle("Tic Tac Toe")
            .setDescription(`you have started a game with <@${player2}>. \n  <@${player2}> must accept the game before you can play. \n  You can accept the game by pushing button`)
            .setColor("#0099ff")

        let key = database.gameArray[database.gameArray.length - 1].key
        let acceptButton = new MessageButton()
            .setLabel("Accept")
            .setStyle("SUCCESS")
            .setCustomId("tic-accept-"+key);
        //console.log(acceptButton)
        let row = new MessageActionRow()
        .addComponents([acceptButton])
        //create a button
        interaction.reply({ embeds: [embed],components: [row] })
        //return error("not implemented");

    },
};

//generate a sting using player1 and player2 and gameID and timeStarted
//return key
async function generateEcrypted(player1, player2, gameID,timeStarted) {
    let key = player1 + "-" + player2 + "-" + gameID + "-" + timeStarted
    console.log(key)
    //hash they with MD4
    let hash = crypto.createHash('md4').update(key).digest('hex')
    console.log(hash)
    return hash
}

async function createdata(interaction, database) {
    gameArray = database.gameArray;

    let gameID = gameArray.length++;
    let player1 = interaction.user.id
    let player2 = interaction.options._hoistedOptions[0].user.id
    let player2Aceepted = false
    let turn = 0;
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    let timeStarted = Date.now()
    //time end 10 minutes
    let timeEnded = timeStarted + 600000
    let winner = 0;
    let gameover = false

    let key = await generateEcrypted(player1, player2, gameID,timeStarted)
    console.log(interaction)
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
        gameover: gameover
    }
    gameArray.push(data)
    console.log(gameArray)
    //get rid of null in array
    let newArray = gameArray.filter(function (el) {
        return el != null;
    })
    //add 1 to total in database
    let total = database.total + 1
    let finished = 0
    let playing = database.playing + 1
    let ammountInArray = newArray.length
    let data2 = {
        total: total,
        finished: finished,
        playing: playing,
        ammountInArray: ammountInArray,
        gameArray: newArray
    }
    return data2
}