const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
  .setName("buildcomp-data")
  .setDescription("get data for your build comp submission"),
  async execute(interaction, client) {
    //return interaction.reply("Pong!");
    let buildcompSubmitsData = JSON.parse(fs.readFileSync("./utils/data/buildcompSubmits.json", "utf8"));
    let usersArray = buildcompSubmitsData.users;
    let userData
    let indexForUser
    for(let i = 0; i < usersArray.length; i++){
        if(usersArray[i].id === interaction.user.id){
            userData = usersArray[i];
            indexForUser = i;
            break;
        }
    }
    if(!userData)
    {
        return interaction.reply("You have not submitted a build comp yet! Do so by typing `/buildcomp-submit` more info in {enter channel}");
    }
    else
    {
        GetData(interaction,client,userData,indexForUser);
    }
  },
};


async function GetData(interaction,client,userData,indexForUser)
{
    //get all submissions
    let submissions = userData.submissions;
    let embed = new Discord.MessageEmbed()
    .setTitle("Your Build Comp Submissions")
    .setColor("#0099ff")
    .setDescription("Here are your build comp submissions! Click on the image to see the image!")
    //for each submission
    for(let i = 0; i < submissions.length; i++)
    {
        //get the submission
        let submission = submissions[i];
        //get the category
        let category = submission.category;
        //get the screenshot
        let screenshot = submission.screenshot;
        //add the submission to the embed
        embed.addField(category, screenshot);
    }
    await interaction.reply({
        embeds: [embed],
        ephemeral: true,
    });
}