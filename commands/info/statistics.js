export const config =
{
  name : "statistics",
  aliases : ["stats", "stat"],
  description : "Statistics command",
  usage : ",.statistics"
}

export function run(bot, message, args){
  try
  {
    /*console.log(process);
    message.channel.send("liat console coba");*/

    const test =
    `\`\`\`tes
    tes\`\`\``

    function formatBytes(bytes, decimals = 2)
    {
      if (bytes === 0) return '0 Bytes';
  
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
      const i = Math.floor(Math.log(bytes) / Math.log(k));
  
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const embed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("Bot Statistics")
      .setDescription(formatBytes(process.memoryUsage().heapUsed))
      //.setDescription(process.resourceUsage())
      //.setDescription(process.cpuUsage())
      //.setDescription(process.uptime())
      //.setDescription(process.platform)
    message.channel.send(embed);
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