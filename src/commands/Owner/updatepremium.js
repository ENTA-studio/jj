const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "updatepremium",
    aliases: ["up", "upremium"],
    category: "Owner",
    args: true,
    description: "",
    args: false,
    permission: [],
    owner: false,
    execute : async (message,args,client,prefix) => {
    let moon = ["1131610350886846655"];
    if(!moon.includes(message.author.id)) return;
`  `
    const em1 = new EmbedBuilder();
    let time;
    let count;
  const embed = new EmbedBuilder()
  .setColor(embedColor)
  if(args[0]){
  try {
    await client.users.fetch(args[0])
  } catch (error) {
    return message.channel.send("Invalid Id");
  }
  if(args[1])
  {
    time = Date.now() + 86400000 * args[1];
  }
  else if(!args[1])
  {
    time = await client.data.get(`upremend_${args[0]}`);
  }
  if(args[2]){
    count = args[2];
  }
  if(!args[2]){
    count = await client.data.get(`upremcount_${args[0]}`) ? await client.data.get(`upremcount_${args[0]}`) : 0;
  }
  await client.data.set(`uprem_${args[0]}`, `true`)
  await client.data.set(`upremend_${args[0]}`, time)
  await client.data.set(`upremcount_${args[0]}`, count)
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}>'s Premium Has Been Updated\nPremium Count - \`${count}\`    Premium Expiring - <t:${Math.round(time / 1000)}>`)]})
  }
  else return message.channel.send({embeds: [embed.setDescription(`${prefix}updatepremium <user id> <time> <server count>`)]})
    }
}
/*
Math.round((Date.now() + 86400000 * 1) / 1000)
*/