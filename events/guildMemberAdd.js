export default async (bot, member) =>
{
  const guildSetting = await bot.models.GuildSetting.findOne({ guild: member.guild.id }).exec();
  if (!guildSetting) return;
  const role = member.guild.roles.cache.get(guildSetting.role_muted);
  if (!role) return;
  const userMuted = await bot.models.UserMuted.findOne({ guild: member.guild.id, user_id: member.id }).exec();
  if (!userMuted) return;
  member.roles.add(role, "Evading mute");
};