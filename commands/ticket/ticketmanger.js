
const Discord = require('discord.js');
const client = new Discord.Client();
const disbut = require('discord-buttons')(client);


module.exports = {
    ticketmess: function(message,client){
        const { MessageButton, MessageActionRow } = require("discord-buttons");

        let btn = new MessageButton()
            .setStyle('green')
            .setLabel('General Support') 
            .setID('General');

        let btn2 = new MessageButton()
            .setStyle('green')
            .setLabel('Purchase Support') 
            .setID('Purchase');

        let btn3 = new MessageButton()
            .setStyle('green')
            .setLabel('Ban Appeal') 
            .setID('BanAppeal');

        let btn4 = new MessageButton()
            .setStyle('red')
            .setLabel('Player Report') 
            .setID('Player');
        let btn5 = new MessageButton()
            .setStyle('red')
            .setLabel('Staff Report') 
            .setID('Staff');

        let row = new MessageActionRow()
            .addComponent(btn)
            .addComponent(btn2)
            .addComponent(btn3);
            //.addComponent(btn4);
        let row2 = new MessageActionRow()
            .addComponent(btn4)
            .addComponent(btn5);
        const embed = new Discord.MessageEmbed()
            .setTitle(`**Welcome to ${message.guild.name}!**`)
            .setColor(0x2f3136)
            .setDescription("Click on one of the buttons below to start your ticket")  
        message.channel.send({ embed: embed, component: row })
        //message.channel.send("Click on one of the buttons below to start your ticket", { components: [row, row2] });
    }
}
