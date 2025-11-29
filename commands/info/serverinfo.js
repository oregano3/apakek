export const config =
{
  name : "serverinfo",
  aliases : ["server", "sinfo"],
  description : "Shows this server's details",
  usage : ",.serverinfo"
}

export async function run(bot, message){
  try
  {
    let maximumMembers, maximumPresences;
    const guild = await message.guild.fetch();
    maximumMembers = guild.maximumMembers;
    maximumPresences = guild.maximumPresences;
    
    const moment = require('moment');
    moment.locale('en-gb');
    const createdAt = `${moment(message.guild.createdAt).format('LLLL')} GMT`;
    
    let description = message.guild.description;
    if (!message.guild.description) description = "None";
    
    let large;
    if (message.guild.large == true) large = "Yes";
      else if (message.guild.large == false) large = "No";
    
    let afkChannel;
    if (message.guild.afkChannel == null) afkChannel = "None";
      else if (message.guild.afkChannel) afkChannel = message.guild.afkChannel;
    
    let afkTimeout;
    switch(message.guild.afkTimeout)
    {
      case 60 :
        afkTimeout = "1 minute";
        break;
      case 300 :
        afkTimeout = "5 minutes";
        break;
      case 900 :
        afkTimeout = "15 minutes";
        break;
      case 1800 :
        afkTimeout = "30 minutes";
        break;
      case 3600 :
        afkTimeout = "1 hour";
        break;
    }
    
    let verificationLevel;
    switch(message.guild.verificationLevel)
    {
      case "NONE" :
        verificationLevel = "None - Unrestricted"
        break;
      case "LOW" :
        verificationLevel = "Low - Must have a verified email on their Discord account."
        break;
      case "MEDIUM" :
        verificationLevel = "Medium - Must also be registered on Discord for longer than 5 minutes."
        break;
      case "HIGH" :
        verificationLevel = "High - Must also be a member of this server for longer than 10 minutes."
        break;
      case "VERY_HIGH" :
        verificationLevel = "Highest - Must have a verified phone on their Discord account."
        break;
    }
    
    let explicitContentFilter;
    switch(message.guild.explicitContentFilter)
    {
      case "DISABLED" :
        explicitContentFilter = "Explicit content filter disabled"
        break;
      case "MEMBERS_WITHOUT_ROLES" :
        explicitContentFilter = "Scan media content from members without a role"
        break;
      case "ALL_MEMBERS" :
        explicitContentFilter = "Scan media content from all members"
        break;
    }
    
    let region;
    switch(message.guild.region)
    {
      case "brazil" :
        region = ":flag_br: Brazil";
        break;
      case "europe" :
        region = ":flag_eu: Europe";
        break;
      case "hongkong" :
        region = ":flag_hk: Hongkong";
        break;
      case "india" :
        region = ":flag_in: India";
        break;
      case "japan" :
        region = ":flag_jp: Japan";
        break;
      case "russia" :
        region = ":flag_ru: Russia";
        break;
      case "singapore" :
        region = ":flag_sg: Singapore";
        break;
      case "southafrica" :
        region = ":flag_za: South Africa";
        break;
      case "sydney" :
        region = ":flag_au: Sydney";
        break;
      case "us-central" :
        region = ":flag_us: Central US";
        break;
      case "us-east" :
        region = ":flag_us: Eastern US";
        break;
      case "us-south" :
        region = ":flag_us: Southern US";
        break;
      case "us-west" :
        region = ":flag_us: Western US";
        break;
    }
    
    const page1 = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("Server Information")
      .setThumbnail(message.guild.iconURL({format : 'png', dynamic : true, size : 4096}))
      .addField("Server Name", message.guild.name)
      .addField("Owner", message.guild.owner, true)
      .addField("ID", message.guild.id)
      .addField("Description", description)
      .addField("Total Members", message.guild.memberCount, true)
      .addField("Total Human", message.guild.members.cache.filter(member => !member.user.bot).size, true)
      .addField("Large (Default : 50 members)", large, true)
      .addField("Created At", createdAt)
      .addField("Server's Region", region)
      .addField("AFK Channel", afkChannel, true)
      .addField("AFK Timeout", afkTimeout, true)
      .setImage(message.guild.bannerURL({format : 'png', size : 4096}));
    
    const page2 = new Discord.MessageEmbed()
      .setColor(bot.config.embedColor)
      .setTitle("Server Information")
      .setThumbnail(message.guild.iconURL({format : 'png', dynamic : true, size : 4096}))
      .addField("Verification Level", verificationLevel)
      .addField("Explicit Media Content Filter", explicitContentFilter)
      .addField("Maximum Members", maximumMembers, true)
      .addField("Maximum Presences", maximumPresences, true);
    
    const reactionList = ['◀️', '▶️'];
    const serverInfoPage = await message.channel.send(page1);
    for (const reaction of reactionList)
      await serverInfoPage.react(reaction);
    
    let pageCount = 1;
    const filter = (reaction, user) => reactionList.includes(reaction.emoji.name) && user.id == message.author.id;
    serverInfoPage.createReactionCollector(filter, {time : 120000, dispose : true})
      .on('collect', reaction =>
      {
        if (reaction.emoji.name == '◀️' && pageCount == 1) return;
          else if (reaction.emoji.name == '◀️' && pageCount == 2)
          {
            serverInfoPage.edit(page1);
            pageCount = 1;
          }
          else if (reaction.emoji.name == '▶️' && pageCount == 1)
          {
            serverInfoPage.edit(page2);
            pageCount = 2;
          }
        if (reaction.emoji.name == '▶️' && pageCount == 2) return;
      })
      .on('remove', reaction =>
      {
        if (reaction.emoji.name == '◀️' && pageCount == 1) return;
          else if (reaction.emoji.name == '◀️' && pageCount == 2)
          {
            serverInfoPage.edit(page1);
            pageCount = 1;
          }
          else if (reaction.emoji.name == '▶️' && pageCount == 1)
          {
            serverInfoPage.edit(page2);
            pageCount = 2;
          }
        if (reaction.emoji.name == '▶️' && pageCount == 2) return;
      })
      .on('end', () => serverInfoPage.react('❌'));
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