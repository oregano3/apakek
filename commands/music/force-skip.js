export const config =
{
  name : "force-skip",
  aliases : ["fs"],
  description : "Same as skip, but WITH FORCE !!!",
  usage : ",.force-skip"
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