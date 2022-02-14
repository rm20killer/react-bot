const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
module.exports = {
    name: 'dm',
    aliases: ["dm"],
    description: 'dm a user',
    usage: '`*dm <@user> <message>`',
    example: '`*dm @rm20#2000 Hi`',
    async execute(message, args, client) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            // CODE GOES HERE 🡫 
            var str = message.content
            const mess = str.split(/>(.+)/)[1]

            let target = message.mentions.members.first();
            if (!target) {
                let id = args[0]
                try {
                    target = await message.guild.members.fetch(id);
                } catch {
                    return message.reply(`I can't find that member`);
                }
            }

            if (!target) { return message.reply(`I can't find that member`) }
            await target.send(mess).catch(error => { return message.reply(`Could not dm ${target.user.tag}`) });
            //message.reply(`DMed user`)

        }
        else {
            message.reply("You lack perms for this command")
        }
    }
}