module.exports = {
    name: 'rename',
    aliases: ['rename'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs, User, Guild) => {

        // Command Usage 
        let usageEmbed = new Discord.RichEmbed()
            .setTitle(`**Command: \`${config.bot_prefix}rename\`**`)
            .setDescription(`**Usage:** \`${config.bot_prefix}rename <name>\`\n**Alias:** \`${config.bot_prefix}rename\`\n**Category:** Tickets`)
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

        let name = args.slice(0).join(' ')
        if (!name) return message.channel.send(usageEmbed)

        let embed = new Discord.RichEmbed()
            .setDescription(`This channel has renamed to \`${name}\``)
            .addField('Renamed by:', message.author.tag)
            .setColor(config.bot_color)

        message.channel.setName(name)
        message.channel.send(embed)
    }
}