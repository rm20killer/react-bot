const Discord = require("discord.js");

module.exports = {
  name: "messageUpdate",
  async execute(client, oldMessage, newMessage) {
    // Old message may be undefined
    if (!oldMessage.author) return;
    if (oldMessage.channel.id === "886864421140447232") {
      const messa = newMessage.content.toLowerCase();
      if (messa.startsWith("thred")) {
      } else {
        //newMessage.delete().catch(error => {console.log(error)});
        if (
          newMessage.member.roles.cache.find(
            (r) => r.name === client.config.ModID
          ) ||
          newMessage.member.roles.cache.find(
            (r) => r.name === client.config.AdminID
          )
        ) {
        } else {
          newMessage.delete().catch((error) => {
            console.log(error);
          });
        }
      }
    }
  },
};
