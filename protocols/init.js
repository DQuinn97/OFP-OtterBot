function demand(client) {
  const fs = require("fs");
  
  console.log("Connected!");
  client.user.setPresence({
    status: "online",
    activity: {
      name: "OtterFoxProductions",
      type: "STREAMING",
      url: "https://www.twitch.tv/otterfoxproductions"
    }
  });
  console.log("Status updated!");

  try {
    let obj = JSON.parse(fs.readFileSync(`files/react_cache.json`, "utf8"));
    console.log(obj);
    //if (JSON.stringify(obj) == "{}") return;
    for (let channel of obj.channels) {
      for (let react of channel.reacts) {
        let m = client.channels.cache.get(channel.channel).messages.fetch(react.msg);
        console.log(`Message "${react.msg}" cached!`);
        m.then(m => {
          for(let reaction of react.reactions){
            if(!m.reactions.cache.find(r => r.emoji.name == reaction.emoji)){
              m.react(reaction.emoji);
              return;
            }
          }
        })
      }
    }
  } catch (err) {
    console.log(err);
  }
}
module.exports.demand = demand;
