const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");


const gameID = [
  [0, "tictactoe"],
  
]
module.exports = {
  data: new SlashCommandBuilder()
    .setName("gamedata")
    .setDescription("get stats for a game")
    .addStringOption(option =>
      option.setName('game')
        .setDescription('game')
        .setRequired(true)
        .addChoices(
          { name: 'tictactoe', value: 'game_Tic' },)
        .addUserOption(option =>
          option.setName('target').setDescription('The member to get the stats for'))
    ),

  async execute(interaction, client) {
    const gameString = interaction.options.getString('game');
    //read ticktactoe data
    const database = JSON.parse(fs.readFileSync(`./utils/data/userGame.json`));
    const user = interaction.options.getUser('target');
    if(!user) {
      
    }
    else{
      const userID=user.id
      const userData=database[userID]
      if(!userData) {
        interaction.reply("User has no data")
      }
      else{
        //look for game in userData array
        const gameData=userData.find(game => game.game === game)
        if(!gameData) {
          interaction.reply("User has no data for this game")
        }
      }
    }
  },
};
