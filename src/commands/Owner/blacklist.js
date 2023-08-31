const { EmbedBuilder } = require(`discord.js`);
module.exports = {
  name : "blacklist",
  aliases : ["bl"],
  category : "Owner",
  description : "Blacklist",
  args : false,
  usage : "",
  owner : false,
  execute : async(message,args,client,prefix) => {
    let moon = ["1131610350886846655"];
    if(!moon.includes(message.author.id)) return;
`  `

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!args[0])
        {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.embedColor).setDescription(` | Command Usage : \`${prefix}blacklist <add/remove/update>\``)]})
        }
        let db = await client.data.get(`blacklist_${client.user.id}`);
        if(!db || db === null) await client.data.set(`blacklist_${client.user.id}`,[])

        let bl = [];
    Array.from(db).forEach(x => bl.push(x));

        let opt = args[0].toLowerCase();
        let reason = args.slice(1).join(' ');
        if(!reason) reason = `No Reason Provided`;

        if(opt === `add`)
        {
            if(!user) return message.channel.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`❌ Please provde me a valid user.`)]});
            bl.push(user.id);
            await client.data.set(`blacklist_${client.user.id}`,bl);
            await client.data.set(`blreason_${user.id}`,reason);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`✅ | SuccessFully Added ${user} to my **Blacklist**`)]})
        }

        if(opt === `remove`)
        {
            if(!user) return message.channel.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`❌ | Please provide me a valid user.`)]});
            let ok = bl.filter(x => x !== user.id);
            await client.data.set(`blacklist_${client.user.id}`,ok);
            await client.data.delete(`blreason_${user.id}`);
            return message.channel.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`✅ | SuccessFully Removed ${user} from my **Blacklist**`)]});
        }
    }
}