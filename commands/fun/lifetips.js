const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const config = require(`../../config`);
const data = require(`../../utils/lifetips.json`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
  name: 'lifetips',
  aliases: [`lifetip`,`tip`],
  description: '',
  usage: '``',
  example: '``',
  async execute(message, args, client) {
    // CODE GOES HERE 🡫
    //turn json into array
    let tips = data.tips;
    //console.log(tips);
    //randomly select a tip

    //if args[0] is a number
    if (args[0] && !isNaN(args[0])) {
      //if args[0] is a number
      let num = args[0];
      //if num is less than or equal to the length of the array
      if (num < tips.length) {
        //send the tip
        let tip = tips[num];
        //embed
        const embed = new Discord.MessageEmbed()
          .setTitle("life tips")
          .setAuthor(`Tip from ${tip.provided}`)
          .setColor(0xff0000)
          .setDescription(tip.tip)
          .setFooter(`Tip #${tip.tipID} provided by ${tip.provided}`)
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      }
      else {
        message.channel.send(`${num} is not a valid tip number`);
      }
    }
    else{
      let random = Math.floor(Math.random() * tips.length);
      //send tip
      let tip = tips[random];
      //embed
      const embed = new Discord.MessageEmbed()
        .setTitle("life tips")
        .setAuthor(`Tip from ${tip.provided}`)
        .setColor(0xff0000)
        .setDescription(tip.tip)
        .setFooter(`Tip #${tip.tipID} provided by ${tip.provided}`)
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    }

  }
}
