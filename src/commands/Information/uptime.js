const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "uptime",
  category: "Information",
  description: "Displays the bot's uptime.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const m = moment.duration(message.client.uptime).format(`D[days], H[hrs], m[mins], s[secs]`);
    const e = new EmbedBuilder()      .setColor(client.embedColor)
          .addFields([{name : `My Uptime`,value : `\`\`\`yaml\n${m}\`\`\``}])
    return message.reply({embeds : [e]});
  }
}
