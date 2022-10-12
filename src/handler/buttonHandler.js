const fs = require("fs");

module.exports = (client) => {
  const buttons = fs
    .readdirSync("./src/interaction/Buttons/")
    .filter((i) => i.split(".").pop() === "js");
  if (buttons.length <= 0) return console.log("No buttons Found");

  buttons.forEach((file) => {
    var button = require(`../interaction/Buttons/${file}`);

    client.button.set(button.customId, button);
  });
  console.log(`Loaded ${buttons.length} button events`);
};
