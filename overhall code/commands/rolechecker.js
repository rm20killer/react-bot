
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports={
    rolecheck: function(oldMember,newMember,client){
        console.log("role checking - " + newMember.id)
        const hadRole = oldMember.roles.cache.find(role => role.name === 'Server Booster');//Server Booster
        const hasRole = newMember.roles.cache.find(role => role.name === 'Server Booster');//Server Booster
        
        const shadRole = oldMember.roles.cache.find(role => role.name === 'Streamers');//Streamers
        const shasRole = newMember.roles.cache.find(role => role.name === 'Streamers');//Streamers
    
        const boostemote = client.emojis.cache.get(`832556719770566657`);
        //streamers
        if (!shadRole && shasRole){
            newMember.guild.channels.cache.get("841018811657355354").send("<@"+newMember.id+ "> has got into a gamer react video");
            return;
        }
        //Server Booster
        if (!hadRole && hasRole) {
            newMember.guild.channels.cache.get("788078716546318418").send(`${boostemote} ` + newMember.displayName+ " boosted the server");
            newMember.roles.add('830069139770441728');
            return;
        }
        //does nothing if mod
        if (newMember.roles.cache.find(role => role.id === '696134129497931857')||newMember.roles.cache.find(role => role.id === '830118190541176904')||newMember.roles.cache.find(role => role.id === '821059585606942750')) {
            return;
        }
        //dj remove when not boosting
        if (hadRole && !hasRole) {
            //console.log("removing DJ")
            newMember.roles.remove('830069139770441728');
        }
    }
}