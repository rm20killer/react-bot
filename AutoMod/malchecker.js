const fetch = require("node-fetch");
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js');

let psl = require('psl');
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("../config");
const list = require("../list");
const allowlist = require("../allowlist");

const youtubeKey = config.youtubeKey

const modid = config.ModID
const adminid = config.AdminID
const jrmod = config.jrmod
const helper = config.helper

module.exports = {
    antiworm: function (messa, message, client) {

        //const messa = message.content.toLowerCase(); 
        let messageContent = message.content
        if (messageContent.includes("https://") || messageContent.includes("http://")) {
            let banned = list.arr;
            let allow = allowlist.arr;

            // Some sort of worm has been spread which uses messages like this to spread.
            const malregex = /(creator|publisher).+(enter|participate).+(beta|closed beta).+(bonus|reward).+(download|install).+(link|file)/i
            const malregex2 = /(steam|csgo|giveaway|giving away|give away).+(giveaway|giving away|give away|discord).+(nitro|closed beta|trades)/i
            const malregex3 = /(join).+(traders|trader).+(earn).+($|£|)/i
            const strx = messa;
            var url = messageContent.match(/\bhttps?:\/\/\S+/gi);
            if (!url) { return }
            else {
                for (var i = 0; i < url.length; i++) { //checks all links
                    let URLlower = url[i].toLowerCase();
                    //console.log(url[i])
                    if (url[i].includes("https://youtu.be/") || url[i].includes("https://www.youtube.com/watch?v=") || url[i].includes("https://m.youtube.com/watch?v=")) {
                        if (url[i].includes("https://youtu.be/")) {
                            const youtubeVideoID = url[i].split("https://youtu.be/")[1];
                            //console.log(youtubeVideoID);
                            getVideoinfo(youtubeVideoID, message, client);

                        }
                        if (url[i].includes("https://www.youtube.com/watch?v=")) {
                            const youtubeVideo = url[i].split("https://www.youtube.com/watch?v=")[1];
                            if (youtubeVideo.includes("channel=")) {
                                const youtubeVideoID = youtubeVideo.split("&")[0]
                                //console.log(youtubeVideoID);
                                getVideoinfo(youtubeVideoID, message, client);

                            }
                            else {
                                const youtubeVideoID = youtubeVideo;
                                //console.log(youtubeVideoID);
                                getVideoinfo(youtubeVideoID, message, client);

                            }
                        }
                        if (url[i].includes("https://m.youtube.com/watch?v=")) {
                            const youtubeVideo = url[i].split("https://m.youtube.com/watch?v=")[1];
                            if (youtubeVideo.includes("channel=")) {
                                const youtubeVideoID = youtubeVideo.split("&")[0]
                                //console.log(youtubeVideoID);
                                getVideoinfo(youtubeVideoID, message, client);

                            }
                            else {
                                const youtubeVideoID = youtubeVideo;
                                //console.log(youtubeVideoID);
                                getVideoinfo(youtubeVideoID, message, client);

                            }
                        }
                    }
                    else {
                        for (var l = 0; l < allow.length; l++) { //real links
                            if (URLlower.includes(allow[l])) {
                                return;
                            }
                        }
                        for (var x = 0; x < banned.length; x++) { //fake link
                            if (URLlower.includes(banned[x])) {
                                trigger(message, client);
                                return;
                            }
                        }
                    }
                }
            }
            let mal;
            if ((mal = malregex2.exec(strx)) !== null) { //if missed fake link
                trigger(message, client);
                return;
            }
            if ((mal = malregex3.exec(strx)) !== null) { //if missed fake link
                trigger(message, client);
                return;
            }
            else {
                for (var i = 0; i < url.length; i++) {
                    let URLlower = url[i].toLowerCase();
                    var url2 = URLlower
                    if (similarity('discord.com', psl.get(extractHostname(url2))) > 0.85) {
                        //console.log(url2)
                        channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
                        channel.send("New link `" + url2 + "` ," + similarity('discord.com', psl.get(extractHostname(url2))));
                        trigger(message, client);
                        return;
                    }
                    if (similarity('discord.gift', psl.get(extractHostname(url2))) > 0.85) {
                        //console.log(url2)
                        channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
                        channel.send("New link `" + url2 + "` ," + similarity('discord.gift', psl.get(extractHostname(url2))));
                        trigger(message, client);
                        return;
                    }
                    if (similarity('discord-app.com', psl.get(extractHostname(url2))) > 0.85) {
                        //console.log(url2)
                        channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
                        channel.send("New link `" + url2 + "` ," + similarity('discord-app.com', psl.get(extractHostname(url2))));
                        trigger(message, client);
                        return;
                    }
                    if (similarity('discord.gg', psl.get(extractHostname(url2))) > 0.85) {
                        //console.log(url2)
                        channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
                        channel.send("New link `" + url2 + "` ," + similarity('discord.gg', psl.get(extractHostname(url2))));
                        trigger(message, client);
                        return;
                    }
                    //console.log(similarity('discord.com',psl.get(extractHostname(url))));
                    //console.log(similarity('discord.gift',psl.get(extractHostname(url))));
                }
            }
        }
    },


    antiunderage: function (messa, message, client) {
    }
}


