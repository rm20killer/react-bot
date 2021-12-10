const Discord = require('discord.js');

const base = new Discord.MessageEmbed()
    .setColor('0x738ADB')
    .setFooter('hypixel stats')
const error = new Discord.MessageEmbed(base)
    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
    .setDescription('An error has occurred.')
module.exports.base = base;
module.exports.error = error;