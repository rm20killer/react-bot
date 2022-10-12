const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("grmc")
    .setDescription("info on gamers react "),
  async execute(interaction, client) {
    let row = new ActionRowBuilder()


    let DiscordButton = new ButtonBuilder()
      .setLabel("GRMC Discord")
      .setStyle(ButtonStyle.Link)
      .setURL("https://discord.gg/mvpPdqTmJh")

    let websiteButton = new ButtonBuilder()
      .setLabel("GRMC Website")
      .setStyle(ButtonStyle.Link)
      .setURL("https://www.gamersreact.net")

    row.addComponents(DiscordButton, websiteButton)
    const embed = new Discord.EmbedBuilder()
      .setTitle(`GRMC`)
      .setColor(2374108)
      .setDescription(`If you need help with the minecraft  server ask on the Gamer React Minecraft discord or website`)
      .addFields([
        {name:"IP:", value:"`play.gamersreact.net`"},
        {name:"Version", value:"Premium Java only, 1.16.5 with support from 1.8 to 1.19"}
      ])
    await interaction
      .reply({ embeds: [embed], components: [row] })
      .catch(console.error);
  },
};
