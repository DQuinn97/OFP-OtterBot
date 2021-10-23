const commandName = "roll";
const description = "Rolls some dice. Made for nerds.";
const options = [{
    name: "d20",
    description: "Roll a 20-sided die.",
    type: 1
}, {
    name: "d12",
    description: "Roll a 12-sided die.",
    type: 1
}, {
    name: "d10",
    description: "Roll one or two 10-sided dice.",
    type: 1,
    options: [{
        name: "amount",
        description: "1 or 2",
        type: 4,
        choices: [{
            name: '1',
            value: 1
        }, {
            name: '2',
            value: 2
        }]
}]
}, {
    name: "d8",
    description: "Roll a 8-sided die.",
    type: 1
}, {
    name: "d6",
    description: "Roll one to six 6-sided dice.",
    type: 1,
    options: [{
        name: "amount",
        description: "1 to 6",
        type: 4,
        choices: [{
            name: '1',
            value: 1
        }, {
            name: '2',
            value: 2
        }, {
            name: '3',
            value: 3
        }, {
            name: '4',
            value: 4
        }, {
            name: '5',
            value: 5
        }, {
            name: '6',
            value: 6
        }]
}]
}, {
    name: "d4",
    description: "Roll a 4-sided die.",
    type: 1
}, {
    name: "d2",
    description: "Toss a coin.",
    type: 1,
    options: [{
        name: "amount",
        description: "1 to 6",
        type: 4,
        choices: [{
            name: '1',
            value: 1
        }, {
            name: '2',
            value: 2
        }, {
            name: '3',
            value: 3
        }, {
            name: '4',
            value: 4
        }, {
            name: '5',
            value: 5
        }, {
            name: '6',
            value: 6
        }]
}]
}];

function run(interaction, options) {
    let rolls = {
        die: 20,
        qty: 1,
        values: []
    }

    switch (options.getSubcommand()) {
        case "d20":
            rolls.die = 20;
            rolls.qty = 1;
            break;
        case "d12":
            rolls.die = 12;
            rolls.qty = 1;
            break;
        case "d10":
            rolls.die = 10;
            rolls.qty = options.getInteger("amount") || 1;
            break;
        case "d8":
            rolls.die = 8;
            rolls.qty = 1;
            break;
        case "d6":
            rolls.die = 6;
            rolls.qty = options.getInteger("amount") || 1;
            break;
        case "d4":
            rolls.die = 4;
            rolls.qty = 1;
            break;
        case "d2":
            rolls.die = 2;
            rolls.qty = options.getInteger("amount") || 1;
            break;
    }
    for (let i = 0; i < rolls.qty; i++) {
        rolls.values.push(Math.ceil(Math.random() * rolls.die) + '');
    }
    if (rolls.die == 10) {
        for (let v in rolls.values) {
            if (rolls.values[v] == '10') rolls.values[v] = '0';
        }
        if (rolls.qty == 2) rolls.values[0] += '0';
    }
    if (rolls.die == 2) {
        for (let v in rolls.values) {
            rolls.values[v] = rolls.values[v] == 1 ? "heads" : "tails";
        }
    }



    let embeds = [{
        "title": `You rolled ${rolls.qty}D${rolls.die}:`,
        "description": `Value${rolls.values.length > 1? 's' : ''}: ${rolls.values.join(' + ')}`
        }]

    interaction.reply({
        embeds,
        ephemeral: interaction.channelId == '685873213837934612' ? false : true
    });
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

module.exports.name = commandName;
module.exports.description = description;
module.exports.options = options;
