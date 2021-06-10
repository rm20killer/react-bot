/* eslint-disable no-inline-comments */

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");

const config = require("./config");
const prefixl = config.prefix

//Discord.js v12+ is needed for this to work

//youtube api

//youtube stuff not working yet
const youtubeKey = config.youtubeKey
const youtubeUser = config.youtubeUser

//EnderEyeGames/RootAtKali: save username of the last user to submit something, so the bot can scold people for submitting two inadequate submissions.
//RM: This is not fully working and causing an error when trying to call the var. I think I know a work around which should be added when I add slash commands
var lastBadSumbissionBy = "NONE YET";
const getSubscribers = async () => {
  //return req.data;
  fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id="+youtubeUser+"&key="+youtubeKey)
  .then(response => {
      return response.json()
  })
  .then(data => {
      console.log(data["items"][0].statistics.subscriberCount);
      const sub = data["items"][0].statistics.subscriberCount;
      subr=sub.slice(0, -4); 
      subr = (subr / 100).toFixed(2);
      const channel = client.channels.cache.find(channel => channel.id === "849642482702614528");
      channel.setName("Subscribers: "+subr+" Mil");
      //return(sub)
  })
}
//start 
client.on("ready", () =>{
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("your Clips", { type: "WATCHING"})
    //client.user.setPresence({ game: { name: 'Videos' , type: 'WATCHING' }, status: 'idle' })
    .then(console.log)
    .catch(console.error);
    //-
    //this is for slash commands to work
    console.log(client.api.applications(client.user.id).commands.get())
    console.log(client.api.applications(client.user.id).guilds(`629695220065239061`).commands.get())
    //if you have commands to add tell me
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "madeby",
            description: "find out who made me",
        } 
    });
    client.api.applications(client.user.id).commands.post({
        data: {
            name: "requirements",
            description: "get clips requirements"
        } 
    });
    
    client.api.applications(client.user.id).guilds('629695220065239061').commands.post({
        data:{
            name: "compress",
            description: "if your clip is too big for discord use this", 
        }
    });


    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if (command === 'madeby'){ 
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "This was made by RM20 with the help from RootAtKali, source code can be found at https://github.com/rm20killer/react-bot"
                    }
                }
            })
        }
        if (command === 'compress'){ 
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "To compress size so you send on discord you can use: https://8mb.video/ \n **You must** enable the `Extra quality (slower)` option.\nYour video cannot be longer than 40 seconds to meet requirements.\nUse the trim options to accomplish this."
                    }
                }
            })
        }
        if (command === 'requirements'){
            const embed = new Discord.MessageEmbed()
            .setTitle('Requirements')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0xff0000)
            .setDescription('All submissions must meet the following requirements:\n> Video resolution: At least 1280x720\n> Aspect ratio: Anything between 16:10 and 2:1\n> Framerate: At least 30 fps\n> Video bitrate: At least 1500 kbps (x264 medium)\n> Audio bitrate: At least 150 kbps (AAC-LC)\n> Must embed on discord\n> Must be under 2 minutes. No timestamps!\nDeliberately scaling or padding a video to fool me\ndoes **not** pass the requirements.')

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPImessage(interaction, embed)
                }
            })
        }
    });
    //
});
//all below are the same just removed the !(command)

