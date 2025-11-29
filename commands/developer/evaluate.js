export const config =
{
  name : "evaluate",
  aliases : ["eval"],
  description : "Evaluates Javascript code",
  usage : ",.evaluate (Javascript code)"
}

export function run(bot, message, args){
  if (!bot.config.botDevelopersID.includes(message.author.id)) return message.channel.send("You don't have permission to use this command");
  try
  {
    const code = args.join(' ');
    if (!code) return message.channel.send("You must provide a command name to evaluate");
    else if (/token/i.test(code) || /env/.test(code))
    {
      const embed = new Discord.MessageEmbed()
        .setColor(bot.config.embedColor)
        .setDescription(`\`\`\`Don't even try...\`\`\``);
      return message.channel.send(embed);
    }
    let output = eval(code);
    if (typeof output != "string") output = require("util").inspect(output, {depth : 0});
    if (output.length > 2000) return message.channel.send("Result too long to send, try hastebin-ing it");
    const embed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setDescription(`\`\`\`${output}\`\`\``);
    return message.channel.send(embed);
  }
  catch (error)
  {
    const embed = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("ERROR !!!")
      .setDescription(`\`\`\`${error}\`\`\``);
    message.channel.send(embed);
  }
}