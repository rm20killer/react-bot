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
  if (!msg.content.startsWith(prefixl)) return;
  const args = msg.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefixl.length).toLowerCase();

  if(cmd==='rm') {
    msg.channel.send("RM is busy and does not check/rate clips");
  }
  if(cmd==="compress") {
    msg.channel.send("To compress size so you send on discord you can use: https://8mb.video/")
  }
})

// client.login(process.env.token);
client.login(config.BotToken);
