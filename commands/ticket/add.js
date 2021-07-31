const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    add: function(args,message,client,rest){ 
        // CODE GOES HERE 🡫 

        if (message.channel.id === "858354762855874560") {
            return message.channel.send(`❎ This command can only be ran in \`${config.categoryTickets}\``)
        }

        let member = message.mentions.members.first() 
        if (!member) return message.channel.send("no mention")

        let reason = rest
        if (!reason) reason = 'No Reason Specified'

        message.channel.updateOverwrite(member, {
            VIEW_CHANNEL: true
        })
        .catch(err => {console.log(err)});

        const embed = new Discord.MessageEmbed()
            .setDescription(`Added ${member} to ${message.channel}`)
            .addField('Added by:', message.author.tag, true)
            .addField('Reason:', reason, true)
            .setColor(0x4287f5)

        message.channel.send(embed)
        .catch(err => {console.log(err)});
    }
}