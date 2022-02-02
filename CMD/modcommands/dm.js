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
    aliases: [ "dm" ],
    description: 'dm',
    usage: '`*dm <@user> <message>`',
    example: '`*dm @rm20#2000 Hi`',
    async execute(message, args,client) {
        if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){
            // CODE GOES HERE 🡫 
            var str = message.content
            const mess = str.split(/>(.+)/)[1]
            const mention = message.mentions.users.first();
            if (!mention){
                message.reply("no mention")
                return;
            }
            else{
                //console.log(mention)
                client.users.fetch(mention.id, false).then((user) => {
                    user.send(mess);
                }).catch(console.error);
            }
        }
       else{
           message.reply("You lack perms for this command")
       }
    }
}