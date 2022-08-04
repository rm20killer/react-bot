module.exports = {
  name: "guildMemberUpdate",
  async execute(client, oldMember, newMember) {
    const modid = client.config.ModID;
    const adminid = client.config.AdminID;
    const jrmod = client.config.jrmod;
    const helper = client.config.helper;

    const pronoun = "994725428415701152";
    const notification = "994724549209899073";
    const level = "994724373120426107";
    const special = "994724909525770333";
    const staff = "857763887713353758";


    //get raidmode from raidmode.json
    const raidmode = require(`../utils/data/raidmode.json`);

    const memberRole = "710128390547701876";
    if (newMember.pending === false) {
      if (oldMember.pending === false) { }
      else if (newMember.user.bot) { }
      else if (raidmode.raidmode === true) { }
      else {
        try {
          newMember.roles.add(memberRole).catch((error) => {
            console.log(error);
          });
          newMember.roles.add(pronoun).catch((error) => {
            console.log(error);
          });
          newMember.roles.add(notification).catch((error) => {
            console.log(error);
          });
          newMember.roles.add(level).catch((error) => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
          return;
        }
      }
    }
    if (newMember.guild.id != "629695220065239061") {
      return;
    }
    if (newMember.guild.id === "629695220065239061") {
      console.log("role checking - " + newMember.id);
      const hadRole = oldMember.roles.cache.find(
        (role) => role.name === "Server Booster"
      ); //Server Booster
      const hasRole = newMember.roles.cache.find(
        (role) => role.name === "Server Booster"
      ); //Server Booster

      const shadRole = oldMember.roles.cache.find(
        (role) => role.name === "Streamers"
      ); //Streamers
      const shasRole = newMember.roles.cache.find(
        (role) => role.name === "Streamers"
      ); //Streamers

      const boostemote = client.emojis.cache.get(`832556719770566657`);
      //streamers
      if (!shadRole && shasRole) {
        newMember.guild.channels.cache
          .get("841018811657355354")
          .send(
            "<@" + newMember.id + "> has gotten into a Gamers React video."
          );
        return;
      }
      //Server Booster
      if (!hadRole && hasRole) {
        newMember.guild.channels.cache
          .get("788078716546318418")
          .send(
            `${boostemote} <@${newMember.id}> boosted the server\nThank you 💗`
          );
        newMember.guild.channels.cache
          .get("629695330153267219")
          .send(
            `${boostemote} <@${newMember.id}> boosted the server\nThank you 💗`
          );
        //newMember.roles.add("830069139770441728");
        return;
      }
      //does nothing if mod
      if (
        newMember.roles.cache.find((r) => r.name === modid) ||
        newMember.roles.cache.find((r) => r.name === adminid) ||
        newMember.roles.cache.find((r) => r.id === helper)
      ) {
        return;
      }
      const isSpecialBool = await isSpecial(newMember);
      if (isSpecialBool === true) {
        //console.log("special");
        if (newMember.roles.cache.find((r) => r.id === special)) {
          return;
        } else {
          newMember.roles.add(special).catch((error) => {
            console.log(error);
          });
          return;
        }
      } else {
        if (newMember.roles.cache.find((r) => r.id === special)) {
          newMember.roles.remove(special).catch((error) => {
            console.log(error);
          });
        }
      }
    }
    return;
  },
};

async function isSpecial(member) {
  if (member.roles.cache.find((r) => r.name === "Server Booster")) {
    return true;
  }
  if (member.roles.cache.find((r) => r.name === "Streamers")) {
    return true;
  }
  if (member.roles.cache.find((r) => r.name === "Giveaway Sponsor")) {
    return true;
  }
  if (member.roles.cache.find((r) => r.name === "Event winners")) {
    return true;
  }
  if (member.roles.cache.find((r) => r.name === "Influencer")) {
    return true;
  }
  return false;
}
