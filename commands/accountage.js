
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fetch = require("node-fetch");

const config = require("../config");

const modid = config.ModID
const adminid = config.AdminID

module.exports ={
    accountage: function(args,message,client){ 
        const member = message.mentions.members.first();
        if (!member){
            message.reply("no mention")
            return;
        }
        else{
            const accage = member.user.createdAt
            const joindate = member.joinedAt
            console.log(accage)
            console.log(joindate)
            const embed = new Discord.MessageEmbed()
            .setTitle('account age of '+member.user.username)
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0xff0000)
            .addField('creation date ', `${accage}`)
            .addField('join date ', `${joindate}`)
            .setFooter("user: " + member.user.tag +" | user id: "+ member.user.id)
            message.channel.send({ embeds: [embed] });
        }
    }
}