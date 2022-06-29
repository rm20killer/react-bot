const dmchecker = require("../AutoMod/Checks/dmchecker");
const antiw = require("../AutoMod/Checks/malchecker");
const submitclip = require("../AutoMod/submitclip");
const streamerrole = require("../AutoMod/streamerrole");
const accountchecker = require("../AutoMod/Checks/accountchecker");
const attachmentD = require("../AutoMod/attachment");
const youtubechecker = require("../AutoMod/Checks/youtubeChecker");
const { youtube } = require("../AutoMod/Checks/youtubeChecker");
const table = require("../AutoMod/tablechecker");
const userjoined = require("../AutoMod/UserJoined");
const mutechecker = require("../AutoMod/OnTimer/mutecheck");
const pingriz = require("../AutoMod/pingriz");
const perspective = require("../AutoMod/perspective.js");
const ReactionChecker = require("../AutoMod/Reactions/ReactionChecker");
const CheckName = require("../AutoMod/userJoined/CheckName");
const rolechecker = require("../AutoMod/Checks/rolechecker");
const bancheck = require("../AutoMod/OnTimer/bancheck");

const interactionFile = require("../interaction/interaction");

const mee6 = require("../Other/mee6");
const gameCheck = require("../AutoMod/Keeprunning/games");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    config = client.config;
    const prefixl = config.prefix;
    const modid = config.ModID;
    const adminid = config.AdminID;
    const helper = config.helper;
    if (message.guild === null) {
      //console.log(message)
      //dm checker
      dmchecker.dmchecker(message, client);
      return;
    }

    try {
      var channelParent = message.channel.parent.id;
      var channelparname = message.channel.parent.name;
    } catch {
      var channelParent = null;
    }
    try {
      var role = message.member.roles.cache;
    } catch {
      var role = null;
    }
    //if role is null then return
    if (role === null) {
      //const channel = client.channels.cache.find(channel => channel.id === "716762885522456677");
      //let messageContent = "**no message**"
      //messageContent = message.content
      //const embed = new Discord.MessageEmbed()
      //    .setDescription(`${message.author.tag} has no role but sent a message in ${message.channel.name}`);
      console.log(
        `${message.author.tag} has no role but sent a message in #${message.channel.name}`
      );
      //channel.send({ embeds: [embed] })
      return;
    }

    if (
      message.guild.id === "629695220065239061" ||
      message.guild.id === "898628981958537266"
    ) {
      if (role !== null) {
        if (
          message.member.roles.cache.find((r) => r.id === "712512117999271966")
        ) {
          if (
            message.member.roles.cache.find((r) => r.name === modid) ||
            message.member.roles.cache.find((r) => r.name === adminid) ||
            message.member.roles.cache.find((r) => r.id === helper)
          ) {
          } else {
            if (channelParent != "858354610367627284") {
              message.delete().catch((error) => {
                console.log(error);
              });
            }
          }
        }
      }
      if (message.author.id === client.user.id) return;
      if (message.channel.id === "629695352454250508") {
        const channel = client.channels.cache.find(
          (channel) => channel.id === "707304184524832879"
        );
        channel.send("Reminder: Publish message in <#629695352454250508>");
      }

      if (
        channelparname == "────💬 chatting 💬────" ||
        channelparname == "────Bot commands────" ||
        channelparname == "────🛠Support🛠────" ||
        channelparname == "────Voice Channels────"
      ) {
        const messa = message.content.toLowerCase();
        //anti maleware
        antiw.antiworm(messa, message, client);
        //ping checker
        pingriz.pingriz(messa, message, client);

        //FAQbot but Submit clips
        submitclip.submitclip(messa, message, client);
        //FAQbot but Streamer role
        streamerrole.streamerrole(messa, message, client);
        if (messa.includes("i am")) {
          const mess = messa.split(/i am(.+)/)[1];
          if (mess === undefined) {
            return;
          }
          //message.reply("Hi,"+ mess +" I am React Bot")
        } else if (messa.includes("i'm")) {
          const mess = messa.split(/i'm(.+)/)[1];
          if (mess === undefined) {
            return;
          }
          //message.reply("Hi,"+ mess +" I'm React Bot")
        }
      }
      if (message.channel.id === "886864421140447232") {
        const messa = message.content.toLowerCase();
        if (messa.startsWith("thred")) {
        } else {
          if (
            message.member.roles.cache.find((r) => r.name === modid) ||
            message.member.roles.cache.find((r) => r.name === adminid) ||
            message.member.roles.cache.find((r) => r.id === helper)
          ) {
          } else {
            message.delete().catch((error) => {
              console.log(error);
            });
          }
        }
      }
    }
    let attachments = Array.from(message.attachments);
    let attachmentss = attachments[0];
    if (attachmentss) {
      const attachment = attachmentss[1];
      //console.log(attachment[1])
      attachmentD.attachmentexe(attachment, message);
    }
    if (channelParent === "906533207812476988") {
      if (attachmentss) {
        const attachment = attachmentss[1];
        attachmentD.imagechecker(attachment, message);
      } else {
        if (
          message.member.roles.cache.find((r) => r.name === modid) ||
          message.member.roles.cache.find((r) => r.name === adminid) ||
          message.member.roles.cache.find((r) => r.id === helper)
        ) {
        } else {
          message.delete().catch((error) => {
            console.log(error);
          });
        }
      }
    }
    if (channelparname != "────🛠Support🛠────") {
      if (channelparname != "──────🚨 mods 🚨──────") {
        var regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
        if (regexp.test(message.content)) {
          // at least 2 words consisting of letters
          perspective
            .analyzeText(message.content, message, client)
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
    //if(message.author.id==="646180114756796442"){
    //    message.reply("The Person Above Smells")
    //}

    //detector.detector(client,message,users)
    ////////////////////////////////////////////////
    //commands
    table.table(client, message);
    if (message.content.startsWith(prefixl)) {
      const args = message.content.slice(prefixl.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command =
        client.commands.get(commandName) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

      if (!command) return;
      try {
        console.log(`${message.content} sent by ${message.author.tag}`);
        command.execute(message, args, client);
      } catch (error) {
        console.error(error);
        return message.reply(error);
      }
    }
    if (message.content.startsWith("!")) {
      mee6.mee6(client, message);
    }
  },
};
