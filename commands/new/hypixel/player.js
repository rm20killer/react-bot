const Discord = require('discord.js');
const { base } = require('../../../utils/embed');
const { hypixel, errors } = require('../../../utils/hypixel');
const commaNumber = require('comma-number');;

module.exports = {
    name: 'player',
    aliases: [ "p", "hypixel", "h" ],
    description: 'will show you the Hypixel stats of a player',
    usage: '`h!player [IGN]`',
    example: '`h*player RM20_`',
    async execute(message, args) {
        await message.channel.sendTyping()

        if (args[0]) { // if someone didn't type in ign
            const ign404 = new Discord.MessageEmbed(base)
                .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                .setDescription('You need to type in a player\'s IGN! ')
            message.reply({ embeds: [ign404] })
        }

        var player = args[0];
        

        hypixel.getPlayer(player, { guild: true }).then(async (player) => {
            if (!player.isOnline) {
                playerIsOnline = "Offline"
            } else if (player.isOnline) {
                playerIsOnline = "Online"
            }

            if (player.mcVersion == null) {
                playerMinecraftVersion = "Unknown";
            } else if (player.mcVersion != null) {
                playerMinecraftVersion = player.mcVersion;
            }

            if (player.rank == 'Default') {
                playerRank = "None";
            } else if (player.rank != 'Default') {
                playerRank = player.rank;
            }

            const embed = new Discord.MessageEmbed(base)
                .setAuthor('Player Stats', 'https://i.imgur.com/tRe29vU.jpeg')              
                .setTitle(`[${player.rank}] ${player.nickname}`)
                .setThumbnail(`https://crafatar.com/avatars/${player.uuid}?overlay&size=256`)
                .addField('Rank', `\`${playerRank}\``, true)
                .addField('Level', `\`${player.level}\``, true)
                .addField('Karma', `\`${commaNumber(player.karma)}\``, true)

            if (player.guild !== null && player.guild.tag == null) {
                embed.addField('Guild', `\`${player.guild.name}\``)
            }

            if (player.guild !== null && player.guild.tag !== null) {
                embed.setTitle(`[${player.rank}] ${player.nickname} [${player.guild.tag}]`)
                embed.addField('Guild', `\`${player.guild.name} [${player.guild.tag}]\``)
            }
            
                embed.addField('Main MC Version', `\`${playerMinecraftVersion}\``, true)
                embed.addField('First Login', `<t:${Math.ceil(player.firstLoginTimestamp / 1000)}:R>`)
                embed.addField('Last Login', `<t:${Math.ceil(player.lastLoginTimestamp / 1000)}:R>`)
                embed.addField('Status', `\`${playerIsOnline}\``, true)

            if (player.rank.includes('MVP+')) {
                if (player.plusColor == null) {
                    embed.addField('Plus Color', '`Red`')
                } else {
                    embed.addField('Plus Color', `\`${player.plusColor}\``)
                }
            }

                embed.addField('Social Media', `Run \`h!socials ${player.nickname}\``)

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
        }).catch(e => { // error messages
            if (e.message === errors.PLAYER_DOES_NOT_EXIST) {
                const player404 = new Discord.MessageEmbed(base)
                    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                    .setDescription('I could not find that player in the API. Check spelling and name history.')
                message.reply({ embeds: [player404], allowedMentions: { repliedUser: false } })
            } else if (e.message === errors.PLAYER_HAS_NEVER_LOGGED) {
                const neverLogged = new Discord.MessageEmbed(base)
                    .setAuthor('Error', 'https://i.imgur.com/OuoECfX.jpeg')
                    .setDescription('That player has never logged into Hypixel.')
                message.reply({ embeds: [neverLogged], allowedMentions: { repliedUser: false } })
            } else {
                if (args[0]) {
                    message.reply("Error")
                }
            }       
        });
    }
}