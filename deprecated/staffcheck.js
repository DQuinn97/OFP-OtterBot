function demand(message, level) {
    const fs = require("fs");
    let executable;
    switch (level) {
        case 0:
            executable = true;
        case 1:
            let roles = JSON.parse(fs.readFileSync(`files/staff.json`, "utf8")).roles;
            roles.forEach(role => {
                if (message.member.roles.cache.find(r => r.id == role)) executable = true;
            });
        case 2:
            if (message.member.permissions.has("ADMINISTRATOR", false, true, true))
                executable = true;
        case 3:
            if (message.member.id == "236893311212847104") executable = true;
            break;
        default:
            executable = false;
            break;
    }
    return executable;
}
module.exports.demand = demand;
