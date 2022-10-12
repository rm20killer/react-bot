const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const fs = require("fs");

module.exports = {
    customId: "buildviwer",
    async execute(interaction, client) {
        let buildcompSubmitsData = JSON.parse(fs.readFileSync("./src/utils/data/buildcompSubmits.json", "utf8"));
        let usersArray = buildcompSubmitsData.users;

        //split customId into an array
        let customIdArray = interaction.customId.split("-");
        let Direction=customIdArray[1];
        let oldIndex = customIdArray[2];

        //if direction is up
        if(Direction === "up")
        {
            //if oldIndex is not the last index
            if(oldIndex !== (buildcompSubmitsData.users.length - 1))
            {
                newindex = parseInt(oldIndex) + 1;
                //get the user at the new index
                let User = usersArray[newindex];
                GetData(interaction, client, User, newindex,usersArray)
            }
            else{
                interaction.deferReply();
            }
        }
        //if direction is down
        if(Direction === "down")
        {
            //if oldIndex is not the first index
            if(oldIndex !== 0)
            {
                newindex = parseInt(oldIndex) - 1;
                //get the user at the new index
                let User = usersArray[newindex];
                GetData(interaction, client, User, newindex,usersArray)
            }
            else{
                interaction.deferReply();
            }
        }
    }
}


async function GetData(interaction, client, userData, indexForUser,usersArray) {
    //get all submissions
    userID = userData.id;
    let submissions = userData.submissions;
    let embed = new Discord.MessageEmbed()
        .setTitle("Build Comp Submissions for <@" + userID + ">")
        .setColor("#0099ff")
        .setDescription("Click on the image to see the image!")
        .setFooter({text:"id: " + indexForUser});
    //for each submission
    for (let i = 0; i < submissions.length; i++) {
        //get the submission
        let submission = submissions[i];
        //get the category
        let category = submission.category;
        //get the screenshot
        let screenshot = submission.screenshot;
        //add the submission to the embed
        embed.addField(category, screenshot);
    }
    let down = new MessageButton()
        .setLabel("Down")
        .setStyle("SUCCESS")
        .setCustomId("buildviwer-down-" + indexForUser);
    let up = new MessageButton()
        .setLabel("Up")
        .setStyle("SUCCESS")
        .setCustomId("buildviwer-up-" + indexForUser);
    let row = new MessageActionRow();
    let hasButtons = false;
    //if the user is the not first user
    if (indexForUser > 0) {
        //add down button
        row.addComponents(down);
        hasButtons = true;
    }
    //if the user is not the last user
    if (indexForUser < usersArray.length - 1) {
        //add up button
        row.addComponents(up);
        hasButtons = true;
    }
    //send the embed
    if(hasButtons){
        await interaction.update({ embeds: [embed], components: [row], ephemeral: true });
    }
    else{
        await interaction.update({ embeds: [embed], ephemeral: true });
    }
}
