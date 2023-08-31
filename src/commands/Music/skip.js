const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skip",
  aliases: ["s"],
  category: "Music",
  description: "Skip the song currently playing.",
  args: false,
  usage: "",
  userPerms: [],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = message.client.manager.get(message.guild.id);

    if (!player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription("There is no music playing.");
      return message.reply({ embeds: [thing] });
    }
    const song = player.queue.current;

    player.stop();


    let thing = new EmbedBuilder()
      .setDescription("\`⏭\` | **Song has been:** `Skipped`")
            .setColor('#000001');
    return message.reply({ embeds: [thing] }).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 3000);
    });
  },
};
