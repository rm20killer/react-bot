const { SlashCommandBuilder } = require("@discordjs/builders");
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
    return interaction.reply({content:"You can't submit a build comp! Just yet, wait for the <#629695330153267219> when you can.", ephemeral: true });
    console.log(interaction);
  },
};
