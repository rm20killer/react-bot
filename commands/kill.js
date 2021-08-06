
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const index = require('../index');

module.exports = {
    kill: function(message,client){
        //kill command ONLY TO BE USED BY HOST (RM)
        let filter = m => m.author.id === message.author.id
        message.channel.send(`Are you sure you want to kill? \`YES\` / \`NO\``).then(() => {
            message.channel.awaitMessages(filter, {
            max: 1,
            time: 5000,
            errors: ['time']
            })
            .then(message => {
            message = message.first()
            if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                message.channel.send(`shutting down`);
                index.killclient(client)
                console.log("kill command")
                } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
                    message.channel.send(`Terminated`)
                } else {
                    message.channel.send(`Terminated: Invalid Response`)
                }
            })
            .catch(collected => {
                message.channel.send('Timeout');
            });
        })
    }
}