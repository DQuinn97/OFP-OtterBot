const commandName = "addreact";
function run(message, args) {
  //command message-id emoji role
  const fs = require("fs");
  if (!/^[0-9]+$/g.test(args[0])) return console.log(`Not a message id`);
  console.log(args[1]);
  if (
    !args[2] ||
    (!message.guild.roles.cache.find(role => role.id == args[2]) &&
      !message.mentions.roles)
  )
    return console.log(`Not a role`);

  let msg = args[0];
  let emoji = args[1];
  let role =
    message.mentions.roles.first() ||
    message.guild.roles.cache.find(role => role.id == args[2]);
  if (
    role.position >= message.member.roles.highest.position &&
    message.member.id != message.guild.ownerID
  )
    return console.log(`Cannot assign role higher than member's highest role`);

  let path = `files/react_cache.json`;
  let obj;
  if (fs.existsSync(path)) {
    let jsonp = fs.readFileSync(path, "utf8");
    if (!jsonp || jsonp == "{}") {
      obj = {
        channels: [
          {
            channel: message.channel.id,
            reacts: [{ msg, reactions: [{ emoji: emoji, role: role.id }] }]
          }
        ]
      };
    } else {
      obj = JSON.parse(jsonp);
      console.log(obj);
      let existingchannel = obj.channels.find(
        channel => channel.channel == message.channel.id
      );
      if (!existingchannel) {
        obj.channels.push({
          channel: message.channel.id,
          reacts: [{ msg, reactions: [{ emoji: emoji, role: role.id }] }]
        });
      } else {
        let existingreact = existingchannel.reacts.find(
          react => react.msg == msg
        );
        if (!existingreact) {
          existingchannel.reacts.push({
            msg,
            reactions: [{ emoji: emoji, role: role.id }]
          });
        } else {
          let existingreaction = existingreact.reactions.find(
            reaction => reaction.emoji == emoji
          );
          if (!existingreaction) {
            existingreact.reactions.push({ emoji: emoji, role: role.id });
          } else {
            return console.log(`Emoji already registered on this message!`);
          }
        }
      }
    }
    fs.writeFile(path, JSON.stringify(obj), err => {
      if (err) return console.error(err.message);
      console.log(`React added!`);
    });
      require(`../protocols/fileLog.js`).demand(path, 3, "React added!");

    message.channel.messages.fetch(msg).then(m => m.react(emoji));
    //require(`../index.js`).refresh();
  } else {
    return console.log(`File missing!`);
  }
  return true;
}
function help(message) {
  return message.channel.send(
    `${commandName}: Add a reaction/role to the watchlist.\n\`${process.env.PREFIX}${commandName} <message-id> <emoji> <role>\``
  );
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 1;
