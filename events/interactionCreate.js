const Discord = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (interaction.isCommand()) {
            const command = client.slashcommand.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                const embed = new Discord.MessageEmbed()
                    .setDescription(`error executing command ${interaction.commandName}`)
                    .setColor("#2F3136");
                return interaction.reply({
                    embeds: [embed],
                });
            }
        }
        else if (interaction.isButton()) {
            //get button id
            const id = interaction.customId;
            const ButtonStart = id.split("-")[0];
            //console.log(ButtonStart);
            const buttonType = client.button.get(ButtonStart);
            if (!buttonType) return;
            try {
                await buttonType.execute(interaction, client);
            } catch (error) {
                console.error(error);
                const embed = new Discord.MessageEmbed()
                    .setDescription(`error`)
                    .setColor("#2F3136");
                return interaction.reply({
                    embeds: [embed],
                });
            }
        }

    },
};