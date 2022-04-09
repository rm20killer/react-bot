const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);
const unidecode = require('unidecode');

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
  name: 'namechange',
  aliases: [`rename`, `nickname`, `nick`],
  description: '',
  usage: '``',
  example: '``',
  async execute(message, args, client) {
    // CODE GOES HERE 🡫 
    if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
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
        try{
            if(args[1])
            {
                let name1 = args.slice(1).join(" ")
                target.setNickname(name1)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`${target.user.username} changed their name to ${name1}`)
                target.send({ embeds: [embed] });
                message.channel.send(`${target.user.username}'s nickname has been changed to "${name1}"`)
    
            }
            else
            {
                let name1 = target.user.username
                let name2 = unidecode(name1)
                if(name1!=name2){
                    target.setNickname(name2)
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`${target.user.username} changed their name to ${name2}`)
                    target.send({ embeds: [embed] });
                    //channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
                    message.channel.send(`<@${target.user.id}> has changed their nickanme to ${name2}`)
                }
                else{
                    message.channel.send(`${target.user.username}'s nickname is already is normal format`)
                }
            }
        }
        catch
        {
            console.log("Error in CheckName");
            message.channel.send("Error in CheckName")
        }
    }
    else 
    {
    message.reply(`You lack perms for this command`)
    }
  }
}