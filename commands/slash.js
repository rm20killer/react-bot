const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports ={
    slashfun: function(client){
    //had to move back was not working here for some reason
        //if you have commands to add tell me
        client.api.applications(client.user.id).commands.post({
            data: {
                name: "madeby",
                description: "find out who made me",
            } 
        });
        client.api.applications(client.user.id).commands.post({
            data: {
                name: "requirements",
                description: "get clips requirements"
            } 
        });
        
        client.api.applications(client.user.id).guilds('629695220065239061').commands.post({
            data:{
                name: "compress",
                description: "if your clip is too big for discord use this", 
            }
        });
    }
}

async function createAPImessage(interaction,content){
    const apimessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id),content) 
        .resolveData()
        .resolveFiles();

    return  {...apimessage.data, files: apimessage.files};
}