const Discord = require("discord.js");
global.client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const twitchAPI = require("twitch").default;
const twitch = twitchAPI.withClientCredentials(
    process.env.CLIENTID,
    process.env.CLIENTSECRET
);
const fs = require("fs");
let live_interval;

client.setMaxListeners(0);

client.on("ready", () => {
    require(`./protocols/init.js`).demand(client);
    live_interval = setInterval(function () {
        require(`./protocols/OFP_live.js`).demand(client, twitch);
    }, 60000);
});

client.on("message", message => {
    if (message.author.bot) return;
    require(`./protocols/commandTest.js`).demand(message);
});

client.on("messageReactionAdd", (reaction, user) => {
    require(`./protocols/reactionHandler.js`).demand(reaction, user);
});
client.on("messageReactionRemove", (reaction, user) => {
    require(`./protocols/reactionHandler.js`).demand(reaction, user, true);
});

client.on("guildMemberAdd", member => {
    member.roles.add("522784830484905995");
});
client.on("voiceStateUpdate", (oldState, newState) => {
    require(`./protocols/voiceChannelHandler.js`).demand(oldState, newState);
});

//BOTTOM CODE!
client.login(process.env.TOKEN);

function refresh() {
    console.log("Restarting bot in 5 seconds...");
    process.nextTick(function () {
        setTimeout(process.exit, 60000);
    });
}
module.exports.refresh = refresh;
