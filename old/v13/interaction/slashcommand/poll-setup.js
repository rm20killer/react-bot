const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fs = require("fs");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll-setup")
        .setDescription("set up a vote")
        .setDefaultMemberPermissions(8)
        .addStringOption((option) =>
            option
                .setName("vote1")
                .setDescription("what is the first option")
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("vote2")
                .setDescription("what is the second option")
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("vote3")
                .setDescription("what is the third option")
                .setRequired(false),
        )
        .addStringOption((option) =>
            option
                .setName("vote4")
                .setDescription("what is the fourth option")
                .setRequired(false),
        )
        .addStringOption((option) =>
            option
                .setName("vote5")
                .setDescription("what is the fifth option")
                .setRequired(false),
        )
        .addStringOption((option) =>
            option
                .setName("vote6")
                .setDescription("what is the sixth option")
                .setRequired(false),
        )
        .addStringOption((option) =>
            option
                .setName("vote7")
                .setDescription("what is the seventh option")
                .setRequired(false),
        )
        .addStringOption((option) =>
            option
                .setName("vote8")
                .setDescription("what is the eighth option")
                .setRequired(false),
        )
        .addStringOption((option) =>
            option
                .setName("vote9")
                .setDescription("what is the ninth option")
                .setRequired(false),
        )
        .addStringOption((option) =>
            option
                .setName("vote10")
                .setDescription("what is the tenth option")
                .setRequired(false),
        ),
    async execute(interaction, client) {
        //read data/vote folder
        //console.log(interaction);
        //console.log(interaction.options.data);

        let Rawoptions = interaction.options.data;
        let options = [];
        //loop through all rawoptions and push value to options
        for (let i = 0; i < Rawoptions.length; i++) {
            options.push(Rawoptions[i].value);
        }
        //console.log(options);
        let vote = [];
        let data = {
            options: options,
            vote: vote,

        }
        let voteDataNum
        const voteFolder = "utils/data/vote/" + interaction.guildId;
        //if folder does not exist, create it
        if (!fs.existsSync(voteFolder)) {
            fs.mkdirSync(voteFolder);
        }
        const files = fs.readdirSync(voteFolder);
        //if no files, create a new file
        if (files.length <= 0) {
            const newFile = fs.createWriteStream(`${voteFolder}/0001-A.json`);
            newFile.write(JSON.stringify(data, null, 2));
            voteDataNum ="0001-A"
        }
        //else find the last file and add 1 to it
        else {
            let lastFile = files[files.length - 1];
            //remove the - and the .json from the file name

            fileName = lastFile.replace(".json", "");
            //split the file name into an array
            fileName = fileName.split("-");
            let number = fileName[0];
            let letter = fileName[1];
            //if number is 9999 revert to 0001 and move foward in The alphabet
            if (number == 9999) {
                number = "0001";
                letter = nextChar(letter);
            }
            //else add 1 to the number
            else {
                number = (Number(number) + 1).toString();
            }
            //make the number 4 digits long
            while (number.length < 4) {
                number = "0" + number;
            }
            //new file name
            const newFile = fs.createWriteStream(`${voteFolder}/${number}-${letter}.json`);
            voteDataNum = `${number}-${letter}`
            newFile.write(JSON.stringify(data, null, 2));
        }

        //crate an embed
        const embed = new Discord.MessageEmbed()
            .setTitle("VOTE!!!")
            .setColor("#2F3136")
            .setFooter({text: `Vote ID: ${voteDataNum}`})
            .setTimestamp();
        //for each option add field to embed
        for (let i = 0; i < options.length; i++) {
            embed.addField(`Vote ${i + 1}`, options[i]);
        }


        //create buttons for each option
        let buttons = [];
        for (let i = 0; i < options.length; i++) {
            buttons.push(
                new Discord.MessageButton()
                    .setStyle(`SUCCESS`)
                    .setCustomId(`vote-${interaction.guildId}-${voteDataNum}-${i+1}`)
                    .setLabel(`Vote ${i+1}`)
            );
        }
        //for each button add a row
        let row = new Discord.MessageActionRow();
        let row2 = new Discord.MessageActionRow();
        let b5more = false
        for (let i = 0; i < buttons.length; i++) {
            if(i<5){
                row.addComponents(buttons[i]);
            }
            else{
                b5more = true
                row2.addComponents(buttons[i]);
            }
        }
        if (b5more){
            await interaction.reply({ embeds: [embed], components: [row, row2] });
        }
        else{
            await interaction.reply({ embeds: [embed], components: [row] });
        }
        
            
        //await interaction.reply("Pong!");

    },
};

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}