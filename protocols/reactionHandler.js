let handler = (m, r, u, x) => {
    let botID = "629045876693663755";
    if (!(m.author.bot && m.author.id == botID && m.embeds && m.embeds[0].title && m.embeds[0].title.includes("Reaction Role"))) return;
    let role;
    let fields = m.embeds[0].fields;
    if (m.embeds[0].title.includes("multi")) {
        let result = fields.find(f => f.value.includes(r.emoji));
        if (result) {
            role = result.value.split(" | ")[0];
        }
    } else if (m.embeds[0].title.includes("single")) {
        role = m.embeds[0].fields[0].value.split(" | ")[0];
    }
    if (role) {
        role = m.guild.roles.cache.find(r => `<@&${r.id}>` == role);
        if (x) {
            return m.guild.members.cache.get(u.id).roles.remove(role);
        } else {
            return m.guild.members.cache.get(u.id).roles.add(role);
        }
    } else {
        return console.log("Role not found from message");
    }
}

function demand(reaction, user, remove = false) {
    if (reaction.partial) {
        return reaction.fetch().then(r => {
            if (r.message.partial) {
                return r.message.fetch().then(m => {
                    return handler(m, r, user, remove);
                })
            } else {
                return handler(r.message, r, user, remove);
            }
        })
    } else {
        if (reaction.message.partial) {
            return reaction.message.fetch().then(m => {
                return handler(m, reaction, user, remove);
            })
        } else {
            return handler(reaction.message, reaction, user, remove);
        }
    }
}
module.exports.demand = demand;
