const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("../config");

const youtubeKey = config.youtubeKey

//const youtubeVideoID = "gueLFatQMFg"

const getVideoinfo = async () => {
    //return req.data;
    fetch("https://www.googleapis.com/youtube/v3/videos?id="+youtubeVideoID+"&part=contentDetails&key="+youtubeKey)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data["items"][0]);
        console.log(data["items"][0].contentDetails.duration);//duration

    })
}
getVideoinfo()

module.exports = {
    youtube: function(message,client){
        messa=message.content;
        var url = messa.match(/\bhttps?:\/\/\S+/gi);
        if (url.includes("https://youtu.be/")){
            //
        }
    }
}