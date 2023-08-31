const { EmbedBuilder } = require(`discord.js`);

module.exports = {
  name : `noprefix`,
  aliases : ["np"],
  category : "Owner",
  description : "No prefix toggling",
  args : false,
  usage : "",
  owner : false,
  execute : async(message,args,client,prefix) => {
    let moon = ["1131610350886846655"];
    if(!moon.includes(message.author.id)) return;
`  `
const channel = client.channels.cache.get('1132014853180100759');
channel.send(`No-Prefix used by ${message.author.tag} in ${message.guild.name}`);
   if(!args[0]){
     return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== `client.embedColor` ? message.guild.members.me.displayHexColor : `client.embedColor`).setDescription(`\`❌\` | Correct Usage : \`${prefix}noprefix <add/remove>\` <user>\``)]})
   }

    let opt = args[0].toLowerCase();

    if(opt === `add`)
    {
      let u = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!u) { return message.reply({content : `Please Provide me a valid User.`}) }

      let d = await client.data.get(`noprefix_${u.id}`);
      if(!d) { await client.data.set(`noprefix_${u.id}`,`false`) } 
      if(d === `true`) return message.reply({content : `\`❌\` | This user is already in my no prefix system.`})
      else{
        await client.data.set(`noprefix_${u.id}`,`true`)
        return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== `client.embedColor` ? message.guild.members.me.displayHexColor : `client.embedColor`).setDescription(`\`✅\` | SuccessFully **Added** ${u} to my no prefix.`)]})
      }
    }
    if(opt === `remove`)
    {
      let u = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if(!u) { return message.reply({content : `Please Provide me a valid User.`}) }

      let d = await client.data.get(`noprefix_${u.id}`);
      if(!d) { await client.data.set(`noprefix_${u.id}`,`false`) }
      if(d === `false`) return message.reply({content : `\`❌\` | This user is already not in my no prefix system.`})
      else{
        await client.data.set(`noprefix_${u.id}`,`false`);
        return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== `client.embedColor` ? message.guild.members.me.displayHexColor : `client.embedColor`).setDescription(`\`✅\` | SuccessFully **Removed** ${u} from my no prefix.`)]})
      }
    }
  }
}