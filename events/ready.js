const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../utils/Database/sequelize");
const WarnSchema = require("../utils/Database/Models/warn-schema")(
  sequelize,
  DataTypes
);
const MuteSchema = require("../utils/Database/Models/mute-schema")(
  sequelize,
  DataTypes
);

const mutechecker = require("../AutoMod/OnTimer/mutecheck");
const bancheck = require("../AutoMod/OnTimer/bancheck");
module.exports = {
  name: "ready",
  async execute(client) {
    //await sequelize;
    console.log(`Logged In as ${client.user.tag}`);
    WarnSchema.sync();
    MuteSchema.sync();
    mutechecker.mutechecker(client);
    bancheck.bancheck(client);
  },
};
