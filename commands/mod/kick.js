/*
  _    _      _                         
 | |  | |    | |                    _   
 | |__| | ___| |_ __   ___ _ __   _| |_ 
 |  __  |/ _ \ | '_ \ / _ \ '__| |_   _|
 | |  | |  __/ | |_) |  __/ |      |_|  
 |_|  |_|\___|_| .__/ \___|_|           
               | |                      
               |_|                      
*/
const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'kick',
    aliases: [``],
    description: 'kick a user',
    usage: '`*kick <@user>`',
    async execute(message, args, client) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            let target = message.mentions.members.first();
            if (!target) {
                let id = args[0]
                try {
                    target = await message.guild.members.fetch(id);
                } catch {
                    return message.reply(`I can't find that member`);
                }
                if (target.id === message.author.id) { return message.reply(`you cant ban yourself`) }

                if (target.roles.cache.find(r => r.name === modid) || target.roles.cache.find(r => r.name === adminid) || target.roles.cache.find(r => r.id === helper)) {
                    return message.reply("can not ban a mod");
                }
                if (target.user.bot) { return message.reply("you cant ban bots") }
                let reason = args.slice(1).join(" ")
                if (!reason) {
                    reason = "No Reason Provided"
                }
                if (target.kickable) {
                    var channelParent = message.channel.parent.id
                    channel = client.channels.cache.find(channel => channel.id === "710123089094246482");

                    let time = message.createdTimestamp
                    var date = new Date(time * 1000);
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes();
                    var seconds = "0" + date.getSeconds();
                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`[KICKED] ${target.user.tag}`)
                        .setColor(0xFF0000)
                        .setDescription(`kicked for \`${reason}\``)
                        .addField("kicked by", `<@${message.author.id}>`)
                        .setFooter("id: " + target.id + " | today at " + formattedTime)
                    try {
                        target.kick(`${reason}`);
                        channel.send({ embeds: [embed] });
                        const embed2 = new Discord.MessageEmbed()
                            .setDescription(`<@${target.user.id}> has been kicked`)
                        message.channel.send({ embeds: [embed2] });
                    }
                    catch {
                        message.reply("an error has happened while kicking")
                        return
                    }
                }
                else {
                    message.reply("I can't kick that user")
                }
            }

        }
        else {
            message.reply(`You lack perms for this command`)
        }
    }
}