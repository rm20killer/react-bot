const Discord = require("discord.js");

const ReactionChecker = require(`../AutoMod/Reactions/ReactionChecker`);
module.exports = {
  name: "messageReactionAdd",
  async execute(client, reaction, user) {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await reaction.fetch();
      } catch (error) {
        console.error("Something went wrong when fetching the message:", error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }
    ReactionChecker.ReactionChecker(reaction, user, client);
  },
};
