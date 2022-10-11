const Discord = require("discord.js");
//const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("../config");
const modid = config.ModID;
const adminid = config.AdminID;
const helper = config.helper;

module.exports = {
  // attachmentchecker: function (attachment, message) {

  //     return
  //     const nameArray = attachment.name.split('.'); // Split the name
  //     if (nameArray.length != 1) {
  //         const attEx = nameArray[nameArray.length - 1].toLowerCase(); // Grab the last value of the array.
  //         //console.log(attEx)
  //         if (attEx == "mp4" || attEx == "webm" || attEx == "mov") {
  //             // Note this doesn't check the file it check the format of the file.
  //             const Mwidth = attachment.width;
  //             const Mheight = attachment.height;
  //             if (Mwidth < 1 || Mheight < 1) {
  //                 const embed = new Discord.MessageEmbed()
  //                     .setTitle('Video format unsupported!')
  //                     .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
  //                     .setColor(0xff0000)
  //                     .setDescription('Discord, while it can play .' + attEx + ' files, cannot play this \ncodec. It may have been HEVC or AV1. Use FFmpeg or\nHandbrake to convert your video to H.264, VP8, or\nVP9 in an MP4, WebM, or MOV container.\n*Avoid online tools, they usually reduce quality.*')
  //                     .addField('Bad submission by', message.author.username)
  //                 message.channel.send({ embeds: [embed] });

  //                 message.delete().catch(error => { console.log(error) });
  //             }
  //             else if (Mwidth < 1280 || Mheight < 720) {
  //                 //
  //                 const embed = new Discord.MessageEmbed()
  //                     .setTitle('Video resolution too low!')
  //                     .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
  //                     .setColor(0xff0000)
  //                     .setDescription('Video resolution is less than 720p.\nSubmissions must be 1280x720 or greater.\nYour clip was ' + Mwidth + 'x' + Mheight + ', which is too low.' + '\nType /requirements for more info.')
  //                     .addField('Bad submission by', message.author.username)

  //                 message.channel.send({ embeds: [embed] });

  //                 //lastBadSubmissionBy = message.author.username;
  //                 message.delete().catch(error => { console.log(error) });
  //             }
  //             else if ((Mwidth / Mheight) < 1.6 || (Mwidth / Mheight) > 2) {
  //                 var problem = " too tall.";
  //                 if ((Mwidth / Mheight) > 2) {
  //                     problem = " too wide.";
  //                 }
  //                 const embed = new Discord.MessageEmbed()
  //                     .setTitle('Video aspect ratio is bad!')
  //                     .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
  //                     .setColor(0xff0000)
  //                     .setDescription('Video aspect ratio is invalid.\nOnly ratios from 16:10 to 2:1 are accepted.\nYour clip was ' + Mwidth + 'x' + Mheight + ', which is' + problem + '\nType /requirements for more info.\nPlease do not resubmit, scale, or letterbox this video.')
  //                     .addField('Bad submission by', message.author.username)
  //                 message.channel.send({ embeds: [embed] });

  //                 //lastBadSubmissionBy = message.author.username;
  //                 message.delete().catch(error => { console.log(error) });
  //             }
  //             else if (nameArray[0].length > 10 && nameArray[0].slice(-10) == "_Trim_Trim") {
  //                 message.channel.send("Imagine using an online video trimmer twice :Hhhhhheee:");
  //                 // You can omit this if you want.
  //                 // I just find it rather funny when someone uses that instead of a video editor.
  //                 // FFmpeg is also a better choice, and probably what the online trimmer uses, but internet is slower than an SSD.
  //                 // ffmpeg -ss 00:13:37 -i too_long_video.mp4 -t 15 -c copy trimmed_video_15seconds.mp4
  //             }
  //             console.log("bot checked", message.id);
  //         }
  //         else if (attEx == "mkv" || attEx == "avi" || attEx == "mpg" || attEx == "m4v" || attEx == "wmv" || attEx == "mxf" || attEx == "y4m" || attEx == "flv" || attEx == "wfp" || attEx == "kdenlive" || attEx == "prproj" || attEx == "mlt" || attEx == "vpj" || attEx == "osp" || attEx == "3gp" || attEx == "pds" || attEx == "mpeg") {
  //             var convertTip = "OBS Studio can convert MKV to MP4.\nGo to File -> Remux Recordings.";
  //             if (attEx != "mkv" && attEx != "flv") {
  //                 convertTip = "Use FFmpeg or Handbrake to convert your " + attEx + " video\nto MP4, WebM, or MOV format. *Avoid online tools.*";
  //             }
  //             if (attEx == "wfp" || attEx == "kdenlive" || attEx == "prproj" || attEx == "mlt" || attEx == "vpj" || attEx == "osp" || attEx == "pds") {
  //                 convertTip = "The " + attEx + " file you tried to submit is an editor project file,\nnot an actual video. It only contains references to\nfiles on your computer. Render the video as an\nMP4, WebM, or MOV with H.264, VP8, or VP9.";
  //             }
  //             const embed = new Discord.MessageEmbed()
  //                 .setTitle('Video format unsupported!')
  //                 .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
  //                 .setColor(0xff0000)
  //                 .setDescription('Video format unsupported.\nFile submissions must preview in Discord.\n' + convertTip)
  //                 .addField('Bad submission by', message.author.username)
  //             message.channel.send({ embeds: [embed] });

  //             message.delete().catch(error => { console.log(error) });
  //             console.log("bot checked", message.id);
  //         }
  //     }
  //     else {
  //         const embed = new Discord.MessageEmbed()
  //             .setTitle('Video format unsupported!')
  //             .setAuthor('Gamers React', 'https://cdn.discordapp.com/emojis/764541981560537110.png?v=1')
  //             .setColor(0xff0000)
  //             .setDescription('Video format unsupported.\nFile submissions must preview in Discord.\n' + "The file you sent has no file format")
  //             .addField('Bad submission by', message.author.username)
  //         message.channel.send({ embeds: [embed] });
  //         message.delete().catch(error => { console.log(error) });

  //         console.log("bot checked", message.id);
  //     }
  // },

  //exe checker
  // RootAtKali: add more formats
  // exe: duh
  // msi: windows application installer
  // dmg: mac application installer
  // deb: Debian/Ubuntu package
  // apk: Android application
  attachmentexe: function (attachment, message) {
    if (
      message.member.roles.cache.find((r) => r.name === modid) ||
      message.member.roles.cache.find((r) => r.name === adminid) ||
      message.member.roles.cache.find((r) => r.id === helper)
    ) {
      return;
    }
    const nameArray = attachment.name.split("."); // Split the name
    const attEx = nameArray[nameArray.length - 1].toLowerCase(); // Grab the last value of the array.
    if (
      attEx == "exe" ||
      attEx == "msi" ||
      attEx == "dmg" ||
      attEx == "deb" ||
      attEx == "apk" ||
      attEx == "bat"
    ) {
      const embed = new Discord.MessageEmbed()
        .setTitle("Suspicious file!")
        .setAuthor(
          "Gamers React",
          "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
        )
        .setColor(0xff0000)
        .setDescription(
          `You cannot send executable files or \napplication installers as a file here.`
        )
        .addField("author: ", message.author.username);

      message.channel.send({ embeds: [embed] });
      message.delete().catch((error) => {
        console.log(error);
      });

      console.log("bot checked", message.id);
    }
    if (
      message.member.roles.cache.find((r) => r.id === modid) ||
      message.member.roles.cache.find((r) => r.id === adminid) ||
      message.member.roles.cache.find((r) => r.id === "747863600994975744")
    ) {
      return;
    }
    if (attEx == "rar" || attEx == "zip" || attEx == "7z") {
      const embed = new Discord.MessageEmbed()
        .setTitle("Suspicious file!")
        .setAuthor(
          "Gamers React",
          "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
        )
        .setColor(0xff0000)
        .setDescription(`You cannot send ${attEx} files here.`)
        .addField("author: ", message.author.username);

      message.channel.send({ embeds: [embed] });
      message.delete().catch((error) => {
        console.log(error);
      });

      console.log("bot checked", message.id);
    }
  },

  imagechecker: function (attachment, message) {
    const nameArray = attachment.name.split("."); // Split the name
    const attEx = nameArray[nameArray.length - 1].toLowerCase(); // Grab the last value of the array.
    const Mwidth = attachment.width;
    const Mheight = attachment.height;
    //check if attex is image
    if (attEx == "jpg" || attEx == "jpeg" || attEx == "png") {
      //banner
      if (message.channel.id === "980932289703841822") {
        if (Mwidth < 960) {
          const embed = new Discord.MessageEmbed()
            .setTitle("Invalid size")
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription(
              "Submissions must be 960x540 or greater.\nYour image was " +
                Mwidth +
                " x " +
                Mheight +
                ", which is too low."
            )
            .addField("author: ", message.author.username);

          message.channel.send({ embeds: [embed] });
          message.delete().catch((error) => {
            console.log(error);
          });

          console.log("bot checked", message.id);
        } else if (Mheight < 540) {
          const embed = new Discord.MessageEmbed()
            .setTitle("Invalid size")
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription(
              "Submissions must be 960x540 or greater.\nYour image was " +
                Mwidth +
                " x " +
                Mheight +
                ", which is too low."
            )
            .addField("author: ", message.author.username);

          message.channel.send({ embeds: [embed] });
          message.delete().catch((error) => {
            console.log(error);
          });

          console.log("bot checked", message.id);
        } else if (Mwidth / Mheight != 960 / 540) {
          const embed = new Discord.MessageEmbed()
            .setTitle("Invalid size")
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription(
              "Submissions must be 960x540 or greater but same ratio.\nYour image was " +
                Mwidth +
                "x" +
                Mheight +
                ", which is not the right ratio."
            )
            .addField("author: ", message.author.username);

          message.channel.send({ embeds: [embed] });
          message.delete().catch((error) => {
            console.log(error);
          });

          console.log("bot checked", message.id);
        }
      }
      //profile picture
      if (message.channel.id === "906533488218480660") {
        if (Mwidth < 512) {
          const embed = new Discord.MessageEmbed()
            .setTitle("Invalid size")
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription(
              "Submissions must be 512x512 or greater.\nYour image was " +
                Mwidth +
                " x " +
                Mheight +
                ", which is too low."
            )
            .addField("author: ", message.author.username);

          message.channel.send({ embeds: [embed] });
          message.delete().catch((error) => {
            console.log(error);
          });

          console.log("bot checked", message.id);
        } else if (Mheight < 512) {
          const embed = new Discord.MessageEmbed()
            .setTitle("Invalid size")
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription(
              "Submissions must be 512x512 or greater.\nYour image was " +
                Mwidth +
                " x " +
                Mheight +
                ", which is too low."
            )
            .addField("author: ", message.author.username);

          message.channel.send({ embeds: [embed] });
          message.delete().catch((error) => {
            console.log(error);
          });

          console.log("bot checked", message.id);
        } else if (Mheight / Mwidth != 512 / 512) {
          const embed = new Discord.MessageEmbed()
            .setTitle("Invalid size")
            .setAuthor(
              "Gamers React",
              "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
            )
            .setColor(0xff0000)
            .setDescription(
              "Submissions must be 512x512 or greater but same ratio.\nYour image was " +
                Mwidth +
                "x" +
                Mheight +
                ", which is not the right ratio."
            )
            .addField("author: ", message.author.username);

          message.channel.send({ embeds: [embed] });
          message.delete().catch((error) => {
            console.log(error);
          });

          console.log("bot checked", message.id);
        }
      }
    } else {
      const embed = new Discord.MessageEmbed()
        .setTitle("Unsupported file type")
        .setAuthor(
          "Gamers React",
          "https://cdn.discordapp.com/emojis/764541981560537110.png?v=1"
        )
        .setColor(0xff0000)
        .setDescription(`You cannot send ${attEx} files here.`)
        .addField("author: ", message.author.username);
      message.channel.send({ embeds: [embed] });
      message.delete().catch((error) => {
        console.log(error);
      });
    }
  },
};
