const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports={
    streamerrole: function(messa,message,client){
        const sregex = /(how|where|want).+(streamer|content creator|youtuber).+(role|rank)/i;
        const sstr = messa;
        let mx;
        if ((mx = sregex.exec(sstr)) !== null) {
            // The result can be accessed through the `m`-variable.
            message.reply("The streamer role is given to users featured in a Gamers React compilation.\nIf you have been featured, open a General Support <#858354762855874560> and leave a message with a timestamp and link to the video.");
            return;
        }

        const sregex2 = /(how).+(know).+(video|clip|in).+(video|accepted)/i;
        let m;
        if ((m = sregex2.exec(sstr)) !== null) {
            // The result can be accessed through the `m`-variable.
            message.reply("The only way to know if your clip got into a video, is to either watch the gamers react videos and look for your clip in it, or check the description for your twitch/YT. ");
            return;
        }
        const sregex3 = /(cant|can't|can not|clips).+(see|read|are).+(submit|clip|submit clip|deleting|<#878531760386871327>)/i;
        let ml;
        if ((ml = sregex3.exec(sstr)) !== null) {
            // The result can be accessed through the `m`-variable.
            message.reply("User don't have access to read channel history <#878531760386871327> but the clips are still there unless the bot responded with a message saying it was deleted.\nWe will still punish for repeated submissions.");
            return;
        }
    }
}