export const config =
{
  name : "disconnect",
  aliases : ["dc", "leave"],
  description : "Disconnects from the voice channel",
  usage : ",.disconnect"
}

export function run(bot, message, args){
  try
  {
    if (!message.member.voice.channel) return message.channel.send("You have to connect to a voice channel to do that !");
    if (!message.guild.voice || !message.guild.voice.connection) return;
    message.guild.voice.connection.disconnect()
      .then(message.channel.send("Successfully disconnected !"));
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