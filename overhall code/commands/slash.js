
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports ={
    slashfun: function(client){
        console.log(client.api.applications(client.user.id).commands.get())
        console.log(client.api.applications(client.user.id).guilds(`629695220065239061`).commands.get())
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
    
    
        client.ws.on('INTERACTION_CREATE', async interaction => {
            const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;
    
            if (command === 'madeby'){ 
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "This was made by RM20 with the help from RootAtKali, source code can be found at https://github.com/rm20killer/react-bot"
                        }
                    }
                })
            }
            if (command === 'compress'){ 
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: "To compress size so you send on discord you can use: https://8mb.video/ \n **You must** enable the `Extra quality (slower)` option.\nYour video cannot be longer than 40 seconds to meet requirements.\nUse the trim options to accomplish this."
                        }
                    }
                })
            }
            if (command === 'requirements'){
                const embed = new Discord.MessageEmbed()
                .setTitle('Requirements')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 kbps (x264 medium)\n> Audio bitrate: At least 150 kbps (AAC-LC)\n> Must embed on discord\n> Must be under 2 minutes. No timestamps!\nDeliberately scaling or padding a video to fool me\ndoes **not** pass the requirements.')
    
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPImessage(interaction, embed)
                    }
                })
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