const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    rename: function(args,message,client,rest){ 

        // CODE GOES HERE 🡫 

        if (message.channel.id === "858354762855874560") {
            return message.channel.send(`❎ This command can only be ran in \`${config.categoryTickets}\``)
        }

        let name = rest
        if (!name) return message.channel.send("messing name")

        const embed = new Discord.MessageEmbed()
            .setDescription(`This channel has renamed to \`${name}\``)
            .addField('Renamed by:', message.author.tag)
            .setColor(0x4287f5)

        message.channel.setName(name)
        message.channel.send(embed)
    }
}