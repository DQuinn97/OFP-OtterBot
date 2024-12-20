const commandName = "nuke";
const requiresResponse = true;
const description = "Deletes all recent messages from user, then times user out.";
const type = 2;

function run(interaction, options) {
    let target = interaction.guild.members.resolve(interaction.targetId);
    interaction.reply({
        content: `You are about to delete all recent messages from ${target.displayName} (up to 24h) and time them out for a day.\nAre you sure?`,
        components: [{
            components: [{
                customId: "confirmNuke_" + interaction.targetId,
                label: "confirm",
                style: "SUCCESS",
                type: 2
            }, {
                customId: "cancelNuke_" + interaction.targetId,
                label: "cancel",
                style: "DANGER",
                type: 2
            }],
            type: 1
        }],
        ephemeral: true
    });
    return requiresResponse;
}

function help(interaction) {
    return interaction.reply({
        "embeds": [{
            "title": `${commandName}`,
            "description": `${description}`
        }],
        ephemeral: true
    });
}

module.exports.run = run;
module.exports.help = help;
module.exports.level = 2;

module.exports.commandOptions = {
    name: commandName,
    type: 2,
    defaultPermission: false
}
