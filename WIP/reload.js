const commandName = "reload";
const description = "Reload a command.";
const options = [{
    name: "command",
    description: "The name of a specific command.",
    required: true,
    type: 3
}];

function run(message, args) {
    let attempt = `Attempting to reload command '${args[0]}'.`;
    let unable = `Unable to reload command '${args[0]}'.`;
    let success = `Succesfully reloaded command '${args[0]}'.`;

    //still needs to be updated to Discord.js@13.2.0
    message.channel.send(attempt);
    console.log(`-----reload-----
${attempt}`);
    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (err) {
        message.channel.send(unable);
        console.log(`${unable}
----------------`);
        return false;
    }
    message.channel.send(success);
    console.log(`${success}
----------------`);
    return true;
}

function help(interaction) {
    return interaction.reply({
        "embed": {
            "title": `${commandName}`,
            "description": `${description}`,
            "fields": [{
                "name": "`command`",
                "value": "The command you want to reload."
                }]
        }
    });
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 3;

module.exports.name = commandName;
module.exports.description = description;
module.exports.options = options;