client.on('message', message => {
    if(message.guild === null) {
        //dm checker
        const attachments = (message.attachments).array(); // Get list of attachments
        const attachment = attachments[0]; // Take the first attachment
        console.log(attachment);
        if (attachment !== undefined){
            const embed = new Discord.MessageEmbed()
            .setTitle('Someone DMed me')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0x4287f5)
            .setDescription(message.content)
            .addField("attachment", attachment.url)
            .addField('person id', message.author.id)
            .setFooter("person name " + message.author.tag)
            
            const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
            channel.send(embed);
	//auto respond
	    const nameArray = attachment.name.split('.'); // Split the name 
            const attEx = nameArray[nameArray.length - 1].toLowerCase();
	    const videos = ["webm","mkv","mov","mp4","mpg","avi","m4v","wmv","mxf","flv"];
	    const editorprojs = ["wfp","prproj","kdenlive","mlt"];
	    const unsupported = ["ofr","y4m"]; //obscure files that mods just straight up can't open
	    if ( videos.indexOf(attEx) != -1 ) {
                message.reply("You don't need to DM me the videos, Just send them in <#696131644871933972>, to get access to this channel read the <#700789384131379371>")
	    }
	    if ( editorprojs.indexOf(attEx) != -1 ) {
  	        message.reply("That's a video editor project, and I can't watch that. Render it to MP4, WebM, or MOV before submitting it in <#696131644871933972>.");
	    }
            if ( unsupported.indexOf(attEx) != -1 ) {
		message.reply("tf did you just send me? I can't open this type of file.");
	    }
        }
        else
        {
            const embed = new Discord.MessageEmbed()
            .setTitle('Someone DMed me')
            .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
            .setColor(0x4287f5)
            .setDescription(message.content)
            .addField('person id', message.author.id)
            .setFooter("person name " + message.author.tag)
            
            const channel = client.channels.cache.find(channel => channel.id === "844273354318938174");
            channel.send(embed);
        }
        if(message.author.bot) return;
        
        const regex = /(how|where|want).+(submit|post|share|send|subit|give).+(clip|video)/i;
        const messa = message.content.toLowerCase();
        const str = messa;
        let m;
        if ((m = regex.exec(str)) !== null) {
            message.reply("Submit clips in <#696131644871933972>. Make sure clips meet `/requirements`. To get access to this channel read the <#700789384131379371>");
        }

        const sregex = /(how|where|want).+(streamer|content creator|youtuber).+(role|rank)/i;
        if ((m = sregex.exec(str)) !== null) {
            // The result can be accessed through the `m`-variable.
            message.reply("The streamer role is given to users featured in a Gamers React compilation.\nIf you have been featured, message a mod with a timestamp and link to the video.");
        }

	const bregex = /(who|what|how).+(is|does|this).+(work|bot|this)/i;
        //if ((m = bregex.exec(str)) !== null) {
            // The result can be accessed through the `m`-variable.
   	    // By RootAtKali
	    // Example: "how does the bot work", "what is this", "what does the bot do", may be a bit too sensitive
	    // perhaps a "troll mode" could be toggled per-user so this doesn't tell the truth?
        //    message.reply("React Bot's DM system relays your messages to moderators in a hidden channel.\nModerators can command React Bot to send messages to members.");
       // }

    return;
    }
    //everything else
    try
    {
        var channelID = message.channel.parent.id
    }
    catch{
        console.log("message not sent in catoragy");
    }
    if (message.channel.id==='629695352454250508') {
        const channel = client.channels.cache.find(channel => channel.id === "707304184524832879");
        channel.send("Reminder: Publish message in <#629695352454250508>");
        
    }
    if (channelID =='629695220065239063'||channelID=='716754944472121516'||channelID=='629695220065239065') {
        const messa = message.content.toLowerCase();
	
	// Some sort of worm has been spread which uses messages like this to spread.
	const malregex = /(creator|publisher).+(enter|participate).+(beta|closed beta).+(bonus|reward).+(download|install).+(link|file)/i
	const strx = messa;
        let mal;
        if ((mal = malregex.exec(strx)) !== null) {
                // The result can be accessed through the `mal`-variable.
                message.reply("Run a Windows Defender scan and change your password immediately.");
		message.author.send("We noticed you've been compromised by self-spreading malware (a worm) which takes over your account to send download links to this worm to others.\nAs a precaution, the bot has kicked you from the Gamers React server.\nYou must run a Windows Defender full scan and change your password.\nTo join back, use this invite link: https://discord.gg/SnBhUmqSf8");
		//message.author.kick();
		//Do not enable kicking until it's been tested and is working
		message.delete;
        }
	//End anti-worm code.
	
        if(messa.includes("@!144567396835917824")) { //227490301688676354  riz=144567396835917824
            message.reply('dont ping riz, If you need help feel free to ask <@&696134129497931857>');
            message.channel.send("https://media.giphy.com/media/QTi0jJ17OTHwEqkEIA/giphy.gif");
            console.log("pinged");
            //message.delete();
        }
        //FAQbot but Submit clips
        if(message.channel.id === "700790402890072205"|| message.channel.id ==="629695220065239064" ||message.channel.id ==="716762885522456677"||message.channel.id==="833078102958931968"||message.channel.id==="696131644871933972" ) {
            const regex = /(how|where|want).+(submit|post|share|send).+(clip|video)/i;
            const str = messa;
            let m;
            if ((m = regex.exec(str)) !== null) {
                // The result can be accessed through the `m`-variable.
		if (message.channel.id === "696131644871933972" ){
			message.reply("Simply post your link or file here. Make sure clips meet `/requirements`"); //If the question was in #submit-clips say this
		}else{
                	message.reply("Submit clips in <#696131644871933972>. Make sure clips meet `/requirements`"); //Otherwise say this
		}
            }
        }
	//FAQbot but Streamer role
        if(message.channel.id === "700790402890072205"|| message.channel.id ==="629695220065239064" ||message.channel.id ==="716762885522456677"||message.channel.id==="833078102958931968"||message.channel.id==="696131644871933972" ) {
            const regex = /(how|where|want).+(streamer|content creator|youtuber).+(role|rank)/i;
            const str = messa;
            let m;
            if ((m = regex.exec(str)) !== null) {
                // The result can be accessed through the `m`-variable.
                message.reply("The streamer role is given to users featured in a Gamers React compilation.\nIf you have been featured, message a mod with a timestamp and link to the video.");
            }
        }
    }


    if (!message.content.startsWith(prefixl)) return;
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefixl.length).toLowerCase();

    if(cmd === 'ping') {
        message.reply('pong, ' + `${Date.now() - message.createdTimestamp}` + ' ms');
        return;
    }
    if (cmd === "rm3"){
        message.channel.send("https://cdn.discordapp.com/attachments/629695220065239064/844968694550626334/5aatpw.gif");
        message.delete();
    }
    //mod only commands
    if(message.member.roles=== null){
        message.reply("Roles issue detected")
        console.log(message.author+" roles issue "+message.content)
        return;
    }
    if (message.member.roles.cache.find(r=>r.id === '696134129497931857')||message.member.roles.cache.find(r=>r.id === '795456110421213214')){
        if(cmd === "say"){
            const say = message.content.slice(4);
            if(say) {
                message.channel.send(say);
                message.delete();
            }
            else(
            message.reply("nothing to say")
            )
        }  
        if(cmd==="subupdate") {
            getSubscribers();
        }
        if(cmd==='rm') {
            message.channel.send("RM is busy and does not check/rate clips");
            message.delete();
        }
        if (cmd ==="rm2") {
            message.channel.send("https://media.giphy.com/media/eiNLAAmHNZuy5nsKKq/giphy.gif");
            message.delete();
        }
        if (cmd ==="dm"){
            var str = message.content
            const mess = str.split(/>(.+)/)[1]
            const mention = message.mentions.users.first();
            if (!mention){
                message.reply("no mention")
                return;
            }
            else{
                console.log(mention)
                const user = client.users.cache.get(mention.id);
                //console.log(mess);
                user.send(mess);
            }
        }
    }
    //admin only commands
    if (message.member.roles.cache.find(r=>r.id === '795456110421213214')){
        if(cmd==`kill`){
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
                    setTimeout(() => { client.destroy(); }, 500);
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
})


