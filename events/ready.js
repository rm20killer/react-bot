const mutecheck = require('../AutoMod/OnTimer/mutecheck.js');
const bancheck = require('../AutoMod/OnTimer/bancheck.js');

module.exports = {
  name: "ready",
  execute(client) {
    console.log(`Logged In as ${client.user.tag}`);
    mutecheck.mutechecker(client);
    bancheck.backcheck(client);
  },
};
