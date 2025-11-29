export const config =
{
  name : "connect",
  aliases : ["join"],
  description : "Connects to the voice channel you are in",
  usage : ",.connect [Voice Channel ID]"
}

export function run(bot, message, args){
  try
  {
    if (!message.member.voice.channel) return message.channel.send("You have to connect to a voice channel to do that !");
    if (message.guild.voice) return message.channel.send("I'm already in the voice channel !");
    message.member.voice.channel.join()
      .then(message.channel.send("Successfully connected !"));
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