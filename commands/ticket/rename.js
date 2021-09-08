const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    rename: function(args,message,client,rest){ 

        // CODE GOES HERE 🡫 
        let name = rest
        if (!name) return message.channel.send("messing name")

        const embed = new Discord.MessageEmbed()
            .setDescription(`This channel has renamed to \`${name}\``)
            .addField('Renamed by:', message.author.tag)
            .setColor(0x4287f5)

        message.channel.setName(name)
        message.channel.send({ embeds: [embed] })
        .catch(err => {console.log(err)});
    }
}