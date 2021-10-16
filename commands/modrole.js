const commandName = "modrole";
const description = "Add/remove a role to the list of modded/authorized roles.";
const options = [{
    name: "add",
    description: "Add a role to the list of modded/authorized roles.",
    type: 1,
    options: [{
        name: "role",
        description: "A role mentionable.",
        required: true,
        type: 8
}]
}, {
    name: "remove",
    description: "Remove a role to the list of modded/authorized roles.",
    type: 1,
    options: [{
        name: "role",
        description: "A role mentionable.",
        required: true,
        type: 8
}]
}, {
    name: "list",
    description: "List all modded/authorized roles.",
    type: 1
}];

function run(interaction, options) {
    const fs = require("fs");
    let obj = JSON.parse(fs.readFileSync(`files/staff.json`, "utf8"));
    let role = options.getRole("role");

    if (options.getSubcommand() === "add") {
        obj.roles.push(role.id);
    } else if (options.getSubcommand() === "remove") {
        let i = obj.roles.indexOf(role.id);
        if (i !== -1) obj.roles.splice(i, 1);
    } else if (options.getSubcommand() === "list") {
        let list = [];
        for (let r of obj.roles) {
            list.push(interaction.guild.roles.fetch(r).name);
        }
        return interaction.reply({
            content: list.join(', '),
            ephemeral: true
        });
    }
    require(`./protocols/commandHandler.js`).createCommands();
    fs.writeFile(`files/staff.json`, JSON.stringify(obj), err => {
        if (err) return console.error(err.message);
    });
    interaction.reply({
        content: "Command executed!",
        ephemeral: true
    })
}

function help(interaction) {
    return interaction.reply({
        "embeds": [{
            "title": `${commandName}`,
            "description": `${description}`,
            "fields": [{
                "name": "add/remove",
                "value": "Whether to add or remove a given role."
                }, {
                "name": "role",
                "value": "Which role to add or remove."
                }]
        }],
        ephemeral: true
    });
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 2;

module.exports.name = commandName;
module.exports.description = description;
module.exports.options = options;
