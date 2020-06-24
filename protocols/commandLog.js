function demand(message, succeeded) {
  const fs = require("fs");
  let log = `${new Date().toLocaleString()} ~ OFP-Bot: Command "${
    message.content
  }" called by '${message.member.user.tag}' in channel '${
    message.channel.name
  }' : ${succeeded ? 'SUCCEEDED' : 'FAILED'}`;
  fs.appendFile(`files/log.txt`, `${log}\n`, err => {
    if (err) return console.log(err);
    console.log(log);
  });
}
module.exports.demand = demand;
