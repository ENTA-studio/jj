const { EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle } = require("discord.js");

module.exports = {
  name: "autoplay",
  aliases: ["ap"],
  category: "Config",
  premium: true,
  description: "Toggle music autoplay.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
      
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
      
    const player = client.manager.get(message.guild.id);

    const autoplay = player.get("autoplay");

    const emojireplay = "➰";

    if (!player.queue.current)
      return message.reply({
        content: `Please Play A Song Before Using This Command.`,
      });
    
    const uri = player.queue.current.uri;
    if (!(uri.includes("youtube.") || uri.includes("youtu.be")))
    return message.reply({
      content: `Autoplay Feature Is Currently **Not Available** For This Source`
    });

    if (autoplay) {
      player.set("autoplay", false);
      let notherposeidon = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTimestamp()
        .setAuthor({name:`Autoplay Is Now Disabled`});
      return message.channel.send({ embeds: [notherposeidon] });
    } else {
      const identifier = player.queue.current.identifier;
      player.set("autoplay", true);
      player.set("requester", client.user);
      player.set("identifier", identifier);
      const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
      const res = await player.search(search, message.author);
      player.queue.add(
        res.tracks[Math.floor(Math.random() * res.tracks.length) ?? 1]
      );
      let notherposeidon2 = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTimestamp()
        .setAuthor({name:`Autoplay Is Now Enabled`})

      return message.channel.send({ embeds: [notherposeidon2] });
    }
  },
};
