const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "badge", 
  category: "Information",
  description: "Check badge",
  args: false,
  usage: "",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

  

      const BadgeEmbed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`**__ BADGES__**`)
        .addFields({name : `These Are The Badges Of Moon Music Want Badges? Then Join My Support Server`,value : `<:Apple_developer:1114086491807813692>・**Developer**\n<:Apple_owner:1114086658523025490>・**Owner**\n<:Apple_Staff:1114086729767465020>・**Staff**\n<:Apple_VIP:1114086805713719437>・**VIP**\n<:Apple_friends:1114086818024005693>・**Friend**\n<:Apple_SUPPORTER:1114086871119712307>・**Supporter**`})
        .setFooter({text : `Moon Music badges!`}).setThumbnail(message.author.displayAvatarURL({dynamic : true}))
      message.channel.send({ content: "** **", embeds: [BadgeEmbed] })
  }
}