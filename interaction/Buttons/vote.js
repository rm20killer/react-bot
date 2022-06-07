
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const fs = require('fs');

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
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});

const data = require(`../../utils/votedata.json`);
const imageData = [
    "https://cdn.discordapp.com/attachments/982977292747808798/982977874837524500/unknown.png",
    "https://cdn.discordapp.com/attachments/982977292747808798/982977928272949268/unknown.png",
    "https://cdn.discordapp.com/attachments/982977292747808798/982977956760653875/unknown.png",
    "https://cdn.discordapp.com/attachments/982977292747808798/982977999420940328/unknown.png",
    "https://cdn.discordapp.com/attachments/982977292747808798/982978018693754890/unknown.png",
    "https://cdn.discordapp.com/attachments/982977292747808798/982978035022176306/unknown.png",
    "https://cdn.discordapp.com/attachments/982977292747808798/982978195701764136/unknown.png",
    "https://cdn.discordapp.com/attachments/982977292747808798/982978210511867944/unknown.png",
    "https://cdn.discordapp.com/attachments/982977292747808798/982978234989838356/unknown.png",
    "https://cdn.discordapp.com/attachments/982977292747808798/982978250932383844/unknown.png"
];
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
module.exports = {
    customId: "vote",
    execute: async function (interaction, client) {
        //console.log(interaction)
        const id = interaction.customId;
        const user = interaction.user;
        const userid = user.id;
        let newVoteID = 0;
        if (id === "vote-1") {
            newVoteID = 1;
        }
        if (id === "vote-2") {
            newVoteID = 2;
        }
        if (id === "vote-3") {
            newVoteID = 3;
        }
        if (id === "vote-4") {
            newVoteID = 4;
        }
        if (id === "vote-5") {
            newVoteID = 5;
        }
        if (id === "vote-6") {
            newVoteID = 6;
        }
        if (id === "vote-7") {
            newVoteID = 7;
        }
        if (id === "vote-8") {
            newVoteID = 8;
        }
        if (id === "vote-9") {
            newVoteID = 9;
        }
        if (id === "vote-10") {
            newVoteID = 10;
        }

        //check if user has already voted
        let hasVoted = false;
        let votedForSame = false;
        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].userid === userid) {
                if (data.data[i].voteID === newVoteID) {
                    votedForSame = true;
                    hasVoted = true;
                    //console.log("voted for same");
                }
                else {
                    data.data[i].voteID = newVoteID;
                    //console.log("voted for different");
                }
                //console.log("has voted changed");
                hasVoted = true;
            }
            if(hasVoted){
                //break out of loop
                break;
            }

        }
        //console.log(hasVoted);
        if (hasVoted === false) {
            console.log("voted for first time");
            data.data.push({
                userid: userid,
                voteID: newVoteID
            });
        }
        //save data file
        fs.writeFile(`./utils/votedata.json`, JSON.stringify(data), (err) => {
            if (err){
                console.log(err);
                const channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
                channel.send("Error saving data file <@227490301688676354>");
                interaction.message.edit("Something went wrong saving the data file please wait until this message is delete and try again")

            }
            return
        });

        //send message to user
        try {
            if (hasVoted === true) {
                if (votedForSame === true) {
                    await user.send(`You have already voted for this option! \n${imageData[newVoteID - 1]}`).catch(error => {
                        interaction.reply(`I can't send you a message, please enable DMs! but you have already voted for this option!`)
                        //wait 5 seconds and then delete the message
                        setTimeout(() => {
                            interaction.deleteReply()
                                .then(console.log)
                                .catch(console.error);
                        }
                            , 5000);
                        return;
                    });
                    return;
                }
                else {
                    await user.send(`You have vote has been changed to  ${newVoteID}! \n${imageData[newVoteID - 1]}`).catch(error => {
                        interaction.reply(`I can't send you a message, please enable DMs! but your vote has been changed!`);
                        //wait 5 seconds and then delete the message
                        setTimeout(() => {
                            interaction.deleteReply()
                                .then(console.log)
                                .catch(console.error);
                        }
                            , 5000);
                        return;
                    });
                    return;
                }

            }
            else {
                await user.send(`You have voted for ${newVoteID}! \n(${imageData[newVoteID - 1]}) \nthank you for voting!`).catch(error => {
                    interaction.reply(`I can't send you a message, please enable DMs! but you have voted!`)
                    //wait 5 seconds and then delete the message
                    setTimeout(() => {
                        interaction.deleteReply()
                            .then(console.log)
                            .catch(console.error);
                    }
                        , 5000);
                    return;
                });
                return;
            }
        } catch (error) {
            console.log(error);
        }
        interaction.deferUpdate()
            .then(console.log)
            .catch(console.error);

    }


}

