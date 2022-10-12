const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const fs = require("fs");

module.exports = {
    customId: "suggestionAccept",
    async execute(interaction, client) {
        let id = interaction.customId.split("-")[2];
        let categorie = interaction.customId.split("-")[1];
        let suggestions = JSON.parse(fs.readFileSync("./src/utils/data/suggestions.json", "utf8"));
        if(categorie === "movie"){
            suggestions.movie[id].accepted = true;
        }
        else if(categorie === "game"){
            suggestions.game[id].accepted = true;
        }
        fs.writeFileSync("./src/utils/data/suggestions.json", JSON.stringify(suggestions, null, 2));
        await interaction.reply({ content: "That has been marked as accepted", ephemeral: true });
    }
}

