const fetch = require("node-fetch");
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});

const { MessageActionRow, MessageButton } = require('discord.js');


const config = require("../config");

const accountage = require("./accountage");

const close = require("./ticket/close");
const rename = require("./ticket/rename");
const add = require("./ticket/add");
const stafflock = require("./ticket/stafflock");
const remove =require("./ticket/remove")

const games =require("./games/games")

const index = require('../index');

const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser
const modid = config.ModID
const adminid = config.AdminID

module.exports ={
    commands: function(cmd,args,message,client){   
        if(cmd === 'ping') {
            ping(message,client)
        }
        if (cmd === "rm3"){
            message.channel.send("https://cdn.discordapp.com/attachments/629695220065239064/844968694550626334/5aatpw.gif");
            message.delete();
        }
        if (cmd === "what") {
            const rest = message.content.slice(5);
            if (rest.includes("is the meaning of life")){
                message.reply("To listen to minecraftcowboy, he is the wise one")
            }
        }
        //mod only commands
        if(message.member.roles=== null){
            message.reply("Roles issue detected")
            console.log(message.author+" roles issue "+message.content)
            return;
        }
        if (message.member.roles.cache.find(r=>r.id === modid)||message.member.roles.cache.find(r=>r.id === adminid)||message.member.roles.cache.find(r=>r.id === "747863600994975744")||message.member.roles.cache.find(r=>r.id === "880560625204469799")||message.member.roles.cache.find(r=>r.id === "884833863573065750")||message.member.roles.cache.find(r=>r.id === "880560625204469800")){
            if(cmd==="game"){
                games.games(args,message,client);
            }
        }
        if (message.member.roles.cache.find(r=>r.id === modid)||message.member.roles.cache.find(r=>r.id === adminid)||message.member.roles.cache.find(r=>r.id === "880560625204469799")){
            if(cmd==="setactivity"){
                var str = message.content
                var type = str.split(/ (.+)/)[1];
                var type = type.toUpperCase(); //PLAYING: WATCHING: LISTENING: STREAMING:

                if(type.includes("PLAYING")|type.includes("WATCHING")|type.includes("LISTENING")|type.includes("STREAMING")){
                    setactivity(message,client,type,str);
                }
                else{
                    message.reply("must include type after command: \n`PLAYING` `WATCHING` `LISTENING` `STREAMING`")
                }
            }            
            if(cmd === "say"){
                const say = message.content.slice(4);
                if(say) {
                    message.channel.send(say);
                    message.delete().catch(error => {console.log(error)});
                }
                else(
                message.reply("nothing to say")
                )
                return;
            }  
            if(cmd==="subupdate") {
                if(message.guild.id === "880560625166741544"){return};
                getSubscribers(message,client);
            }
            if(cmd==='rm') {
                message.channel.send("RM is busy and does not check/rate clips");
                message.delete().catch(error => {console.log(error)});
            }
            if (cmd ==="rm2") {
                message.channel.send("https://media.giphy.com/media/eiNLAAmHNZuy5nsKKq/giphy.gif");
                message.delete().catch(error => {console.log(error)});
                
            }
            if (cmd ==="dm"){
                var str = message.content
                const mess = str.split(/>(.+)/)[1]
                const mention = message.mentions.users.first();
                if (!mention){
                    message.reply("no mention")
                    return;
                }
                else{
                    console.log(mention)
                    const user = client.users.cache.get(mention.id);
                    //console.log(mess);
                    user.send(mess)
                    .catch(console.error);
                    return;   
                }
            }
            if (cmd ==="age"){
                accountage.accountage(args,message,client)
                return;
            }
            if(cmd==="createticket"){
                //const { MessageButton, MessageActionRow } = require("discord-buttons");
            
                let btn = new MessageButton()
                    .setStyle('SECONDARY')
                    .setLabel('General Support')
                    .setCustomId('General');
        
                let btn3 = new MessageButton()
                    .setStyle('DANGER')
                    .setLabel('Mute Appeal')
                    .setCustomId('BanAppeal');
        
                let btn5 = new MessageButton()
                    .setStyle('DANGER')
                    .setLabel('User Report') 
                    .setCustomId('Player');
                let row = new MessageActionRow()
                    .addComponents([ btn ])
                    .addComponents([ btn3 ])
                    .addComponents([ btn5 ])
    
                let row23 = new MessageActionRow()
                    .addComponents(new MessageButton()
                        .setStyle('SUCCESS')
                        .setLabel('General Support')
                        .setCustomId('General'))
                    .addComponents(new MessageButton()
                        .setStyle('SUCCESS')
                        .setLabel('Mute Appeal')
                        .setCustomId('BanAppeal'))
                    .addComponents(new MessageButton()
                        .setStyle('DANGER')
                        .setLabel('User Report') 
                        .setCustomId('Player'));
    
                const embed = new Discord.MessageEmbed()
                    .setTitle(`**Welcome to ${message.guild.name}!**`)
                    .setColor(0x2f3136)
                    .setDescription("Click on one of the buttons below to start your ticket: \nA ticket is a private chat with mods to ask questions, user reports, mute appeal, and requesting streamer role if you been in a video. \nCreating a ticket without a reason will lead to a warning and a ticket ban \n\n**DO NOT CREATE A TICKET TO SUBMIT CLIPS**");  
                message.channel.send({ embeds: [embed], components: [row23] }).catch(console.error);
                    //message.channel.send({ embed: embed, component: row })
                //ticketmanger.ticketmess(message,client);
            }
            if (cmd ==="buttontest"){
                const button = new MessageButton()
                .setStyle('PRIMARY')
                .setLabel('BUTTONS')
                .setCustomId('test');
    
                let row1 = new MessageActionRow()
                .addComponents([ button ])
                message.channel.send({
                    content: 'BUTTONS',
                    components: [row1]
                })
            }
            if(message.channel.parent!=null){
                if(message.channel.parent.id==="858354610367627284"){
                    if (cmd==="close"){
                        const rest = message.content.slice(6);
                        close.close(args,message,client,rest)
                    }
                    if(cmd==="stafflock"){ //9
                        const rest = message.content.slice(10);
                        //stafflock.stafflock(args,message,client,rest)
                    }
                    if(cmd==="rename"){
                        const rest = message.content.slice(7);
                        rename.rename(args,message,client,rest)
                    }
                    if(cmd==="add"){
                        const rest = message.content.slice(4);
                        add.add(args,message,client,rest)
                    }
                    if(cmd==="remove"){
                        const rest = message.content.slice(8);
                        remove.remove(args,message,client,rest)

                    }
                }
            }
        }
        //admin only commands
    }
}

const ping = async (message,client) => {
    var resMsg = await message.channel.send('Ping is being appreciated...');
    const ping = (resMsg.createdTimestamp - message.createdTimestamp);
    //console.log(client.ws.ping);  
    resMsg.edit("Ping: " + ping +" ms");
    //message.reply('pong, ' + `${Date.now() - message.createdTimestamp}` + ' ms');
    return;
}

const getSubscribers = async (message,client) => {
    //return req.data;
    fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id="+youtubeUser+"&key="+youtubeKey)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data["items"][0].statistics.subscriberCount);
        const sub = data["items"][0].statistics.subscriberCount;
        subr=sub.slice(0, -4); 
        subr = (subr / 100).toFixed(2);
        message.reply("sub count: "+ subr)
        const channel = client.channels.cache.find(channel => channel.id === "849642482702614528");
        channel.setName("Subscribers: "+subr+" Mil");
        //return(sub)
    })
}

const setactivity  = async (message,client,type,str) => {
    var actt = str.split(/ (.+)/)[2]
    type = type.slice(0, -1); 
    console.log(type + actt);
    client.user.setActivity(actt, { type: type});
    message.reply("updated Activity to "+ type +" "+actt);
}