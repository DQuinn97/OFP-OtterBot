function demand(client) {
    const fs = require("fs");

    console.log("Connected!");
    client.user.setPresence({
        status: "online",
        activities: [{
            name: "OtterFoxProductions",
            type: "STREAMING",
            url: "https://www.twitch.tv/otterfoxproductions"
        }]
    });
    console.log("Status updated!");
}
module.exports.demand = demand;
