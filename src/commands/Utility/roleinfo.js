const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "roleinfo",
    category: "Utility",
    aliases: ["ri", "rali"],
    description: "See information about this project.",
    args: true,
    usage: "",
    userPerms: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if(!role){
      return message.reply({embeds: [new EmbedBuilder().setColor(client.embedColor).setDescription(`You didn't provided a valid role.`)]})
    }
    let color = (client.embedColor);
    let created = `<t:${Math.round(role.createdTimestamp/1000)}:R>`;
    const embed = new EmbedBuilder ()
    .setAuthor({name: `${role.name}'s Information`, iconURL: client.user.displayAvatarURL()})
    .addFields([
      {name: `General Info`, value: `Role Name: **${role.name}**\nRole Id: \`${role.id}\`\nRole Position: **${role.rawPosition}**\nHex Code: \`${color}\`\nCreated At: ${created}\nMentionability: ${role.mentionable}\nIntegration: ${role.managed}`},
      {name: `Allowed Permissions`, value: `${role.permissions.toArray().includes("ADMINISTRATOR") ? "\`ADMINISTRATOR\`": role.permissions.toArray().sort((a, b) => a.localeCompare(b)).map(p=>`\`${p}\``).join(", ")}`}
    ])
    .setColor(client.embedColor)
    message.reply({embeds: [embed]})
  }
      }