const { EmbedBuilder, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder, ButtonBuilder } = require("discord.js");
const chalk = require('chalk');

module.exports = {
  name: "help",
  category: "Information",
  aliases: ["h"],
  description: "Show All Commands",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    let categories = [];
    let cots = [];
    const channel = client.channels.cache.get('1137738786177040394');
    channel.send(`Help used by ${message.author.tag} in ${message.guild.name}`);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${message.guild.name}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setDescription(`Hey ${message.member} I Am ${client.user.username} A Discord Music Bot Made To Provide You With Many Breathtaking Features And Quality Music\n\

## Music Commands
> \`play\`, \`nowplaying\`, \`join\`, \`leave\`, \`loop\`, \`pause\`, \`queue\`, \`resume\`, \`skip\`, \`volume\`, \`search\`, \`shuffle\`, \`clearqueue\`, \`stop\`, \`shuffle\`, \`skipto\`
## Filter Commands
> \`8d\`, \`bassboost\`, \`nightcore\`, \`clearfilter\`, \`distortion\`, \`filters\`, \`lofi\`, \`pitch\`, \`speed\`, \`vaporwave\`
## Playlist Commands
> \`pl-create\`, \`pl-delete\`, \`pl-savecurrent\`, \`savequeue\`, \`pl-removetrack\`, \`pl-load\`, \`pl-info\`, \`pl-list\`
## Info Commands
> \`invite\`, \`stats\`, \`badge\`, \`help\`, \`ping\`, \`profile\`, \`uptime\`
## Utility Commands
> \`afk\`, \`userinfo\`, \`serverinfo\`, \`avatar\`, \`banner\`, \`membercount\`, \`roleinfo\`
## Settings Commands
> \`247\`, \`prefix\`, \`autoplay\``)



      .setThumbnail(client.user.displayAvatarURL())
      .setImage(`https://share.creavite.co/egEtOlBf5RuXbO7J.gif`)
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

    
    if (!args[0])

      message.reply({ embeds: [embed] })

  }
}  