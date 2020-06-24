function demand(message) {
  const fs = require("fs");
  if (!message.content.startsWith(process.env.PREFIX)) return;
  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (!/^[a-z]+$/g.test(command)) return;
  try {
    let commandFile = require(`../commands/${command}.js`);
    if (!commandFile) return;
    let succeeded = require(`./staffcheck.js`).demand(
      message,
      commandFile.level
    )
      ? commandFile.run(message, args)
      : false;
    require(`./commandLog.js`).demand(message, succeeded);
    if (succeeded) message.delete({timeout: 10000, reason: "bot command clear"});
  } catch (err) {
    console.log(err);
    console.log(`Command "${command}" not found!`);
  }

  return args ? args : console.log("No arguments given!");
}
module.exports.demand = demand;
