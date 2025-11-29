export const config =
{
  name : "giveaway",
  aliases : ["ga"],
  description : "Announces a giveaway",
  usage : `,.giveaway (winners, time(s, m, h, d, w, m), item)
           s = Seconds, m = Minutes, h = Hours, d = Days, w = Weeks, m = Months`
}

export function run(bot, message, args){
  try
  {
    message.channel.send("Coming Soon !");
  }
  catch (error)
  {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("ERROR !!!")
      .setDescription(`\`\`\`${error}\`\`\``);
    message.channel.send(errorEmbed);
  }
}