const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports ={
    close: function(args,message,client,rest){  
        const channelParent = message.channel.parent.id
        
        const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
        if (!channel) return

        let reason = rest
        if (!reason) reason = 'No Reason Specified'


        const embed = new Discord.MessageEmbed()
            .setTitle('**Ticket Closed**')
            .addField('Ticket Owner', `<@${message.channel.topic}>`, true)
            .addField('Ticket Name:', message.channel.name, true)
            .addField('Closed by:', message.author.tag, true)
            .addField('Close Reason', `\`\`\`${reason}\`\`\``)
            .setFooter(message.guild.name)
            .setColor(0x4287f5);

        channel.send({ embeds: [embed] })
        .catch(err => {console.log(err)});

        setTimeout(() => {
            message.channel.delete()
            .catch(err => console.log(err));
        }, 2000)
    }

}