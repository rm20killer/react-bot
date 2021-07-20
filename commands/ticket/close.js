
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports ={
    close: function(args,message,client,rest){  

        if (message.channel.id === "858354762855874560") {
            return message.channel.send(`❎ This command can only be ran in \`${config.categoryTickets}\``)
        }

        const channel = client.channels.cache.find(channel => channel.id === "867115098085785620");
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