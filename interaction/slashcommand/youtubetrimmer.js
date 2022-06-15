const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtubetrimmer")
    .setDescription("Find info on how to trim your youtube video"),
  async execute(interaction, client) {
    await interaction.reply(
      "If it on your channel you can download the video and trim it a editing software. \nIf the video is not from your channel you can use the clip button on youtube if that video does not have the clip button you can use youtube-dl`"
    );
  },
};
