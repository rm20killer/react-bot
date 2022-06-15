const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("requirements")
    .setDescription("find video requirements"),
  async execute(interaction, client) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Requirements")
      .setAuthor(
        "Gamers React",
        "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
      )
      .setColor(0xff0000)
      .setDescription(
        "All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 kbps (x264 medium)\n> Audio bitrate: At least 150 kbps (AAC-LC)\n> Must embed on discord\n> Must be under 2 minutes. No timestamps!\nDeliberately scaling or padding a video to fool me\ndoes **not** pass the requirements."
      );

    await interaction.reply({ embeds: [embed] });
  },
};
