const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const unidecode = require('unidecode');

const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    CheckName: async function (member, client) {
        try {
            //console.log(member.user.username)
            var name = member.user.username
            if (name) {
                try {
                    var combining = /[\u0300-\u036F]/gu;
                    name2 = name.normalize('NFKD').replace(combining, '');
                }
                catch
                {
                    name2 = "Change your name"
                }
            }
            var name2 = unidecode(name2)
            if (name2 == "") {
                name2 = "Change your name"
            }
            if (name != name2) {
                //if name2 is more then 32 characters long, it will be cut off
                if (name2.length > 32) {
                    name2 = name2.slice(0, 32)
                }
                member.setNickname(name2)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`Your nickname has been changed to ${name2} in Gamers React.`)
                try {
                    member.send({ embeds: [embed] }).catch(error => { console.log(`could not dm user ${name}`) });;
                    channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
                    channel.send(`changed <@${target.user.id}> nickanme to ${name2}`)
                }
                catch
                {

                }

            }
        }
        catch
        {
            console.log("Error in CheckName");
        }
    }
}