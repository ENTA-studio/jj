const { EmbedBuilder, Message, Client, PermissionsBitField , ActionRowBuilder , ButtonStyle , ButtonBuilder } = require("discord.js");
const db = require("../../schema/prefix.js");
const { afk } = require("../../utils/afk");
const moment = require("moment");
const db3 = require("../../schema/setup");
let commandCooldowns = {};

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {

        if (message.author.bot) return;
           
        let prefix = client.prefix;
        
        // blacklist

       let bl = await client.data.get(`blacklist_${client.user.id}`);

if(!bl || bl === null) { await client.data.set(`blacklist_${client.user.id}`,[]) }

        let sh = [];
Array.from(bl).forEach(x => sh.push(x));if(sh.includes(message.author.id))
{
let em = new EmbedBuilder().setColor(`#2b2d31`).setAuthor({name : `Blacklisted!`}).setDescription(`Lmao My Developer Blacklisted This Kid From using Me😂... If you think it's a mistake then join [Support Server](https://discord.gg/) and talk to Moon Carli.`);

return message.reply({embeds : [em]});
}
        // Premium system
let uprem = await client.data.get(`uprem_${message.author.id}`);
  
  let upremend = await client.data.get(`upremend_${message.author.id}`);
//user premiums scopes ^^

  let sprem = await client.data.get(`sprem_${message.guild.id}`);

  let spremend = await client.data.get(`spremend_${message.guild.id}`);

//server premium scopes ^^
  let scot = 0;
  let slink = "https://discord.gg/3rEbtYNsUu";
  if(upremend && Date.now() >= upremend) 
  {
    let upremcount = await client.data.get(`upremcount_${message.author.id}`) ? await client.data.get(`upremcount_${message.author.id}`) : 0;

  let upremserver = await client.data.get(`upremserver_$
{message.author.id}`) ? await client.data.get(`upremserver_${message.author.id}`) : [];

  let spremown = await  client.data.get(`spremown_${message.guild.id}`);
    
   await client.data.delete(`upremcount_${message.author.id}`)
    await client.data.delete(`uprem_${message.author.id}`)
    await client.data.delete(`upremend_${message.author.id}`)
    if(upremserver.length > 0){
      for(let i = 0; i < upremserver.length; i++){
        scot += 1;
        await client.data.delete(`sprem_${upremserver[i]}`)
        await client.data.delete(`spremend_${upremserver[i]}`)
        await client.data.delete(`spremown_${upremserver[i]}`)
      }
    }
   await client.data.delete(`upremserver_${message.author.id}`)
    message.author.send({embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription(`Your Premium Has Got Expired \nClick [here](https://discord.gg/) To Buy [https://discord.gg/]).`)], components: [premrow]}).catch((err) => { });
  }

  if(spremend && Date.now() >= spremend)
  { 
    let scount = 0;
    
    let us = await client.data.get(`spremown_${message.guild.id}`);
    
    let upremserver = await client.data.get(`upremserver_${us}`) ? await client.data.get(`upremserver_${us}`) : [];
    
    let upremcount = await client.data.get(`upremcount_${us}`) ? await client.data.get(`upremcount_${us}`) : 0;
    
    let spremown = await client.data.get(`spremown_${message.guild.id}`).then(r => client.data.get(`upremend_${r}`));
    
    await client.data.delete(`sprem_${message.guild.id}`)
    await client.data.delete(`spremend_${message.guild.id}`)
    
    if(spremown && Date.now() > spremown){
      await client.data.delete(`upremcount_${us}`)
      await client.data.delete(`uprem_${us}`)
      await client.data.delete(`upremend_${us}`)
      
      for(let i = 0; i < upremserver.length; i++){
        scount += 1;
        await client.data.delete(`sprem_${upremserver[i]}`)
        await client.data.delete(`spremend_${upremserver[i]}`)
        await client.data.delete(`spremown_${upremserver[i]}`)
      }
    try{
    await client.users.cache.get(`${us}`).send({embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription(`Your Premium Has Got Expired.\nClick [here](https://discord.gg/) To Buy [Premium](https://discord.gg/).`)], components: [premrow]}).catch((er) => { })
    }catch(errors) {
      
    }
    }
    await client.data.delete(`upremserver_${us}`)
    await client.data.delete(`spremown_${message.guild.id}`)
    message.channel.send({embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription(`The Premium Has Got Expired.\nClick [here](https://discord.gg/) To Buy [Premium](https://discord.gg/).`)], components: [premrow]}).catch((err) => { });
 }
// other code
        const ress = await db.findOne({ Guild: message.guildId })
        if (ress && ress.Prefix) prefix = ress.Prefix;
        let data = await db3.findOne({ Guild: message.guildId });
        if (data && data.Channel && message.channelId === data.Channel) return client.emit("setupSystem", message);

        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            const embed = new EmbedBuilder()
                .setAuthor({name:`| Settings Of ${message.guild.name} `,
      iconURL:client.user.displayAvatarURL()})
      .setThumbnail(client.user.displayAvatarURL())
                .setColor(client.embedColor)
                .setFooter({text: `Thanks For Using.`, iconURL: message.author.displayAvatarURL({ dynamic: true })})  
    
    .addFields([
            { name: '**Guild Settings**', value: `• My Prefix For This Server Is ${prefix}`, inline: true },
          
      ]);
           
 message.channel.send({ embeds: [embed] })
        };
