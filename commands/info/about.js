export const config =
{
  name : "about",
  description : "Shows what this bot is all about, along with the developers' information",
  usage : ",.about"
}

export function run(bot, message, args){
  const embed = new Discord.MessageEmbed()
    .setColor(bot.config.embedColor)
    .setTitle("About")
    .setDescription("This is a bot that can do anything. Well not anything stupid of course, that would be useless.");
  bot.config.botDevelopersID.forEach(item => embed.addField("Contributor :", `<@${item}>`));
  message.channel.send(embed);
}