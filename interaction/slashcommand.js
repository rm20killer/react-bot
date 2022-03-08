
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

const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
module.exports = {
    slashcommand: async function (interaction, client) {
        if (interaction.commandName === 'compress') {
            await interaction.reply('To compress size so you send on discord you can use: https://8mb.video/ \n **You must** enable the `Extra quality (slower)` option.\nYour video cannot be longer than 40 seconds to meet requirements.\nUse the trim options to accomplish this.');
        }
        if (interaction.commandName === 'madeby') {
            await interaction.reply('This was made by RM20 with the help from RootAtKali, you can sponsor this bot and source code can be found at https://github.com/rm20killer/react-bot');
        }
        if (interaction.commandName === 'youtubetrimmer') {
            await interaction.reply('If it on your channel you can download the video and trim it a editing software. \nIf the video is not from your channel you can use the clip button on youtube if that video does not have the clip button you can use youtube-dl`');
        }
        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
            //const command = interaction.guild.commands.fetch();
            //console.log(command)
        }
        if (interaction.commandName === 'requirements') {
            const embed = new Discord.MessageEmbed()
                .setTitle('Requirements')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 kbps (x264 medium)\n> Audio bitrate: At least 150 kbps (AAC-LC)\n> Must embed on discord\n> Must be under 2 minutes. No timestamps!\nDeliberately scaling or padding a video to fool me\ndoes **not** pass the requirements.')

            await interaction.reply({ embeds: [embed] });
        }
        if (interaction.commandName === "grmc") {
            let row23 = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setStyle('LINK')
                    .setLabel('GRMC Discord')
                    .setURL("https://discord.gg/mvpPdqTmJh"))
                .addComponents(new MessageButton()
                    .setStyle('LINK')
                    .setLabel('GRMC Website')
                    .setURL("https://www.gamersreact.net"))
            const embed = new Discord.MessageEmbed()
                .setTitle(`GRMC`)
                .setColor(2374108)
                .setDescription(`If you need help with the minecraft  server ask on the Gamer React Minecraft discord or website`)
                .addField("IP:", "`play.gamersreact.net`")
                .addField("Version:", "Premium Java only, 1.16.5 with support from 1.8 to 1.18")
            await interaction.reply({ embeds: [embed], components: [row23] }).catch(console.error);
        }
    }
}
