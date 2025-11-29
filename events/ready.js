/* export default (bot) =>
{
  require("mongoose").connect(process.env.DATABASE)
    .then(console.log("MongoDB successfully connect"));
  //bot.user.setActivity("Type ,.help for help");
  console.log("Ready");
}; */

import { Events } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;
export function execute(client) {
  console.log(`Ready! Logged in as ${client.user.tag}`);
}