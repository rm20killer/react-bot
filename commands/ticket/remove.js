module.exports = {
    name: 'remove',
    aliases: ['remove'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs, User, Guild) => {

        // Command Usage 
        let usageEmbed = new Discord.RichEmbed()
            .setTitle(`**Command: \`${config.bot_prefix}remove\`**`)
            .setDescription(`**Usage:** \`${config.bot_prefix}remove <user> <reason>\`\n**Alias:** \`${config.bot_prefix}remove\`\n**Category:** Tickets`)
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

        let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.toLowerCase().includes(args[0]))
        if (!member) return message.channel.send(usageEmbed)

        let reason = args.slice(1).join(' ')
        if (!reason) reason = 'No Reason Specified'

        message.channel.overwritePermissions(member, {
            VIEW_CHANNEL: false
        })

        let embed = new Discord.RichEmbed()
            .setDescription(`Removed ${member} from ${message.channel}`)
            .addField('Removed by:', message.author.tag, true)
            .addField('Reason:', reason, true)
            .setColor(config.bot_color)

        message.channel.send(embed)
    }
}