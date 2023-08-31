const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { Player } = require("erela.js");
const chalk = require('chalk');

module.exports = {
  name: "play",
  category: "Music",
  aliases: ["p"],
  description: "Plays audio from any supported source.",
  args: true,
  usage: "<Song Name>",
  userPerms: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    
    const channel1 = client.channels.cache.get('1137738786177040394');
   channel1.send(`Play used by ${message.author.tag} in ${message.guild.name}`);
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(["Speak", "Connect"])
      )
    )
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(
              `❌ | I don't have enough permissions to execute this command! Please give me permission to CONNECT or SPEAK.`
            ),
        ],
      });
    const { channel } = message.member.voice;
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(channel)
        .has(PermissionsBitField.resolve(["Speak", "Connect"]))
    )
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(
              `❌ | I don't have enough permissions connect your VC! Please give me permission to CONNECT or SPEAK.`
            ),
        ],
      });

    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist;

    /**
     * @type {Player}
     */
    let player = client.manager.get(message.guild.id);

    if (!player)
      player = await client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: true,
        volume: 70,
      });

    if (player.state != "CONNECTED") await player.connect();
    const search = args.join(" ");
    if(args.join(" ").includes(`https://youtu.be`)) {
      return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== `#000000` ? message.guild.members.me.displayHexColor : `#2f3136`).setDescription(`Due to recent pressure from both Discord and Google, we don't play from YouTube. This will most likely be a permanent change in order to avoid the bot being unverified`)]})
    }
    if(args.join(" ").includes(`youtube`)) {
      return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== `#000000` ? message.guild.members.me.displayHexColor : `#2f3136`).setDescription(`Due to recent pressure from both Discord and Google, we don't play from YouTube. This will most likely be a permanent change in order to avoid the bot being unverified`)]})
    }
      if(args.join(" ").includes(`bit.ly`)) {
      return message.channel.send({embeds : [new EmbedBuilder().setColor(message.guild.members.me.displayHexColor !== `#000000` ? message.guild.members.me.displayHexColor : `#2f3136`).setDescription(`We Don't Support This Link`)]})
}

    let res;
    try {
      res = await player.search(search, message.author);
      if (!player)
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
              .setTimestamp()
              .setDescription("Nothing is playing right now.."),
          ],
        });
      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(
        `This Song/Playlist has errors try playing another song/playlist.`
      );
    }
    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
              .setTimestamp()
              .setDescription(`❌ | No matches found for - ${search}`),
          ],
        });
      case "TRACK_LOADED":
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTimestamp()
            .setDescription(`**Added To Queue**
            [${track.title}](https://discord.gg/)\n\n 🙋 Requested by [${track.requester.username}](
https://discord.com/users/${track.requester.id})\n\n <⌛ Duration ${convertTime(track?.duration ?? queue.duration)}\n\n ✍️ By ${track.author}`
            );
          return message.channel.send({ embeds: [thing] });
        }
      case "PLAYLIST_LOADED":
        player.queue.add(res.tracks);
        if (
          !player.playing &&
          !player.paused &&
          player.queue.totalSize === res.tracks.length
        )
          player.play();
        const thing = new EmbedBuilder()
          .setColor(client.embedColor)
          .setTimestamp()
          .setDescription(`**Playlist
            🎵 [Added All Songs From The Playlist To Queue](https://discord.gg/)**`
          );
        return message.channel.send({ embeds: [thing] });
      case "SEARCH_RESULT":
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`**Added To Queue**
            [${track.title}](https://discord.gg/)\n\n 🙋 Requested by [${track.requester.username}](
https://discord.com/users/${track.requester.id})\n\n ⌛ Duration ${convertTime(track?.duration ?? queue.duration)}\n\n ✍️ By ${track.author}`
            );
          return message.channel.send({ embeds: [thing] });
        }
    }
  },
};
