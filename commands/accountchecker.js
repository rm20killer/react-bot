const Discord = require('discord.js');
const client = new Discord.Client();

module.exports ={
    accountchecker: function(client,member){
        const channel = client.channels.cache.find(channel => channel.id === "710123089094246482");
        //console.log(member)
        if (Date.now() - member.user.createdAt < 1000*60*60*24*1) {
            const accage = member.user.createdAt
            const embed = new Discord.MessageEmbed()
            .setTitle('New account')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0xff0000)
            .setDescription(member.user.tag +' created an account in the past day and joined')
            .addField('creation date ', accage)
            .setFooter("user: " + member.user.tag +" | user id: "+ member.id)
    
            channel.send(embed);
            return;
        }
        if (Date.now() - member.user.createdAt < 1000*60*60*24*10) {
            const accage = member.user.createdAt
            const embed = new Discord.MessageEmbed()
            .setTitle('New account')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0xff0000)
            .setDescription(member.user.tag +' created an account in the past 10 days and joined')
            .addField('creation date ', accage)
            .setFooter("user: " + member.user.tag +" | user id: "+ member.id)
    
            channel.send(embed);
            return;
        }
        

    }
}