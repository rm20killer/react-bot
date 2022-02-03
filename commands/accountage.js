
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fetch = require("node-fetch");

const config = require("../config");

const modid = config.ModID
const adminid = config.AdminID

module.exports ={
    accountage: async function(args,message,client){ 
        let member = message.mentions.members.first();
        if (!member) {
            let id = args[1]
            try {
                member = await message.guild.members.fetch(id);
            } catch {
                return message.reply(`I can't find that member`);
            }
        }
        if (!member) { return message.reply(`I can't find that member`) }
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
}