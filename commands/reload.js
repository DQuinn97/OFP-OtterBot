const commandName = "reload";
function run(message, args) {
  let attempt = `Attempting to reload command '${args[0]}'.`;
  let unable = `Unable to reload command '${args[0]}'.`;
  let success = `Succesfully reloaded command '${args[0]}'.`;

  message.channel.send(attempt);
  console.log(`-----reload-----
${attempt}`);
  try {
    delete require.cache[require.resolve(`./${args[0]}.js`)];
  } catch (err) {
    message.channel.send(unable);
    console.log(`${unable}
----------------`);
    return false;
  }
  message.channel.send(success);
  console.log(`${success}
----------------`);
  return true;
}
function help(message) {
  return message.channel.send(
    `${commandName}: Reload a command.\n\`${process.env.PREFIX}${commandName} <command>\``
  );
}

module.exports.run = run;
module.exports.help = help;
module.exports.level = 3;