client.on('message', message => {
    if (message.channel.id === config.ChannelID) {
        //checks for links
        let links =["www.dropbox.com/","https://drive.google.com/","www.mediafire.com/file","www.awesomescreenshot.com/","mega.nz/file/"]
	
        const messa = message.content.toLowerCase();
        for (var i = 0; i < links.length; i++) {
            if (messa.includes(links[i])) {
                const embed = new Discord.MessageEmbed()
                .setTitle('Video must be playable on discord!')
                .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                .setColor(0xff0000)
                .setDescription('Submissions must be viewable on discord.\nType /requirements for more info.\nuse /compress for easy compress or youtube to upload big file')
                .addField('Bad submission by', message.author.username)
                message.channel.send(embed);
            message.delete();
            break;
            }
        }
	
        //checks attachments
        const attachments = (message.attachments).array(); // Get list of attachments
        const attachment = attachments[0]; // Take the first attachment
        if (attachments.length !== 0) {
            const nameArray = attachment.name.split('.'); // Split the name 
            const attEx = nameArray[nameArray.length - 1].toLowerCase(); // Grab the last value of the array.
            if (attEx == "mp4" || attEx == "webm" || attEx == "mov") {
                // Note this doesn't check the file it check the format of the file.
                const Mwidth = attachment.width;
                const Mheight = attachment.height;
                if (Mwidth < 1 || Mheight < 1) {
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Video format unsupported!')
                    .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                    .setColor(0xff0000)
                    .setDescription('Discord, while it can play .' + attEx + ' files, cannot play this \ncodec. It may have been HEVC or AV1. Use FFmpeg or\nHandbrake to convert your video to H.264, VP8, or\nVP9 in an MP4, WebM, or MOV container.\n*Avoid online tools, they usually reduce quality.*')
                    .addField('Bad submission by', message.author.username)
                    message.channel.send(embed);
                    message.delete();
                
                }
                else if (Mwidth < 1280 || Mheight < 720) {
                        const embed = new Discord.MessageEmbed()
                        .setTitle('Video resolution too low!')
                        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                        .setColor(0xff0000)
                        .setDescription('Video resolution is less than 720p.\nSubmissions must be 1280x720 or greater.\nYour clip was ' + Mwidth + 'x' + Mheight + ', which is too low.' + '\nType /requirements for more info.')
                        .addField('Bad submission by', message.author.username)
                        message.channel.send(embed);
                    //lastBadSubmissionBy = message.author.username;
                    message.delete();
                }  
                else if ((Mwidth / Mheight) < 1.6 || (Mwidth/Mheight) > 2){
                    var problem = " too tall.";
                    if ((Mwidth / Mheight) > 2) {
                        problem = " too wide.";
                    }
                    const embed = new Discord.MessageEmbed()
                        .setTitle('Video aspect ratio is bad!')
                        .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
                        .setColor(0xff0000)
                        .setDescription('Video aspect ratio is invalid.\nOnly ratios from 16:10 to 2:1 are accepted.\nYour clip was ' + Mwidth + 'x' + Mheight + ', which is' + problem + '\nType /requirements for more info.\nPlease do not resubmit, scale, or letterbox this video.')
                        .addField('Bad submission by', message.author.username)
                        message.channel.send(embed);
                            
                    //lastBadSubmissionBy = message.author.username;
                    message.delete();
                }
                else if (nameArray[0].length > 10 && nameArray[0].slice(-10) == "_Trim_Trim"){
					message.channel.send("Imagine using an online video trimmer twice :Hhhhhheee:");
					// You can omit this if you want.
					// I just find it rather funny when someone uses that instead of a video editor.
					// FFmpeg is also a better choice, and probably what the online trimmer uses, but internet is slower than an SSD.
					// ffmpeg -ss 00:13:37 -i too_long_video.mp4 -t 15 -c copy trimmed_video_15seconds.mp4
				}
                console.log("bot checked",message.id);
            }
            else if (attEx == "mkv" || attEx == "avi" || attEx == "mpg" || attEx == "m4v" || attEx == "wmv" || attEx == "mxf" || attEx == "y4m" ||attEx == "flv" || attEx == "wfp" || attEx == "kdenlive" || attEx == "prproj" || attEx == "mlt" ) {
				var convertTip = "OBS Studio can convert MKV to MP4.\nGo to File -> Remux Recordings.";
				if (attEx != "mkv" && attEx != "flv"){
					convertTip = "Use FFmpeg or Handbrake to convert your " + attEx + " video\nto MP4, WebM, or MOV format. *Avoid online tools.*";
				}
		    		if (attEx == "wfp" || attEx == "kdenlive" || attEx == "prproj" || attEx == "mlt"){
					convertTip = "The " + attEx + " file you tried to submit is an editor project file,\nnot an actual video. It only contains references to\nfiles on your computer. Render the video as an\nMP4, WebM, or MOV with H.264, VP8, or VP9.";
				}
				const embed = new Discord.MessageEmbed()
				.setTitle('Video format unsupported!')
				.setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
				.setColor(0xff0000)
				.setDescription('Video format unsupported.\nFile submissions must preview in Discord.\n' + convertTip)
				.addField('Bad submission by', message.author.username)
				message.channel.send(embed);
				message.delete();
				console.log("bot checked",message.id);
			
            }
        }
    }
});
//youtube bash

//boost checker
client.on('guildMemberUpdate', function(oldMember, newMember){
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
`
if (!shadRole && shasRole) {
    const boostedUsers = newMember.guild.members.cache.array().filter(member => member.roles.cache.find(role => role.name === 'Streamers'));
    console.log(boostedUsers.length); // how many members are boosted
    for (var i = 0; i < boostedUsers.length; i++) {
      newMember.guild.channels.cache.get("841018811657355354").send("<@"+boostedUsers[i].id+ "> has got into a gamer react video");
    }
  }
`
});

//this is for embed message for slash commands
async function createAPImessage(interaction,content){
    const apimessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id),content) 
        .resolveData()
        .resolveFiles();

    return  {...apimessage.data, files: apimessage.files};
}

// client.login(process.env.token);
client.login(config.BotToken);
