const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, StringSelectMenuBuilder, version, Message } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const si = require("systeminformation");
const Carli = require("../../structures/Client");
module.exports = {
  name: 'stats',
  category: 'Information',
  aliases: ['stats','st','bi','botinfo'],
  description: 'Show stats bot',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
execute: async (message, args, client, prefix) => {
      
    const duration1 = moment
      .duration(message.client.uptime)
      .format(" d [days], h [hrs], m [mins], s [secs]");
      let guildsCounts = await client.guilds.cache;
    let channelsCounts = await client.channels.cache;
    let usercount = client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );
    let userCounts2 = usercount + usercount + usercount;
    const ping = client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({ name: `${client.user.username} Information`, iconURL: client.user.displayAvatarURL()})
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`**▫️ Name :** ${client.user.username}\n**▫️ Servers :** ${guildsCounts.size}\n**▫️ Channels :** ${channelsCounts.size}\n**▫️ Users :** ${usercount}\n**▫️ Discord.js :** v${version}\n**▫️ Uptime :** ${duration1}\n**▫️ Ping :** ${client.ws.ping}ms
            `)

    let MoonCarli = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId(`MoonCarli`).setLabel(`${guildsCounts.size} Servers`).setDisabled(true),
            new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`MoonCarli2`).setLabel(`${usercount} Users`).setDisabled(true),
            new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`MoonCarli3`).setLabel(`${ping}ms`).setDisabled(true)
        );
    message.reply({ embeds: [embed], components: [MoonCarli] });
  },
};
