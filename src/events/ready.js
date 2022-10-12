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
const TempBanSchema = require("../utils/Database/Models/tempban-schema")(
  sequelize,
  DataTypes
);
const KickSchema = require("../utils/Database/Models/kick-schema")(
  sequelize,
  DataTypes
);

// const qotd = require("../../old/v13/AutoMod/OnTimer/qotd")
// const mutechecker = require("../../old/v13/AutoMod/OnTimer/mutecheck");
// const bancheck = require("../../old/v13/AutoMod/OnTimer/bancheck");
module.exports = {
  name: "ready",
  async execute(client) {
    //await sequelize;
    console.log(`Logged In as ${client.user.tag}`);
    // schema sync
    try {
      WarnSchema.sync();
      MuteSchema.sync();
      TempBanSchema.sync();
      KickSchema.sync();
    } finally {
      console.log("Schema synced");
    }
    // //start up timers
    // //qotd.uploadQOTD(client);
    // mutechecker.mutechecker(client);
    // bancheck.bancheck(client);

    // console.log("Timers Started");
  },
};


