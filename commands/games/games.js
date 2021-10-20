const fetch = require("node-fetch");
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

const defaultApplications = {
    youtube: '880218394199220334', // Note : First package to include the new YouTube Together version, any other package offering it will be clearly inspired by it
    youtubedev: '880218832743055411', // Note : First package to include the new YouTube Together development version, any other package offering it will be clearly inspired by it
    //poker: '755827207812677713',
    betrayal: '773336526917861400',
    fishing: '814288819477020702',
    chess: '832012774040141894', // Note : First package to offer chess, any other package offering it will be clearly inspired by it
    chessdev: '832012586023256104', // Note : First package to offer chessDev, any other package offering it will be clearly inspired by it
    lettertile: '879863686565621790',
    wordsnack: '879863976006127627',
    doodlecrew: '878067389634314250',
    SpellCast: '852509694341283871',
};

module.exports = {
    games: function(args,message,client){
        let setgame = args[1]
        let applicationID = ""
            if(setgame==="youtube"){
                applicationID = "755600276941176913"
            }
            else if(setgame==="youtubedev"){
                applicationID = "youtubedev"
            }
            else if(setgame==="poker"){
                return message.channel.send({ content: "poker is disabled" } );
                applicationID = "755827207812677713"
            }
            else if(setgame==="betrayal"){
                applicationID = "773336526917861400"
            }
            else if(setgame==="fishing"){
                applicationID = "814288819477020702"
            }
            else if(setgame==="chess"){
                applicationID = "832012774040141894"
            }
            else if(setgame==="lettertile"){
                applicationID = "879863686565621790"
            }
            else if(setgame==="wordsnack"){
                applicationID = "879863976006127627"
            }
            else if(setgame==="doodlecrew"){
                applicationID = "878067389634314250"
            }
            else if (setgame==="spellcast"){
                applicationID= "852509694341283871"
            }
            else{
                return message.channel.send({ content: "no game selected, games include: `youtube`,`betrayal`,`fishing`,`lettertile`,`wordsnack`,`doodlecrew`, `Spellcast` and `chess`" } );
            }
        let channel = message.member.voice.channel;
        if(!channel) return message.channel.send({ content: "You have to be connected in a voice call to use that!" } );

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
            
            
                target_application_id: applicationID,
                target_type: 2,
                temporary: false,
            
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }

        }).then(res => res.json())
        .then(body => {
           return message.channel.send(`https://discord.gg/${body.code} (Click The Link To Setup!)`);
        }).catch(err =>{console.log(err)})
    }

}