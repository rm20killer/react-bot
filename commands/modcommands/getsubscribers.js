const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser
/* The code below does the following:
1. Fetch the data from the Youtube API
2. Parse the data from the Youtube API to get the subscriber count
3. Send the subscriber count to the channel
4. Change the name of the channel to include the subscriber count
5. Send a message to the chat to let the user know the command has run
6. Log any errors that occur */
module.exports = {
    name: 'getsubscribers',
    aliases: ["subupdate"],
    description: 'update sub count',
    usage: '`*rename <new name>`',
    example: '`*remove cool ticket`',
    async execute(message, args) {
        fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + youtubeUser + "&key=" + youtubeKey)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data["items"][0].statistics.subscriberCount);
                const sub = data["items"][0].statistics.subscriberCount;
                subr = sub.slice(0, -4);
                subr = (subr / 100).toFixed(2);
                message.reply("sub count: " + subr)
                const channel = client.channels.cache.find(channel => channel.id === "849642482702614528");
                channel.setName("Subscribers: " + subr + " Mil");
                //return(sub)
            })
    }
}
