module.exports = {
    name: 'add',
    aliases: ['add'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs, User, Guild) => {

        // Command Usage 
        let usageEmbed = new Discord.RichEmbed()
            .setTitle(`**Command: \`${config.bot_prefix}add\`**`)
            .setDescription(`**Usage:** \`${config.bot_prefix}add <user> <reason>\`\n**Alias:** \`${config.bot_prefix}add\`\n**Category:** Tickets`)
            .addField('Permission(s) Required', '\`MOVE_MEMBERS\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.bot_color)

        // Checking Permission
        if (message.author.id !== config.bot_owner) {
            if (!message.member.permissions.has('MOVE_MEMBERS')) {
                return message.channel.send(new Discord.RichEmbed().setColor(config.bot_color).setDescription(`❎ Insufficient Permissions, ${message.author.name}.`)) && message.channel.send(usageEmbed)
            }
        }

        message.delete()

        // CODE GOES HERE 🡫 

        if (message.channel.parentID != config.categoryTicketsID) {
            return message.channel.send(`❎ This command can only be ran in \`${config.categoryTickets}\``)
        }

        let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.toLowerCase().includes(args[0]))
        if (!member) return message.channel.send(usageEmbed)

        let reason = args.slice(1).join(' ')
        if (!reason) reason = 'No Reason Specified'

        message.channel.overwritePermissions(member, {
            VIEW_CHANNEL: true
        })

        let embed = new Discord.RichEmbed()
            .setDescription(`Added ${member} to ${message.channel}`)
            .addField('Added by:', message.author.tag, true)
            .addField('Reason:', reason, true)
            .setColor(config.bot_color)

        message.channel.send(embed)
    }
}