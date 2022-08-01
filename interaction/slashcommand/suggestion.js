const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fs = require("fs");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggestion")
        .setDescription("suggest a movie or game")
        .addStringOption(option =>
            option
                .setName("category")
                .setRequired(true)
                .setDescription("The category of the suggestion")
                .addChoices(
                    { name: "movie", value: "movie" },
                    { name: "game", value: "game" }
                ))
        .addStringOption((option) =>
            option
                .setName("suggestion")
                .setDescription("what is the suggestion")
                .setRequired(true),
        ),


    async execute(interaction, client) {
        let category = interaction.options.data[0].value;
        let suggestion = interaction.options.data[1].value;
        //check if file exists
        if (fs.existsSync("./utils/data/suggestions.json")) {
        } else {
            //create file
            let data = {
                movie: [],
                game: [],
            };
            const newFile = fs.createWriteStream(`./utils/data/suggestions.json"`);
            await newFile.write(JSON.stringify(data, null, 2));
            newFile.end();
        }
        //push suggestion to file
        let suggestionsData = JSON.parse(fs.readFileSync("./utils/data/suggestions.json", "utf8"));
        let data = {
            suggestion: suggestion,
            userID: interaction.user.id,
            accepted: false,
        }
        if (category === "movie") {
            suggestionsData.movie.push(data);
        }
        else if (category === "game") {
            suggestionsData.game.push(data);
        }
        fs.writeFileSync("./utils/data/suggestions.json", JSON.stringify(suggestionsData, null, 2));
        await interaction.reply({ content: "Your suggestion has been added to the list!", ephemeral: true });
        //get size of the category
        let size = 0;
        if (category === "movie") {
            size = suggestionsData.movie.length;
        }
        else if (category === "game") {
            size = suggestionsData.game.length;
        }
        //send message to mod chat
        let modChannel = client.channels.cache.get("1003439402162335744");
        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.avatarURL() })
            .setTitle(`suggestion for ${category}`)
            .setDescription(`${suggestion}`)
            .setColor("#0099ff")
            .setTimestamp()
            .setFooter({ text: `suggestion id: ${size-1}` });
        let acceptButton = new Discord.MessageButton()
            .setLabel("accept")
            .setCustomId(`suggestionAccept-${category}-${size-1}`)
            .setStyle(`SUCCESS`)

        let row = new Discord.MessageActionRow()
            .addComponents(acceptButton);
        
        modChannel.send({ embeds: [embed],components: [row] });
    },
};

async function checkFile() {
    if (fs.existsSync("utils/data/suggestions.json")) {
        return true;
    } else {
        //create file
        let data = {
            movie: [],
            game: [],
        };
        const newFile = fs.createWriteStream(`utils/data/suggestions.json"`);
        await newFile.write(JSON.stringify(data, null, 2));
        newFile.end();
        return true;
    }
    return false;
}