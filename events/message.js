export default (bot, message) =>
{ 
  if (message.author.bot || !message.guild || !message.content.startsWith(',.')) return;
  const args = message.content.slice(2).split(" ");
  const command = args.shift().toLowerCase();
  
  bot.commands.forEach(module =>
  {
    const matchingCommand = module.get(command) || module.get(bot.aliases.get(command));
    if (typeof matchingCommand == 'object') matchingCommand.run(bot, message, args);
      else if (!matchingCommand) return;
  });

  /*ngeban orang dari ngejalanin command berdasarkan id
  if (message.author.id == "469793827322986506") return message.channel.send("gua ban lu dari bot gua wkwk");*/
};