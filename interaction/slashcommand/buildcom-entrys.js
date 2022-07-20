const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const fs = require("fs");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("buildcomp-entrys")
    .setDescription("get data for your build comp submission")
    .addIntegerOption((option) =>
      option.setName("id").setDescription("id of the user to get data for")
    ),
  async execute(interaction, client) {
    //return interaction.reply("Pong!");
    let buildcompSubmitsData = JSON.parse(
      fs.readFileSync("./utils/data/buildcompSubmits.json", "utf8")
    );
    let usersArray = buildcompSubmitsData.users;
    let indexForUser = 0;
    //console.log(interaction.options.data[0]);
    if (interaction.options.data[0]) {
      indexForUser = interaction.options.data[0].value;
    }
    let userData = usersArray[indexForUser];
    if (!userData) {
      return interaction.reply(
        "You have not submitted a build comp yet! Do so by typing `/buildcomp-submit` more info in {enter channel}"
      );
    } else {
      GetData(interaction, client, userData, indexForUser, usersArray);
    }
  },
};

async function GetData(
  interaction,
  client,
  userData,
  indexForUser,
  usersArray
) {
  //get all submissions
  let submissions = userData.submissions;
  //get the user
  let userID = userData.id;
  let embed = new Discord.MessageEmbed()
    .setTitle("Build Comp Submissions for <@" + userID + ">")
    .setColor("#0099ff")
    .setDescription("Click on the image to see the image!");
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
  if (hasButtons) {
    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true,
    });
  } else {
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
