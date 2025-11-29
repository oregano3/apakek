export const config =
{
  name : "credits",
  description : "Lists my supporters",
  usage : ",.credits"
}

export function run(bot, message){
  const Tiramitzu = bot.users.cache.get("397322976552550400");
  const Wisnu = bot.users.cache.get("263027294644207616");
  
  const embed = new Discord.MessageEmbed()
    .setColor(bot.config.embedColor)
    .setTitle("Credits")
    .setDescription(`Special Thanks to :
      ${Tiramitzu} | ${Tiramitzu.tag}
      ${Wisnu} | ${Wisnu.tag}`)
  message.channel.send(embed);
}