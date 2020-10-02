const commandName = "delreact";

function run(message, args) {
    //command message-id role
    if (!/^[0-9]+$/g.test(args[0])) return console.log(`Not a message id`);

    if (!args[1] || (!message.guild.roles.cache.find(role => role.id == args[1]) && !message.mentions.roles)) return console.log(`Not a role`);

    let role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.find(role => role.id == args[1]);

    if (role.position >= message.member.roles.highest.position && message.member.id != message.guild.ownerID) return console.log(`Cannot assign role higher than member's highest role`);

    message.channel.messages.fetch(args[0]).then(m => {
        if (!(m.author.bot && m.author.id == 688064094829543444 && m.embeds && m.embeds[0].title && m.embeds[0].title.includes("Reaction Role - multi"))) return;

        let i = m.embeds[0].fields.findIndex(f => f.value.includes(role));
        if (!i >= 0) return console.log(`Role not found in message`);
        let emoji = m.embeds[0].fields[i].value.split(" | ")[1];

        m.reactions.cache.get(emoji).remove();
        m.edit(m.content, m.embeds[0].spliceFields(i, 1));
    });

    return true;
}

function help(message) {
    return message.channel.send(
        `${commandName}: Remove a role from an already existing Reaction Role.\n\`${process.env.PREFIX}${commandName} <message-id> <role>\``
    );
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 1;
