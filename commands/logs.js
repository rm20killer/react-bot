const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");


module.exports ={
    log: function(message,client){  
        const Channel = client.channels.cache.get("857624418212511784"); 
        if (!Channel) {
            console.log("No Channel Found To Log!"); 
        }
        
        const receivedEmbed = message.embeds[0];
        if(!message.author.bot){
            const attachments = (message.attachments).array(); // Get list of attachments
            const attachment = attachments[0]; // Take the first attachment
            if (attachment == null){
                const embed = new Discord.MessageEmbed()
                .setTitle('Message in log channel')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0x4287f5)
                .setDescription(message.content)
                .setFooter("auther: " + message.author.tag +" | auther id: "+ message.author.id)
                Channel.send(embed);
            }
            else{
                const embed = new Discord.MessageEmbed()
                .setTitle('Message in log channel')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0x4287f5)
                .setDescription(message.content)
                .addField("attachment", attachment.url)
                .setFooter("auther: " + message.author.tag +" | auther id: "+ message.author.id)
                Channel.send(embed);
            }
        }
        else{
            const exampleEmbed = new Discord.MessageEmbed(receivedEmbed)
            Channel.send(exampleEmbed);
        }

    }
 }
