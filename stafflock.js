module.exports = {
    name: 'stafflock',
    aliases: ['sl'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs, User, Guild) => {

        // Command Usage 
        let usageEmbed = new Discord.RichEmbed()
            .setTitle(`**Command: \`${config.bot_prefix}stafflock\`**`)
            .setDescription(`**Usage:** \`${config.bot_prefix}stafflock <reason>\`\n**Alias:** \`${config.bot_prefix}sl\`\n**Category:** Tickets`)
            .addField('Permission(s) Required', '\`ADMINISTRATOR\`')
            .setThumbnail(message.guild.iconURL)
            .setFooter('[] = Optional Arguments • <> = Required Arguments')
            .setColor(config.bot_color)

        // Checking Permission
        if (message.author.id !== config.bot_owner) {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                return message.channel.send(new Discord.RichEmbed().setColor(config.bot_color).setDescription(`❎ Insufficient Permissions, ${message.author.name}.`)) && message.channel.send(usageEmbed)
            }
        }

        message.delete()

        // CODE GOES HERE 🡫 

        if (message.channel.parentID != config.categoryTicketsID) {
            return message.channel.send(`❎ This command can only be ran in \`${config.categoryTickets}\``)
        }

        let role = message.guild.roles.find(c => c.name == config.roleSupport)
        if (!role) return

        let reason = args.slice(0).join(' ')
        if (!reason) reason = 'No Reason Specified'

        message.channel.overwritePermissions(role.id, {
            VIEW_CHANNEL: false
        })

        let embed = new Discord.RichEmbed()
            .setDescription(`${message.channel} has been staff locked`)
            .addField('Locked by:', message.author.tag, true)
            .addField('Reason:', reason, true)
            .setColor(config.bot_color)

        message.channel.send(embed)
    }
}