require("dotenv").config();

module.exports = {
    token: "", // Put Bot Token
    clientID: "", // CLient ID Of bot
    prefix: "+", 
    ownerID: [''], // Your User ID
    SpotifyID: "",
    SpotifySecret: "",
    mongourl: "", // MongoDB URL
    embedColor: "#2b2d31",
    logs: "", // Event Logging Channel ID
    errorLogsChannel: "",
    SearchPlatform: "youtube",
    AggregatedSearchOrder: ["soundcloud", "spotify", "apple", "deezer", "youtube"],
    links: {
 
        support: 'https://discord.gg/',
        invite: 'https://discord.com/api/oauth2/authorize?client_id=&permissions=8&scope=bot' 
    },
    nodes: [{host: "lavalink.devamop.in",port: parseInt("443"),password: "DevamOP",secure: parseBoolean("true"),}],

}
function parseBoolean(value) {
    if (typeof (value) === 'string') {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
