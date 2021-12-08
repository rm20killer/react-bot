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
//const doc = new GoogleSpreadsheet(config.spreadsheet);
const doc = new GoogleSpreadsheet("1keR2ubqTVfkrkEuDTSAa5fbZm_U08gTNfE-75bUcVX4")
module.exports.ssdmuser = async function(message,client,args) {
    await ssdmuser(message,client,args).catch(error=>console.log(error));
}

var ssdmuser = async function(message,client,args) {
    let failed = 0;
    let SUCCESS = 0;
    var resMsg = await message.channel.send('Getting info. It might take a minute');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    console.log(doc.title+" has been opened");
    const info = await doc.getInfo();
    const sheet = doc.sheetsByIndex[0];
    n=48
    console.log(n)
    await sheet.loadCells('A1:D'+n).then(console.log("loaded cells"))
    n=47
    while(n>1){
        const discordID = sheet.getCell(n, 2).value;
        //console.log(n);
        //console.log(searcher);
        if(discordID!=null){
            const User = client.users.cache.get(discordID); // Getting the user by ID.
            if (User!=undefined) { // Checking if the user exists.
                User.send("pls fill out this form https://forms.gle/1ANFCWsLUhNxHBfA9")
                .catch(console.error);
                SUCCESS=SUCCESS+1
            } 
            else {
                failed=failed+1
                console.log(n)
            };
        }
        else{
            failed=failed+1
            console.log(n)
        }
        n=n-1
    }
    message.reply("success: "+ SUCCESS +"\nFailed: "+ failed)
}