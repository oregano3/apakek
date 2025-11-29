export const config =
{
  name : "pause",
  description : "Pauses the music that is currently playing",
  usage : ",.pause"
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