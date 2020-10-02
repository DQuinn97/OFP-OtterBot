const commandName = "editreact";

function run(message, args) {
    let botID = "629045876693663755";
    //command message-id description

    let id = args.shift();
    if (!/^[0-9]+$/g.test(id)) return console.log(`Not a message id`);

    message.channel.messages.fetch(id).then(m => {
        if (!(m.author.bot && m.author.id == botID && m.embeds && m.embeds[0].title && m.embeds[0].title.includes("Reaction Role"))) return;

        m.edit(m.content, m.embeds[0].setDescription(args.join(" ")));
    });

    return true;
}

function help(message) {
    return message.channel.send(
        `${commandName}: Edit the description of the embeded Reaction Role. Leave the text empty to remove the description.\n\`${process.env.PREFIX}${commandName} <message-id> <text>\``
    );
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 1;
