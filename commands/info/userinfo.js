export const config =
{
  name : "userinfo",
  aliases : ["user", "uinfo"],
  description : "Shows user details",
  usage : ",.userinfo [@user | User ID]"
}

export function run(bot, message, args){
  let tempUser = message.mentions.users.first() || bot.users.cache.get(`${args[0]}`);
  if (!tempUser) tempUser = message.author;
  
  const moment = require('moment');
  moment.locale('en-gb');
  const createdAt = `${moment(tempUser.createdAt).format('LLLL')} GMT`;
  const joinedAt = `${moment(message.guild.members.cache.get(tempUser.id).joinedAt).format('LLLL')} GMT`;
  
  let userIsBot;
  if (tempUser.bot == true) userIsBot = "Yes";
    else if (tempUser.bot == false) userIsBot = "No";
  
  if (message.guild.members.cache.get(tempUser.id).premiumSince == null)
  {
    const embed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("User Information")
      .setThumbnail(tempUser.displayAvatarURL({format : 'png', dynamic : true, size : 4096}))
      .addField("Username", `${tempUser} | ${tempUser.username}`, true)
      .addField("Bot ?", userIsBot, true)
      .addField("Created At", createdAt)
      .addField("Joined Since", joinedAt)
      .addField("ID", tempUser.id)
    return message.channel.send(embed);
  }
  else if (message.guild.members.cache.get(tempUser.id).premiumSince != null)
  {
    const serverBoostSince = `${moment(message.guild.members.cache.get(tempUser.id).premiumSince).format('LLLL')} GMT`;
    const embed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("User Information")
      .setThumbnail(tempUser.displayAvatarURL({format : 'png', dynamic : true, size : 4096}))
      .addField("Username", `${tempUser} | ${tempUser.username}`, true)
      .addField("Bot ?", userIsBot, true)
      .addField("Created At", createdAt)
      .addField("Joined Since", joinedAt)
      .addField("premiumSince", message.guild.members.cache.get(tempUser.id).premiumSince)
      .addField("Server Booster", "Yes", true)
      .addField("Boosting Server Since", serverBoostSince, true)
      .addField("ID", tempUser.id)
    return message.channel.send(embed);
  }
  
  /*let presence;
  if (!tempUser.presence.activities)
    presence = "None";
  else if (tempUser.presence.activities)
  {
    if (tempUser.presence.activities[0].name == "Custom Status" && tempUser.presence.activities[1])
      presence = `Custom Status : ${tempUser.presence.activities[0].state} \n and playing ${tempUser.presence.activities[1].name}`;
    else if (tempUser.presence.activities[0].name == "Custom Status")
      presence = `Custom Status : ${tempUser.presence.activities[0].state}`;
    else if (tempUser.presence.activities[0])
      presence = tempUser.presence.activities[0].name;
  }*/
}