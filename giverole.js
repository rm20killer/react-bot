/* eslint-disable no-inline-comments */

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
    partials: [
        `CHANNEL`,
        `MESSAGE`,
        `REACTION`
    ],
    autoReconnect: true,
});
const config = require("./config");
//bot
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`your clips`, { type: "WATCHING" });
});
const memberrole = "710128390547701876"
//user message
client.on("message", async message => {
    //if message is "startRole"
    //if message not from admin return
    if (message.author.bot) return;
    if (message.content === "startRole") {
        // fetch all members without a role
        const members = await message.guild.members.fetch({
            filter: member => !member.roles.cache.has(memberrole),
        })
        console.log(members.size)
        // //get total members in the server
        const totalMembers = message.guild.memberCount;
        console.log(totalMembers)
        console.log(members.size);
        // message.channel.send(`giving ${members.size} memeber role out of ${totalMembers} total members`);
        let count = 0;
        let failed = 0
        //for each member
        members.forEach(async member => {
            //if member does not have member role
            if (!member.roles.cache.has(memberrole)) {
                //give member member role
                try{
                    member.roles.add(memberrole);
                    count++;
                }
                catch{
                    console.log("adding member role error")
                    failed++;
                    return
                }
            }
        })
        console.log(`${count} members got the role`);
        console.log(`${totalMembers - count} members did not get the role`);
        message.channel.send(`${count} members got the role`);
        message.channel.send(`failed to give ${failed} members the role`);
    }
});

// client.login(process.env.token);
client.login(config.BotToken);
