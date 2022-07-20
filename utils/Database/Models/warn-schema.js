const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("warnings", {
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    warnings: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  });
};