// Afk data
const mentionedMember = message.mentions.members.first();
  if (mentionedMember) {
    const data = afk.get(mentionedMember.id);
    if (data) {
      const [timestamp, reason] = data;
      const timeAgo = moment(timestamp).fromNow();
      message.reply(
        `<@${mentionedMember.user.id}> is currently afk (${timeAgo}) - **${reason}**`
      );
    }
  }
  const getData = afk.get(message.author.id);
  if (getData) {
    afk.delete(message.author.id);
    message.reply(`Welcome Back <@${message.author.id}>, I have removed your AFK`);
  }
// no prefix
        let np = [];

      let npdata = await client.data.get(`noprefix_${message.author.id}`)
if(!npdata) {
  await client.data.set(`noprefix_${message.author.id}`,`false`)
}
if(npdata === "true"){
  np.push(message.author.id)
}
if(npdata === "false"){
  np = [];
}
      let regex = new RegExp(`^<@!?${client.user.id}>`);
      let pre = message.content.match(regex) ? message.content.match(regex)[0] : prefix;
      if(!np.includes(message.author.id)){
        if(!message.content.startsWith(pre)) return;
      }

      const args = np.includes(message.author.id) === false ? message.content.slice(pre.length).trim().split(/ +/) : message.content.startsWith(pre) === true ? message.content.slice(pre.length).trim().split(/ +/) : message.content.trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('SendMessages'))) return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('ViewChannel'))) return;

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('EmbedLinks'))) return await message.channel.send({ content: `I don't have **\`EMBED_LINKS\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        const embed = new EmbedBuilder()
            .setColor(client.embedColor)

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
            }

            embed.setDescription(reply);
            return message.channel.send({ embeds: [embed] });
        }
      const commande = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/)[0]
      .toLowerCase();
      
// Check if the command is on cooldown
    if (
      commandCooldowns[message.author.id] &&
      commandCooldowns[message.author.id][commande] &&
      commandCooldowns[message.author.id][commande] > Date.now()
    ) {
      const remainingTime =
        (commandCooldowns[message.author.id][commande] - Date.now()) / 1000;
      return message.reply(
        `Please wait ${remainingTime.toFixed(
          1
        )} more second(s) before using this command again.`
      );
    }

    // Set the command on cooldown for the specified duration
    const cooldownTime = 5 * 1000; // 10 seconds
    if (!commandCooldowns[message.author.id])
      commandCooldowns[message.author.id] = {};
    commandCooldowns[message.author.id][commande] = Date.now() + cooldownTime;
    setTimeout(() => {
      if (commandCooldowns[message.author.id])
        delete commandCooldowns[message.author.id][command];
    }, cooldownTime);
      
        if (command.botPerms) {
            if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                embed.setDescription(`I don't have **\`${command.botPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }
        if (command.userPerms) {
            if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                embed.setDescription(`You don't have **\`${command.userPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }
        
        if(command.premium)
   {
    const row = new ActionRowBuilder()
    .addComponents(new ButtonBuilder()
    .setLabel("Vote Me")
    .setStyle(ButtonStyle.Link)
    .setURL("https://top.gg/bot/"), 
    new ButtonBuilder()
    .setLabel("Premium")
    .setStyle(ButtonStyle.Link)
    .setURL("https://discord.gg/")
			);
      embed.setDescription("You need premium to use this command. If you want to disable this then [click here](https://discord.gg/) to buy [premium](https://discord.gg/) or **[Vote Me](https://top.gg/bot/) to get 3 days premium** to listen interruption free **music**!")
      .setColor(client.embedColor)
    return message.channel.send({embeds: [embed], components: [row]})
    }
        if (command.owner && message.author.id !== `${client.owner}`) {
            embed.setDescription(`Only My Developers Can Use This Command`);
            return message.channel.send({ embeds: [embed] });
        }

        const player = message.client.manager.get(message.guild.id);

        if (command.player && !player) {
            embed.setDescription("There is no player for this guild.");
            return message.channel.send({ embeds: [embed] });
        }

        if (command.inVoiceChannel && !message.member.voice.channelId) {
            embed.setDescription("You must be in a voice channel!");
            return message.channel.send({ embeds: [embed] });
        }

        if (command.sameVoiceChannel) {
            if (message.guild.members.me.voice.channel) {
                if (message.guild.members.me.voice.channelId !== message.member.voice.channelId) {
                    embed.setDescription(`You must be in the same channel as ${message.client.user}!`);
                    return message.channel.send({ embeds: [embed] });
                }
            }
        }


        try {
            command.execute(message, args, client, prefix);
        } catch (error) {
            console.log(error);
            embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
            return message.channel.send({ embeds: [embed] });
          
        }
    }
};
