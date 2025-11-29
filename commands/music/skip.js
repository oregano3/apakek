export const config =
{
  name : "skip",
  description : "Skips the music that is currently playing",
  usage : ",.skip"
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