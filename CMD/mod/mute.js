const fetch = require("node-fetch");
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');

//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("../../config");

const youtubeKey = config.youtubeKey

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports ={
    name: 'mute',
    aliases: [ "mute" ],
    description: 'will ban a user',
    usage: '`*ban <@user>`',
    example: '`*ban @rm20#2000`',
    async execute(message, args,client) {
        return;
        if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){
             // CODE GOES HERE 🡫 

             if(message.mentions.members.first()){
                let target = message.mentions.members.first();
             }
             else{
                let target = client.users.cache.find(user => user.id === args[0])
             }
             if(!target) return message.reply(`I can't find that member`);

             if(target.id === message.author.id) return message.reply(`you cant ban yourself`)

             if(target.roles.cache.find(r=>r.name === modid)||target.roles.cache.find(r=>r.name === adminid)||target.roles.cache.find(r=>r.id === helper)){
                return message.reply("can not ban a mod"); 
             }
             else{
                const reason = args.slice(1).join(" ")

                if(target.bannable) {
                    var channelParent = message.channel.parent.id
                    channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
                    let time = message.createdTimestamp
                    var date = new Date(time * 1000);
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes();
                    var seconds = "0" + date.getSeconds();
                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    let embed = new discord.MessageEmbed()
                        .setTitle(`[MUTED] ${target.tag}`)
                        .setAuthor(`${message.author.tag}`)
                        .setColor(0xFF0000)
                        .setDescription(`🔒Banned for \`${reason || "No Reason Provided"}\``)
                        .setFooter("id: " + target.id +" | today at "+formattedTime)
                    message.channel.send(embed).catch(error => {console.log(error)});
                  
                    target.ban().catch(error => {return message.reply("an error has happened while banning")});
                    if(channelParent==="709806849725038634"){

                    }
                    else{
                        message.delete().catch(error => {console.log(error)});
                    }
                    channel.send({embeds: [embed] });
                } 
                else {
                  return message.reply(`I can't ban that user`) 
                }
            }
        }
        else{
            message.reply("You lack perms for this command")
        }
    }
}