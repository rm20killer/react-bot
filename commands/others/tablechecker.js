
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


module.exports ={
    table: async function(client,message){
        channel = client.channels.cache.find(channel => channel.id === "892816609712930836");
        ctopic=channel.topic
        if(message.content==="(╯°□°）╯︵ ┻━┻"){
            let n = parseFloat(ctopic, 10)
            n=n+1
            await channel.setTopic(n).catch(console.error);
        }
        else if (message.content==="┬─┬ ノ( ゜-゜ノ)"){
            let n = parseFloat(ctopic, 10)
            n=n-1
            await channel.setTopic(n).catch(console.error);
        }
        else{return}
    }
}