global.Discord = require("discord.js");
global.client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_PRESENCES]
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

    require(`./protocols/commandHandler.js`).createCommands();
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const {
        commandName,
        options
    } = interaction;
    require(`./commands/${commandName}.js`).run(interaction, options);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    //require(`./protocols/commandTest.js`).demand(message);
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
