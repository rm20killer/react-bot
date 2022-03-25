const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
  name: 'lifetips',
  aliases: [`lifetip`],
  description: '',
  usage: '``',
  example: '``',
  async execute(message, args, client) {
    // CODE GOES HERE 🡫
    return
    //get random value from array
    const randomValue = Math.floor(Math.random() * tips.length);
    //get random tip
    const tip = tips[randomValue];
    //send tip
    message.channel.send(tip);
  }
}