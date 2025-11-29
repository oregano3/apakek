export const config =
{
  name : "test",
  description : "This is a test command",
  usage : ",.test [args]"
}

export function run(bot, message, [tes, ...other]){
  if (!bot.config.botDevelopersID.includes(message.author.id)) return message.channel.send("You don't have permission to use this command");
  try
  {
    let embed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("Test Command")
      .setDescription(typeof tes);
    message.channel.send(embed);
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