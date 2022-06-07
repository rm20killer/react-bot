const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pong'),
    async execute(interaction, client) {
        await interaction.reply('Pong!');
    },
};