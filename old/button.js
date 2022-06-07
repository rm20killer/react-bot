
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
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

const ticketmanger = require('./ticketmanger');
const votemanager = require('../interaction/Buttons/vote');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    button: async function (interaction, client) {
        const id = interaction.customId;
        if (id === "General" || id === "BanAppeal" || id === "Player") {
            if (interaction.member.roles.cache.find(r => r.id === "865548571327070268")) {
                console.log("ticket banned " + interaction.user.id)
                await interaction.reply(`you are ticket-banned`);
                interaction.deleteReply();
                return
            }
            ticketmanger.ticketmanger(interaction, client)
        }
        if(id.startsWith("vote-")){
            votemanager.votemanager(interaction, client)
        }
    }
}
