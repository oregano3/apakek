export const config =
{
  name : "hide",
  description : "Gives a 'hide' role to the specified user",
  usage : `,.hide (@user | User ID)
           Flags :
           -role (@role | Role ID) : Sets the 'hide' role to the role of your choice
           -pardon (@user | User ID) : Removes the 'hide' role from the specified user`
}

export async function run(bot, message, [member, ...reason]){
  try
  {
    if (!message.member.hasPermission(['MANAGE_ROLES', 'MUTE_MEMBERS']))
    return message.channel.send("**You don't have permission to use this command**\nRequired permissions : 'Manage Roles' and 'Mute Members'");
    
    if (!message.guild.members.cache.get('522024016521854988').hasPermission(['MANAGE_ROLES', 'MUTE_MEMBERS']))
    return message.channel.send("I don't have permission to hide\nRequired permissions : 'Manage Roles' and 'Mute Members'");
    
    if (!member)
    return message.channel.send("**No arguments !** Usage : ,.hide (@user | User ID) [reason]\n',.help hide' for flags");
    
    const tempMember = message.mentions.members.first() || message.guild.members.cache.get(member);
    if (!tempMember) return message.channel.send("User not found");
    //hideMember.
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