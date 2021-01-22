function demand(client, twitch) {
    const fs = require("fs");
    let path = `files/OFP_live.json`;
    let channel = "801447542796713995";
    let message = "801829041900224522";
    let ttv_channel = "OtterFoxProductions";
    let url = `https://www.twitch.tv/${ttv_channel}`;

    twitch.helix.streams.getStreamByUserName(ttv_channel).then((stream, err) => {
        if (err) return console.error(err);
        client.channels.cache.get(channel).messages.fetch(message).then(msg => {
            let msg_timestamp = msg.editedTimestamp;
            let now_timestamp = Date.now();
            let diff = now_timestamp - msg_timestamp;

            let msg_state = "";
            if (msg.content.includes("OFFLINE")) {
                msg_state = "OFFLINE";
            } else if (msg.content.includes("LIVE")) {
                msg_state = "LIVE";
            }

            if (stream != null && ((diff >= 60000 && msg_state == "OFFLINE") || (diff >= 600000 && msg_state == "LIVE"))) {

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

                    msg.edit(`${ttv_channel} is currently **LIVE**`, {
                        "embed": embed
                    });
                });


                if (msg_state == "OFFLINE") {
                    msg.channel.send("Ding dong!").then(ping => {
                        setTimeout(function () {
                            ping.delete()
                        }, 60000);
                    });
                }
            } else if (stream == null && diff >= 600000 && msg_state == "LIVE") {
                msg.edit(`${ttv_channel} is currently **OFFLINE**`, {
                    "embed": null
                });
            }
        });
    });
}
module.exports.demand = demand;
