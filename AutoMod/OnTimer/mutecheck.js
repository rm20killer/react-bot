const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('../../utils/Database/sequelize');
const muteSchema = require('../../utils/Database/Models/mute-schema')(sequelize, DataTypes);

const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const mute = require('../../commands/mod/mute');

const muterole = "712512117999271966";

module.exports = {
  async mutechecker(client) {
    //get mod log channel
    channel = client.channels.cache.find(
      (channel) => channel.id === "710123089094246482"
    );
    const CheckMutes = async () => {
      //console.log("Checking Mutes");
      //console.log("checking mute data")
      const now = new Date();
      const conditional = {
        expires: {
          [Op.lt]: now,
        },
        current: true,
      };
      //find all mutes that are expired
      const mutes = await muteSchema.findAll({
        where: conditional
      });
      //for each mute
      //console.log(`Found ${mutes.length} mutes`);
      for (let i = 0; i < mutes.length; i++) {
        //console.log(mutes[i]);
        //get user from guild
        const guild = client.guilds.cache.find(
          (guild) => guild.id === "629695220065239061"
        );
        const user = guild.members.cache.find(
          (member) => member.id === mutes[i].userId
        );
        let role = guild.roles.cache.get(muterole); //added this
        //console.log(user);
        //if user
        if (user) {
          //remove mute role
          user.roles.remove(role);
          //send message to user
          const embed = new Discord.MessageEmbed().setColor("0x738ADB");
          embed.setDescription(
            `Your mute has expired. You can now chat again.`
          );
          //send message to modlog
          const embed2 = new Discord.MessageEmbed().setColor("0x738ADB");
          embed2.setDescription(
            `${user.id} mute has expired and has unmuted.`
          );
          channel.send({ embeds: [embed2] });
          try {
            user.send({ embeds: [embed] }).catch((error) => {
              console.log(`could not dm user <@${user.id}>`);
            });
          } catch (error) {
            console.log(error);
            return;
          }
        }
      }
      //mass update all mutes to not current
      muteSchema.update(
        { current: false },
        { where: conditional }
      );
      setTimeout(CheckMutes, 1000 * 10);
    };
    CheckMutes();
  },
};
