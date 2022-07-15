const mutecheck = require('../automod/ontimer/mutecheck.js');
const bancheck = require('../automod/ontimer/bancheck.js');

module.exports = {
  name: "ready",
  execute(client) {
    console.log(`Logged In as ${client.user.tag}`);
    mutecheck.mutechecker(client);
    bancheck.backcheck(client);
  },
};
