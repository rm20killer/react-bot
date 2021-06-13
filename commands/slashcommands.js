
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports ={
    slashcom: function(interaction,client){
        //slash commands in module not working

    }
}

async function createAPImessage(interaction,content){
    const apimessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id),content) 
        .resolveData()
        .resolveFiles();

    return  {...apimessage.data, files: apimessage.files};
}