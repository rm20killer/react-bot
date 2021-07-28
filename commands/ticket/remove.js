const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    remove: function(args,message,client,rest){ 

        // CODE GOES HERE 🡫 

        let member = message.mentions.members.first()
        if (!member) return message.channel.send("no mention")

        let reason = args.slice(1).join(' ')
        if (!reason) reason = 'No Reason Specified'

        message.channel.overwritePermissions(member, {
            VIEW_CHANNEL: false
        })
        .catch(err => {message.reply("err")});

        const embed = new Discord.MessageEmbed()
            .setDescription(`Removed ${member} from ${message.channel}`)
            .addField('Removed by:', message.author.tag, true)
            .addField('Reason:', reason, true)
            .setColor(config.bot_color)

        message.channel.send(embed)
    }
}
