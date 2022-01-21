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

module.exports = {
    CreateVoiceChat: function(message,client,args){ 
        let num=parseInt(args[1])
        if(args[2]){
            let max=parseInt(args[2])
            if(num){
                for (var x = 1; x <= num; x++) {
                    createChannel(x,message,max)
                }
            }
        }
        else{
            if(num){
                for (var x = 1; x <= num; x++) {
                    createChannel(x,message)
                }
            }
        }
        message.reply(num + "   channels created")

    },
    deleteVoiceChat: function(message,client,args){ 
        message.guild.channels.cache.forEach(c => {
            //console.log("interaction got")
            try
            {
                var channelParent = c.parent.id
            }
            catch{
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
}

async function createChannel (x,message){
    message.guild.channels.create(`7663 party-${x}`,{
        type:"GUILD_VOICE",
        bitrate: 8000
    }).then(async c => {
        let parent = "934125042348986368"
        await c.setParent(parent)
        //await c.setTopic("53747265616d65722047616d6573")
    })
}

async function createChannel (x,message,max){
    message.guild.channels.create(`7663 party-${x}`,{
        type:"GUILD_VOICE",
        bitrate: 8000,
        userLimit: max
    }).then(async c => {
        let parent = "934125042348986368"
        await c.setParent(parent)
        //await c.setTopic("53747265616d65722047616d6573")
    })
}


