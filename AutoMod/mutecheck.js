const mongo = require('../utils/mongo')
const muteSChema = require("../Models/mute-schema");

const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');

const muterole = "712512117999271966"

module.exports = {
    async mutechecker(client) {
        const CheckMutes = async () => {
            await mongo().then(async mongoose => {
                //console.log("checking mute data")
                const now = new Date()
                const conditional = {
                    expires: {
                        $lt: now
                    },
                    current: true
                }
                const results = await muteSChema.find(conditional)
                if (results && results.length) {
                    for (const result of results) {
                        const { guildId, userId } = result
                        const guild = await client.guilds.fetch(guildId)
                        //console.log(guild)
                        const member = await guild.members.fetch(userId)
                        var role = guild.roles.cache.find(role => role.id === muterole);

                        member.roles.remove(role)
                        channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
                        const embed2 = new Discord.MessageEmbed()
                            .setDescription(`<@${member.user.id}> has been unmuted`)
                        channel.send({ embeds: [embed2] });
                        const embed3 = new Discord.MessageEmbed()
                        .setDescription(`You were unmuted in Gamers React`)
                        member.send({ embeds: [embed3] }).catch(error => { console.log(`Could not dm ${target.user.tag}`) });

                    }
                    await muteSChema.updateMany(conditional, {
                        current: false
                    })
                }
            })
            setTimeout(CheckMutes, 1000 * 10)
        }
        CheckMutes()
    }
}