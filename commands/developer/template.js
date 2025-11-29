export const config =
{
  name : "template",
  aliases : ["temp"], //optional
  description : "This is a template command with no real use whatsoever",
  usage : ",.template [some arguments]"
}

export function run(bot, message, args){
  try
  {
    let argsModified;
    if (args.length == 1) argsModified = args;
      else if (args.length == 2) argsModified = args.slice(0, -1)+' and '+args.slice(-1);
      else if (args.length > 2) argsModified = args.slice(0, -1).join(', ')+', and '+args.slice(-1);
    
    if (args.length) return message.channel.send(`This is a template command with the args ${argsModified}`);
    const embed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setThumbnail("https://cdn.glitch.com/55282dfb-2fa2-4fb7-bf78-fcf34fe87945%2FCute%20Anime.gif?1593782978128")
      .setAuthor("Embed Author")
      .setTitle("Embed Title")
      .setDescription("Embed Description")
      .addField("Field Title", "Field Description", true)
      .addField("Field Title", "Field Description", true);
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