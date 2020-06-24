const commandName = "help";
function run(message, args) {
  const fs = require("fs");
  let command;
  if (!args[0]) {
    let commandList = [];
    let dir = fs.readdir(`./commands/`, (err, files) => {
      if (err) return console.log(err);
      for (let f of files) {
        if (f != "DEFAULT.txt") {
          commandList.push(f.substring(0, f.length - 3));
        }
      }
      message.channel.send(
        `The list of existing commands is:\n\`${commandList.join(
          "`\n`"
        )}\`\n\nUse \`${
          process.env.PREFIX
        }help <command>\` to get the help page specific to each command.`
      );
    });
  } else {
    command = args[0].toLowerCase();
    if (!fs.existsSync(`commands/${command}.js`)) {
      message.reply(
        `This command doesn't exist, check if you spelled it correctly!`
      );
      return console.log(`Help request for non-existent command!`);
    }

    let commandFile = require(`./${command}.js`);
    if (!commandFile) return console.log(`Failed to find ${command}.js!`);
    let succeeded = require(`../protocols/staffcheck.js`).demand(
      message,
      commandFile.level
    )
      ? commandFile.help(message).catch(err => {
          if (err) return console.log(`Help not found: ${command}`);
        })
      : message.reply(
          `Don't worry about the help, you can't use this command anyway!`
        );
  }
  return true;
}
function help(message) {
  return message.channel.send(`Help-ception!`);
}
module.exports.run = run;
module.exports.help = help;
module.exports.level = 0;
