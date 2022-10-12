const CheckName = require("../Scripts/UserJoined/CheckName");
const userjoined = require("../Scripts/UserJoined/UserJoined")

module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        userjoined.userjoined(member, client);
        CheckName.CheckName(member, client);
        return;
    }
}