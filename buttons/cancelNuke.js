function run(interaction, msgInt) {
    msgInt.editReply({
        content: `Nuke cancelled.`,
        components: []
    });
}

module.exports.run = run;
