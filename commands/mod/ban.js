/*
  __  __           _         
 |  \/  |         | |    _   
 | \  / | ___   __| |  _| |_ 
 | |\/| |/ _ \ / _` | |_   _|
 | |  | | (_) | (_| |   |_|  
 |_|  |_|\___/ \__,_|                          
*/


const fetch = require("node-fetch");
const Discord = require('discord.js')
const { Client, Intents, MessageAttachment } = require('discord.js');
const { generateTranscript } = require('reconlx')
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("../../config");


const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'ban',
    aliases: [""],
    description: 'will ban a user',
    usage: '`*ban <@user> [reason] [Function]`',
    example: '`*ban @rm20#2000`',
    async execute(message, args, client) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid)) {
            // CODE GOES HERE 🡫 
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
            //console.log(target)
            if (target.id === message.author.id) { return message.reply(`you cant ban yourself`) }

            if (target.roles.cache.find(r => r.name === modid) || target.roles.cache.find(r => r.name === adminid) || target.roles.cache.find(r => r.id === helper)) {
                return message.reply("can not ban a mod");
            }
            if (target.user.bot) { return message.reply("you cant ban bots") }
            else {
                let reason = args.slice(1).join(" ")
                if (!reason) {
                    reason = "No Reason Provided"
                }

                if (target.bannable) {
                    let lastElement1 = args.slice(-1)[0];
                    const Lastarray = lastElement1.split("");
                    if (Lastarray[0] === "-") {
                        if (Lastarray.length > 3) {

                        }
                        else {
                            //var dmed=0
                            try {
                                if (Lastarray[1] === "a"||Lastarray[2] === "a") {
                                    dmed++
                                }
                                else {
                                    target.send(`you been banned for ${reason}`).catch(error => { message.reply(`could not dm ${target.user.tag}`) });
                                }
                            } catch {
                                console.log(`could not dm ${target.user.tag}`)
                            }
                            try {
                                if (Lastarray[1] === "c"||Lastarray[2] === "c") {
                                    fbulkdeleteUser(client, message, 100, target)
                                }
                                else {

                                }
                            } catch {
                                console.log("could not delete messages")
                            }
                        }
                    }
                    var channelParent = message.channel.parent.id
                    channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
                    let time = message.createdTimestamp
                    var date = new Date(time * 1000);
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes();
                    var seconds = "0" + date.getSeconds();
                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`[BANNED] ${target.user.tag}`)
                        .setColor(0xFF0000)
                        .setDescription(`🔒Banned for \`${reason}\``)
                        .addField("banned by", `<@${message.author.id}>`)
                        .setFooter("id: " + target.id + " | today at " + formattedTime)
                    try {
                        target.ban({ reason: `${reason}` });
                        channel.send({ embeds: [embed] });
                        const embed2 = new Discord.MessageEmbed()
                            .setDescription(`<@${target.user.id}> has been banned`)
                        message.channel.send({ embeds: [embed2] });
                    }
                    catch {
                        message.reply("an error has happened while banning")
                        return
                    }

                    if (channelParent === "709806849725038634") {
                    }
                    else {
                        message.delete().catch(error => { console.log(error) });
                    }
                }
                else {
                    return message.reply(`I can't ban that user`)
                }
            }
        }
        else {
            message.reply("You lack perms for this command")
        }
    }
}

const fbulkdeleteUser = async function (client, message, amount, target) {
    const channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
    const id = target.id
    message.channel.messages.fetch({
        limit: amount, // Change `100` to however many messages you want to fetch
        before: message.id
    }).then((messages) => {
        generateTranscript({ guild: message.guild, channel: message.channel, messages: messages })
            .then(data => {
                const file = new MessageAttachment(data, `${message.channel.name}.html`);
                channel.send({ content: `Bulk delete from ban. \n(deleted messages sent by <@${target.id}>)`, files: [file] });
            });
        const botMessages = [];
        messages.filter(m => m.author.id === id).forEach(msg => botMessages.push(msg))
        message.channel.bulkDelete(botMessages).catch(error => { console.log(error) });
    }).catch(error => { console.log(error) });
}