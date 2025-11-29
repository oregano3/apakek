export const config =
{
  name : "queue",
  aliases : ["q"],
  description : "Shows the music queue",
  usage : ",.queue"
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