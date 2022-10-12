const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fs = require("fs");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggestion-viwer")
        .setDescription("find accepted suggestions")
        .addStringOption(option =>
            option
                .setName("category")
                .setRequired(false)
                .setDescription("The category of the suggestion")
                .addChoices(
                    { name: "movie", value: "movie" },
                    { name: "game", value: "game" }
                )),


    async execute(interaction, client) {
        let category
        if (interaction.options.data[0]) {
            if (interaction.options.data[0].value === "movie") {
                category = "movie";
            }
            else if (interaction.options.data[0].value === "game") {
                category = "game";
            }
        }

        if (category) {
            //find all suggestions in the category that are accepted
            let suggestionsData = JSON.parse(fs.readFileSync("./src/utils/data/suggestions.json", "utf8"));
            let suggestions = [];
            if (category === "movie") {
                for (let i = 0; i < suggestionsData.movie.length; i++) {
                    if (suggestionsData.movie[i].accepted === true) {
                        suggestions.push(suggestionsData.movie[i]);
                    }
                }
            }
            else if (category === "game") {
                for (let i = 0; i < suggestionsData.game.length; i++) {
                    if (suggestionsData.game[i].accepted === true) {
                        suggestions.push(suggestionsData.game[i]);
                    }
                }
            }
            //send the suggestions array to the user as a file
            let file = JSON.stringify(suggestions, null, 2)
            //save as file
            const newfile = fs.createWriteStream("./src/utils/data/AcceptedSuggestions.json");
            await newfile.write(file);
            newfile.end();
            await interaction.reply({ content: "Here are all the accepted suggestions for that category", files: [{
                attachment: "./src/utils/data/AcceptedSuggestions.json",
                name: "suggestions.json"
            }], ephemeral: true });
        }
        else {
            //get all suggestions that are accepted
            let suggestionsData = JSON.parse(fs.readFileSync("./src/utils/data/suggestions.json", "utf8"));
            let suggestions = [];
            for (let i = 0; i < suggestionsData.movie.length; i++) {
                if (suggestionsData.movie[i].accepted === true) {
                    suggestions.push(suggestionsData.movie[i]);
                }
            }
            for (let i = 0; i < suggestionsData.game.length; i++) {
                if (suggestionsData.game[i].accepted === true) {
                    suggestions.push(suggestionsData.game[i]);
                }
            }
            //send the suggestions as a file
            let file = JSON.stringify(suggestions, null, 2)
            //save as file
            const newfile = fs.createWriteStream("./src/utils/data/AcceptedSuggestions.json");
            await newfile.write(file);
            newfile.end();
            await interaction.reply({ content: "Here are all the accepted suggestions", files: [{
                attachment: "./src/utils/data/AcceptedSuggestions.json",
                name: "suggestions.json"
            }], ephemeral: true });
        }
    },
};
