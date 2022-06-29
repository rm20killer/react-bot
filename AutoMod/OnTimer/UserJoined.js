const fetch = require(`node-fetch`);
const Discord = require("discord.js");

const mongo = require("../utils/mongo");
const muteSChema = require("../Models/mute-schema");

const muterole = "712512117999271966";
const memberrole = "710128390547701876";
const DISCORD_EPOCH = 1420070400000;
const sus = require("../utils/linkCheks/sus");
const { covertText } = require("../utils/func/uniecode");
module.exports = {
  async userjoined(member, client) {
    //kick
    channel = client.channels.cache.find(
      (channel) => channel.id === "710123089094246482"
    );
    //welcome
    channel2 = client.channels.cache.find(
      (channel) => channel.id === "700790402890072205"
    );
    //report
    channel3 = client.channels.cache.find(
      (channel) => channel.id === "892816609712930836"
    );
    //channel2.send(`Hey <@${member.id}> welcome to **Gamers React!** To get access to chat head over to <#700789384131379371>`);
    channel2.send(`Hey <@${member.id}> welcome to **Gamers React!**`);
    //give member member role
    //member.roles.add(memberrole);
    //console.log(member)

    //check if user name is part of sus list
    //if so send message
    //if not continue
    var name = member.user.username;
    let name2 = await covertText(name);
    if (sus.arr.includes(name2)) {
      //if bot return
      if (member.user.bot) return;
      let BadNameEmbed = new Discord.EmbedBuilder().setDescription(
        `You been kicked for using a banned name on Gamers React.`
      );
      try {
        member.send({ embeds: [BadNameEmbed] }).catch((error) => {
          console.log(`could not dm user ${name}`);
        });
      } catch (error) {
        console.log(error);
        return;
      }
      let embed3 = new Discord.EmbedBuilder().setColor("0x738ADB");
      timestamp = member.user.createdTimestamp.toString().slice(0, -3);
      //if timestamp is more than 1 week ago, kick
      if (timestamp > (Date.now() - 604800000).toString().slice(0, -3)) {
        //console.log(`${timestamp} ${(Date.now()-604800000).toString().slice(0, -3)}`);
        //console.log(timestamp < (Date.now() - 604800000));
        member.kick("Suspected user");
        embed3.setDescription(
          `<@${member.id}> with a sus name has joined the server & account is 1 week. They have been kicked.`
        );
        channel.send({ embeds: [embed3] });
      } else {
        embed3.setDescription(
          `<@${member.id}> with a sus name has joined the server. Keep an eye out for them!`
        );

        channel3.send({ embeds: [embed3] });
      }
      return;
    }
    const guildId = member.guild.id;
    const userId = member.user.id;
    //console.log(guildId)
    //console.log(userId)
    await mongo().then(async (mongoose) => {
      try {
        const previousMutes = await muteSChema.findOne({
          guildId,
          userId,
        });
        if (previousMutes) {
          //console.log(previousMutes)
          if (previousMutes.current === true) {
            //console.log("Muted person rejoined")
            const embed2 = new Discord.EmbedBuilder().setDescription(
              `<@${member.user.id}> joined while still being muted`
            );
            channel.send({ embeds: [embed2] });
            try {
              var role = member.guild.roles.cache.find(
                (role) => role.id === muterole
              );
              member.roles.add(role);
            } catch {
              console.log("adding mute role error");
              return;
            }
            return;
          }
        }
      } finally {
        //mongoose.connection.close()
      }
    });

    //const embed2 = new Discord.EmbedBuilder()
    //    .setDescription(`<@${targetmember.user.id}> has been muted for ${timeString}`)
    //message.channel.send({ embeds: [embed2] });
  },
};

const convertSnowflakeToDate = function (snowflake, epoch = DISCORD_EPOCH) {
  const milliseconds = BigInt(snowflake) >> 22n;
  return new Date(Number(milliseconds) + epoch);
};

const validateSnowflake = function (snowflake, epoch) {
  if (!Number.isInteger(Number(snowflake))) {
    throw new Error(
      "That doesn't look like a snowflake. Snowflakes contain only numbers."
    );
  }

  if (snowflake < 4194304) {
    throw new Error(
      "That doesn't look like a snowflake. Snowflakes are much larger numbers."
    );
  }

  let timestamp = convertSnowflakeToDate(snowflake, epoch);
  if (Number.isNaN(timestamp.getTime())) {
    throw new Error(
      "That doesn't look like a snowflake. Snowflakes have fewer digits."
    );
  }
  timestamp = parseInt(parseInt(timestamp.getTime() / 1000));
  console.log(timestamp);
  return timestamp;
};
