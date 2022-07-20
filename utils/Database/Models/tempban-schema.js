const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("tempban", {
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    current: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    bans: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  });
};
