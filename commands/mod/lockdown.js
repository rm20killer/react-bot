/*
  __  __           _         
 |  \/  |         | |    _   
 | \  / | ___   __| |  _| |_ 
 | |\/| |/ _ \ / _` | |_   _|
 | |  | | (_) | (_| |   |_|  
 |_|  |_|\___/ \__,_|                          
*/

// Command: lockdown
// Usage: lockdown
// Desc: Locks the server down.

const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
  name: 'lockdown',
  aliases: [``],
  description: 'Locks the server down.',
  usage: '`*lockdown`',
  async execute(message, args, client) {
    // CODE GOES HERE 🡫 
    if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid)) {
      //was a reason provided
      if (args.length > 0) {
        //if args[0] === yes
        if (args[0].toLowerCase() === 'confirm') {
          lockdown(message, args, client);
        }
        else {
          message.channel.send('Please confirm with `*lockdown confirm`');
        }
      }
      else {
        message.channel.send('please confirm with `*lockdown confirm`');
      }

    }
    else {
      message.reply(`You lack perms for this command`)
    }
  }
}

async function lockdown(message, args, client) {
  let counter = 0;
  //create embed
  const embed = new Discord.MessageEmbed()
    .setTitle('Server is now locked down')
    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
    .setColor(0xff0000)
    .setDescription('The server is now locked down.\n\*sorry for the incovenience\n\*please be patient\n\*we will be back soon')

  const memberRole = await message.guild.roles.cache.find(r => r.id === "710128390547701876");
  //fetch all channels in a server
  const channels = await message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT');
  //console.log(channels)
  //loop through all channels
  for (const channel of channels) {
    //is channel in catoargy
    //console.log(channel[1].name)
    if (channel[1].parentId === "629695220065239063"||channel.parentID === "716754944472121516") {
      if(channel[1].id==="788078716546318418"||channel[1].id==="906508002796925009"){

      }
      else{
      //console.log(channel)
      //make channel read only
      //fetch channel
      const channel1 = await message.guild.channels.cache.find(ch => ch.id === channel[1].id);
      channel1.permissionOverwrites.edit(memberRole, { SEND_MESSAGES: false });
      //ADD one to the counter
      counter++;
      //send emebed
      channel1.send({ embeds: [embed] });
      }
    }
  }
  message.channel.send(`${counter} channels have been locked down`);
}