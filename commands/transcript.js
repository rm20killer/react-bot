const Discord = require('discord.js')
const { Client, Intents, MessageAttachment } = require('discord.js');
const { generateTranscript } = require('reconlx')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    transcript: function(message,client,args){ 
        if(args[1]){
        }
        else{
            message.channel.messages.fetch({ limit: 100,before: message.id }).then(msgs=> {
                generateTranscript({guild: message.guild, channel: message.channel, messages: msgs})
                .then(data => {
                    const file = new MessageAttachment(data, `${message.channel.name}.html`);
                    message.channel.send({content: "file: ", files: [file]});
                });
            })
        }
    }
}

async function fetchMore(channel, limit = 250) {
    if (!channel) {
      throw new Error(`Expected channel, got ${typeof channel}.`);
    }
    if (limit <= 100) {
      return channel.messages.fetch({
        limit
      });
    }

    let collection = new Discord.Collection();
    let lastId = null;
    let options = {};
    let remaining = limit;

    while (remaining > 0) {
      options.limit = remaining > 100 ? 100 : remaining;
      remaining = remaining > 100 ? remaining - 100 : 0;

      if (lastId) {
        options.before = lastId;
      }

      let messages = await channel.messages.fetch(options);

      if (!messages.last()) {
        break;
      }

      collection = collection.concat(messages);
      lastId = messages.last().id;
    }
    
    return collection;
  }