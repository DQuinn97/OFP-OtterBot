function demand(oldState, newState) {
    let starterChannels = ["755132799027118170", "726840461536264233"];
    let botID = "688064094829543444";
    let botPerms = 256;
    if (newState.channelID && starterChannels.includes(newState.channelID)) {
        console.log("checked")
        let perms = newState.channel.permissionOverwrites.clone();
        perms.set(newState.member.id, {
            id: newState.member.id,
            allow: 16
        })
        perms.set(botID, {
            id: botID,
            allow: botPerms
        });
        let options = {
            name: `${newState.member.displayName}'s channel`,
            permissionOverwrites: perms
        }
        newState.channel.clone(options).then(channel => {
            channel.setPosition(99);
            newState.setChannel(channel);
        });
    }
    if (oldState.channelID) {
        if (oldState.channel.permissionOverwrites.has(botID) && oldState.channel.permissionOverwrites.get(botID).allow.bitfield == botPerms) {
            if (oldState.channel.members.size <= 0) oldState.channel.delete();
        }
    }
}
module.exports.demand = demand;
