const commandName = "addmodrole";
function run(message, args) {
  //command role
  args.unshift("add");
  return require(`./modrole.js`).run(message, args);
}
function help(message) {
  return message.channel.send(
    `${commandName}: Add a role to the list of modded/authorized roles.\n\`${process.env.PREFIX}${commandName} <role>\``
  );
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 2;
