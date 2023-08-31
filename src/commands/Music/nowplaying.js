const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Show the current playing song.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription("There is no music playing.");
            return message.channel.send({ embeds: [thing] });
        }
        const song = player.queue.current
        const emojimusic = client.emoji.music;
        var total = song.duration;
        var current = player.position;
        
        let embed = new EmbedBuilder()
          .setAuthor({ name: `Now Playing`})
          .setDescription(`**[${song.title}](https://discord.gg/rD4FDC2kwe)**`)
          .addFields([{name:`<a:Moon_Duration:1131264731240480878> Duration`, value: `${convertTime(song.duration)}`, inline: false},
                      {name:`<:Moon_Author:1131264500985761933> Author`, value: `${song.author}`, inline: false},
                      {name: `<a:Moon_requester:1131264403065557062> Requester`, value: `[${song.requester.username}](
https://discord.com/users/${song.requester.id})`, inline: false }])
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({ text: `${convertTime(current)} ${progressbar(player)} ${convertTime(total)}`})
            .setColor(client.embedColor)
            return message.channel.send({embeds: [embed]})

    }
}
