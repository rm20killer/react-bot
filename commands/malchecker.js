
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const list = require("../list");
const allowlist = require("../allowlist");

module.exports ={
    antiworm: function(messa,message,client){

        //const messa = message.content.toLowerCase(); 
        if(messa.includes("https://")||messa.includes("http://")){
            let banned = list.arr;
            let allow = allowlist.arr;
    
            // Some sort of worm has been spread which uses messages like this to spread.
            const malregex = /(creator|publisher).+(enter|participate).+(beta|closed beta).+(bonus|reward).+(download|install).+(link|file)/i
            const malregex2 = /(steam|csgo).+(giveaway|giving away|leaving).+(nitro|closed beta|trades)/i
            const malregex3 = /(join).+(traders|trader).+(earn).+($|£|)/i
            const strx = messa;
            var url = messa.match(/\bhttps?:\/\/\S+/gi);
            if(!url){}
            else{
                for (var i = 0; i < url.length; i++) { //checks all links
                    for (var l = 0; l < allow.length; l++) { //real links
                        if (url[i].includes(allow[l])) {
                            return;
                        }  
                    }
                    for (var x = 0; x < banned.length; x++) { //fake link
                        if (url[i].includes(banned[x])) {
                            trigger(message,client);
                            return;
                        }
                    }
                }
            }
            let mal;
            if((mal = malregex2.exec(strx)) !== null){ //if missed fake link
                trigger(message,client,guildConf);
                return;
            }
            if((mal = malregex3.exec(strx)) !== null){ //if missed fake link
                trigger(message,client);
                return;
            }
        }
    },


    antiunderage: function(messa,message,client){
    }
}


const trigger  = async (message,client) => {
    message.channel.send("<@"+message.author.id+">, account might be compromised.");
    message.author.send("We noticed you've been compromised by self-spreading malware (a worm) which takes over your account to send download links to this worm to others.\nAs a precaution, the bot has kicked you from the Gamers React server.\nYou must run a Windows Defender full scan and change your password.\nTo join back, use this invite link: https://discord.gg/SnBhUmqSf8")
    .catch(console.error);
    const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
    let time = message.createdTimestamp
    var date = new Date(time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    const embed = new Discord.MessageEmbed()
    .setTitle('A user may be compromised')
    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
    .setColor(0xFF0000)
    .setDescription(message.content)
    .addField('person id', message.author.id)
    .addField("person name ", message.author.tag)
    .setFooter("today at "+formattedTime)
    channel.send({ embeds: [embed] });
    message.delete()
}