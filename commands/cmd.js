
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");

const config = require("../config");

const accountage = require("./accountage");
const close = require("./ticket/close");
const rename = require("./ticket/rename");
const add = require("./ticket/add");
const stafflock = require("./ticket/stafflock");

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
        if (message.member.roles.cache.find(r=>r.id === modid)||message.member.roles.cache.find(r=>r.id === adminid)){            
            if(cmd === "say"){
                const say = message.content.slice(4);
                if(say) {
                    message.channel.send(say);
                    message.delete();
                }
                else(
                message.reply("nothing to say")
                )
                return;
            }  
            if(cmd==="subupdate") {
                getSubscribers(message,client);
            }
            if(cmd==='rm') {
                message.channel.send("RM is busy and does not check/rate clips");
                message.delete();
            }
            if (cmd ==="rm2") {
                message.channel.send("https://media.giphy.com/media/eiNLAAmHNZuy5nsKKq/giphy.gif");
                message.delete();
                
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
            if(message.channel.parent!=null){
                if(message.channel.parent.id==="858354610367627284"){
                    if (cmd==="close"){
                        const rest = message.content.slice(6);
                        close.close(args,message,client,rest)
                    }
                    if(cmd==="stafflock"){ //9
                        const rest = message.content.slice(10);
                        stafflock.stafflock(args,message,client,rest)
                    }
                    if(cmd==="rename"){
                        const rest = message.content.slice(7);
                        rename.rename(args,message,client,rest)
                    }
                    if(cmd==="add"){
                        const rest = message.content.slice(4);
                        add.add(args,message,client,rest)
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