const HypixelAPIReborn = require("hypixel-api-reborn");
const config = require("../config");

const hypixel = new HypixelAPIReborn.Client(config.hypixelAPI, { cache: true });
const errors = HypixelAPIReborn.Errors;

module.exports.hypixel = hypixel;
module.exports.errors = errors;
