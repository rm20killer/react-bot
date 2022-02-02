
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

const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
module.exports = {
    selectmenu: async function(interaction,client){   
        let res = "an error happened."
        let rule1="**1. Be Kind/Respectful to others.** \n> Don't be rude to other Users. You can make jokes but there is a fine line between banter and being mean. Don't be offensive towards someone's race, sexuality and gender…ect. treat them like people. Any homophobic/racist/sexist behavior will not be tolerated in this server." 
        let rule2="**2. No Nonsense.** \n> Do not Spam, Swear, Flood channels with stuff such as long Copy pasted messages. Don't ping Riz if you require any sort of assistance feel free to open up a ticket in <#858354762855874560> or you may ping <@&696134129497931857> for any issue happening in the server!" 
        let rule3="**3. This is a PG-13 Server.** \n> Considering this is a PG-13 Server do not post porn, gore, NSFW, explicit content, child abuse, animal abuse, gambling of any sort or scams. Make sure to keep any Controversial topics to a minimum or not at all, you may use DM's for that." 
        let rule4="**4. Assistance from the Staff team** \n> If you have any Question or need support of any kind feel free to open up a ticket through <#858354762855874560>, make sure to read the rules before doing so. Any tickets created without a reason will most likely result in a <@&865548571327070268> . If you have been featured in a Gamers React video then create a `General Support` with Timestamp and Link to the video to acquire the <@&696133979748958309> role! The <@&696133979748958309> role also gives you access to special channels." 
        let rule5="**5. Submit clips to get a chance to be in the next Gamers React video!** \n>>> You may submit any clips you have in our website: https://gamersreact.com/ \n-All of the Clip submissions are gone through, so don't think you were left out or your clip got lost in other messages.*"
        let rule6="**6. A few basic rules to look out for** \n> Speak ONLY in English, use the correct channels for the correct chats, remember that me or the Staff have the final say you may justify yourself by opening a ticket through <#858354762855874560> if you think you were punishment wasn't fair."
        if (interaction.customId === 'Rules') {
            if(interaction.values[0]==="DM_rule") {
                let dontlog = "3ADB63D1"
                res = dontlog +"\n\n" + rule1 +"\n"+ rule2 +"\n"+ rule3 +"\n"+ rule4
                let res2 = dontlog +"\n\n" + rule5 +"\n\n"+ rule6
                interaction.user.send({ content: res, components: [] }).catch(error => {console.log(error)});
                interaction.user.send({ content: res2, components: [] }).catch(error => {console.log(error)});
                return
            }
            if(interaction.values[0]==="rule_1") {
                res=rule1
            }
            if(interaction.values[0]==="rule_2") {
                res=rule2
            }
            if(interaction.values[0]==="rule_3") {
                res=rule3
            }
            if(interaction.values[0]==="rule_4") {
                res=rule4
            }
            if(interaction.values[0]==="rule_5") {
                res=rule5
            }
            if(interaction.values[0]==="rule_6") {
                res=rule6
            }
            await interaction.deferUpdate();
            await interaction.editReply({ content: res, components: [] });
            await wait(4000);
            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('Rules')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'DM all rules',
                            description: 'I will dm you all the rules',
                            value: 'DM_rule',
                        },
                        {
                            label: 'Rule 1',
                            description: 'Be Kind/Respectful to others.',
                            value: 'rule_1',
                        },
                        {
                            label: 'Rule 2',
                            description: 'No Nonsense',
                            value: 'rule_2',
                        },
                        {
                            label: 'Rule 3',
                            description: 'This is a PG-13 Server.',
                            value: 'rule_3',
                        },
                        {
                            label: 'Rule 4',
                            description: 'Assistance from the Staff team',
                            value: 'rule_4',
                        },
                        {
                            label: 'Rule 5',
                            description: 'Submit clips to get a chance to be in the next Gamers React video!',
                            value: 'rule_5',
                        },
                        {
                            label: 'Rule 6',
                            description: 'A few basic rules to look out for',
                            value: 'rule_6',
                        },
                    ]),
            );
            await interaction.editReply({ content: 'To find out more information about a rule select the rule in the menu below!', components: [row] });
        }
    }
}
