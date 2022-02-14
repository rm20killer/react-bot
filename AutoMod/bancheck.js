const mongo = require('../utils/mongo')
const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const tempbanSchema = require('../Models/tempban-schema');

const muterole = "712512117999271966"

module.exports = {
    async backcheck(client) {
        const backchecks = async () => {
            await mongo().then(async mongoose => {
                //console.log("checking mute data")
                const now = new Date()
                const conditional = {
                    expires: {
                        $lt: now
                    },
                    current: true
                }
                const results = await tempbanSchema.find(conditional)
                if (results && results.length) {
                    for (const result of results) {
                        const { guildId, userId } = result
                        const guild = await client.guilds.fetch(guildId)
                        guild.bans.remove(userId)
                        channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
                        const embed2 = new Discord.MessageEmbed()
                            .setDescription(`<@${userId}> has been unbanned`)
                        channel.send({ embeds: [embed2] });
                    }
                    await tempbanSchema.updateMany(conditional, {
                        current: false
                    })
                }
            })
            setTimeout(backchecks, 1000 * 10)
        }
        backchecks()
    }
}