function demand(oldState, newState) {
    let starterChannels = ["755132799027118170", "726840461536264233"];
    let botID = client.user.id;
    let botPerms = 256;
    if (newState.channelId && starterChannels.includes(newState.channelId)) {
        let options = {
            name: `${newState.member.displayName}'s channel`,
            permissionOverwrites: newState.channel.permissionOverwrites.cache,
            position: 99
        }
        newState.channel.clone(options).then(channel => {
            channel.permissionOverwrites.create(newState.member.id, {
                'MANAGE_CHANNELS': true
            });
            channel.permissionOverwrites.create(botID, {
                'PRIORITY_SPEAKER': true
            });
            newState.setChannel(channel);
        });
    }
    if (oldState.channelId) {
        if (oldState.channel.permissionOverwrites.cache.has(botID) && oldState.channel.permissionOverwrites.cache.get(botID).allow.bitfield == botPerms) {
            if (oldState.channel.members.size <= 0) oldState.channel.delete();
        }
    }
}
module.exports.demand = demand;
