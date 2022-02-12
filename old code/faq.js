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

module.exports = {
    faq: function(message,client){
        if(message.author.bot===true){return}
        const sregex = /(what|tell|join|give).+(ip)/i;
        const sstr = message.content.toLowerCase();
        let mx;
        if ((mx = sregex.exec(sstr)) !== null) {
            message.reply("`play.gamersreact.net` but you can not access it until <t:1631462400:f>");
            return;
        }
        const sregex2 = /(can|gonna|will|server|available).+(bedrock)/i;
        let m;
        if ((m = sregex2.exec(sstr)) !== null) {
            message.reply("At the moment it is only available for java.");
            return;
        }
        const sregex3 = /(can|gonna|will|server|available).+(cracked|tlauncher|premium)/i;
        let ml;
        if ((ml = sregex3.exec(sstr)) !== null) {
            message.reply("Server is premium only.");
            return;
        }
        const sregex4 = /(how|where|want|add).+(submit|post|share|send).+(clip|video)/i;
        let mp;
        if ((mp = sregex4.exec(sstr)) !== null) {
            message.reply("you can post clips in discord.gg/gamersreact in the <#878531760386871327>");
            return;
        }
    }
}

//let FAQwords =["can't join",'cant join', 'cannot join','unknown host','server be released','is the server is started','servers ip','what version','is server bedrock','what ip','join on bedrock','resolve hostname','TLauncher','server ip','server cracked','server bedrock','server bedrock edition','join server','join the server',' bedrock edition server','server release','have cracked account','can i play on','server going to be bedrock','can cracked']
