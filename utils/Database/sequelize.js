const { Sequelize } = require("sequelize");
const { Postgresql_SRV } = require("../../config");
const config = require("../../config");

module.exports = new Sequelize(
  config.Database,
  config.Username,
  config.Password,
  {
    host: config.Hostname,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: true,
      native: true,
    },
  }
);

// module.exports = new Sequelize(Postgresql_SRV, {
//     logging: false,
//     dialectOptions: {
//         ssl: true,
//         native:true
//     }
// });
