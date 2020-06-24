function demand(reaction, user, remove = false) {
  const fs = require("fs");
  let found = JSON.parse(
    fs.readFileSync(`files/react_cache.json`, "utf8")
  ).channels.find(c => c.channel == reaction.message.channel.id);
  if (found) {
    found = found.reacts.find(r => r.msg == reaction.message.id);
    if (found) {
      found = found.reactions.find(r => r.emoji == reaction.emoji.name);
      if (found) {
        if(remove){
          return reaction.message.guild.members.cache.get(user.id).roles.remove(found.role);
        } else {
          return reaction.message.guild.members.cache.get(user.id).roles.add(found.role);
        }
      }
    }
  }
  return console.log(
    `Reaction not found or deleted! @messageReaction${!remove ? "Add" : "Remove"}`
  );
}
module.exports.demand = demand;
