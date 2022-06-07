const fetch = require(`node-fetch`);
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');

const config = require("../../config");
const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    async ReactionChecker(reaction, user, client) {
        //fetch member from reaction
        if (reaction.message.guild) {
            const member = reaction.message.guild.members.cache.get(user.id);
            //if member is has mod role
            if (member.roles.cache.find(r => r.name === modid) || member.roles.cache.find(r => r.name === adminid) || member.roles.cache.find(r => r.id === helper)) { return }
            //console.log(reaction.emoji.name);
            if (reaction.emoji.name === "🖕" || reaction.emoji.name === "🍆") {
                //remove reaction
                reaction.users.remove(user.id);
            }
            //regex to find all messages with the word "fuck" or "eggplant" or "middlefinger" in them
            const regex = /fuck|eggplant|middlefinger/gi;
            //check if reaction emji name is part of regex
            if (regex.test(reaction.emoji.name)) {
                //remove reaction
                reaction.users.remove(user.id);
            }
        }
    }
}