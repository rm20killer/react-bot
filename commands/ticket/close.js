
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports ={
    close: function(args,message,client,rest){  
        const channelParent = message.channel.parent.id
        if (channelParent != "858354610367627284") { 
            return message.channel.send(`❎ This command can only be ran in support channels`)
        }

        const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
        if (!channel) return

        let reason = rest
        if (!reason) reason = 'No Reason Specified'


        const embed = new Discord.MessageEmbed()
            .setTitle('**Ticket Closed**')
            .addField('Ticket Owner', `<@${message.channel.topic}>`, true)
            .addField('Ticket Name:', message.channel.name, true)
            .addField('Closed by:', message.author, true)
            .addField('Close Reason', `\`\`\`${reason}\`\`\``)
            .setFooter(message.guild.name, message.guild.iconURL)
            .setColor(0x4287f5)

        channel.send(embed)

        setTimeout(() => {
            message.channel.delete()
        }, 2000)
    }

}