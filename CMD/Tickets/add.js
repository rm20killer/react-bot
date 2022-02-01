const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'add',
    aliases: [ "ta" ],
    description: 'will add user to ticket',
    usage: '`*add <@user>`',
    example: '`*add @rm20#200`',
    async execute(message, args) {
        if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){
            if(message.channel.parent.id==="858354610367627284"){
                // CODE GOES HERE 🡫 

                let member = message.mentions.members.first() 
                if (!member) return message.channel.send("no mention")

                let reason = message.content.slice(4);
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

                message.channel.send({ embeds: [embed] }).catch(err => {console.log(err)});
            }
        }
        else{
            message.reply("You lack perms for this command")
        }
    }
}