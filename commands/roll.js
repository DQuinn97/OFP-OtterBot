const commandName = "roll";
const requiresResponse = false;
const description = "Rolls some dice. Made for nerds.";
const options = [{
    name: "dice_descriptor",
    description: "<amount>d<die>",
    required: true,
    type: 3
}];

function run(interaction, options) {
    let descriptor = options.getString("dice_descriptor").replace(/\s/g, '').replace('D', 'd');
    console.log(descriptor);
    if (!/^[0-9]*d[0-9]+$/g.test(descriptor)) {
        interaction.reply({
            content: `Dice description not of correct format (<amount>d<die>)`,
            ephemeral: true
        });
        return requiresResponse;
    }

    let [amount, die] = descriptor.split("d");
	amount = amount ? amount : 1;
    let results = [];

    for (let i = 0; i < amount; i++) {
        results.push(Math.ceil(Math.random() * die) + '');
    }


    let embeds = [{
        "title": `${interaction.member.displayName} rolled ${amount}D${die}:`,
        "description": `Value${results.length > 1? 's' : ''}: ${results.join(', ')}`
        }]

    let allowed_channels = ['946105760897699870', '960164185092812811'];
    interaction.reply({
        embeds,
        ephemeral: allowed_channels.includes(interaction.channelId) ? false : true
    });

    return requiresResponse;
}

function help(interaction) {
    return interaction.reply({
        "embeds": [{
            "title": `${commandName}`,
            "description": `${description}`,
            "fields": [{
                "name": "dice",
                "value": "The type of dice to roll."
                }, {
                "name": "amount",
                "value": "How many dice to roll."
                }]
        }],
        ephemeral: true
    });
}

module.exports.run = run;
module.exports.help = help;
module.exports.level = 0;

module.exports.commandOptions = {
    name: commandName,
    type: 1,
    description: description,
    options: options,
    defaultPermission: false
}
