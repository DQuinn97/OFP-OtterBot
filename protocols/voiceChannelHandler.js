function demand(oldState, newState) {
    //console.log(oldState, newState);
    if (newState.channelID) {
        const fs = require("fs");
        const voiceVariables_path = `././files/voiceVariables.json`;
        const voiceChannels_path = `././files/voiceChannels.json`;

        if (!fs.existsSync(voiceVariables_path) || !fs.existsSync(voiceChannels_path)) return console.log(`Files missing!`);

        let voiceChannels_json = fs.readFileSync(voiceChannels_path, "utf8");
        let voiceChannels = voiceChannels_json ? JSON.parse(voiceChannels_json) : {
            creator: null,
            created: []
        };

        let voiceVariables_json = fs.readFileSync(voiceVariables_path, "utf8");
        let voiceVariables = voiceVariables_json ? JSON.parse(voiceVariables_json) : {
            data: []
        };

        if (voiceChannels.creator == newState.channelID) {
            let variables = voiceVariables.data.find(element => element.member == newState.member.id);
            if (!variables) {
                variables = {
                    member: newState.member.id,
                    options: {
                        name: `${newState.member.displayName}'s channel`,
                        userLimit: 0,
                        bitrate: 64000
                    }
                }
                voiceVariables.data.push(variables);

                fs.writeFile(voiceVariables_path, JSON.stringify(voiceVariables), err => {
                    if (err) return console.error(err.message);
                    console.log(`Voice variables added!`);
                });
                require(`./fileLog.js`).demand(voiceVariables_path, 2, "Voice variables added!");
            }

            let perms = newState.channel.permissionOverwrites;
            perms.set(newState.member.id, {
                id: newState.member.id,
                allow: 16
            });
            newState.channel.clone(variables.options).then(channel => {
                channel.setPosition(99);
                newState.setChannel(channel);

                voiceChannels.created.push(channel.id);

                fs.writeFile(voiceChannels_path, JSON.stringify(voiceChannels), err => {
                    if (err) return console.error(err.message);
                    console.log(`Voice channel added!`);
                });
                require(`./fileLog.js`).demand(voiceChannels_path, 1, "Voice channel added!");
            });
        }
    } else if (oldState.channelID) {
        const fs = require("fs");
        const voiceChannels_path = `././files/voiceChannels.json`;

        if (!fs.existsSync(voiceChannels_path)) return console.log(`Files missing!`);

        let voiceChannels_json = fs.readFileSync(voiceChannels_path, "utf8");
        let voiceChannels = voiceChannels_json ? JSON.parse(voiceChannels_json) : {
            creator: null,
            created: []
        };
        if (voiceChannels.created.includes(oldState.channelID)) {
            if (oldState.channel.members.size <= 0) oldState.channel.delete();
        }
    }
}

function update(oldChannel, newChannel) {
    if (newChannel.type != "voice") return;

    const fs = require("fs");
    const voiceVariables_path = `././files/voiceVariables.json`;
    const voiceChannels_path = `././files/voiceChannels.json`;

    if (!fs.existsSync(voiceVariables_path) || !fs.existsSync(voiceChannels_path)) return console.log(`Files missing!`);

    let voiceChannels_json = fs.readFileSync(voiceChannels_path, "utf8");
    let voiceChannels = voiceChannels_json ? JSON.parse(voiceChannels_json) : {
        creator: null,
        created: []
    };

    let voiceVariables_json = fs.readFileSync(voiceVariables_path, "utf8");
    let voiceVariables = voiceVariables_json ? JSON.parse(voiceVariables_json) : {
        data: []
    };

    if (voiceChannels.created.includes(newChannel.id)) {
        if (oldChannel.name != newChannel.name || oldChannel.userLimit != newChannel.userLimit || oldChannel.bitrate != newChannel.bitrate) {
            oldChannel.members.forEach(member => {
                if (newChannel.permissionsFor(member.id).has(16, false)) {
                    let index = voiceVariables.data.findIndex(element => element.member == member.id);
                    voiceVariables.data[index].options = {
                        name: newChannel.name,
                        userLimit: newChannel.userLimit,
                        bitrate: newChannel.bitrate
                    }
                }
            });
            fs.writeFile(voiceVariables_path, JSON.stringify(voiceVariables), err => {
                if (err) return console.error(err.message);
                console.log(`Voice variables updated!`);
            });
            require(`./fileLog.js`).demand(voiceVariables_path, 2, "Voice variables updated!");
        }
    }
}

function check(channel) {
    const fs = require("fs");
    if (channel.type == "voice") {
        const voiceChannels_path = `././files/voiceChannels.json`;
        if (!fs.existsSync(voiceChannels_path)) return console.log(`Files missing!`);
        let voiceChannels_json = fs.readFileSync(voiceChannels_path, "utf8");
        let voiceChannels = voiceChannels_json ? JSON.parse(voiceChannels_json) : {
            creator: null,
            created: []
        };
        let changed = false;
        if (channel.id == voiceChannels.creator) {
            voiceChannels.creator = null;
            changed = true;
        } else if (voiceChannels.created.includes(channel.id)) {
            let index = voiceChannels.created.indexOf(channel.id);
            if (index !== -1) voiceChannels.created.splice(index, 1);
            changed = true;
        }

        if (changed) {
            fs.writeFile(voiceChannels_path, JSON.stringify(voiceChannels), err => {
                if (err) return console.error(err.message);
                console.log(`Voice channel removed!`);
            });
            require(`./fileLog.js`).demand(voiceChannels_path, 1, "Voice channel removed!");

        }
        return changed;
    }
}

function remove(member) {
    const fs = require("fs");
    const voiceVariables_path = `././files/voiceVariables.json`;

    if (!fs.existsSync(voiceVariables_path)) return console.log(`Files missing!`);

    let voiceVariables_json = fs.readFileSync(voiceVariables_path, "utf8");
    let voiceVariables = voiceVariables_json ? JSON.parse(voiceVariables_json) : {
        data: []
    };

    let newData = voiceVariables.data.filter(element => element.member != member.id);
    if (newData.length < voiceVariables.data.length) {
        voiceVariables.data = newData;

        fs.writeFile(voiceVariables_path, JSON.stringify(voiceVariables), err => {
            if (err) return console.error(err.message);
            console.log(`Voice variables removed!`);
        });
        require(`./fileLog.js`).demand(voiceVariables_path, 2, "Voice variables removed!");
    }
}
module.exports.demand = demand;
module.exports.update = update;
module.exports.check = check;
module.exports.remove = remove;
