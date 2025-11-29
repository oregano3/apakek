export const config =
{
  name : "mute",
  description : "Gives a 'mute' role to the specified user",
  usage : `,.mute (@user | User ID)
           Flags :
           -role (@role | Role ID) : Sets the 'mute' role to the role of your choice
           -pardon (@user | User ID) : Removes the 'mute' role from the specified user`
}

export async function run(bot, message, [member, ...reason]){
  try
  {
    if (!message.member.hasPermission(['MANAGE_ROLES', 'MUTE_MEMBERS']))
    return message.channel.send("**You don't have permission to use this command**\nRequired permissions : 'Manage Roles' and 'Mute Members'");
    
    if (!message.guild.members.cache.get('522024016521854988').hasPermission(['MANAGE_ROLES', 'MUTE_MEMBERS']))
    return message.channel.send("I don't have permission to mute\nRequired permissions : 'Manage Roles' and 'Mute Members'");
    
    if (!member)
    return message.channel.send("**No arguments !** Usage : ,.mute (@user | User ID) [reason]\n',.help mute' for flags");
    
    const tempMember = message.mentions.members.first() || message.guild.members.cache.get(member);
    if (!tempMember) return message.channel.send("User not found");
      else if (!tempMember.manageable) return message.channel.send("I don't have permission to mute because my role is lower than the specified user");
    
    const guildSettings = await bot.models.GuildSetting.findOne({guild : message.guild.id}).exec();
    let role = message.guild.roles.cache.get(guildSettings ? guildSettings.role_muted : undefined);
    if (!role)
    {
      role = await message.guild.roles.create({data : {name : "Muted"}, reason : "Create mute role"});
      message.guild.channels.cache.filter(channel => channel.manageable).forEach(channel => channel.createOverwrite(role, {"SEND_MESSAGES" : false, "SPEAK" : false}));
      await bot.models.GuildSetting.findOneAndUpdate({guild : message.guild.id}, {guild : message.guild.id, role_muted : role.id}, {upsert : true, new : true});
    }
    
    if (await bot.models.UserMuted.findOne({guild : message.guild.id, user_id : tempMember.id}).exec()) return message.channel.send("Kasian gempa");
    if (tempMember.voice.channel) await tempMember.edit({mute : true}, reason.join(' '));
    await bot.models.UserMuted.insert({guild : message.guild.id, user_id : tempMember.id}).exec();
    await tempMember.roles.add(role, reason.join(' '));
    const embed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("Someone just got muted !")
      .setDescription(`${tempMember} was muted by ${message.member} ${reason.length ? `\nReason : ${reason.join(' ')}` : "with no included reason"}`);
    message.channel.send(embed);
    //message.channel.send(`${tempMember} is succesfully muted.`);
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