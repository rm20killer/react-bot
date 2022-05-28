const config = require(`../config`);

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

const commands= ["ban","mute","kick","tempmute","warn"]
module.exports = {
    mee6: async function (client,message) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            const args = message.content.slice(1).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            //if command name is not in commands array
            for (let i = 0; i < commands.length; i++) {
                if (commandName === commands[i]) {
                    message.author.send(`Reminder: Use react bot (*) for moderation commands`)
                    return
                }
            }
            return

        }
    }
}
