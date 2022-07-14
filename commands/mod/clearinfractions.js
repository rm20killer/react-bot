/*
  __  __           _         
 |  \/  |         | |    _   
 | \  / | ___   __| |  _| |_ 
 | |\/| |/ _ \ / _` | |_   _|
 | |  | | (_) | (_| |   |_|  
 |_|  |_|\___/ \__,_|                          
*/

const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const config = require(`../../config`);

const modid = config.ModID;
const adminid = config.AdminID;
const jrmod = config.jrmod;
const helper = config.helper;
const srmods = config.srmods;

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../utils/Database/sequelize');
const WarnSchema = require('../../utils/Database/Models/warn-schema')(sequelize, DataTypes);
module.exports = {
  name: "clearinfractions",
  aliases: [`removewarning`, "removeinfractions", "clearwarning"],
  description: "remove warnings from a user",
  usage: "`*clearinfractions <@user> <infraction number>`",
  example: "``",
  async execute(message, args, client) {
    if (
      message.member.roles.cache.find((r) => r.id === srmods) ||
      message.member.roles.cache.find((r) => r.name === adminid)
    ) {
      // CODE GOES HERE 🡫
      if (!args[0]) {
        return message.reply(`enter a user`);
      }
      let target = message.mentions.members.first();
      if (!target) {
        let id = args[0];
        try {
          target = await message.guild.members.fetch(id);
        } catch {
          return message.reply(`I can't find that member`);
        }
      }

      if (!target) {
        return message.reply(`I can't find that member`);
      }
      if (!args[1]) {
        return message.reply("No warn id found");
      }

      let lastElement1 = args.slice(-1)[0];
      const Lastarray = lastElement1.split("");
      if (Lastarray[0] === "-") {
        //console.log(Lastarray)
        if (Lastarray.length > 2) {
        } else {
          //var dmed=0
          try {
            if (Lastarray[1] === "a") {
              removeall(message, target, args).catch((error) => {
                console.log(error);
              });
            }
          } catch {
            console.log(`failed to clear warns for ${target.user.tag}`);
            message.reply(`failed to clear warns for ${target.user.tag}`);
          }
          return;
        }
      } else {
        let warnId = parseInt(args[1]);
        if (warnId != 0) {
          if (!warnId) {
            return message.reply("No warn id found");
          }
        }
        removeOne(message, target, args, warnId);
      }
    } else {
      message.reply(`You lack perms for this command`);
    }
  },
};
const removeall = async (message, target, args) => {
  const guildId = message.guildId;
  const userId = target.id;
  let passed = false
  try{
    WarnSchema.destroy({ where: { guildId:guildId, userId:target.id  } })
    passed = true
  }
  catch(error){
    console.log(error)
    return message.reply(`failed to clear warns for ${target.user.tag}`);
  }
  finally{
    if(!passed){
      return
    }
    avatarURL = target.user.avatarURL({ format: "png" });
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `removed all warning for ${target.user.tag}`,
        avatarURL
      )
      .setColor(0x0774f8)
      .addField("executor", `${message.author.tag}`)
      .setFooter({text:"id: " + target.id})
    message.reply({ embeds: [embed] });
  }
};



// const removeOne = async (message, target, args, warnId) => {
//   const guildId = message.guildId;
//   const userId = target.id;
//   await mongo().then(async (mongoose) => {
//     try {
//       const results = await warnSchema.findOne({
//         guildId,
//         userId,
//       });
//       //let warnId = parseInt(args[1])
//       //console.log(warnId)
//       let warnings1 = results.warnings;
//       //console.log(warnings)
//       //warningNumber = warnings1.length;
//       //if(warningNumber>=warnId){
//       //  return message.reply("No warn id found")
//       //}
//       //if(!isNaN(warnId)){ return message.reply("invalid id")}
//       //console.log(warningdeleting)

//       //let RemovalID = warnId +1
//       if (!warnings1[warnId]) {
//         return message.reply("No warning found");
//       }
//       let warningdeleting = warnings1[warnId];
//       const { author, timestamp, reason, Last10Messages } = warningdeleting;
//       results.warnings.splice(warnId, 1);
//       //console.log(results.warnings)
//       const warnings = results.warnings;
//       try {
//         await WarnSchema.findOneAndUpdate(
//           {
//             guildId,
//             userId,
//           },
//           {
//             guildId,
//             userId,
//             warnings,
//           },
//           {
//             upsert: true,
//           }
//         );
//       } finally {
//         console.log("Updated database");
//         //mongoose.connection.close()
//       }
//       avatarURL = target.user.avatarURL({ format: "png" });
//       const embed = new Discord.MessageEmbed()
//         .setAuthor(
//           `${target.user.tag} infractions removed by ${message.author.tag}`,
//           avatarURL
//         )
//         .setColor(0x0774f8)
//         .addField("reason", `${reason}`)
//         .addField("original mod", `<@${author}>`)
//         .addField("At time", `<t:${timestamp}:f>`)
//         .setFooter("id: " + target.id);
//       message.reply({ embeds: [embed] });
//     } finally {
//       //mongoose.connection.close()
//     }
//   });
// };
