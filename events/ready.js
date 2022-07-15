const mutecheck = require('../automod/OnTimer/mutecheck.js');
const bancheck = require('../automod/OnTimer/bancheck.js');

module.exports = {
  name: "ready",
  execute(client) {
    console.log(`Logged In as ${client.user.tag}`);
    mutecheck.mutechecker(client);
    bancheck.backcheck(client);
  },
};
