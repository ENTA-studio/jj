const { EmbedBuilder, ActionRowBuilder, ButtonStyle, SelectMenuBuilder, Events, ButtonBuilder, editEmbed } = require("discord.js");
const Carli = require("./structures/Client");
const host = require('express')();
host.get('/', (req, res) => res.send('Moon Music On Top'));
host.listen(2023);
const client = new Carli();

client.connect()

module.exports = client; 

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;
  
process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p);
});
  
process.on('uncaughtException', (err, origin) => {
    console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(err, origin);
});
    
    let options = interaction.values;
    const carli = options[0]


if(carli === 'cplaylist') {
  const embed2 = new EmbedBuilder()
    .setAuthor({name:`Playlist`,
      iconURL:client.user.displayAvatarURL()})
      .setDescription(`\n\n\`pl-create\`, \`pl-delete\`, \`pl-savecurrent\`, \`savequeue\`, \`pl-removetrack\`, \`pl-load\`, \`pl-info\`, \`pl-list\`\n\n`)
  .setThumbnail(interaction.member.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
  .setFooter({ text: `Thanks For Using Moon Music`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})})
  
        interaction.reply({ embeds: [embed2], ephemeral: false })
        return
}
if(carli === 'cinfo') {
  const embed4 = new EmbedBuilder()
    .setAuthor({name:`Info`,
      iconURL:client.user.displayAvatarURL()})
      .setDescription(`\n\n\`invite\`, \`stats\`, \`badge\`, \`help\`, \`ping\`, \`profile\`, \`uptime\`\n\n`)
  .setThumbnail(interaction.member.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
  .setFooter({ text: `Thanks For Using Moon Music`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true })})
  
        interaction.reply({ embeds: [embed4], ephemeral: false })
        return
}
if(carli === 'cfilters') {
  const embed3 = new EmbedBuilder()
    .setAuthor({name:`Filters`,
      iconURL:client.user.displayAvatarURL()})
      .setDescription(`\n\n\`8d\`,\`bassboost\`, \`nightcore\`, \`clearfilter\`, \`distortion\`, \`filters\`, \`lofi\`, \`pitch\`, \`speed\`. \`vaporwave\`\n\n`)
  .setThumbnail(interaction.member.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
  .setFooter({ text: `Thanks For Using Moon Music`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})})
  
        interaction.reply({ embeds: [embed3], ephemeral: false })
        return
}
if(carli === 'cmusic') {
  const embed5 = new EmbedBuilder()
    .setAuthor({name:`Music`,
      iconURL:client.user.displayAvatarURL()})
      .setDescription(`\n\n\`play\`, \`nowplaying\`, \`join\`, \`leave\`, \`loop\`, \`pause\`, \`queue\`, \`resume\`, \`skip\`, \`volume\`, \`search\`, \`shuffle\`, \`clearqueue\`, \`stop\`, \`shuffle\`, \`skipto\`\n\n`)
  .setThumbnail(interaction.member.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
  .setFooter({ text: `Thanks For Using Moon Music`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})})
  
        interaction.reply({ embeds: [embed5], ephemeral: false })
        return
}
  if(carli === 'csetting') {
  const embed6 = new EmbedBuilder()
    .setAuthor({name:`Settings`,
      iconURL:client.user.displayAvatarURL()})
      .setDescription(`\n\n\`247\`, \`prefix\`, \`autoplay\`\n\n`)
  .setThumbnail(interaction.member.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
  .setFooter({ text: `Thanks For Using Moon Music`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})})
  
        interaction.reply({ embeds: [embed6], ephemeral: false })
        return
  }
if(carli === 'cutility') {
  const utility = new EmbedBuilder()
    .setAuthor({name:`Utility`,
      iconURL:client.user.displayAvatarURL()})
      .setDescription(`\n\n\`afk\`, \`userinfo\`, \`serverinfo\`, \`avatar\`, \`banner\`, \`membercount\`, \`roleinfo\`\n\n`)
  .setThumbnail(interaction.member.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
  .setFooter({ text: `Thanks For Using Moon Music`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})})
  
        interaction.reply({ embeds: [utility], ephemeral: false })
return
  }
module.exports = client;

  
})
