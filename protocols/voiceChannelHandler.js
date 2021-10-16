function demand(oldState, newState) {
    let starterChannels = ["755132799027118170", "726840461536264233"];
    let botID = client.user.id;
    let botPerms = 256;
    if (newState.channelId && starterChannels.includes(newState.channelId)) {
        console.log("checked")
        let perms = newState.channel.permissionOverwrites.cache.clone();
        perms.create(newState.member.id, {
            'MANAGE_CHANNELS': true
        })
        perms.create(botID, {
            'PRIORITY_SPEAKER': true
        });
        let options = {
            name: `${newState.member.displayName}'s channel`,
            permissionOverwrites: perms,
            position: 99
        }
        newState.channel.clone(options).then(channel => {
            newState.setChannel(channel);
        });
    }
    if (oldState.channelID) {
        if (oldState.channel.permissionOverwrites.cache.has(botID) && oldState.channel.permissionOverwrites.cache.get(botID).allow.bitfield == botPerms) {
            if (oldState.channel.members.size <= 0) oldState.channel.delete();
        }
    }
}
module.exports.demand = demand;
