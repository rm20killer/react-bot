
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


module.exports ={
    accountchecker: function(client,member){
        const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
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
    
            channel.send({ embeds: [embed] })
            .catch(err => {console.log("err")}); 
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
            channel.send({ embeds: [embed] })
            .catch(err => {console.log("err2")}); 

            return;
        }
        

    }
}
