import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

export async function execute(interaction) {
  //await interaction.reply('Pong!');
  const before = Date.now();
  const latency = Date.now() - before;
  await interaction.reply(`**Pong!** (websocket: ${interaction.client.ws.ping.toFixed(0)} ms, delay: ${latency})`);
  /* message.channel.send("tes");
  interaction.channel.send("tes" + latency); */
}