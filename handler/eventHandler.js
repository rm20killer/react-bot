const fs = require("fs");

module.exports = (client) => {
  const events = fs
    .readdirSync("./src/events/")
    .filter((i) => i.split(".").pop() === "js");
  if (events.length <= 0) return console.log("No EVENTS Found");

  events.forEach((i) => {
    var event = require(`../events/${i}`);

    client.on(event.name, (...args) => event.execute(client, ...args));
  });
  console.log(`Loaded ${events.length} events`);
};
