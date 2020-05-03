const path = require("path");
const fs = require("fs");

var entryFile = path.join(__dirname, "entry.txt");
var entry = fs.readFileSync(entryFile, "utf8");
entry = entry.replace("\\", "/");


var config = {
  uiMode: true,
  entry: entry,
  scriptNamePrefix: "",
  base64: true,
  advancedEngines: true,
  base64RandomStrLength: 100,
  target: "node", // web || node
};

module.exports = config;
