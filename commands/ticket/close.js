module.exports = {
    name: 'close',
    aliases: ['close'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs, User, Guild) => {

        // Command Usage 
        let usageEmbed = new Discord.RichEmbed()
            .setTitle(`**Command: \`${config.bot_prefix}close\`**`)
            .setDescription(`**Usage:** \`${config.bot_prefix}close\`\n**Alias:** \`${config.bot_prefix}close\`\n**Category:** Tickets`)
            .addField('Permission(s) Required', '\`MOVE_MEMBERS\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.bot_color)

        // Checking Permission
        if (message.author.id !== config.bot_owner) {
            if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.permissions.has('MOVE_MEMBERS')) {
                return message.channel.send(new Discord.RichEmbed().setColor(config.bot_color).setDescription(`❎ Insufficient Permissions, ${message.author.name}.`)) && message.channel.send(usageEmbed)
            }
        }

        message.delete()

        // CODE GOES HERE 🡫 

        if (message.channel.parentID != config.categoryTicketsID) {
            return message.channel.send(`❎ This command can only be ran in \`${config.categoryTickets}\``)
        }

        let channel = message.guild.channels.find(c => c.name === config.channelTicketLogs)
        if (!channel) return

        let reason = args.slice(0).join(' ')
        if (!reason) reason = 'No Reason Specified'


        let embed = new Discord.RichEmbed()
            .setTitle('**Ticket Closed**')
            .addField('Ticket Owner', `<@${message.channel.topic}>`, true)
            .addField('Ticket Name:', message.channel.name, true)
            .addField('Closed by:', message.author, true)
            .addField('Close Reason', `\`\`\`${reason}\`\`\``)
            .setFooter(message.guild.name, message.guild.iconURL)
            .setColor(config.bot_color)

        channel.send(embed)

        setTimeout(() => {
            message.channel.delete()
        }, 2000)
    }
}