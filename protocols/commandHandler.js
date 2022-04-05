function setCommands() {
    const fs = require("fs");

    const guildId = '419578499020357643';
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild) {
        commands = guild.commands;
    } else {
        commands = client.application.commands;
    }

	client.application.commands.set([]);
	
    let commandList = getCommands();
    let commandTemp = [];
    console.log(commandList);
    for (let c of commandList) {
        let command = require(`../commands/${c}`);
        commandTemp.push(command.commandOptions);
    }
    commands.set(commandTemp).then(newCommands => {
        for (let c of newCommands) {
            let command = require(`../commands/${c[1].name}`);
            let permissions = [];
            switch (command.level) {
                case 0:
                    commands.fetch(c[0]).then(fc => {
                        fc.edit({
                            defaultPermission: true
                        });
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
            commands.fetch(c[0]).then(fc => {
                fc.permissions.set({
                    permissions: permissions
                });
            });
        }
    });

	console.log("Application commands: \n");
	client.application.commands.fetch().then(c => console.log(c));
}

function getCommands() {
    const fs = require("fs");
    let commandList = fs.readdirSync(`./commands/`);
    return commandList;
}
module.exports.getCommands = getCommands;
module.exports.setCommands = setCommands;
