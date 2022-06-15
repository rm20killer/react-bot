const mongoose = require("mongoose");

const kicksSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  kicks: {
    type: [Object],
    require: true,
  },
});

module.exports = mongoose.model("kicks", kicksSchema);
