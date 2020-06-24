function demand(client, twitch) {
  const fs = require("fs");
  let path = `files/OFP_live.json`;
  let channel = "OtterFoxProductions";
  let url = `https://www.twitch.tv/${channel}`;
  let storedObj;
  let streamObj;
  let Promise = twitch.helix.streams.getStreamByUserName(channel);
  Promise.then((stream, err) => {
    if (err) return console.error(err);
    if (fs.existsSync(path)) {
      let jsonp = fs.readFileSync(path, "utf8");
      if (!jsonp || jsonp == null || jsonp == "{}") {
        storedObj = {
          type: null
        };
      } else {
        storedObj = JSON.parse(jsonp);
      }

      if (!stream || stream == null || stream == {}) {
        streamObj = {
          type: null
        };
      } else {
        streamObj = {
          type: "live"
        };
      }

      if (streamObj.type != storedObj.type) {
        if (streamObj.type == "live") {
          client.channels.cache
            .get("511568893530079282")
            .send(
              `The crew is jumping on the couch! Come see what they are up to!! ${url}`
            );
        }
        storedObj.type = streamObj.type;

        fs.writeFile(path, JSON.stringify(storedObj), err => {
          if (err) return console.error(err.message);
          console.log(`OFP_live updated`);
        });
      }
    }
  });
}
module.exports.demand = demand;
