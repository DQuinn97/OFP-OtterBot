const commandName = "react";
function run(message, args) {
  //command add/remove message-id emoji/all role
  let choice = args.shift().toLowerCase();
  switch (choice) {
    case "add":
      return require(`./addreact.js`).run(message, args);
      break;
    case "remove":
      return require(`./delreact.js`).run(message, args);
      break;
    case "override":
      if (
        args[0] == "all" &&
        require(`../protocols/staffcheck`).demand(message, 2)
      ) {
        const fs = require("fs");
        let obj = { channels: [] };

        fs.writeFile(`files/react_cache.json`, JSON.stringify(obj), err => {
          if (err) return console.error(err.message);
          console.log(`Override succeeded; all reacts removed!`);
        });
      } else {
        return console.log(`Override failed..`);
      }
      break;
    default:
      return console.log(`Cannot '${choice}' a react!`);
      break;
  }
}
function help(message) {
  return message.channel.send(
    `${commandName}: Add/remove a reaction/role to the watchlist.\n\`${process.env.PREFIX}${commandName} <add/remove> <message-id> <emoji/all> <role>\``
  );
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 1;
