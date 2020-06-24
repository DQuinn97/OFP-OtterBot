require('dotenv').config();
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});

app.listen(process.env.PORT);
/*
setInterval(() => {
  http.get(`http://ofp-otterbot.glitch.me/`);
  https.get(`https://ofp-otterbot.glitch.me/`);
}, 140000);
*/

const getJSON = require("get-json");
const Discord = require("discord.js");
const client = new Discord.Client();
const twitchAPI = require("twitch").default;
const twitch = twitchAPI.withClientCredentials(
    process.env.CLIENTID,
    process.env.CLIENTSECRET
);
const fs = require("fs");
let live_interval;

client.setMaxListeners(0);

client.on("ready", () => {
    console.log("listening on " + process.env.PORT);
    require(`./protocols/init.js`).demand(client);
    live_interval = setInterval(function () {
        require(`./protocols/OFP_live.js`).demand(client, twitch);
    }, 5000);
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

//BOTTOM CODE!
client.login(process.env.TOKEN);

function refresh() {
    console.log("Restarting bot in 5 seconds...");
    process.nextTick(function () {
        setTimeout(process.exit, 60000);
    });
}
module.exports.refresh = refresh;
