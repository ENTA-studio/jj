const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require(`discord.js`);
  module.exports = {
    name: `vaporwave`,
    category: `Filters`, 
    description: `Applies a vaporwave Filter`,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
            const player = message.client.manager.get(message.guild.id);
        if (!player.queue.current) {
            let think = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name: `There Is No Music Playing`});
            return message.reply({ embeds: [think] });
        }

           const embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({ name: `Vaporwave Filter`});

    const but = new ButtonBuilder()
      .setCustomId("clear_but")
      .setLabel("OFF")
      .setStyle(ButtonStyle.Danger);
    const but2 = new ButtonBuilder()
      .setCustomId("vaporwave_but")
      .setLabel("ON")
      .setStyle(ButtonStyle.Success);

    const but_ = new ButtonBuilder()
      .setCustomId("clear_but_")
      .setLabel("OFF")
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true);
    const but_2 = new ButtonBuilder()
      .setCustomId("vaporwave_but_")
      .setLabel("ON")
      .setStyle(ButtonStyle.Success)
      .setDisabled(true);

    const row1 = new ActionRowBuilder().addComponents(but, but_2);
    const row2 = new ActionRowBuilder().addComponents(but2, but_);
    const row3 = new ActionRowBuilder().addComponents(but2, but_);

    const m = await message.channel.send({ embeds: [embed], components: [row3] });

      const embed1 = new EmbedBuilder().setColor(client.embedColor);
      const collector = m.createMessageComponentCollector({
            filter: (f) => f.user.id === message.author.id ? true : false && f.deferUpdate().catch(() => { }),
            time: 600000,
            idle: 600000 / 2
        });

      collector.on("collect", async (b) => {
      if (!b.replied) await b.deferUpdate({ ephemeral: true });
        if (b.customId === "clear_but") {
        player.clearEffects();
        return await b.editReply({
          embeds: [ embed1.setAuthor({ name: `Vaporwave Filter DISABLED`}), ], components: [row2],});
      } else if (b.customId === "vaporwave_but") {
        await player.setDistortion(true);
        return await b.editReply({
          embeds: [
            embed1.setAuthor({ name: `Vaporwave Filter ENABLED`}),
          ],
          components: [row1],
        });
      }
    });

  },
};