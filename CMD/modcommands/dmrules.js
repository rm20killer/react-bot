const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper
module.exports = {
    name: 'dmrules',
    aliases: ["dmrules"],
    description: 'dmrules',
    usage: '`*dmrules <@user>`',
    example: '`*dmrules @rm20#2000`',
    async execute(message, args) {
        if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
            // CODE GOES HERE 🡫 
            let res = "an error happened."
            let rule1 = "**1. Be Kind/Respectful to others.** \n> Don't be rude to other Users. You can make jokes but there is a fine line between banter and being mean. Don't be offensive towards someone's race, sexuality and gender…ect. treat them like people. Any homophobic/racist/sexist behavior will not be tolerated in this server."
            let rule2 = "**2. No Nonsense.** \n> Do not Spam, Swear, Flood channels with stuff such as long Copy pasted messages. Don't ping Riz if you require any sort of assistance feel free to open up a ticket in <#858354762855874560> or you may ping <@&696134129497931857> for any issue happening in the server!"
            let rule3 = "**3. This is a PG-13 Server.** \n> Considering this is a PG-13 Server do not post porn, gore, NSFW, explicit content, child abuse, animal abuse, gambling of any sort or scams. Make sure to keep any Controversial topics to a minimum or not at all, you may use DM's for that."
            let rule4 = "**4. Assistance from the Staff team** \n> If you have any Question or need support of any kind feel free to open up a ticket through <#858354762855874560>, make sure to read the rules before doing so. Any tickets created without a reason will most likely result in a <@&865548571327070268> . If you have been featured in a Gamers React video then create a `General Support` with Timestamp and Link to the video to acquire the <@&696133979748958309> role! The <@&696133979748958309> role also gives you access to special channels."
            let rule5 = "**5. Submit clips to get a chance to be in the next Gamers React video!** \n>>> You may submit any clips you have in our website: https://gamersreact.com/ \n-All of the Clip submissions are gone through, so don't think you were left out or your clip got lost in other messages.*"
            let rule6 = "**6. A few basic rules to look out for** \n> Speak ONLY in English, use the correct channels for the correct chats, remember that me or the Staff have the final say you may justify yourself by opening a ticket through <#858354762855874560> if you think you were punishment wasn't fair."

            const mention = message.mentions.users.first();
            if (!mention) {
                message.reply("no mention")
                return;
            }
            else {
                //console.log(mention)
                const user = client.users.cache.get(mention.id);
                //console.log(mess);
                let dontlog = "3ADB63D1"
                res = dontlog + "\n\n" + rule1 + "\n" + rule2 + "\n" + rule3 + "\n" + rule4
                let res2 = dontlog + "\n\n" + rule5 + "\n\n" + rule6
                user.send({ content: res, components: [] }).catch(error => { console.log(error) });
                user.send({ content: res2, components: [] }).catch(error => { console.log(error) });
                message.reply("rules sent")
                return
            }
        }
        else {
            message.reply("You lack perms for this command")
        }
    }
}