const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const sequelize = require('../../utils/Database/sequelize');
const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const tempbans = require('../../utils/Database/Models/tempban-schema')(sequelize, DataTypes);

const muterole = "712512117999271966";

module.exports = {
  async bancheck(client) {
    channel = client.channels.cache.find(
      (channel) => channel.id === "710123089094246482"
    );
    const banchecks = async () => {
      //console.log("checking mute data")
      const now = new Date();
      const conditional = {
        expires: {
          [Op.lt]: now,
        },
        current: true,
      };
      const bans = await tempbans.findAll({
        where: conditional
      })
      //console.log(`Found ${bans.length} bans`);
      //for each ban
      for (let i = 0; i < bans.length; i++) {
        const guild = await client.guilds.fetch("629695220065239061");
        guild.bans.remove(bans[i].userId).catch((error) => {
          console.log(error);
        });
        //send message to channel
        const embed2 = new Discord.MessageEmbed().setDescription(
          `<@${bans[i].userId}> has been unbanned`
        );
        channel.send({ embeds: [embed2] });
      }
      //mass update all bans to not current
      await tempbans.update(
        { current: false },
        { where: conditional }
      );
      setTimeout(banchecks, 1000 * 10);
    }
    banchecks();
  },
};
