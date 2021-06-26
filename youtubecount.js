
const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config");

const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser
var oldsub = 0
const getSubscribers = async () => {
  //return req.data;
  fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id="+youtubeUser+"&key="+youtubeKey)
  .then(response => {
      return response.json()
  })
  .then(data => {
      console.log(data["items"][0].statistics.subscriberCount);
      const sub = data["items"][0].statistics.subscriberCount;
      //console.log(oldsub)
      if (sub != oldsub){
        subr=sub.slice(0, -4); 
        subr = (subr / 100).toFixed(2);
        const channel = client.channels.cache.find(channel => channel.id === "849642482702614528");
        channel.setName("Subscribers: "+subr+" Mil");
        console.log("channel updated")
        oldsub=sub
        //return(sub)
      }
  })
}
function callEveryHour() {
  setInterval(getSubscribers, 1000 * 60 * 15  );
}

client.on("ready", () =>{
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("your Clips", { type: "WATCHING"})
  .then(console.log)
  .catch(console.error);

  var nextDate = new Date();
  if (nextDate.getSeconds() === 0) { // You can check for seconds here too
    callEveryHour()
  } else {
    nextDate.setHours(nextDate.getHours(0));
    nextDate.setMinutes(nextDate.getMinutes(0)+15);
    nextDate.setSeconds(0);// I wouldn't do milliseconds too ;)

    var difference = nextDate - new Date();
    setTimeout(callEveryHour, difference);
  }
});

//getSubscribers();
client.login(config.BotToken);