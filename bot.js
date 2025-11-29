import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from 'dotenv';
import { readdir } from 'fs';
//import * as a from './config.json' with { type: "json" };

const bot = new Client({ disableMentions: 'everyone', fetchAllMembers: true, intents: [GatewayIntentBits.Guilds]} );
bot.commands = new Collection();
//bot.config = a;
//bot.aliases = new Map();
//bot.models = {};
//let queue = new Map();
config();

readdir('./events/', (error, files) => {
  if (error) return console.error(error);
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    import(`./events/${file}`)
      .then(event => {
        if (event.once) bot.once(event.name, (...args) => event.execute(...args));
          else bot.on(event.name, (...args) => event.execute(...args));
      });
  });
});

/* readdir('./models/', (error, files) =>
{
  if (error) return console.error(error);
  files.forEach(file =>
  {
    if (!file.endsWith('.js')) return; */
    /* const model = require(`./models/${file}`);
    const modelName = file.split(".")[0];
    bot.models[modelName] = model; */
    /* import(`./models/${file}`)
      .then(b => {
        const modelName = file.split(".")[0];
        bot.models[modelName] = b;
        console.log(`Loaded the model '${modelName}'.`);
      });
  });
}); */

readdir('./commands/', (moduleError, modules) => {
  if (moduleError) return console.error(moduleError);
  /* const modulesModified = Array.from(modules.map(module => `'${module}'`));
  console.log(`Loaded ${modules.length} modules: ${modulesModified.slice(0, -1).join(', ') + ', and ' + modulesModified.slice(-1)}`); */
  
  modules.forEach(module => {
    //bot.commands.set(module, new Map());
    readdir(`./commands/${module}/`, (fileError, files) => {
      if (fileError) return console.error(fileError);
      /* if (files.length == 1) console.log(`Loaded 1 command from module '${module}'`);
        else if (files.length > 1) console.log(`Loaded ${files.length} commands from module '${module}'`); */
      
      files.forEach(file => {
        import(`./commands/${module}/${file}`)
          .then(commandFile => {
            /* const commandName = file.split('.')[0];
            bot.commands.get(module).set(commandName, commandFile); */
            if ('data' in commandFile && 'execute' in commandFile) {
              bot.commands.set(commandFile.data.name, commandFile);
              console.log(`Loaded the command '${commandFile.data.name}' from module '${module}'`);
            }
          });
      });
    });
  });
});

bot.login(process.env.TOKEN);