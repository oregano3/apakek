export const config =
{
  name : "reload",
  description : "Reloads a command by clearing the RAM's cache",
  usage : ",.reload (command name)"
}

export function run(bot, message, args){
  if (!bot.config.botDevelopersID.includes(message.author.id)) return message.channel.send("You don't have permission to use this command");
  if (!args.length) return message.channel.send("You must provide a command name to reload");
  
  try
  {
    let aliasResolver = bot.aliases.get(args[0]);
    if (!aliasResolver) aliasResolver = args[0];
      else aliasResolver.toLowerCase();

    for (const key of bot.commands.keys())
    {
      const module = bot.commands.get(key);
      const matchingCommand = module.get(aliasResolver);
      if (typeof matchingCommand == 'object')
      {
        delete require.cache[require.resolve(`../${key}/${aliasResolver}.js`)];
        module.delete(aliasResolver);
        const commandFile = require(`../${key}/${aliasResolver}.js`);
        module.set(aliasResolver, commandFile);
        return message.channel.send(`The command '${aliasResolver}' has been reloaded`);
      }
    }
    message.channel.send("Command not found");
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