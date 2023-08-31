const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "invite",
  category: "Information",
  aliases: ["inv"],
  description: "Get the bot's invite link.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
        
        new ButtonBuilder()
          .setLabel("Support")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.gg/")
      );

    const mainPage = new EmbedBuilder()
      .setAuthor({ name: 'Invite Me', iconURL: client.user.displayAvatarURL() })
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("2F3136")
      .setTimestamp()
      .addFields([{ name: `Invite ${client.user.username}`, value: `**[Moon Music](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)**`, inline: true },
    { name: 'Need Help', value: `**[Support Server](https://discord.gg/)**`, inline: true },
                  ]);
    message.reply({ embeds: [mainPage], components: [row] })
  }
}
