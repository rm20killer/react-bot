const mongoose = require("mongoose");

const muteSChema = mongoose.Schema(
  {
    guildId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      require: true,
    },
    current: {
      type: Boolean,
      require: true,
    },
    mutes: {
      type: [Object],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mute", muteSChema);
