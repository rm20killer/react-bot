const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../utils/Database/sequelize');
const muteSchema = require('../../utils/Database/Models/mute-schema')(sequelize, DataTypes);

const fetch = require(`node-fetch`);
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");

const muterole = "712512117999271966";

module.exports = {
  async mutechecker(client) {
    const CheckMutes = async () => {
      console.log("Checking Mutes");
      //console.log("checking mute data")
      const now = new Date();
      const conditional = {
        expires: {
          $lt: now,
        },
        current: true,
      };
      //find all mutes that are expired
      const mutes = await muteSchema.findAll({
        where: conditional,
      });
      console.log(mutes)
      setTimeout(CheckMutes, 1000 * 10);
    };
    CheckMutes();
  },
};
