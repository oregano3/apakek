export const config =
{
  name : "avatar",
  aliases : ["ava"],
  description : "Shows the user's avatar",
  usage : ",.avatar [@user | User ID]"
}

export function run(bot, message, args){
  if (args == "server")
  {
    const embed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle(`${message.guild.name}'s Avatar :`)
      .setImage(message.guild.iconURL({format : 'png', dynamic : true, size : 4096}));
    return message.channel.send(embed);
  }
  
  let tempUser = message.mentions.users.first() || bot.users.cache.get(`${args[0]}`);
  if (!tempUser) tempUser = message.author;
  let title = `${tempUser.username}'s Avatar :`;
  if (tempUser == message.author) title = "Your Avatar :";
  
  const embed = new Discord.MessageEmbed()
    .setColor(bot.config.embedColor)
    .setTitle(title)
    .setImage(tempUser.displayAvatarURL({format : 'png', dynamic : true, size : 4096}));
  message.channel.send(embed);
}