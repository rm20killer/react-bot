const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    add: async function(args,message,client,rest){ 
        // CODE GOES HERE 🡫 
        let member = message.mentions.members.first();
        if (!member) {
            let id = args[1]
            try {
                member = await message.guild.members.fetch(id);
            } catch {
                return message.reply(`I can't find that member`);
            }
        }
        if (!member) { return message.reply(`I can't find that member`) }

        let reason = rest
        if (!reason) reason = 'No Reason Specified'

        message.channel.permissionOverwrites.edit(member, {
            VIEW_CHANNEL: true
        })
        .catch(err => {console.log(err)});

        const embed = new Discord.MessageEmbed()
            .setDescription(`Added ${member} to ${message.channel}`)
            .addField('Added by:', message.author.tag, true)
            .addField('Reason:', reason, true)
            .setColor(0x4287f5)

        message.channel.send({ embeds: [embed] })
        .catch(err => {console.log(err)});
    }
}