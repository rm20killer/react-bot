const mongoose = require("mongoose");
const config = require("../config");

module.exports = async () => {
  await mongoose
    .connect(config.Mongoose_SRV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.log(error);
    });
  return mongoose;
};
