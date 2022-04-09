const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const unidecode = require('unidecode');

const config = require("../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    CheckName: async function (member, client) {
        try {
            //console.log(member.user.username)
            var name = member.user.username
            var name2 = unidecode(name)
            if (name != name2) {
                member.setNickname(name2)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`Your nickname has been changed to ${name2} in Gamers React.`)
                member.send({ embeds: [embed] });
                channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
                channel.send(`changed <@${target.user.id}> nickanme to ${name2}`)
            }
        }
        catch
        {
            console.log("Error in CheckName");
        }
    }
}