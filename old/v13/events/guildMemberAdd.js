const CheckName = require("../AutoMod/userJoined/CheckName");
const userjoined = require("../AutoMod/UserJoined")

module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        userjoined.userjoined(member, client);
        CheckName.CheckName(member, client);
        return;
    }
}