/*
  _    _      _                         
 | |  | |    | |                    _   
 | |__| | ___| |_ __   ___ _ __   _| |_ 
 |  __  |/ _ \ | '_ \ / _ \ '__| |_   _|
 | |  | |  __/ | |_) |  __/ |      |_|  
 |_|  |_|\___|_| .__/ \___|_|           
               | |                      
               |_|                      
*/
const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
  name: 'clear',
  aliases: [`purge`],
  description: '',
  usage: '`*clear <ammount> [@user]`',
  example: '``',
  async execute(message, args, client) {
    if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
      var amount = args[0]
      let DeleteAmount = amount;
      if(amount>101){
        message.reply("max allowed is 100 messages")
        DeleteAmount=100
        amount=100
        return;
      }
      else if(amount=100){

      }
      else{
        DeleteAmount = amount+1;
      }

      if (args[1]) {
        let target = message.mentions.members.first();
        if (!target) {
          let id = args[1]
          try {
            target = await message.guild.members.fetch(id);
          } catch {
            return message.reply(`I can't find that member`);
          }
        }
        if (!target) { return message.reply(`I can't find that member`) }
        fbulkdeleteUser(message, DeleteAmount, target)
      }
      else {
        fbulkdelete(message, DeleteAmount)
      }
    }
    else {
      message.reply(`You lack perms for this command`)
    }
    // CODE GOES HERE 🡫 
  }
}


const fbulkdeleteUser = async function (message, amount, target) {
  const id = target.id
  message.channel.messages.fetch({
    limit: amount // Change `100` to however many messages you want to fetch
  }).then((messages) => {
    const botMessages = [];
    messages.filter(m => m.author.id === id).forEach(msg => botMessages.push(msg))
    message.channel.bulkDelete(botMessages).then(() => {
      message.channel.send(`Bulk deleted ${messages.size} messages`).then(msg => msg.delete({
        timeout: 30000
      }))
    }).catch(error => { console.log(error) });
  }).catch(error => { console.log(error) });
}

const fbulkdelete = async function (message, amount) {
  try {
    message.channel.bulkDelete(amount).then(messages => {
      message.channel.send(`Bulk deleted ${messages.size} messages`).then(msg => msg.delete({
        timeout: 30000
      }))
    }).catch(error => { console.log(error) });
  } catch {
    return message.reply(`Error`);
  }
}