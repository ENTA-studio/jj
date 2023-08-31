const Client = require("../../index");
const { VoiceState, EmbedBuilder } = require("discord.js");
const Carli = require("../../structures/Client");
const Model = require("../../schema/247");
/**
 *
 * @param {Carli} client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @returns {Promise<void>}
 */
module.exports = {
  name: "voiceStateUpdate",
  /**
   *
   * @param {Carli} client
   * @param {VoiceState} oldState
   * @param {VoiceState} newState
   * @returns {Promise<void>}
   */
  run: async (client, oldState, newState) => {
    // get guild and player
    let guildId = newState.guild.id;
    const player = client.manager.get(guildId);

    // check if the bot is active (playing, paused or empty does not matter (return otherwise)
    if (!player || player.state !== "CONNECTED") return;

    const twentyFourSeven = await Model.findOne({ Guild: player.guild, TextChannel: player.textChannel, 247: true });
    
    if (!newState.guild.members.cache.get(client.user.id).voice.channelId) {
      player.destroy();
        
        
// Fetch the guild and textChannel from cache
const guild = client.guilds.cache.get(player.guild);

if (!guild) {

  console.log(`Error: Guild with ID ${player.guild} not found.`);

  return;

}

const channel = guild.channels.cache.get(player.textChannel);

if (!channel) {

  console.log(`Error: Text channel with ID ${player.textChannel} not found.`);

  return;

}

// Use the guild and channel objects here
    
        
      
      // We shouldn't display the text if we are going to re-connect to the voice channel. Otherwise if 24/7 is disabled, then go ahead and display the text. We will still allow destroying the player to prevent any issues.
      if (!twentyFourSeven) {
        channel.send({
          embeds: [
            new EmbedBuilder()
              .setDescription("Player has been Disconnected from Voice Channel")
              .setColor(client.embedColor),
          ],
        }).then((message) => {
          setTimeout(() => {
            message.delete();
          }, 5000);
        });
      }
    }
  },
 };