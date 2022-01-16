const commandName = "fix";
const requiresResponse = false;
const description = "Fixes stuff.";
const options = [{
    name: "message",
    description: "Message ID.",
    required: true,
    type: 3
}];

function run(interaction, options) {
    const fs = require("fs");
    let path = `files/OFP_live.json`;
    let channel = interaction.channelId;
    //"801447542796713995";
    let message = options.getString("message");
    //"801829041900224522";
    let ttv_channel = "OtterFoxProductions";
    let url = `https://www.twitch.tv/${ttv_channel}`;

    twitch.helix.streams.getStreamByUserName(ttv_channel).then((stream, err) => {
        if (err) return console.error(err);
        client.channels.cache.get(channel).messages.fetch(message).then(msg => {
            console.log(msg)

            let msg_timestamp = msg.editedTimestamp;
            let now_timestamp = Date.now();
            let diff = now_timestamp - msg_timestamp;

            let msg_state = "";
            if (msg.content.toUpperCase().includes("OFFLINE")) {
                msg_state = "OFFLINE";
            } else if (msg.content.toUpperCase().includes("LIVE")) {
                msg_state = "LIVE";
            }

            if (stream != null && ((msg_state == "OFFLINE") || (msg_state == "LIVE"))) {

                stream.getGame().then(gameinfo => {
                    let streaminfo = {
                        game: stream._data.game_name,
                        title: stream._data.title,
                        livesince: stream._data.started_at,
                        boxart: gameinfo._data.box_art_url.replace("{width}", "60").replace("{height}", "80")
                    }

                    console.log(gameinfo);
                    console.log(streaminfo);
                    let embed = {
                        "title": `The crew is jumping on the couch! Come see what they are up to!!`,
                        "description": `${url}`,
                        "color": 47669,
                        "fields": [{
                            "name": `Live with:`,
                            "value": `${streaminfo.title ? streaminfo.title : "unknown"}`
                            }, {
                            "name": `Playing:`,
                            "value": `${streaminfo.game ? streaminfo.game : "unknown"}`
                            }],
                        "image": {
                            url: `${streaminfo.boxart}`
                        }
                    }

                    msg.edit({
                        content: `${ttv_channel} is currently **LIVE**`,
                        embeds: [embed],
                        flags: 0
                    });
                    console.log(msg);
                });

            } else if (stream == null && msg_state == "LIVE") {
                msg.edit({
                    content: `${ttv_channel} is currently **OFFLINE**`,
                    embeds: []
                });
            }
        });
    });


    interaction.reply({
        content: `fixed(?)`,
        ephemeral: true
    });

    return requiresResponse;
}

function help(interaction) {
    return interaction.reply({
        "embeds": [{
            "title": `${commandName}`,
            "description": `${description}`,
            "fields": [{
                "name": "message",
                "value": "Message ID."
                }]
        }],
        ephemeral: true
    });
}

module.exports.run = run;
module.exports.help = help;
module.exports.level = 3;

module.exports.commandOptions = {
    name: commandName,
    type: 1,
    description: description,
    options: options,
    defaultPermission: false
}
