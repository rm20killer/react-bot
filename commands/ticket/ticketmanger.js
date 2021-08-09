
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
    ticketmanger: async function(interaction,client){   
        let member = interaction.user
        //console.log(member)
        let limit = 0
        const id = interaction.customId;
        let mess = await member.send(`Creating a ${id} ticket`);
        interaction.guild.channels.cache.forEach(c => {
            //console.log("interaction got")
            if (c.parentID === "858354610367627284") { 
                console.log(c)
                if (c.topic === member.id) {
                    limit++
                    console.log(limit + c.topic);
                }
            }
        })
        
        if (limit === 1) {
            //mess.delete();
            return member.send(member.tag+' , You have reached the maximum amount of tickets opened');
        } 
        else {
            createChannel(id,interaction,member);
            //mess.delete();
        }
    }
}


async function createChannel(id,interaction,member) {
    if (id==="Player"){ //user report
        var format='```diff\n- Discord ID:\n- Issue:```'
    }
    if (id==="BanAppeal"){ //mute Appeal
        var format='```diff\n- Mute Reason:\n- Appeal:```'
    }
    if (id==="General"){ //General
        var format='```diff\n- Question:```'
    }
    interaction.guild.channels.create(`ticket-${member.username}`, 'text').then(async c => {
        await c.setTopic(member.id)
        await c.setParent("858354610367627284")

        await c.permissionOverwrites.edit("629695220065239061", {
            VIEW_CHANNEL: false
        })
        await c.permissionOverwrites.edit(member.id, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })
        await c.permissionOverwrites.edit("696134129497931857", {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })
        //await c.send(`<@&696134129497931857>`).then(msg => msg.delete())

        const embed = new Discord.MessageEmbed()
            .setDescription('Thank you for creating a ticket! Our support team will be with you shortly.')
            .addField('Format', `${format}`, true)
            .addField('Topic', `${id}`, true)
            .setTimestamp()
            .setColor(0xff0000);

        //c.send(`<@${member.id}>`);
        c.send({ embeds: [embed] });
    })
}