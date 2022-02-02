const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'grmc',
    aliases: [ "grmc" ],
    description: 'info about grmc',
    usage: '`*grmc`',
    example: '`*grmc`',
    async execute(message, args) {
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
            .setDescription(`If you need help with the minecraft server ask on the Gamer React Minecraft discord or website`)
            .addField("IP:" , "`play.gamersreact.net`")
            .addField("Version:" , "Premium Java only, 1.16.5 with support from 1.8 to 1.17")
        //message.channel.send({ embeds: [embed] })
        message.channel.send({ embeds: [embed], components: [row23] }).catch(console.error);
    }
}