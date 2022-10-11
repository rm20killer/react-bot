const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fs = require("fs");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll-data")
        .setDescription("get vote data")
        .setDefaultMemberPermissions(8)
        .addStringOption((option) =>
            option
                .setName("voteid")
                .setDescription("vote id")
                .setRequired(true),
        ),

    async execute(interaction, client) {
        let Rawoptions = interaction.options.data;
        let voteID = Rawoptions[0].value;
        guildId = interaction.guildId;
        if (verifyID(voteID, guildId) === false) {
            await interaction.reply("vote id not found");
            return;
        }
        else {
            let data = JSON.parse(fs.readFileSync(`./utils/data/vote/${guildId}/${voteID}.json`));
            //get options from file
            let options = data.options;
            let votes = []
            //for each option, push to 0 to vote
            for (let i = 0; i < options.length; i++) {
                votes.push(0);
            }
            let uservote = data.vote;
            //if userVote is empty, return 0
            if (uservote.length === 0) {
                await interaction.reply("no votes yet");
                return;
            }
            for (let i = 0; i < uservote.length; i++) {
                votes[uservote[i].voteID - 1]++;
            }
            const embed = new Discord.MessageEmbed()
                .setTitle(`Vote Data for ${voteID}`)
                .setColor("#0099ff")
                .setTimestamp()
                .setFooter({text: `Vote ID: ${voteDataNum}`});
            embed.addField(`Total Votes`, `${uservote.length + 1}`, false);
            //create a loop to add Votes to the embed
            for (let i = 0; i < options.length; i++) {
                embed.addField(`votes for ${i + 1}`, `${votes[i]}`, true);
            }
            await interaction.reply({
                embeds: [embed],
                files: [{ attachment: `./utils/data/vote/${guildId}/${voteID}.json`, name: `votedata.json` }],
            });;
            return;
        }
    }
};

async function verifyID(voteID, guildId) {
    //check if there is a file
    let file = fs.existsSync(`./utils/data/vote/${guildId}/${voteID}.json`);
    if (file === false) {
        return false;
    }
    return true;
}
