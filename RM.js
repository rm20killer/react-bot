/* eslint-disable no-inline-comments */
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config");
const prefixl = config.prefix

//Discord.js v12+ is needed for this to work

//youtube api

//youtube stuff not working yet
//const YouTube = require("discord-youtube-api"); 
//const youtube = new YouTube(config.youtubeAPI);

//EnderEyeGames/RootAtKali: save username of the last user to submit something, so the bot can scold people for submitting two inadequate submissions.
//RM: This is not fully working and causing an error when trying to call the var. I think I know a work around which should be added when I add slash commands
var lastBadSumbissionBy = "NONE YET";


client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("your Clips", { type: "WATCHING"})
    //client.user.setPresence({ game: { name: 'Videos' , type: 'WATCHING' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);
    //-
    //this is for slash commands to work
    //-
});


client.on('message', msg => {
  const messa = msg.content.toLowerCase();
  console.log(messa);
  if (msg.member.roles.cache.find(r=>r.id === '795456110421213214'))
  {
    if(msg.content === 'respond') {
      const user = client.users.cache.get('700788536189649006');
      user.send("I never experniced age i just a bot");
    }
  
  }
})

// client.login(process.env.token);
client.login(config.BotToken);
