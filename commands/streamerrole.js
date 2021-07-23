
const Discord = require('discord.js');
const client = new Discord.Client();

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
    }
}