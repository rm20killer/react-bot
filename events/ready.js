const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/Database/sequelize');
const WarnSchema = require('../utils/Database/Models/warn-schema')(sequelize, DataTypes);
module.exports = {
  name: "ready",
  async execute(client) {
    //await sequelize;
    console.log(`Logged In as ${client.user.tag}`);
    WarnSchema.sync();

  },
};
