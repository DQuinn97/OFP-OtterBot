function createCommands() {
    const fs = require("fs");

    const guildId //= '446642110519574559';
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application.commands;
    }

    let commandList = getCommands();
    console.log(commandList);
    for (let c of commandList) {
        let command = require(`../commands/${c}`);
        commands.create({
            name: command.name,
            description: command.description,
            options: command.options,
            defaultPermission: false
        }).then((com) => {
            let permissions = [];
            switch (command.level) {
                case 0:
                    com.edit({
                        defaultPermission: true
                    });
                case 1:
                    let roles = JSON.parse(fs.readFileSync(`files/staff.json`, "utf8")).roles;
                    roles.forEach(role => {
                        permissions.push({
                            id: role,
                            type: 1,
                            permission: true
                        });
                    });
                case 2:
                    let adminRoles = guild.roles.cache.filter(r => r.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR, false));
                    for (let adminRole of adminRoles) {
                        permissions.push({
                            id: adminRole[0],
                            type: 1,
                            permission: true
                        });
                    };
                case 3:
                    permissions.push({
                        id: '236893311212847104',
                        type: 2,
                        permission: true
                    });

                    break;
                default:
                    break;
            }
            com.permissions.add({
                permissions: permissions
            });
        });
    }
}

function getCommands() {
    const fs = require("fs");

    let commandList = fs.readdirSync(`./commands/`);
    /*console.log("\nCurrent directory filenames:");
    commandList.forEach(file => {
        console.log(file);
    });*/
    return commandList;
    /*
    let dir = fs.readdirSync(`./commands/`, (err, files) => {
        if (err) return console.log(err);
        for (let f of files) {
            if (f != "DEFAULT.txt") {
                commandList.push(f.substring(0, f.length - 3));
            }
        }
        return commandList;
    });
    */
}
module.exports.getCommands = getCommands;
module.exports.createCommands = createCommands;
