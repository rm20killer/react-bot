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
const fs = require('fs');

const file = require("../../file.json");

const config = require("../../config");

const accountage = require("../../CMD/modcommands/accountage");

const close = require("./ticket/close");
const rename = require("./ticket/rename");
const add = require("./ticket/add");
const stafflock = require("./ticket/stafflock");
const remove =require("./ticket/remove")
const rules =require("../../CMD/modcommands/createrules")
const rescount=require("../../CMD/spreadsheet/ssrescount")
const numberinfo=require("../../CMD/spreadsheet/ssuserinfo")
const ssdmuser=require("../DMuser")
const ssrolegive=require("../../CMD/spreadsheet/ssgiverole")
const transcript=require("../../CMD/modcommands/transcript")

//const namechecker=require("./nameChecker")

const games =require("../../CMD/fun/games")
const CreateVoiceChat =require("../../CMD/modcommands/createvoicechat")
const index = require('../../index');

const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports ={
    commands: function(cmd,args,message,client){   
        if(cmd === 'ping') {
            //done
            ping(message,client)
        }
        if(message.guild.id==="895674878508818472"){
            if(cmd==="game"){
                //done
                games.games(args,message,client);
            }
            if(message.author.name==="227490301688676354"){
                //done
                if(cmd === "say"){
                    const say = message.content.slice(4);
                    if(say) {
                        message.channel.send(say);
                        message.delete().catch(error => {console.log(error)});
                    }
                    else{
                    message.reply("nothing to say")
                    }
                    return;
                }  
            }
        }
        if (cmd === "rm3"){
            //done
            message.channel.send("https://cdn.discordapp.com/attachments/629695220065239064/844968694550626334/5aatpw.gif");
            message.delete();
        }
        if (cmd === "what") {
            const rest = message.content.slice(5);
            if (rest.includes("is the meaning of life")){
                message.reply("To listen to minecraftcowboy, he is the wise one")
            }
        }
        if  (cmd==="grmc") {
            //done
            let row23 = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setStyle('LINK')
                    .setLabel('GRMC Discord')
                    .setURL("https://discord.gg/mvpPdqTmJh"))
                .addComponents(new MessageButton()
                    .setStyle('LINK')
                    .setLabel('GRMC Website')
                    .setURL("https://www.gamersreact.net"))
            const embed = new Discord.MessageEmbed()
                .setTitle(`GRMC`)
                .setColor(2374108)
                .setDescription(`If you need help with the minecraft server ask on the Gamer React Minecraft discord or website`)
                .addField("IP:" , "`play.gamersreact.net`")
                .addField("Version:" , "Premium Java only, 1.16.5 with support from 1.8 to 1.17")
            //message.channel.send({ embeds: [embed] })
            message.channel.send({ embeds: [embed], components: [row23] }).catch(console.error);
        }
        if (cmd === "tablecount"){
            //done
            message.reply(file.tableflip + " tables have been fliped")
        }
        //mod only commands
        if(message.member.roles=== null){
            message.reply("Roles issue detected")
            console.log(message.author+" roles issue "+message.content)
            return;
        }
        if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)||message.member.roles.cache.find(r=>r.id === "747863600994975744")||message.member.roles.cache.find(r=>r.id === "838238288216588358")){
            if(cmd==="game"){
                //added
                games.games(args,message,client);
            }
        }
        if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){
            if(cmd==="partycreate"){
                //done
                if(args[1]===null){
                    return
                }
                CreateVoiceChat.CreateVoiceChat(message,client,args)
                message.reply("Creating channels")
            }
            if(cmd==="delparty"){
                //done
                CreateVoiceChat.deleteVoiceChat(message,client,args)
            }
            if(cmd==="similarity"){
                //done
                if(args[1]===null){
                    return
                }
                
                if(args[2]===null){
                    return
                }
                message.reply(""+similarity(args[1],args[2]))
            }
            if(cmd==="masscheck"){
                //namechecker.masscheck(message,client,args)
            }
            
            if(cmd==="transcript"){
                //done
                transcript.transcript(message,client,args);
            }
            if(cmd==="event"){
                //done
                const creeperEmote = client.emojis.cache.get(`859806815332204555`);
                const embed = new Discord.MessageEmbed()
                .setTitle('Events Notifications')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xFF0000)
                .setDescription(`Want to get a notifcation when we do an event,\n\n React with the ${creeperEmote} emote`)
                message.channel.send({ embeds: [embed] });
            }
            if(cmd==="event2"){
                //done
                const creeperEmote = client.emojis.cache.get(`859806815332204555`);
                const embed = new Discord.MessageEmbed()
                .setTitle('Giveaway Notifications')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xFF0000)
                .setDescription(`Want to get a notifcation when we do an Giveaway,\n\n React with the 🎁 emote`)
                message.channel.send({ embeds: [embed] });
            }
            if(cmd==="mceventcount"){
                //done
                rescount.rescount(message,client);
            }
            if(cmd==="mcuserinfo"){
                //done
                numberinfo.ssuserinfo(message,client,args);
            }
            if(cmd==="mcdm"){
                //ssdmuser.ssdmuser(message,client,args)
            }
            if(cmd==="ssrolegive")
                //ssrolegive.ssrolegive(message,client,args)
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
                //done
                const say = message.content.slice(4);
                if(say) {
                    message.channel.send(say);
                    message.delete().catch(error => {console.log(error)});
                }
                else{
                message.reply("nothing to say")
                }
                return;
            }  
            if(cmd==="subupdate") {
                //done
                if(message.guild.id === "880560625166741544"){return};
                getSubscribers(message,client);
            }
            if(cmd==='rm') {
                //done
                message.channel.send("RM is busy and does not check/rate clips");
                message.delete().catch(error => {console.log(error)});
            }
            if (cmd ==="rm2") {
                //done
                message.channel.send("https://media.giphy.com/media/eiNLAAmHNZuy5nsKKq/giphy.gif");
                message.delete().catch(error => {console.log(error)});
                
            }
            if (cmd ==="dm"){
                //done
                var str = message.content
                const mess = str.split(/>(.+)/)[1]
                const mention = message.mentions.users.first();
                if (!mention){
                    message.reply("no mention")
                    return;
                }
                else{
                    //console.log(mention)
                    const user = client.users.cache.get(mention.id);
                    //console.log(mess);
                    user.send(mess)
                    .catch(console.error);
                    return;   
                }
            }
            if(cmd === "dmrules"){
                //done
                let res = "an error happened."
                let rule1="**1. Be Kind/Respectful to others.** \n> Don't be rude to other Users. You can make jokes but there is a fine line between banter and being mean. Don't be offensive towards someone's race, sexuality and gender…ect. treat them like people. Any homophobic/racist/sexist behavior will not be tolerated in this server." 
                let rule2="**2. No Nonsense.** \n> Do not Spam, Swear, Flood channels with stuff such as long Copy pasted messages. Don't ping Riz if you require any sort of assistance feel free to open up a ticket in <#858354762855874560> or you may ping <@&696134129497931857> for any issue happening in the server!" 
                let rule3="**3. This is a PG-13 Server.** \n> Considering this is a PG-13 Server do not post porn, gore, NSFW, explicit content, child abuse, animal abuse, gambling of any sort or scams. Make sure to keep any Controversial topics to a minimum or not at all, you may use DM's for that." 
                let rule4="**4. Assistance from the Staff team** \n> If you have any Question or need support of any kind feel free to open up a ticket through <#858354762855874560>, make sure to read the rules before doing so. Any tickets created without a reason will most likely result in a <@&865548571327070268> . If you have been featured in a Gamers React video then create a `General Support` with Timestamp and Link to the video to acquire the <@&696133979748958309> role! The <@&696133979748958309> role also gives you access to special channels." 
                let rule5="**5. Submit clips to get a chance to be in the next Gamers React video!** \n>>> You may submit any clips you have in our website: https://gamersreact.com/ \n-All of the Clip submissions are gone through, so don't think you were left out or your clip got lost in other messages.*"
                let rule6="**6. A few basic rules to look out for** \n> Speak ONLY in English, use the correct channels for the correct chats, remember that me or the Staff have the final say you may justify yourself by opening a ticket through <#858354762855874560> if you think you were punishment wasn't fair."
            
                const mention = message.mentions.users.first();
                if (!mention){
                    message.reply("no mention")
                    return;
                }
                else{
                    //console.log(mention)
                    const user = client.users.cache.get(mention.id);
                    //console.log(mess);
                    let dontlog = "3ADB63D1"
                    res = dontlog +"\n\n" + rule1 +"\n"+ rule2 +"\n"+ rule3 +"\n"+ rule4
                    let res2 = dontlog +"\n\n" + rule5 +"\n\n"+ rule6
                    user.send({ content: res, components: [] }).catch(error => {console.log(error)});
                    user.send({ content: res2, components: [] }).catch(error => {console.log(error)});
                    message.reply("rules sent")
                    return
                }
            }
            if (cmd ==="age"){
                //done
                accountage.accountage(args,message,client)
                return;
            }
            if(cmd==="createrulestest"){
                //done
                rules.rules(message,client);
            }
            if(cmd==="createticket"){
                //done
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
                let channelpar = "858354610367627284"
                if(message.guild.id==="898628981958537266"){
                    channelpar = "898628983271337997"
                }
                if(message.channel.parent.id===channelpar){
                    //done
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
                    //^^
                }
            }
        }
        //admin only commands
    }
}

const ping = async (message,client) => {
    //done
    var resMsg = await message.channel.send('Ping is being appreciated...');
    const ping = (resMsg.createdTimestamp - message.createdTimestamp);
    //console.log(client.ws.ping);  
    resMsg.edit("Ping: " + ping +" ms");
    //message.reply('pong, ' + `${Date.now() - message.createdTimestamp}` + ' ms');
    return;
}

const getSubscribers = async (message,client) => {
    //done
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


function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}