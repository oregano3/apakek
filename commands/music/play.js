import { SlashCommandBuilder } from "discord.js";
import { validateURL, YTDL } from 'ytdl-core';

/* export const config =
{
  name : "play",
  aliases : ["p"],
  description : "Plays music from link ONLY! (Or if paused, plays the music again)",
  usage : ",.play (link | search term)"
} */

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Plays music from link ONLY! (Or if paused, plays the music again')
  .addStringOption();

export async function execute(interaction) {
  try
  {
    if (!message.member.voiceChannel)
      return message.channel.send("You have to connect to a voice channel to do that !");
    const permission = message.member.voiceChannel.permissionsFor(message.client.user);
    if (!permission.has('CONNECT')) return message.channel.send("I don't have permission to connect !");
    if (!permission.has('SPEAK')) return message.channel.send("I don't have permission to play music !");
    
    var validate = YTDL.validateURL(args[0]);
    if (!validate) return message.channel.send("Invalid URL");
    message.member.voiceChannel.join()
        .then(connection =>
        {
            message.channel.send("Successfully connected !");
			var dispatcher = connection.playStream(YTDL(args[0], {quality: 'highestaudio', filter: 'audioonly'}))
				.on('end', function() {connection.disconnect();});
        })
        .catch(console.error);
    message.channel.send(`Playing : **${title}**`);
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