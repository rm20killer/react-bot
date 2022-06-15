const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("madeby")
    .setDescription("Who made me?"),
  async execute(interaction, client) {
    await interaction.reply(
      "This was made by RM20 with help from RootAtKali and Zilla, you can sponsor this bot and source code can be found at https://github.com/rm20killer/react-bot"
    );
  },
};
