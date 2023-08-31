const { Discord, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const moon = '820179612259581952';

module.exports = {
  name: 'profile',
  category: 'Information',
  aliases: ['pr'],
  description: 'gives avatar of user',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

        var support = client.config.links.support;
    
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
     let badge = [""]

    if (user.id === moon ) { 
    badge.push("<:Apple_developer:1114086491807813692>** • Developer**");
}

    
    if (user.id === moon ) { 
    badge.push("<:Apple_owner:1114086658523025490>** • Owner**");
}


const badges = badge.join(` `) ? `${badge.join('\n')} ` :  `Oops! Looks Like You Don't Have Any Type Of Badge To Be Displayed! You Can Get One By Joining Our [Support Server](${support})`;
// ITS EMBED LINE 
const embed = new EmbedBuilder()
.setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL()})
    .addFields(
        { name: `Badges`, value: `${badges}`, inline: false },
    )
    .setThumbnail(user.avatarURL())
    .setTimestamp()
.setColor(`#2f3136`)
// SENDING MESSAGE
message.channel.send({embeds: [embed]})
  
},

};                                                          