const commandName = "voice";

function run(message, args) {
    message.channel.send("", {
        "embed": {
            "title": "OFP - voice channel handler",
            "fields": [{
                "name": "creators",
                "value": "755132799027118170"
            }]
        }
    })
}

function help(message) {
    return message.channel.send(`${commandName}: Set the channel that creates personal voice channels on joining.\n\`${process.env.PREFIX}${commandName} <start/creator> <voicechannel-id>\``);
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 3;
