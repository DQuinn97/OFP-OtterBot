const commandName = "voice";
function run(message, args) {
    const fs = require("fs");
    const voiceChannels_path = `././files/voiceChannels.json`;

    if (!fs.existsSync(voiceChannels_path)) return console.log(`Files missing!`);

    switch (args[0].toLowerCase()) {
        case "start":
        case "creator":
            if (/^\d+$/.test(args[1])) {
                let channel = message.guild.channels.cache.get(args[1]);
                if (channel && channel.type == "voice") {
                    let voiceChannels_json = fs.readFileSync(voiceChannels_path, "utf8");
                    let voiceChannels = voiceChannels_json ? JSON.parse(voiceChannels_json) : {
                        creator: undefined,
                        created: []
                    };
                    voiceChannels.creator = channel.id;

                    fs.writeFile(voiceChannels_path, JSON.stringify(voiceChannels), err => {
                        if (err) return console.error(err.message);
                        console.log(`Voice creator channel set!`);
                    });
                    require(`../protocols/fileLog.js`).demand(voiceChannels_path, 1, "Voice creator channel set!");
                    return true;
                } else {
                    message.reply(`This is not a voice channel ID.`);
                    return false;
                }
            } else {
                message.reply(`This is not a voice channel ID.`);
                return false;
            }
            break;
        default: 
            message.reply(`Invalid argument(s)!`);
            return false;
    }
}

function help(message) {
    return message.channel.send(`${commandName}: Set the channel that creates personal voice channels on joining.\n\`${process.env.PREFIX}${commandName} <start/creator> <voicechannel-id>\``);
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 1;
