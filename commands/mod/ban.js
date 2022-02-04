const fetch = require("node-fetch");
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');

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
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
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
                    //console.log(lastElement1)
                    try {
                        if (lastElement1[0] === "-a") {
                        }
                        else {
                            target.send(`you been banned for ${reason}`).catch(error => { message.reply(`could not dm ${target.user.tag}`) });
                        }
                    } catch {
                        console.log(`could not dm ${target.user.tag}`)
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