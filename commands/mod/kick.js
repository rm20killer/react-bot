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

const mongo = require('../../utils/mongo')
const kicksSchema = require("../../Models/kick-schema");

module.exports = {
    name: 'kick',
    aliases: [``],
    description: 'kick a user',
    usage: '`*kick <@user>`',
    async execute(message, args, client) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            if (!args[0]) { return message.reply(`enter a user`) }
            let target = message.mentions.members.first();
            if (!target) {
                let id = args[0]
                try {
                    target = await message.guild.members.fetch(id);
                } catch {
                    return message.reply(`I can't find that member`);
                }
            }
            if (!target) { return message.reply(`I can't find that member`) }
            if (target.id === message.author.id) { return message.reply(`you cant kick yourself`) }

            if (target.roles.cache.find(r => r.name === modid) || target.roles.cache.find(r => r.name === adminid) || target.roles.cache.find(r => r.id === helper)) {
                return message.reply("can not kick a mod");
            }
            if (target.user.bot) { return message.reply("you cant kick bots") }
            let reason = args.slice(1).join(" ")
            if (!reason) {
                reason = "No Reason Provided"
            }
            if (target.kickable) {
                let lastElement1 = args.slice(-1)[0];
                //console.log(lastElement1)
                //onsole.log(lastElement1)
                const Lastarray = lastElement1.split("");
                if (Lastarray[0] === "-") {
                    if (Lastarray.length > 2) {
                        if (Lastarray[1] === "a") { }
                        else {
                    try {
                        const embed3 = new Discord.MessageEmbed()
                            .setDescription(`you have been kicked for ${reason}`)

                        target.send({ embeds: [embed3] }).catch(error => { message.reply(`could not dm ${target.user.tag}`) });
                    } catch {
                        console.log(`could not dm ${target.user.tag}`)
                    }
                        }
                    }
                }
                
                else {
                    try {
                        const embed3 = new Discord.MessageEmbed()
                            .setDescription(`you have been kicked for ${reason}`)

                        target.send({ embeds: [embed3] }).catch(error => { message.reply(`could not dm ${target.user.tag}`) });
                    } catch {
                        console.log(`could not dm ${target.user.tag}`)
                    }
                }
                var channelParent = message.channel.parent.id
                var Last10Messages = []
                message.channel.messages.fetch({
                    limit: 100, // Change `100` to however many messages you want to fetch
                    before: message.id
                }).then((message) => {
                    const botMessages = []
                    message.filter(m => m.author.id === target.id).forEach(msg => botMessages.push(msg))
                    for (let i = 0; i < botMessages.length || i < 10; i++) {
                        //Last10Messages=Last10Messages+botMessages[i].content+"\n"
                        Last10Messages.push(botMessages[i].content)
                    }

                });
                let time = message.createdTimestamp
                const kick = {
                    author: message.member.user.id,
                    timestamp: time,
                    reason,
                    Last10Messages
                }
                const guildId = message.guildId
                const userId = target.id;
                await mongo().then(async mongoose => {
                    try {
                        await kicksSchema.findOneAndUpdate({
                            guildId,
                            userId
                        }, {
                            guildId,
                            userId,
                            $push: {
                                kicks: kick
                            }
                        }, {
                            upsert: true
                        })
                    } finally {
                        mongoose.connection.close()
                    }
                })
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
                    channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
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
        else {
            message.reply(`You lack perms for this command`)
        }
    }
}