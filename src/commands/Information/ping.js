const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  category: "Information",
  description: "Check Ping Bot",
  args: false,
  usage: "",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    await message.reply({ content: `**Getting <@${client.user.id}>'s ping 🏓**` }).then(async (msg) => {
      var ping = msg.createdAt - message.createdAt;
      var api_ping = client.ws.ping;

      const PingEmbed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle('Ping Result')
        .addFields({name : `📡 **Pong** 📡`,value : `\`\`\`js\n${client.ws.ping} ms\`\`\``})
        .setFooter({text : `Yes, I'm still alive!`}).setThumbnail(message.author.displayAvatarURL({dynamic : true}))
      await msg.edit({ content: "** **", embeds: [PingEmbed] })
    })
  }
}