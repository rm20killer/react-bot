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
const WarnSchema = require("../../Models/warn-schema");
module.exports = {
    name: 'warn',
    aliases: [``],
    description: 'warn a user',
    usage: '`*warn <@user> <reason>`',
    example: '``',
    async execute(message, args, client) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            // CODE GOES HERE 🡫 
            if (!args[0]) { return message.reply(`Enter a user.`) }
            let target = message.mentions.members.first();
            if (!target) {
                let id = args[0]
                try {
                    target = await message.guild.members.fetch(id);
                } catch {
                    return message.reply(`I can't find that member.`);
                }
            }
            if (!target) { return message.reply(`I can't find that member`) }

            if (target.id === message.author.id) { return message.reply(`You can't warn yourself`) }
            if (message.member.roles.cache.find(r => r.name === adminid)) { }
            try{
                if (message.member.roles.cache.find(r => r.name === adminid)) { }
                else {
                  if (target.roles.cache.find(r => r.name === modid) || target.roles.cache.find(r => r.name === adminid) || target.roles.cache.find(r => r.id === helper)) {
                    return message.reply("Can not mute a mod");
                  }
                }
              }catch{
                console.log(target.id+" has no roles")
              }
            if (target.user.bot) { return message.reply("You can't warn bots.") }

            const guildId = message.guildId
            const userId = target.id;
            let reason = args.slice(1).join(" ")
            if (!reason) {
                reason = "No Reason Provided."
            }
            var Last10Messages = []
            await message.channel.messages.fetch({
                limit: 100, // Change `100` to however many messages you want to fetch
                before: message.id
            }).then((message) => {
                const botMessages = []
                message.filter(m => m.author.id === target.id).forEach(msg => botMessages.push(msg.content))
                //console.log(botMessages);
                if (botMessages.length === 0) {
                }
                else{
                    for (let i = 0; i < botMessages.length; i++) {
                        if (i < 10) {
                            if (botMessages[i]) {
                                //console.log(botMessages[i])
                                Last10Messages.push(botMessages[i])
                            }
                        }
                    }
                }
            });
            //console.log(Last10Messages)
            const warning = {
                author: message.member.user.id,
                timestamp: new Date().getTime(),
                reason,
                Last10Messages
            }
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
                                .setDescription(`You were warned in Gamers React for: ${reason}`)

                            target.send({ embeds: [embed3] }).catch(error => { message.reply(`Could not dm ${target.user.tag}`) });
                        } catch {
                            console.log(`Could not dm ${target.user.tag}`)
                        }
                    }
                }
            }
            else {
                try {
                    const embed3 = new Discord.MessageEmbed()
                        .setDescription(`You were warned in Gamers React for: ${reason}`)

                    target.send({ embeds: [embed3] }).catch(error => { message.reply(`Could not dm ${target.user.tag}`) });
                } catch {
                    console.log(`could not dm ${target.user.tag}`)
                }
            }
            await mongo().then(async mongoose => {
                try {
                    await WarnSchema.findOneAndUpdate({
                        guildId,
                        userId
                    }, {
                        guildId,
                        userId,
                        $push: {
                            warnings: warning
                        }
                    }, {
                        upsert: true
                    })
                } finally {
                    //mongoose.connection.close()
                    var channelParent = message.channel.parent.id
                    channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
                    let time = message.createdTimestamp
                    var date = new Date(time * 1000);
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes();
                    var seconds = "0" + date.getSeconds();
                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`[WARN] ${target.user.tag}`)
                        .setColor(0xFFFF00)
                        .setDescription(`warn for \`${reason}\``)
                        .addField("warn by", `<@${message.author.id}>`)
                        .setFooter("id: " + target.id + " | today at " + formattedTime)
                    try {
                        channel.send({ embeds: [embed] });
                        const embed2 = new Discord.MessageEmbed()
                            .setDescription(`<@${target.user.id}> has been warned`)
                        message.channel.send({ embeds: [embed2] });
                    }
                    catch {
                        message.reply("An error has happened while warning")
                        return
                    }

                    if (message.channel.parent.id === "709806849725038634") {
                    }
                    else {
                        message.delete().catch(error => { console.log(error) });
                    }
                }
            });
        }
        else {
            message.reply(`You lack perms for this command`)
        }
    }
}
