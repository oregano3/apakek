export const config =
{
  name : "kick",
  description : "Kicks the specified user from the server",
  usage : ",.kick (@user | User ID) [reason]"
}

export async function run(bot, message, [member, ...reason]){
  try
  {
    if (!message.member.hasPermission('KICK_MEMBERS'))
    return message.channel.send("**You don't have permission to use this command**\nRequired permission : 'Kick Members'");
    
    if (!message.guild.members.cache.get('522024016521854988').hasPermission('KICK_MEMBERS'))
    return message.channel.send("I don't have permission to kick\nRequired permission : 'Kick Members'");
    
    if (!member)
    return message.channel.send("**No arguments !** Usage : ,.kick (@user | User ID) [reason]");
    
    const tempMember = message.mentions.members.first() || message.guild.members.cache.get(member);
    if (!tempMember) return message.channel.send("User not found");
    await tempMember.send(`${message.member} kicked you from '${message.guild.name}' ${reason.length ? `\nReason : ${reason.join(' ')}` : "with no included reason"}`);
    tempMember.kick(`Kicked by ${message.author.username} ${reason.length ? `with reason : ${reason.join(' ')}` : "with no included reason"}`)
      .then(memberKicked => 
      {
        const embed = new Discord.MessageEmbed()
          .setColor(bot.config.embedColor)
          .setTitle("Someone just got kicked !")
          .setDescription(`${memberKicked} was kicked by ${message.member} ${reason.length ? `\nReason : ${reason.join(' ')}` : "with no included reason"}`);
        message.channel.send(embed);
      });
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