const trigger = async (message, client) => {
    var invite = "`error discord invite not found`"
    var channel = ""
    if (message.guild.id === "880560625166741544") {
        invite = "https://discord.gg/mvpPdqTmJh"
        channel = client.channels.cache.find(channel => channel.id === "885144925509914654");
    }
    if (message.guild.id === "629695220065239061") {
        invite = "https://discord.gg/gamersreact"
        channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
    }
    message.channel.send("<@" + message.author.id + ">, account might be compromised.");
    let time = message.createdTimestamp
    var date = new Date(time * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    const embed = new Discord.MessageEmbed()
        .setTitle('A user may be compromised')
        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
        .setColor(0xFF0000)
        .setDescription(message.content)
        .addField('person id', message.author.id)
        .addField("person name ", message.author.tag)
        .setFooter("today at " + formattedTime)
    channel.send({
        content: "<@" + message.author.id + ">",
        embeds: [embed]
    });
    message.delete().catch(error => { console.log(error) });

    message.author.send(`3ADB63D1 \n We noticed you've been compromised by self-spreading malware (a worm) which takes over your account to send download links to this worm to others.\nAs a precaution, the bot has kicked you from the Gamers React server.\nYou must run a Windows Defender full scan and change your password.\nTo join back, use this invite link: ${invite}`)
        .catch(console.error);
    if (message.channel.id === "923247620204404756" || message.channel.id === "698585110886481960") {
        if (message.member.kickable) {
            message.member.kick("compromised account").catch(error => { console.log(error) });
            const embed2 = new Discord.MessageEmbed()
                .setDescription(`<@${target.user.id}> has been kicked`)
            message.channel.send({ embeds: [embed2] });
            console.log(`${message.author.tag} kicked`);
        }
    }
}

function similarity(s1, s2) {
    if (!s1) { return }
    if (!s2) { return }
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}


const getVideoinfo = async (youtubeVideoID, message, client) => {
    fetch("https://www.googleapis.com/youtube/v3/videos?id=" + youtubeVideoID + "&part=snippet&key=" + youtubeKey)
        .then(response => {
            //console.log(response.json)
            return response.json();
        })
        .then(data => {
            //console.log(data["items"][0]);
            if (data["items"][0]) {
                var title = data["items"][0].snippet.title;//title
                let regex = /(free|nitro|discord).+(nitro|GENERATOR)/i
                if ((mal = regex.exec(title)) !== null) { //if missed fake link
                    trigger(message, client);
                    return;
                }
                else if (message.author.bot) return;
                else if (message.member.roles.cache.find(r => r.name === modid) || message.member.roles.cache.find(r => r.name === adminid) || message.member.roles.cache.find(r => r.id === helper)) {
                    return;
                }
                else if (message.channel.id === "857939977865265192" || message.channel.id === "878531760386871327" || message.channel.id === "775811861492793444" || message.channel.id === "772893417315369000" || message.channel.id === "629695881553379328" || message.channel.id === "723555905056276600") {
                    return;
                }
                else if (message.channel.parent.name == '858354610367627284') {
                    return;
                }
                else {
                    var channelId = data["items"][0].snippet.channelId;//title
                    if (channelId === "UCvInsdoSCTRGQNuXe7kMjhQ") {
                        return
                    }
                    else {
                        const embed = new Discord.MessageEmbed()
                            .setTitle('No self promo here')
                            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                            .setColor(0xFF0000)
                            .setDescription("do not self promote in this channel")
                            .addField('person id', message.author.id)
                            .addField("person name ", message.author.tag)
                        message.channel.send({ embeds: [embed] }).catch(error => { console.log(error) });
                        message.delete().catch(error => { console.log(error) });
                    }
                }
            }
            //console.log(title)
        })
}
