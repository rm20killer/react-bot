const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    remove: function(args,message,client,rest){ 
        // CODE GOES HERE 🡫 
        let member = message.mentions.members.first();
        if (!member) {
            let id = args[0]
            try {
                member = await message.guild.members.fetch(id);
            } catch {
                return message.reply(`I can't find that member`);
            }
        }
        if (!member) { return message.reply(`I can't find that member`) }
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("no mention")

        let reason = args.slice(1).join(' ')
        if (!reason) reason = 'No Reason Specified'

        message.channel.permissionOverwrites.edit(member, {
            VIEW_CHANNEL: false
        })
        .catch(err => {message.reply("err")});

        const embed = new Discord.MessageEmbed()
            .setDescription(`Removed ${member} from ${message.channel}`)
            .addField('Removed by:', message.author.tag, true)
            .addField('Reason:', reason, true)
            .setColor(0x4287f5)

        message.channel.send({ embeds: [embed] })
        .catch(err => {message.reply("err")});

    }
}
