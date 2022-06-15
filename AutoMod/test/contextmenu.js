const { Client, CommandInteraction } = require("discord.js");
module.exports = {
  name: "test",
  type: 3,

  async execute(interaction) {
    console.log("registered");
  },
};
