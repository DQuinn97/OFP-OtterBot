const commandName = "react";
const requiresResponse = false;
const description = "Create or edit a reaction role.";
const type = 1;
const options = [{
    name: "create",
    description: "Create a new reaction role.",
    type: 1,
    options: [{
        name: "role",
        description: "A role mentionable.",
        required: true,
        type: 8
}, {
        name: "emoji",
        description: "An emoji.",
        type: 3
}]
}, {
    name: "add",
    description: "Add a role to an already existing reaction role.",
    type: 1,
    options: [{
        name: "message",
        description: "A message-id.",
        required: true,
        type: 3
}, {
        name: "role",
        description: "A role mentionable.",
        required: true,
        type: 8
}, {
        name: "emoji",
        description: "An emoji.",
        required: true,
        type: 3
}]
}, {
    name: "remove",
    description: "Remove a role to an already existing reaction role.",
    type: 1,
    options: [{
        name: "message",
        description: "A message-id.",
        required: true,
        type: 3
}, {
        name: "role",
        description: "A role mentionable.",
        required: true,
        type: 8
}]
}, {
    name: "edit",
    description: "Edit the description of an existing reaction role.",
    type: 1,
    options: [{
        name: "message",
        description: "A message-id.",
        required: true,
        type: 3
}, {
        name: "description",
        description: "A text description.",
        type: 3
}]
}];

function run(interaction, options) {
    //command role emoji
    switch (options.getSubcommand()) {
        case "create":
            create(interaction, options);
            break;
        case "add":
            add(interaction, options);
            break;
        case "remove":
            remove(interaction, options);
            break;
        case "edit":
            edit(interaction, options);
            break;
    }
    interaction.reply({
        content: 'Command executed!',
        ephemeral: true
    });
    return requiresResponse;
}

function create(interaction, options) {
    let role = options.getRole("role");
    let emoji = options.getString("emoji");

    if (role.position >= interaction.member.roles.highest.position && interaction.member.id != interaction.guild.ownerId) return interaction.reply({
        content: `Cannot assign role higher than member's highest role`,
        ephemeral: true
    });

    let embed = {
        "title": `Reaction Role - ${emoji ? "multi" : "single"}`,
        "color": 13064196,
        "fields": [{
            "name": `---------------------------`,
            "value": `${role} | ${emoji ? emoji : "React any emoji"}`
            }]
    }
    if (!emoji) {
        interaction.channel.send({
            "embeds": [embed]
        });
    } else {
        interaction.channel.send({
            "embeds": [embed]
        }).then(msg => msg.react(emoji));
    }
}

function add(interaction, options) {
    let message = options.getString("message");
    let role = options.getRole("role");
    let emoji = options.getString("emoji");
    if (!/^[0-9]+$/g.test(message)) return interaction.reply({
        content: `Not a message id`
    });

    if (role.position >= interaction.member.roles.highest.position && interaction.member.id != interaction.guild.ownerId) return interaction.reply({
        content: `Cannot assign role higher than member's highest role`,
        ephemeral: true
    });

    interaction.channel.messages.fetch(message).then(m => {
        if (!(m.author.bot && m.author.id == client.user.id && m.embeds && m.embeds[0].title && m.embeds[0].title.includes("Reaction Role - multi"))) return;
        m.edit({
            embeds: [m.embeds[0].addField(`---------------------------`, `${role} | ${emoji}`)]
        });
        m.react(emoji);
    });
}

function remove(interaction, options) {
    let message = options.getString("message");
    let role = options.getRole("role");
    if (!/^[0-9]+$/g.test(message)) return interaction.reply({
        content: `Not a message id`
    });

    if (role.position >= interaction.member.roles.highest.position && interaction.member.id != interaction.guild.ownerId) return interaction.reply({
        content: `Cannot remove role higher than member's highest role`,
        ephemeral: true
    });

    interaction.channel.messages.fetch(message).then(m => {
        if (!(m.author.bot && m.author.id == client.user.id && m.embeds && m.embeds[0].title && m.embeds[0].title.includes("Reaction Role - multi"))) return;

        let i = m.embeds[0].fields.findIndex(f => f.value.includes(role.id) == true);
        if (i < 0) return;
        let emoji = m.embeds[0].fields[i].value.split(" | ")[1];

        m.reactions.cache.get(emoji).remove();
        m.edit({
            embeds: [m.embeds[0].spliceFields(i, 1)]
        });
    });
}

function edit(interaction, options) {
    let message = options.getString("message");
    let description = options.getString("description");
    if (!/^[0-9]+$/g.test(message)) return interaction.reply({
        content: `Not a message id!`
    });

    interaction.channel.messages.fetch(message).then(m => {
        if (!(m.author.bot && m.author.id == client.user.id && m.embeds && m.embeds[0].title && m.embeds[0].title.includes("Reaction Role"))) return;

        m.edit({
            embeds: [m.embeds[0].setDescription(description)]
        });
    });
}







function help(interaction) {
    return interaction.reply({
        "embeds": [{
            "title": `${commandName}`,
            "description": `${description}`,
            "fields": [{
                "name": "create/add/remove/edit",
                "value": "Which subcommand to call. \nCreate: create new reaction role. \nAdd: add role to already existing reaction role. \nRemove: remove role from already existing reaction role. \nEdit: edit description of already existing reaction role."
                }, {
                "name": "message",
                "value": "The message id of the reaction role to edit (right click on message while devmode is on: \"Copy ID\")."
                }, {
                "name": "role",
                "value": "The role to add or remove."
                }, {
                "name": "emoji",
                "value": "The emoji to use for the role."
                }, {
                "name": "description",
                "value": "The description to add, leave empty to remove description."
                }]
        }],
        ephemeral: true
    });
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 1;

module.exports.commandOptions = {
    name: commandName,
    type: 1,
    description: description,
    options: options,
    defaultPermission: false
}
