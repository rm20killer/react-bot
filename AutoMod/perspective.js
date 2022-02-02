/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* Example usage of some features of the Perspective API */
const {google} = require('googleapis');
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');

const config = require('../config')

// Some supported attributes
// attributes = ["TOXICITY", "SEVERE_TOXICITY", "IDENTITY_ATTACK", "INSULT",
// "PROFANITY", "THREAT", "SEXUALLY_EXPLICIT", "FLIRTATION", "SPAM",
// "ATTACK_ON_AUTHOR", "ATTACK_ON_COMMENTER", "INCOHERENT",
// "INFLAMMATORY", "OBSCENE", "SPAM", "UNSUBSTANTIAL"];

// Set your own thresholds for when to trigger a response
const attributeThresholds = {
  'INSULT': 0.75,
  'TOXICITY': 0.75,
  'SPAM': 0.75,
  'INCOHERENT': 0.75,
  'FLIRTATION': 0.75,
};

/**
 * Analyze attributes in a block of text
 * @param {string} text - text to analyze
 * @return {json} res - analyzed atttributes
 */
async function analyzeText(text,message,client) {
    if(!text){return}
    if(message.author.bot){return}

    channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
    channel2 = client.channels.cache.find(channel => channel.id === "892816609712930836");

    let time = message.createdTimestamp
    var date = new Date(time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    const embed = new Discord.MessageEmbed()
    .setTitle('AUTO MOD: Message deleted')
    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
    .setColor(0xFF0000)
    .setDescription(message.content)
    .addField('person id', message.author.id)
    .addField("person name ", message.author.tag)
    .setFooter("today at "+formattedTime)

    let toxicity = 0;
    let insult = 0;
    API_KEY = config.googlekey;
    DISCOVERY_URL =
        'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

    google.discoverAPI(DISCOVERY_URL)
        .then(clients => {
          const analyzeRequest = {
            comment: {
              text: text,
            },
            languages: ["en"],
            requestedAttributes: {
              TOXICITY: {},
              INSULT:{},
              SPAM:{}
            },
          };

          clients.comments.analyze(
              {
                key: API_KEY,
                resource: analyzeRequest,
              },
              (err, response) => {
                if (err) throw err;
                //console.log(JSON.stringify(response.data, null, 2));
                toxicity = response.data.attributeScores.TOXICITY.summaryScore.value
                insult = response.data.attributeScores.INSULT.summaryScore.value
                spam = response.data.attributeScores.SPAM.summaryScore.value
                //console.log(toxicity + " " + insult)
                if (toxicity>0.95){
                    message.channel.send("<@"+message.author.id+"> your message was delete for toxicity");
                    message.delete().catch(error => {console.log(error)});
                    embed.addField("toxicity:", toxicity.toString());
                    channel.send({
                        content: "<@"+message.author.id+">",
                        embeds: [embed] });
                }
                else if (toxicity>0.75){
                    const embed2 = new Discord.MessageEmbed()
                    .setTitle('Message detection')
                    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                    .setColor(0xff0000)
                    .setDescription(message.author.tag + " | " +message.author.id )
                    .addField('Message', message.content)
                    .addField("toxicity:", toxicity.toString())
                    .setURL(message.url)
                    .setFooter("today at "+formattedTime)
                    channel2.send({ embeds: [embed2]}).catch(error => {console.log(error)});
                    message.react('🚩').catch(error => {console.log(error)});
                }
                else if (insult>0.95){
                    message.channel.send("<@"+message.author.id+"> your message was delete for toxicity");
                    message.delete().catch(error => {console.log(error)});
                    embed.addField("insult:", insult.toString())
                    channel.send({
                        content: "<@"+message.author.id+">",
                        embeds: [embed] });
                }
                else if (insult>0.75){
                    const embed2 = new Discord.MessageEmbed()
                    .setTitle('Message detection')
                    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                    .setColor(0xff0000)
                    .setDescription(message.author.tag + " | " +message.author.id )
                    .addField('Message', message.content)
                    .addField("insult:", toxicity.toString())
                    .setURL(message.url)
                    .setFooter("today at "+formattedTime)
                    channel2.send({ embeds: [embed2]}).catch(error => {console.log(error)});
                    message.react('🚩').catch(error => {console.log(error)});
                }
                else if(spam>4){
                    //message.channel.send("<@"+message.author.id+"> your message was delete for spam");
                    //message.delete().catch(error => {console.log(error)}); 
                    //embed.addField("spam:", spam.toString())
                    channel.send({
                        content: "<@"+message.author.id+">",
                        embeds: [embed] 
                    });
                }
                else {return}
            });
        })
        .catch(err => {
          throw err;
        });
    
  //const analyzer = google.commentanalyzer('v1alpha1');
//
  //// This is the format the API expects
  //const requestedAttributes = {};
  //for (const key in attributeThresholds) {
  //  requestedAttributes[key] = {};
  //}
//
  //const req = {
  //  comment: {text: text},
  //  languages: ['en'],
  //  requestedAttributes: requestedAttributes,
  //};
//
  //const res = await analyzer.comments.analyze({
  //  key: config.googlekey,
  //  resource: req},
  //);
//
  //data = {};
//
  //for (const key in res['data']['attributeScores']) {
  //  data[key] =
  //      res['data']['attributeScores'][key]['summaryScore']['value'] >
  //      attributeThresholds[key];
  //}
  //return data;
}

module.exports.analyzeText = analyzeText;