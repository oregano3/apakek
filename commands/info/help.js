export const config =
{
  name : "help",
  aliases : ["?"],
  description : "Lists bot commands",
  usage : ",.help"
}

export function run(bot, message, args){
  try
  {
    if (args.length)
    {
      for (const key of bot.commands.keys())
      {
        const module = bot.commands.get(key);
        const matchingCommand = module.get(args[0].toLowerCase()) || module.get(bot.aliases.get(args[0].toLowerCase()));
        if (typeof matchingCommand == 'object')
        {
          let aliases;
          if (matchingCommand.config.aliases) aliases = matchingCommand.config.aliases;
            else if (!matchingCommand.config.aliases) aliases = "None";

          const embed = new Discord.MessageEmbed()
            .setColor(bot.config.embedColor)
            .setThumbnail("https://cdn.glitch.com/55282dfb-2fa2-4fb7-bf78-fcf34fe87945%2FYoutube%20Channel%20Avatar.jpg")
            .setTitle("Yeah, about the command...")
            .addField("Name :", matchingCommand.config.name)
            .addField(aliases.length == 1 ? "Alias" : "Aliases", aliases)
            .addField("Description :", matchingCommand.config.description)
            .addField("Usage :", matchingCommand.config.usage)
            .setFooter("() = Required, [] = Optional");
          return message.channel.send(embed);
        }
      }
      const embed = new Discord.MessageEmbed()
        .setColor(bot.config.embedColor)
        .setThumbnail("https://cdn.glitch.com/55282dfb-2fa2-4fb7-bf78-fcf34fe87945%2FYoutube%20Channel%20Avatar.jpg")
        .setTitle("apakek Commands List");
      for (const key of bot.commands.keys())
      {
        const commands = Array.from(bot.commands.get(key).keys()).join(', ');
        embed.addField(key, commands);
      }
      return message.channel.send(embed);
    }
    else if (!args.length)
    {
      const embed = new Discord.MessageEmbed()
        .setColor(bot.config.embedColor)
        .setThumbnail("https://cdn.glitch.com/55282dfb-2fa2-4fb7-bf78-fcf34fe87945%2FYoutube%20Channel%20Avatar.jpg")
        .setTitle("apakek Commands List");
      for (const key of bot.commands.keys())
      {
        const commands = Array.from(bot.commands.get(key).keys()).join(', ');
        embed.addField(key, commands);
      }
      return message.channel.send(embed);
    }
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