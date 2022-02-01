const fetch = require("node-fetch");
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');
//const { uniqueNamesGenerator, adjectives, colors, names } = require('unique-names-generator');

let psl = require('psl');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("../config");

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports ={
    masscheck: function(message,client,args){
        let checkerAgaianst = ""
        if(args[1]){
            checkerAgaianst = args[1].split(' ').join('') 
            console.log(checkerAgaianst)
        }
        else{
            checkerAgaianst="beluga"
            message.reply("no name to check")
            //return;
        }
        const list = client.guilds.cache.get("629695220065239061"); 
        let n=0
        
        list.members.cache.forEach(member => {
            if(member.user.username != undefined){
                //console.log(member)
                //console.log(checkerAgaianst)
                if(member.nickanme === null){
                    username=member.user.username.toLowerCase()
                    if(username.includes(checkerAgaianst)){
                        //console.log(member)
                        const shortName = uniqueNamesGenerator({
                            dictionaries: [adjectives, names],
                            length: 2
                          }); 
                        randomnum=Math.floor(Math.random() * 100) + 1;
                        const newname=shortName+randomnum
                        //console.log(newname);
                        n=n+1
                        //member.setNickname(newname)
                    }
                }
                else{
                    if(member.nickanme){
                        let Usernickaname=member.nickanme.toLowerCase();
                        if(Usernickaname.includes(checkerAgaianst)){
                            console.log(message.member.displayName)
                            const shortName = uniqueNamesGenerator({
                                dictionaries: [adjectives, names],
                                length: 2
                              }); 
                            randomnum=Math.floor(Math.random() * 100) + 1;
                            const newname=shortName+randomnum
                            //console.log(newname);
                            n=n+1
                            //member.setNickname(newname)
                        }
                    }
                }
            }
        });
        message.reply(n+" users have been checked name")
    }
}