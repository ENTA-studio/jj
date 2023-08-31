//Buttons Starting = line 91
//Manage Queue Dropdown = line 181

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, WebhookClient } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { trackStartEventHandler } = require("../../utils/functions");
const db = require("../../schema/setup");
const moment = require("moment");
require("moment-duration-format");
module.exports = async (client, player, track, payload) => {


let guild2 = client.guilds.cache.get(player.guild);
const channel2 = guild2.channels.cache.get(player.textChannel);
if(player.queue.current.duration < 30000) 

        {

         player.stop();

         return channel2.send({embeds : [

                new EmbedBuilder().setColor(client.embedColor).setDescription(`I am skipping [${track.title}](https://discord.gg/5F4EywGBvu) this song as its duration is less than 30 seconds`)

            ]});

           }
    
    const server = client.guilds.cache.get(player.guild);

   
  
  let guild = client.guilds.cache.get(player.guild);
  if (!guild) return;
  let channel = guild.channels.cache.get(player.textChannel);
  if (!channel) return;
  let data = await db.findOne({ Guild: guild.id });
  if (data) {
    if (!data.Channel) data.Channel = channel.id;

    let textChannel = guild.channels.cache.get(data.Channel);
    console.log(data.Channel + "" + textChannel);
    if (!textChannel) {
      try {
        textChannel = await guild.channels.fetch(data.Channel);
      } catch {
        channel.send("Please run /setup as I am unable to find the channel");
        textChannel = channel;
      }
    }

    const id = data.Message;
    if (channel.id === textChannel.id) {
      return await trackStartEventHandler(
        id,
        textChannel,
        player,
        track,
        client
      );
    } else {
      await trackStartEventHandler(id, textChannel, player, track, client);
    }
  }
  
  const queue = player.get("dcQ");
  const thing = new EmbedBuilder()
    .setAuthor({ name: `Now Playing` })
    .setDescription(`[${track.author} - ${track?.title ?? queue.title}](https://discord.gg/rD4FDC2kwe)`)
    .addFields([
    {
      name: '✍️ Author',
      value: `${track.author}`,
      inline: false,
    },
    {
      name: '🙋 Requested by',
      value: `[${track.requester.username}](
https://discord.com/users/${track.requester.id})`,
      inline: false,
    },
     {
      name: '⌛ Duration',
      value: `${convertTime(track?.duration ?? queue.duration)}`,
      inline: false,
    },
  ])
    .setThumbnail(track.requester.displayAvatarURL( {dynamic : true }))
    .setColor(client.embedColor)
    .setFooter({ text: `Thanks For Using Moon Music`});

//Buttons Starting
  const MoonCarli1 = new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji('1123583072013664266')
    .setStyle(ButtonStyle.Secondary);
  const MoonCarli2 = new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji('1123583308673073192')
    .setStyle(ButtonStyle.Secondary);
  const MoonCarli3 = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji('1123583149348237372')
    .setStyle(ButtonStyle.Secondary);
  const MoonCarli4 = new ButtonBuilder()
    .setCustomId("loop")
    .setEmoji('1123574557706567771')
    .setStyle(ButtonStyle.Success);
  const MoonCarli5 = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji('1123583416709947453')
    .setStyle(ButtonStyle.Danger);
  const MoonCarli6 = new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji('1123583072013664266')
    .setStyle(ButtonStyle.Secondary);
  const MoonCarli7 = new ButtonBuilder()
    .setCustomId("resume")
    .setEmoji('1123583259687792711')
    .setStyle(ButtonStyle.Success);
    const MoonCarli8 = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji('1123583149348237372')
    .setStyle(ButtonStyle.Secondary);
  const MoonCarli9 = new ButtonBuilder()
    .setCustomId("loop")
    .setEmoji('1123574557706567771')
    .setStyle(ButtonStyle.Success);
  const MoonCarli10 = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji('1123583416709947453')
    .setStyle(ButtonStyle.Danger);
  
//Manage Queue Dropdown
    const CarliManageQueue = new ActionRowBuilder()
      .addComponents(
    new StringSelectMenuBuilder()
    .setCustomId("Manage_Queue")
    .setPlaceholder('Manage Queue')
    .addOptions([
            {
              label: 'Shuffle',
              value: 'Shuffle'
            },
            {
              label: 'Clear Queue',
              value: 'Clear_Queue'
            }
          ])
      )
  const MoonCarlirow = new ActionRowBuilder().addComponents( MoonCarli1, MoonCarli2, MoonCarli3, MoonCarli4, MoonCarli5 );
  const MoonCarlirow2 = new ActionRowBuilder().addComponents( MoonCarli6, MoonCarli7, MoonCarli8, MoonCarli9, MoonCarli10 );
  
  const MoonCarli0 = await channel.send({ embeds: [thing], components: [CarliManageQueue ,MoonCarlirow ] });
  await player.setNowplayingMessage(MoonCarli0);
  const embed = new EmbedBuilder().setColor(client.embedColor).setTimestamp();
  const collector = MoonCarli0.createMessageComponentCollector({
    filter: (b) => {
      if ( b.guild.members.me.voice.channel && b.guild.members.me.voice.channelId === b.member.voice.channelId ) return true;
      else { b.reply({ content: `You are not connected to <#${b.guild.members.me.voice?.channelId ?? 'None'}> to use this buttons.`, ephemeral: true, }); return false;
      }
    },
    time: track?.duration ?? queue.duration,
  });
  collector.on("collect", async (i) => {
    await i.deferReply({
      ephemeral: true,
    });
    
    if (i.customId === "pause") {
      if (!player) {
        return collector.stop();
      }
      player.pause(true);
      const MoonCarliembed1 = new EmbedBuilder()
      .setDescription(`**Paused Successfully**`)
      .setColor(client.embedColor);
      await MoonCarli0.edit({ embeds: [thing], components: [MoonCarlifilter, MoonCarlirow2] });
      i.editReply({ embeds: [MoonCarliembed1], ephemeral: true });
    } else if (i.customId === "resume") {
      if (!player) {
        return collector.stop();
      }
      player.pause(false);
      const MoonCarliembed2 = new EmbedBuilder()
      .setDescription(`**Resume Sucessfully**`)
      .setColor(client.embedColor);
      await MoonCarli0.edit({ embeds: [thing], components: [MoonCarlifilter, MoonCarlirow] });
      i.editReply({ embeds: [MoonCarliembed2], ephemeral: true});
    } else if (i.customId === "stop") {
      if (!player) {
        return collector.stop();
      }
      await player.destroy();
      await player.queue.clear();
      const MoonCarli3 = new EmbedBuilder()
      .setDescription(`**Successfully Stopped the Music**`)
      .setColor(client.embedColor);
      await MoonCarli0.edit({ embeds: [thing], components: [] });
      i.editReply({ embeds: [MoonCarli3], ephemeral: true });
      return collector.stop();
    } else if (i.customId === "previous") {
      if (!player) {
        return collector.stop();
      }
      await player.seek(0);
      const MoonCarli4 = new EmbedBuilder()
      .setDescription(`**Successfully Skipped Back To Previous Song**`)
      .setColor(client.embedColor);
      i.editReply({ embeds: [MoonCarli4], ephemeral: true });
    } else if (i.customId === "skip") {
      if (!player) {
        return collector.stop();
      }
      await player.stop();
      const MoonCarli5 = new EmbedBuilder()
      .setDescription(`**Successfully Skipped To Next Song**`)
      .setColor(client.embedColor);
      i.editReply({ embeds: [MoonCarli5], ephemeral: true });
      if (player.queue.length === 1) {
        return collector.stop();
      }
    } else if (i.customId === "loop") {
      if (!player) {
        return collector.stop();
      }
      await player.setTrackRepeat(!player.trackRepeat);
      const trackRepeat = player.trackRepeat ? "Enabled" : "Disabled";
      const MoonCarli6 = new EmbedBuilder()
      .setDescription(`**Music Loop ${trackRepeat}**`)
      .setColor(client.embedColor);
      i.editReply({ embeds: [MoonCarli6], ephemeral: true});
      return;
    }


// Shuffle Dropdown 
if(i.values[0] === "Shuffle") {
      player.queue.shuffle();
      i.editReply({ ephemeral: true , content: `Succesfully Shuffled the queue.`});
    } 
if(i.values[0] === "Clear_Queue") {
      player.queue.clear();
      i.editReply({ ephemeral: true , content: `Cleared all songs from the queue.`});
    } 

//Filters Dropdown 
    if(i.values[0] === "clear_but") {
      player.clearEffects();
      i.editReply({ ephemeral: true , content: `Succesfully Cleared All **FILTERS**`});
    } 
    if(i.values[0] === "bass_but") {
     player.setBassboost(true);
     i.editReply({ ephemeral: true, content:`BassBoost mode **ENABLED**` });
  }
    if(i.values[0] === "8d_but") {
      player.set8D(true);
      i.editReply({ ephemeral: false , content: `8D Mode **ENABLED**`, ephemeral: true });
    }
    if(i.values[0] === "night_but") {
      player.setNightcore(true);
      i.editReply({ ephemeral: true, content: `NightCore Mode **ENABLED**`, ephemeral: true });
    }
    if(i.values[0] === "pitch_but") {
      player.setPitch(2);
      i.editReply({ ephemeral: true, content: `Pitch Mode **ENABLED**`, ephemeral: true });
    }
    if(i.values[0] === "distort_but") {
      player.setDistortion(true);
      i.editReply({ ephemeral: true, content: `Distort Mode **ENABLED**` });
    }
    if(i.values[0] === "speed_but") {
      player.setSpeed(2);
      i.editReply({ ephemeral: true, content: `Speed Mode **ENABLED**`, ephemeral: true });
    }
    if(i.values[0] === "vapo_but") {
      player.setVaporwave(true);
      i.editReply({ ephemeral: true, content: `VaporWave Mode **ENABLED**`, ephemeral: true });
    }
    if(i.values[0] === "lofi_but") {
      player.setLofi(true);
      i.editReply({ ephemeral: true, content: `Lofi Mode **ENABLED**`, ephemeral: true })
    }
  });
};
