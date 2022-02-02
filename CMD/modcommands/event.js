const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
module.exports = {
    name: 'similarity',
    aliases: [ "similarity" ],
    description: 'similarity',
    usage: '`*similarity <link1> <link2>`',
    example: '`*dm @rm20#2000 Hi`',
    async execute(message, args) {
        if (message.member.roles.cache.find(r=>r.name === modid)||message.member.roles.cache.find(r=>r.name === adminid)||message.member.roles.cache.find(r=>r.id === helper)){
            // CODE GOES HERE 🡫 
            if(args[0]===null){
                return
            }

            if(args[0]==="1"){
                const creeperEmote = client.emojis.cache.get(`859806815332204555`);
                const embed = new Discord.MessageEmbed()
                .setTitle('Events Notifications')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xFF0000)
                .setDescription(`Want to get a notifcation when we do an event,\n\n React with the ${creeperEmote} emote`)
                message.channel.send({ embeds: [embed] });
            }
            if(args[0]==="2"){
                const embed = new Discord.MessageEmbed()
                .setTitle('Giveaway Notifications')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xFF0000)
                .setDescription(`Want to get a notifcation when we do an Giveaway,\n\n React with the 🎁 emote`)
                message.channel.send({ embeds: [embed] });
            }
        }
       else{
           message.reply("You lack perms for this command")
       }
    }
}