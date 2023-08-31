const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "addpremium",
    aliases: ["addp", "premium+"],
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
  let arr = [];
  const embed = new EmbedBuilder()
  .setColor(client.embedColor)
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
    time = Date.now() + 86400000 * 1;
  }
  if(args[2]){
    count = args[2];
  }
  if(!args[2]){
    count = 0;
  }
  client.data.set(`uprem_${args[0]}`, `true`)
  client.data.set(`upremend_${args[0]}`, time)
  client.data.set(`upremcount_${args[0]}`, count)
  client.data.set(`upremserver_${args[0]}`, arr)
  return message.channel.send({embeds: [embed.setDescription(`<@${args[0]}> Has Been Added As A Premium User\nPremium Count: \`${count}\`    Premium Expiring - <t:${Math.round(time / 1000)}>`)]})
  }
  else return message.channel.send({embeds: [embed.setDescription(`${prefix}addpremium <user id> <time> <server count>`)]})
    }
}