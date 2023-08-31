const moment = require('moment') // npm i moment
moment.locale('ENG')

const { Discord, EmbedBuilder, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'say',
  category: 'Owner',
  aliases: [],
  description: 'gives userinfo',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: [''],
  owner: false,
  execute : async(message,args,client,prefix) => {
    let moon = ["1131610350886846655"];
    if(!moon.includes(message.author.id)) return;
`  `
    
    if (!args.join(" ")) {
      message.channel.send("Please add some text for me to repeat");
    }
    message.channel.send(args.join(" "), {
      allowedMentions: { parse: ["users"] },
    });
    message.delete();
  },
};