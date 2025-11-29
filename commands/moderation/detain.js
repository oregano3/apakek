module.exports.config =
{
  name : "detain",
  description : "GTFOutta here !!!",
  usage : "detain (@user | User ID) [reason]"
}

module.exports.run = (bot, message, [mention, ...reason]) =>
{
  try
  {
    if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS"))
    return message.channel.send("You don't have permission to use this command");
    
    if(!bot.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send("I don't have permission to detain");
    
    if(message.mentions.members.size == 0)
    return message.channel.send("No arguments ! Usage : ',.detain @mention [reason]'");
    
    const detainMember = message.mentions.members.first();
    //detainMember.
  }
  catch (error)
  {
    const errorEmbed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("ERROR !!!")
      .setDescription(`\`\`\`${error}\`\`\``);
    message.channel.send(errorEmbed);
  }
};