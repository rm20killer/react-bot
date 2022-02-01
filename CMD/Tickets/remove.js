const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    name: 'remove',
    aliases: [ "trm" ],
    description: 'will remove user from ticket',
    usage: '`*remove <@user>`',
    example: '`*remove @rm20#2000`',
    async execute(message, args) {
        if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){
            if(message.channel.parent.id==="858354610367627284"){
                // CODE GOES HERE 🡫 

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
        else{
            message.reply("You lack perms for this command")
        }
    }
}
