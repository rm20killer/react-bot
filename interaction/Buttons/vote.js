const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");
module.exports = {
  customId: "vote",
  execute: async function (interaction, client) {
    let voteid = interaction.customId;
    const user = interaction.user;
    const userid = user.id;
    //split voteid into an array
    let voteidArray = voteid.split("-");
    let guildId = voteidArray[1];
    let votefile = voteidArray[2] + "-" + voteidArray[3];
    let newVoteID = voteidArray[4];
    //console.log(voteidArray);

    const data = require(`../../data/vote/${guildId}/${votefile}.json`);

    let hasVoted = false;
    let votedForSame = false;
    for (let i = 0; i < data.vote.length; i++) {
      if (data.vote[i].userid === userid) {
        if (data.vote[i].voteID === newVoteID) {
          votedForSame = true;
          hasVoted = true;
          //console.log("voted for same");
        } else {
          data.vote[i].voteID = newVoteID;
          //console.log("voted for different");
        }
        //console.log("has voted changed");
        hasVoted = true;
      }
      if (hasVoted) {
        //break out of loop
        break;
      }
    }
    if (hasVoted === false) {
      //console.log("voted for first time");
      data.vote.push({
        userid: userid,
        voteID: newVoteID,
      });
    }
    fs.writeFile(
      `./data/vote/${guildId}/${votefile}.json`,
      JSON.stringify(data, null, 2),
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        return;
      }
    );
    try {
      if (hasVoted === true) {
        if (votedForSame === true) {
          await user
            .send(
              `You have already voted for this option! \n${
                data.options[newVoteID - 1]
              }`
            )
            .catch((error) => {
              interaction.reply(
                `I can't send you a message, please enable DMs! but you have already voted for this option!`
              );
              //wait 5 seconds and then delete the message
              setTimeout(() => {
                interaction
                  .deleteReply()
                  .then(console.log)
                  .catch(console.error);
              }, 5000);
              return;
            });
          return;
        } else {
          await user
            .send(
              `You have vote has been changed to  ${newVoteID}! \n${
                data.options[newVoteID - 1]
              }`
            )
            .catch((error) => {
              interaction.reply(
                `I can't send you a message, please enable DMs! but your vote has been changed!`
              );
              //wait 5 seconds and then delete the message
              setTimeout(() => {
                interaction
                  .deleteReply()
                  .then(console.log)
                  .catch(console.error);
              }, 5000);
              return;
            });
          return;
        }
      } else {
        await user
          .send(
            `You have voted for ${newVoteID}! \n(${
              data.options[newVoteID - 1]
            }) \nthank you for voting!`
          )
          .catch((error) => {
            interaction.reply(
              `I can't send you a message, please enable DMs! but you have voted!`
            );
            //wait 5 seconds and then delete the message
            setTimeout(() => {
              interaction.deleteReply().then(console.log).catch(console.error);
            }, 5000);
            return;
          });
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    } finally {
      interaction.deferUpdate().catch(console.error);
    }
  },
};
