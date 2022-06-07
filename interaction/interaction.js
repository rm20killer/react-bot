const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//loop buttons

module.exports = {
    async execute(interaction, client) {
        let type = "";
        if(interaction.isCommand()){
            type = "command";
            const command = client.slashcommand.get(interaction.commandName);
            if (!command) return;
          
            try {
              await command.execute(interaction, client);
            } catch (error) {
              console.error(error);
              const embed = new Discord.MessageEmbed()
              .setDescription(`error`)
              .setColor("#2F3136")
              return interaction.reply({
                embeds: [embed]
                });
            };
        }
        else if(interaction.isSelectMenu()){
            type = "selectMenu";
        }
        else if(interaction.isContextMenu()){
            type = "contextMenu";
        }
        else if(interaction.isButton()){
            type = "button";
            //get button id
            const id = interaction.customId;
            const ButtonStart = id.split("-")[0];
            //console.log(ButtonStart);
            const buttonType = client.button.get(ButtonStart);
            if (!buttonType) return;
            try {
                await buttonType.execute(interaction, client);
            }
            catch (error) {
                console.error(error);
                const embed = new Discord.MessageEmbed()
                .setDescription(`error`)
                .setColor("#2F3136")
                return interaction.reply({
                    embeds: [embed]
                });
            }
        }

        
    }
}