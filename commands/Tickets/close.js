const Discord = require('discord.js')
const { Client, Intents, MessageAttachment } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { generateTranscript } = require('reconlx')

const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
module.exports = {
    name: 'close',
    aliases: ["tclose", "tend"],
    description: 'will close a ticket',
    usage: '`*close [reason]`',
    example: '`*close inactive`',
    async execute(message, args, client) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            //console.log("closing ticket")
            if (message.channel.parent.id === "858354610367627284") {
                // CODE GOES HERE 🡫 
                const channelParent = message.channel.parent.id
                const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");

                if (!channel) return

                let reason = message.content.slice(6);
                if (!reason) reason = 'No Reason Specified'
                message.channel.messages.fetch({ limit: 100 }).then(msgs => {
                    generateTranscript({ guild: message.guild, channel: message.channel, messages: msgs })
                        .then(data => {
                            const file = new MessageAttachment(data, `${message.channel.name}-${message.channel.id}.html`);

                            const embed = new Discord.MessageEmbed()
                                .setTitle('**Ticket Closed**')
                                .addField('Ticket Owner', `<@${message.channel.topic}>`, true)
                                .addField('Ticket Name:', message.channel.name, true)
                                .addField('Closed by:', message.author.tag, true)
                                .addField('Close Reason', `\`\`\`${reason}\`\`\``)
                                .setFooter(message.guild.name)
                                .setColor(0x4287f5);

                            channel.send({ content: `transcript for ticket ${message.channel.name}-${message.channel.id} `, embeds: [embed], files: [file] })
                                .catch(err => { console.log(err) });
                        });
                })

                setTimeout(() => {
                    message.channel.delete()
                        .catch(err => console.log(err));
                }, 2000)
            }
            else {
                message.reply("Only works in tickets")
            }
        }
        else {
            message.reply("You lack perms for this command")
        }
    }

}

