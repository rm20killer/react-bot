const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("../config");

const youtubeKey = config.youtubeKey

const youtubeVideotestID = "gueLFatQMFg"

const getVideoinfo = async (youtubeVideoID,message,client) => {
    //return req.data;
    fetch("https://www.googleapis.com/youtube/v3/videos?id="+youtubeVideoID+"&part=contentDetails&key="+youtubeKey)
    .then(response => {
        return response.json()
    })
    .then(data => {
        //console.log(data["items"][0]);
        var duration = data["items"][0].contentDetails.duration;//duration
        //const duration = durationt.split("T")[1];
        const definition = data["items"][0].contentDetails.definition; //definition
        //console.log(definition)
        if (definition==="sd"){
            const embed = new Discord.MessageEmbed()
            .setTitle('Video resolution too low!')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0xff0000)
            .setDescription('Video definition is not HD, \nYoutube API has shown this video definition is less than 720p\nwhich does not meet requirements \nType /requirements for more info.')
            .addField('Bad submission by', message.author.username)
            message.channel.send(embed);
            message.delete();
            return 
        }
        else{
            var a = duration.match(/\d+/g);

            if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
                a = [0, a[0], 0];
            }
        
            if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
                a = [a[0], 0, a[1]];
            }
            if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
                a = [a[0], 0, 0];
            }
        
            duration = 0;
        
            if (a.length == 3) {
                duration = duration + parseInt(a[0]) * 3600;
                duration = duration + parseInt(a[1]) * 60;
                duration = duration + parseInt(a[2]);
            }
        
            if (a.length == 2) {
                duration = duration + parseInt(a[0]) * 60;
                duration = duration + parseInt(a[1]);
            }
        
            if (a.length == 1) {
                duration = duration + parseInt(a[0]);
            }
            //console.log(duration)
            if(duration>120){
                const embed = new Discord.MessageEmbed()
                .setTitle('Video too long!')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('Video is more than than 2 min, \nWhich does not meet requirements \nType /requirements for more info.\nFor help with trimming a youtube video type "/youtubetrimmer"')
                .addField('Bad submission by', message.author.username)
                message.channel.send(embed);
                return 
            }
        }
        
    })
    .catch(err => console.log(err))
}


module.exports = {
    youtube: function(message,client){
        messa=message.content;
        var url = messa.match(/\bhttps?:\/\/\S+/gi);
        //console.log(url)
        for (var i = 0; i < url.length; i++) {
            if (url[i].includes("https://youtu.be/")){
                const youtubeVideoID = url[i].split("https://youtu.be/")[1];
                //console.log(youtubeVideoID);
                getVideoinfo(youtubeVideoID,message,client);
                
            }
            if(url[i].includes("https://www.youtube.com/watch?v=")){
                const youtubeVideo = url[i].split("https://www.youtube.com/watch?v=")[1];
                if(youtubeVideo.includes("channel=")){
                    const youtubeVideoID = youtubeVideo.split("&")[0]
                    //console.log(youtubeVideoID);
                    getVideoinfo(youtubeVideoID,message,client);
                    
                }
                else{
                    const youtubeVideoID = youtubeVideo;
                    //console.log(youtubeVideoID);
                    getVideoinfo(youtubeVideoID,message,client);
                    
                }
            }
        }
    }
}