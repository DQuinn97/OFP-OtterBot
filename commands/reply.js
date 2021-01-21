const commandName = "reply";

function run(message, args) {
    message.channel.send(`${args ? args.join(" ") : "This is a message."}`);
    return true;
}

function help(message) {
    return message.channel.send(
        `${commandName}: Creates a message.\n\`${process.env.PREFIX}${commandName}\``
    );
}

module.exports.run = run;
module.exports.help = help;
module.exports.level = 3;
