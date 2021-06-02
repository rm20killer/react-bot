
const axios = require("axios");
const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config");

const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser

const getSubscribers = async () => {
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
      const channel = client.channels.cache.find(channel => channel.id === "849642482702614528");
      channel.setName("Subscribers: "+subr+" Mil");
      //return(sub)
  })
}
function callEveryHour() {
  setInterval(getSubscribers, 1000 * 60 * 60  );
}

client.on("ready", () =>{
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("your Clips", { type: "WATCHING"})
  .then(console.log)
  .catch(console.error);

  var nextDate = new Date();
  if (nextDate.getMinutes() === 0) { // You can check for seconds here too
    callEveryHour()
  } else {
    nextDate.setHours(nextDate.getHours() + 1);
    nextDate.setMinutes(0);
    nextDate.setSeconds(0);// I wouldn't do milliseconds too ;)

    var difference = nextDate - new Date();
    setTimeout(callEveryHour, difference);
  }
});

//getSubscribers();
client.login(config.BotToken);