const commandName = "addreact";

function run(message, args) {
    let botID = "629045876693663755";
    //command message-id role emoji
    if (!/^[0-9]+$/g.test(args[0])) return console.log(`Not a message id`);

    if (!args[1] || (!message.guild.roles.cache.find(role => role.id == args[1]) && !message.mentions.roles)) return console.log(`Not a role`);

    let role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.find(role => role.id == args[1]);
    let emoji = args[2] || undefined;

    if (role.position >= message.member.roles.highest.position && message.member.id != message.guild.ownerID) return console.log(`Cannot assign role higher than member's highest role`);

    if (!emoji) return console.log(`No emoji given`);

    message.channel.messages.fetch(args[0]).then(m => {
        if (!(m.author.bot && m.author.id == botID && m.embeds && m.embeds[0].title && m.embeds[0].title.includes("Reaction Role - multi"))) return;
        m.edit(m.content, m.embeds[0].addField(`---------------------------`, `${role} | ${emoji}`));
        m.react(emoji);
    });

    return true;
}

function help(message) {
    return message.channel.send(
        `${commandName}: Add a role to an already existing Reaction Role with an emoji.\n\`${process.env.PREFIX}${commandName} <message-id> <role> <emoji>\``
    );
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 1;
