const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("buildcomp-submit")
  .setDescription("submit your build comp")
  .addStringOption(option =>
    option.setName('category')
        .setDescription('The image category')
        .setRequired(true)
        .addChoices(
            { name: 'image 1', value: 'bc_submit_1' },
            { name: 'image 2', value: 'bc_submit_2' },
            { name: 'image 3', value: 'bc_submit_3' },
            { name: 'image 4', value: 'bc_submit_4' },
            { name: 'image 5', value: 'bc_submit_5' },
            { name: 'image 6', value: 'bc_submit_6' },
            { name: 'image 7', value: 'bc_submit_7' },
            { name: 'image 8', value: 'bc_submit_8' },
            { name: 'image 9', value: 'bc_submit_9' },
        ))
    .addAttachmentOption(option => 
        option.setName('screenshot')
        .setDescription('The build comp image your submitting')
        .setRequired(true)),

  async execute(interaction, client) {
    //return interaction.reply({content:"You can't submit a build comp! Just yet, wait for the <#629695330153267219> when you can.", ephemeral: true });
    //console.log(interaction);
    let category= interaction.options.data[0].value;
    let screenshot= interaction.options.data[1].attachment.url;
    let user= interaction.user.id;
    //read buildcompSubmits.json
    let buildcompSubmitsData = JSON.parse(fs.readFileSync("./src/utils/data/buildcompSubmits.json", "utf8"));
    //check if user has already submitted a build comp
    let usersArray = buildcompSubmitsData.users;
    //check which array the user is in
    if(usersArray.length === 0){
        NewUser(interaction,buildcompSubmitsData);
    }
    else{
        let userData
        let indexForUser
        for(let i = 0; i < usersArray.length; i++){
            if(usersArray[i].id === user){
                userData = usersArray[i];
                indexForUser = i;
                break;
            }
        }

        if(userData){
            //user has already submitted a build comp
            NonNewUser(interaction, buildcompSubmitsData, userData,indexForUser)
        }
        else{
            //user first time submitting a build comp
            NewUser(interaction,buildcompSubmitsData)
        }
    }
  },
};

async function NewUser(interaction,buildcompSubmitsData){
    let users = buildcompSubmitsData.users;
    submissions = {
        category: interaction.options.data[0].value,
        screenshot: interaction.options.data[1].attachment.url,
    }
    UserSubmiittion = {
        id: interaction.user.id,
        all9:false,
        submissions: [submissions]
    }
    users.push(UserSubmiittion);
    buildcompSubmitsData.users = users;
    fs.writeFileSync("./src/utils/data/buildcompSubmits.json", JSON.stringify(buildcompSubmitsData, null, 2));
    const embed = new Discord.MessageEmbed()
    .setTitle("Build Comp image uploaded")
    .setDescription(`Your build comp has been submitted for ${interaction.options.data[0].value}`)
    .setImage(interaction.options.data[1].attachment.url)
    interaction.reply({
        embeds: [embed],
        ephemeral: true,
    });
}

async function NonNewUser(interaction, buildcompSubmitsData, userData,indexForUser) {
    //check if user has already submitted a build comp for this category
    //let users = buildcompSubmitsData.users;
    let submissions = userData.submissions;
    let category = interaction.options.data[0].value;
    let submissionExists = false;
    let submissionIndex = 0;
    for(let i = 0; i < submissions.length; i++){
        if(submissions[i].category === category){
            submissionExists = true;
            submissionIndex = i;
            break;
        }
    }
    let updatedDatabase = false;
    if(submissionExists){
        //replace this submission with the new one
        submissions[submissionIndex].screenshot = interaction.options.data[1].attachment.url;
        //save the new submissions array
        userData.submissions = submissions;
        //save the new user data
        buildcompSubmitsData.users[indexForUser] = userData;
        await fs.writeFileSync("./src/utils/data/buildcompSubmits.json", JSON.stringify(buildcompSubmitsData, null, 2));
        const embed = new Discord.MessageEmbed()
        .setTitle("Build Comp image updated")
        .setDescription(`Your build comp has been submitted for ${interaction.options.data[0].value} has been updated with`)
        .setImage(interaction.options.data[1].attachment.url)
        .addField("Total Submissions", submissions.length+" out of 9")
        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
        updatedDatabase = true;
    }
    else{
        //user has not submitted a build comp for this category yet
        submission = {
            category: interaction.options.data[0].value,
            screenshot: interaction.options.data[1].attachment.url,
        }
        //save the new submission
        submissions.push(submission);
        //save the new submissions array
        userData.submissions = submissions;
        //save the new user data
        buildcompSubmitsData.users[indexForUser] = userData;
        await fs.writeFileSync("./src/utils/data/buildcompSubmits.json", JSON.stringify(buildcompSubmitsData, null, 2));
        //send the user a message
        const embed = new Discord.MessageEmbed()
        .setTitle("Build Comp image uploaded")
        .setDescription(`Your build comp has been submitted for ${interaction.options.data[0].value}`)
        .setImage(interaction.options.data[1].attachment.url)
        .addField("Total Submissions", submissions.length+" out of 9")
        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
        updatedDatabase = true;
    }
    //check if user has already submitted a build comp for all categories
    let submissionsLength = submissions.length;
    if(submissionsLength === 9){
        //user has submitted all build comps
        userData.all9 = true;
        buildcompSubmitsData.users[indexForUser] = userData;
        fs.writeFileSync("./src/utils/data/buildcompSubmits.json", JSON.stringify(buildcompSubmitsData, null, 2));
        //send the user a message
        const embed = new Discord.MessageEmbed()
        .setTitle("Build Comp Submitted")
        .setDescription("You have submitted all required images for your build comp!\nGet full list of your entries here with /buildcomp-data")
        await interaction.followUp({
            embeds: [embed],
            ephemeral: true,
        });
    }
}