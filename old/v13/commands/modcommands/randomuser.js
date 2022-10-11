const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    name: 'randomuser',
    aliases: [`randomuser`],
    description: '',
    usage: '``',
    example: '``',
    async execute(message, args, client) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            if(args[0]){
                let channel = message.mentions.channels.first()
                if(!channel){
                    channel = message.guild.channels.cache.find(c => c.id === args[0])
                }
                if(channel)
                {
                    let reason = args.slice(1).join(" ");

                    let members = channel.members
                    let member = members.random()
                    if(member){
                        let embed = new Discord.MessageEmbed()
                        .setTitle(`Random User selected from ${channel.name}`)
                        .setDescription(`${member} was picked out of ${members.size} members`)
                        .setColor("#00ff00")
                        .setTimestamp()
                        .setFooter({text:`requester id: ${message.author.id}`})
                        if(reason){
                            embed.setDescription(`${member} was picked out of ${members.size} members for ${reason}`)
                        }
                        message.channel.send({embeds: [embed]})
                        //delete the message
                        message.delete()
                    }
                    else{
                        message.channel.send("no users found")
                    }
                }
                else{
                    message.channel.send("no channel found")
                }
            }
            else{
                message.channel.send("no channel found")
            }
        }
        else {
            message.reply(`You lack perms for this command`)
        }
    }
}