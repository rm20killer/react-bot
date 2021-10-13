const fetch = require("node-fetch");
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const { GoogleSpreadsheet } = require('google-spreadsheet');

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

const { MessageActionRow, MessageButton } = require('discord.js');


const config = require("../../config");
const creds = require("./googlekey.json");
const doc = new GoogleSpreadsheet(config.spreadsheet);

module.exports.rescount = async function(message,client) {
    await rescount(message,client).catch(error=>console.log(error));
}

var rescount = async function(message,client) {
    var resMsg = await message.channel.send('Getting info. It might take a minute');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    console.log(doc.title+" has been opened");
    const info = await doc.getInfo();
    const sheet = doc.sheetsByIndex[0];
    //console.log(sheet)
    n=sheet.rowCount
    console.log(n)
    await sheet.loadCells('A1:A'+n).then(console.log("loaded cells"))
    n=n-11
    //i=sheet.rowCount
    while(n>1){
        const searcher = sheet.getCell(n, 0).value;
        //console.log(n);
        //console.log(searcher);
        if(searcher!=null){
            const embed = await new Discord.MessageEmbed()
            .setTitle(`Event Signup`)
            .setAuthor('React Bot', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0x00FF00)
            .setDescription('Number of people: ' + n)
            message.channel.send({ embeds: [embed] });
            resMsg.delete();
            return;
        }
        else{
            n=n-1;
        }
    }
}