module.exports = {
    name: "voiceStateUpdate",
    execute(client,oldState, newState) {
        //return
  console.log("user joined vc");
  const txtChannel = client.channels.cache.get("966101775226634340"); //manually input your own channel
  const newChannelID = newState.channelId;
  const oldChannelID = oldState.channelId;
  if (newChannelID == oldChannelID) return;
  //console.log(oldState)
  if (oldChannelID === "629695220065239066") {
    //manually put the voice channel ID
    txtChannel.send(`role removed - ${newState.id}`);
    let role = newState.guild.roles.cache.get("966097737823178762"); //added this
    newState.member.roles.remove(role).catch(console.error);
  } else if (newChannelID === "629695220065239066") {
    txtChannel.send(`role given - ${newState.id}`);
    let role = oldState.guild.roles.cache.get("966097737823178762"); //change this somewhat
    oldState.member.roles.add(role).catch(console.error); //adding a catch method is always good practice
  }
    },
  };
  