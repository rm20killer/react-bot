const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('grmc')
        .setDescription('info on gamers react '),
    async execute(interaction, client) {
        let row = new MessageActionRow()
            .addComponents(new MessageButton()
                .setStyle('LINK')
                .setLabel('GRMC Discord')
                .setURL("https://discord.gg/mvpPdqTmJh"))
            .addComponents(new MessageButton()
                .setStyle('LINK')
                .setLabel('GRMC Website')
                .setURL("https://www.gamersreact.net"))
        const embed = new Discord.MessageEmbed()
            .setTitle(`GRMC`)
            .setColor(2374108)
            .setDescription(`If you need help with the minecraft  server ask on the Gamer React Minecraft discord or website`)
            .addField("IP:", "`play.gamersreact.net`")
            .addField("Version:", "Premium Java only, 1.16.5 with support from 1.8 to 1.18")
        await interaction.reply({ embeds: [embed], components: [row] }).catch(console.error);
    },
};