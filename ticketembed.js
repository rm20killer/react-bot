module.exports = {
    name: 'ticketembed',
    aliases: ['te'],
    execute: async (message, args, Discord, client, config, moment, fs, ms, Logs, User, Guild) => {

        // Command Usage 
        let usageEmbed = new Discord.RichEmbed()
            .setTitle(`**Command: \`${config.bot_prefix}ticketembed\`**`)
            .setDescription(`**Usage:** \`${config.bot_prefix}ticketembed\`\n**Alias:** \`${config.bot_prefix}te\`\n**Category:** Tickets`)
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

        let embed = new Discord.RichEmbed()
            .setTitle(`**Welcome to ${message.guild.name}!**`)
            .setDescription('Please click on one of the reactions below to start your ticket.\n\n📋 → General Support\n💰 → Purchase Support\n🔨 → Ban Appeal\n🕵️ → Player Report\n👤 → Staff Report')
            .setColor(config.bot_color)

        let msg = await message.channel.send(embed)
        await msg.react('📋')
        await msg.react('💰')
        await msg.react('🔨')
        await msg.react('🕵️')
        await msg.react('👤')
    }
}