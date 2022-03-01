const commandName = "reply";
const requiresResponse = false;
const description = "Creates a message.";
const type = 1;
const options = [{
    name: "text",
    description: "Text to be replied with.",
    required: true,
    type: 3
}];

function run(interaction, options) {
    interaction.reply({
        content: `${options.getString("text") ? options.getString("text") : "This is a message."}`,
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
                "name": "text",
                "value": "The text you want the bot to reply with."
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
