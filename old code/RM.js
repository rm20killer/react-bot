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

function getChannelIDs(fetch) 
{
  const guildss = client.guilds.cache.find(guild => guild .id === "826825694205444107");
  //const guildss = client.guilds.
  console.log(guildss)
  var array = [];
  let channels = client.guildss.channels;
  for (const channel of channels.values()) 
  {
    array.push(channel.id);
    console.log(channel.id);
  }
  return array;
}

client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("your Clips", { type: "WATCHING"})
    //client.user.setPresence({ game: { name: 'Videos' , type: 'WATCHING' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);
    const Guilds = client.guilds.cache.map(guild => guild.id);
    console.log(Guilds);

    const nGuilds = client.guilds.cache.map(guild => guild.name);
    console.log(nGuilds);
    const fullGuilds = client.guilds.cache.map(guild => guild);
    console.log(fullGuilds);
    const Invite = "InviteCode"; // Example: bM2Ae2

  client.guilds.cache.forEach(guild => { // Looping through all the guilds your bot is in.
    console.log(guild)
    if (guild.id==="826825694205444107") {
      guild.channels.cache.forEach(channel => { 
        const invite = channel.createInvite()
        console.log(invite)
        console.log(channel.id)
      });
      console.log(guild.me.permissions)
      if(guild.me.hasPermission("MANAGE_GUILD"))
        console.log("yes")
      else
        console.log("no")
    }
});
    //-
    //this is for slash commands to work
    //-
});

client.on('message', message => { 
  if (!message.content.startsWith(prefixl)) return;
  const args = message.content.trim().split(/ +/g);
  const cmd = args[0].slice(prefixl.length).toLowerCase();
  if (cmd="leave") {
    const aither=message.auther.id
    if(aither==="227490301688676354"){
      message.channel.send("BYE BYE, dont add me again ;)")
      //message.guild.leave();
    }
  }
});


// client.login(process.env.token);
client.login(config.BotToken);
