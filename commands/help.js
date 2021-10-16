let dir = require(`../protocols/commandHandler.js`).getCommands();
let choices = [];
for (let c of dir) {
    choices.push({
        name: c.substring(0, c.length - 3),
        value: c.substring(0, c.length - 3)
    })
}

const commandName = "help";
const description = "General help command.";
const options = [{
    name: "command",
    description: "The name of a specific command.",
    type: 3,
    choices: choices
}];

function run(interaction, options) {
    const fs = require("fs");
    let command;
    if (!options.getString("command")) {
        let commandList = [];
        for (let c of dir) {
            commandList.push(c.substring(0, c.length - 3));
        }

        interaction.reply({
            content: `The list of existing commands is:\n\`${commandList.join(
          "`\n`"
        )}\`\n\nUse \`/help <command>\` to get the help page specific to each command.`,
            ephemeral: true
        });

    } else {
        command = options.getString("command");
        if (!fs.existsSync(`commands/${command}.js`)) {
            interaction.reply({
                content: `This command doesn't exist, check if you spelled it correctly!`,
                ephemeral: true
            });
            return;
        }

        let commandFile = require(`./${command}.js`);
        if (!commandFile) return;

        commandFile.help(interaction).catch(err => {
            if (err) return;
        });
    }
}

function help(interaction) {
    return interaction.reply({
        "embeds": [{
            "title": `${commandName}`,
            "description": `${description}`,
            "fields": [{
                "name": "command",
                "value": "Either the name of a command you need help with, or empty to get this reply."
                }]
        }],
        ephemeral: true
    });
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 0;

module.exports.name = commandName;
module.exports.description = description;
module.exports.options = options;
