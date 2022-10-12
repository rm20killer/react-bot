const Discord = require("discord.js");

module.exports = {
  name: 'interactionCreate',
  async execute(client, interaction) {
      //console.log(interaction);
      //slash commands
      if (interaction.type === 2) {
          const command = client.slashcommand.get(interaction.commandName);
          if (!command) return;

          try {
              await command.execute(interaction, client);
          } catch (error) {
              console.error(error);
              const embed = new Discord.EmbedBuilder()
                  .setDescription(`error executing command ${interaction.commandName}`)
                  .setColor("#2F3136");
              return interaction.reply({
                  embeds: [embed],
              });
          }
      }
      //buttons
      else if (interaction.type === 3) {
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
              const embed = new Discord.EmbedBuilder()
                  .setDescription(`error`)
                  .setColor("#2F3136");
              return interaction.reply({
                  embeds: [embed],
              });
          }
      }

  },
};