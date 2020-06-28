const commandName = "modrole";
function run(message, args) {
  //command add/remove role
  const fs = require("fs");

  if (args[0] != "add" && args[0] != "remove")
    return console.log(`Not an action!`);
  if (
    !args[1] ||
    (!message.guild.roles.find(role => role.id == args[1]) &&
      !message.mentions.roles)
  )
    return console.log(`Not a role!`);
  let role =
    message.mentions.roles.first() ||
    message.guild.roles.find(role => role.id == args[1]);

  let obj = JSON.parse(fs.readFileSync(`files/staff.json`, "utf8"));

  if (args[0] == "add") {
    obj.roles.push(role.id);
  } else if (args[0] == "remove" || args[0] == "delete") {
    let i = obj.roles.indexOf(role.id);
    if (i !== -1) obj.roles.splice(i, 1);
  }

  fs.writeFile(`files/staff.json`, JSON.stringify(obj), err => {
    if (err) return console.error(err.message);
    console.log(`Staffroles updated!`);
  });

  return true;
}
function help(message) {
  return message.channel.send(
    `${commandName}: Add/remove a role to the list of modded/authorized roles.\n\`${process.env.PREFIX}${commandName} <add/remove> <role>\``
  );
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 2;
