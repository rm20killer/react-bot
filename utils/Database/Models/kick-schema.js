const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("kicks", {
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kicks: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  });
};
