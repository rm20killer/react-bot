const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    stafflock: function(args,message,client,rest){  
        if (message.channel.id === "858354762855874560") {
            return message.channel.send(`❎ This command can only be ran in \`${config.categoryTickets}\``)
        }

        
        const id = message.channel.topic
        const type = "member"
        if(message.channel.permissionOverwrites.edit.find(o => o.type === type && o.id === id)!=undefined){
            message.channel.permissionOverwrites.edit.find(o => o.type === type && o.id === id).delete()
            let reason = rest
            if (!reason) reason = 'No Reason Specified'
    
    
    
            const embed = new Discord.MessageEmbed()
                .setDescription(`${message.channel} has been staff locked`)
                .addField('Locked by:', message.author.tag, true)
                .addField('Reason:', reason, true)
                .setColor(0x4287f5)
    
                message.channel.send({ embeds: [embed] })
                .catch(err => {console.log(err)});
        }

        else{
            message.reply("error, don't ask why")
        }

        
    }
}