
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fetch = require("node-fetch");

const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports ={
    name: 'remove',
    aliases: [ "tr" ],
    description: 'will remove user to ticket',
    usage: '`*remove <@user>`',
    example: '`*remove @rm20#2000`',
    async execute(message, args) {
        if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){
             // CODE GOES HERE 🡫 
             const member = message.mentions.members.first();
             if (!member){
                 message.reply("no mention")
                 return;
             }
             else{
                 let accage = member.user.createdTimestamp
                 let joindate = member.joinedTimestamp
                 accage = accage.toString().slice(0, -3)
                 joindate = joindate.toString().slice(0, -3)
                 
                 const embed = new Discord.MessageEmbed()
                 .setTitle('account age of '+member.user.username)
                 .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                 .setColor(0xff0000)
                 .addField('creation date ', `<t:${accage}:f>`)
                 .addField('join date ', `<t:${joindate}:f>`)
                 .setFooter("user: " + member.user.tag +" | user id: "+ member.user.id)
                 message.channel.send({ embeds: [embed] });
             }
        }
        else{
            message.reply("You lack perms for this command")
        }
    }
}