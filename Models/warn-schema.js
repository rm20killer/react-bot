const mongoose = require("mongoose");

const WarnSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  warnings: {
    type: [Object],
    require: true,
  },
});

module.exports = mongoose.model("warnings", WarnSchema);
