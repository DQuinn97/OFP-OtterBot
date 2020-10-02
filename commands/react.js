const commandName = "react";

function run(message, args) {
    //command role emoji

    if (!args[0] || (!message.guild.roles.cache.find(role => role.id == args[0]) && !message.mentions.roles)) return console.log(`Not a role`);

    let role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.find(role => role.id == args[0]);
    let emoji = args[1] || undefined;

    if (role.position >= message.member.roles.highest.position && message.member.id != message.guild.ownerID) return console.log(`Cannot assign role higher than member's highest role`);

    let embed = {
        "title": `Reaction Role - ${emoji ? "multi" : "single"}`,
        "color": 13064196,
        "fields": [{
            "name": `---------------------------`,
            "value": `${role} | ${emoji ? emoji : "React any emoji"}`
            }]
    }
    if (!emoji) {
        message.channel.send({
            "embed": embed
        })
    } else {
        message.channel.send({
            "embed": embed
        }).then(msg => msg.react(emoji));
    }
    return true;
}

function help(message) {
    return message.channel.send(
        `${commandName}: Create a new reaction role. Adding an emoji allows for multiple reaction roles per post, with each role bound to a specific emoji. Without emoji only a single role can be given per post, but any emoji can be reacted to get it.\n\`${process.env.PREFIX}${commandName} <role> <emoji>\``
    );
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 1;
