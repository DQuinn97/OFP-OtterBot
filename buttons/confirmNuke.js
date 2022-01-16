const wait = require('util').promisify(setTimeout);
let text = "OFP deemed it necessary to time you out for a day and remove your recent messages. Further violations might result in a permanent ban.";

async function run(interaction, msgInt) {
    target = msgInt.guild.members.cache.get(msgInt.targetId);

    msgInt.editReply({
        content: `Fetching messages.`,
        components: []
    });

    let collected = [];
    for (let [sc, c] of msgInt.guild.channels.cache) {
        if (c.isText()) {
            let messages = await c.messages.fetch({
                limit: 100
            })
            let msgs = messages.filter(m => (m.author.id == target.id && m.createdTimestamp >= Date.now() - 24 * 60 * 60 * 1000));
            for (let [sm, m] of msgs) {
                await collected.push([c.id, m.id]);
            };
        }
    }

    msgInt.editReply({
        content: `Deleting messages.`,
        components: []
    });

    for (let [c, m] of collected) {
        await msgInt.guild.channels.cache.get(c).messages.cache.get(m).delete();
    }

    msgInt.editReply({
        content: `Timing out ${target.nickname}.`,
        components: []
    });

    await target.timeout(24 * 60 * 60 * 1000, `${msgInt.member.nickname} nuked ${target.nickname}`).catch(console.error);

    msgInt.editReply({
        content: `Nuked ${target.nickname}!`,
        components: []
    });
}

module.exports.run = run;
