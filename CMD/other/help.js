const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    name: 'help',
    aliases: ["h"],
    description: 'get command usage',
    usage: '`*help <command>`',
    example: '`*help ping`',
    async execute(message, args, cleint) {
        if (!args.length) {
            message.reply("enter command")
        }

        const command = cleint.commands.get(args[0].toLowerCase()) || cleint.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()));

        if (!command) {
            const command404 = new Discord.MessageEmbed()
                .setAuthor('Error')
                .setDescription('That isn\'t a valid command!')
                .setColor('0x738ADB')
                .setFooter('Command help')
            return message.reply({ embeds: [command404], allowedMentions: { repliedUser: false } })
        }

        const help = new Discord.MessageEmbed()
            .setAuthor('Help')
            .setTitle(`*${command.name}`)
            .addField('Description', `\`*${command.name}\` ${command.description}`)
            .setColor('0x738ADB')
            .setFooter('Command help')
        if (command.aliases) help.addField('Aliases', `\`*${command.aliases.join('`, `*')}\``)
        help.addField('Usage', command.usage)
        help.addField('Example', command.example)
        message.reply({ embeds: [help], allowedMentions: { repliedUser: false } })
    }
}