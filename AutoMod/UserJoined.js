const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');

const mongo = require('../utils/mongo')
const muteSChema = require("../Models/mute-schema");

const muterole = "712512117999271966"

module.exports = {
    async userjoined(member, client) {
        channel2 = client.channels.cache.find(channel => channel.id === "700790402890072205");
        channel2.send(`Hey <@${member.id}> welcome to **Gamers React!** To get access to chat head over to <#700789384131379371>`);
        //console.log(member)
        const guildId = member.guild.id;
        const userId = member.user.id;
        //console.log(guildId)
        //console.log(userId)
        await mongo().then(async mongoose => {
            try {
                const previousMutes = await muteSChema.findOne({
                    guildId,
                    userId
                })
                if (previousMutes) {
                    //console.log(previousMutes)
                    if (previousMutes.current === true) {
                        //console.log("Muted person rejoined")
                        channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
                        const embed2 = new Discord.MessageEmbed()
                            .setDescription(`<@${member.user.id}> joined while still being muted`)
                        channel.send({ embeds: [embed2] });
                        try {
                            var role = member.guild.roles.cache.find(role => role.id === muterole);
                            member.roles.add(role);
                        }
                        catch {
                            console.log("adding mute role error")
                            return
                        }
                        return;
                    }
                }
            } finally {
                mongoose.connection.close()
            }
        })

        //const embed2 = new Discord.MessageEmbed()
        //    .setDescription(`<@${targetmember.user.id}> has been muted for ${timeString}`)
        //message.channel.send({ embeds: [embed2] });
    }
}
