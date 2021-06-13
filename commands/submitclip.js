
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports ={
    submitclip: function(messa,message,client){
        const regex = /(how|where|want).+(submit|post|share|send).+(clip|video)/i;
        const str = messa;
        let m;
        if ((m = regex.exec(str)) !== null) {
                // The result can be accessed through the `m`-variable.
		    if (message.channel.id === "696131644871933972" ){
			    message.reply("Simply post your link or file here. Make sure clips meet `/requirements`"); //If the question was in #submit-clips say this
                return;
		    }
            else{
                message.reply("Submit clips in <#696131644871933972>. Make sure clips meet `/requirements`"); //Otherwise say this
                return;
            }
        }
    }
}