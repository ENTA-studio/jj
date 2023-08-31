const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "dm",
  aliases: [],
  usage: '',
  description: "DM a user in the guild",
  category: "Owner",
  cooldown: 0,
  userPermissions: "",
  botPermissions: "",
  owner: false,
  execute : async(message,args,client,prefix) => {
    let moon = ["1131610350886846655"];
    if(!moon.includes(message.author.id)) return;
`  `


    try {
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send({ embeds:[new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription(`You did not mention a user, or you gave an invalid id`)]});
      if (!args.slice(1).join(" "))
        return message.channel.send({ embeds:[new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription(`You did not specify your message`)]});
      user.user
        .send({ embeds:[new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription(args.slice(1).join(" "))]})
        .catch(() => message.channel.send({ embeds:[new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription(`That user could not be DM!`)]}))
        .then(() => message.channel.send({ embeds:[new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription(`Sent a message to ${user.user.tag}`)]}));
    } catch (e) {
      console.log(e)
    }
  },
};