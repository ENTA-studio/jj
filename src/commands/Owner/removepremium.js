const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "removepremium",
    aliases: ["rp", "premium-"],
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
  const embed = new EmbedBuilder()
  .setColor(client.embedColor)
  if(args[0]){
  try {
    await client.users.fetch(args[0])
  } catch (error) {
    return message.channel.send("Invalid Id");
  }
  const use = await client.data.get(`uprem_${args[0]}`)
  if(!use){
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Is Not A Premium User Only!`)]})
  }
  await client.data.delete(`uprem_${args[0]}`)
  await client.data.delete(`upremend_${args[0]}`)
  await client.data.delete(`upremcount_${args[0]}`)
  await client.data.delete(`upremserver_${args[0]}`)
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Has Been Removed From A Premium User.`)]})
  }
  else return message.channel.send({embeds: [embed.setDescription(`${prefix}removepremium <user id>`)]})
    }
}