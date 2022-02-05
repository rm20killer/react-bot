/*
  __  __           _         
 |  \/  |         | |    _   
 | \  / | ___   __| |  _| |_ 
 | |\/| |/ _ \ / _` | |_   _|
 | |  | | (_) | (_| |   |_|  
 |_|  |_|\___/ \__,_|                          
*/
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});
const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
module.exports = {
    name: 'deletevoicechat',
    aliases: ["deletevc"],
    description: 'will create voice chats',
    usage: '`*deletevoicechat`',
    example: '`*deletevoicechat`',
    async execute(message, args) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            // CODE GOES HERE 🡫 
            message.guild.channels.cache.forEach(c => {
                //console.log("interaction got")
                try {
                    var channelParent = c.parent.id
                }
                catch {
                    var channelParent = 1
                }

                if (channelParent === "934125042348986368") {
                    if (c.name.startsWith("7663 party-")) {
                        c.delete();
                    }
                }
            })
            message.reply("channels deleted")
        }
        else {
            message.reply("You lack perms for this command")
        }
    }
}


