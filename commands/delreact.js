const commandName = "delreact";
function run(message, args) {
  //command message-id emoji/all
  const fs = require("fs");
  if (!/^[0-9]+$/g.test(args[0])) return console.log(`Not a message id`);
  console.log(args[1]);

  let msg = args[0];
  let emoji = args[1];

  let path = `files/react_cache.json`;
  let obj;
  if (fs.existsSync(path)) {
    let jsonp = fs.readFileSync(path, "utf8");
    if (!jsonp || JSON.parse(jsonp) == {}) {
      return console.log(`There are no reactions registered on any message.`);
    } else {
      obj = JSON.parse(jsonp);
      console.log(obj);
      let existingchannel = obj.channels.find(
        channel => channel.channel == message.channel.id
      );
      if (!existingchannel) {
        return console.log(
          `There are no reactions registered on any message in this channel.`
        );
      } else {
        let existingreact = existingchannel.reacts.find(
          react => react.msg == msg
        );
        if (!existingreact) {
          return console.log(
            `There are no reactions registered on this message.`
          );
        } else {
          let existingreaction = existingreact.reactions.find(
            reaction => reaction.emoji == emoji
          );
          if (!existingreaction && emoji.toLowerCase() != "all") {
            return console.log(
              `This emoji is not registered for this message.`
            );
          } else {
            if (emoji.toLowerCase() == "all") {
              existingreact.reactions = [];
            } else {
              let ir = existingreact.reactions.indexOf(existingreaction);
              if (ir !== -1) existingreact.reactions.splice(ir, 1);
            }
            if (
              !(
                Array.isArray(existingreact.reactions) &&
                existingreact.reactions.length
              )
            ) {
              let im = existingchannel.reacts.indexOf(existingreact);
              if (im !== -1) existingchannel.reacts.splice(im, 1);
              if (
                !(
                  Array.isArray(existingchannel.reacts) &&
                  existingchannel.reacts.length
                )
              ) {
                let ic = obj.channels.indexOf(existingchannel);
                if (ic !== -1) obj.channels.splice(ic, 1);
                if (!(Array.isArray(obj.channels) && obj.channels.length)) {
                  obj = { channels: [] };
                }
              }
            }
            if (emoji.toLowerCase() == "all") {
              message.channel.messages.fetch(msg).then(m => m.reactions.removeAll());
            } else {
              message.channel.messages.fetch(msg).then(m => {
                let re = m.reactions.cache.find(r => r.emoji.name == emoji);
                console.log(re);
                re.users.fetch().then(us => us.forEach(u => re.users.remove(u)));
              });
            }
          }
        }
      }
    }
    fs.writeFile(path, JSON.stringify(obj), err => {
      if (err) return console.error(err.message);
      console.log(`React removed!`);
    });

    //require(`../index.js`).refresh();
  } else {
    return console.log(`File missing!`);
  }
  return true;
}
function help(message) {
  return message.channel.send(
    `${commandName}: Delete a reaction/role from the watchlist.\n\`${process.env.PREFIX}${commandName} <message-id> <emoji/all>\``
  );
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 1;
