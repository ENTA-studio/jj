const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { afk } = require("../../utils/afk");
module.exports = {
  name: 'afk',
  category: 'Utility',
  aliases: ['busy'],
  description: 'Set Afk Of The User',
  args: false,
  usage: '',
  userPrams: [''],
  botPrams: [''],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const reason = args.join(" ") || "None";

    afk.set(message.author.id, [Date.now(), reason]);

    message.channel.send(`**<@${message.member.user.id}>,** Your AFK is set to - **${reason}**`)
  },
};
