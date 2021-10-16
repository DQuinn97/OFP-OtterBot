function demand(filePath, type = 0, message = "File logged: ") {
    const fs = require("fs");
    if (fs.existsSync(filePath)) {
        let logChannel;
        switch (type) {
            default:
            case 0: //general
                logChannel = "730390994750799952";
                break;
            case 1: //voicechannels
                logChannel = "730384427053744179";
                break;
            case 2: //voicevariables
                logChannel = "730390862512521287";
                break;
            case 3: //reactcache
                logChannel = "730392990039932978";
                break;
        }

        client.channels.cache
            .get(logChannel)
            .send(message, {
                files: [{
                    attachment: filePath,
                    name: 'file.json'
                    }]
            });
    } else {
        console.log("Error: File not found for logging.");
    }
}
module.exports.demand = demand;
