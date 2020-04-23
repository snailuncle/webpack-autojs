const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const scriptConfig = require("../scriptConfig");
const ConcatSource = require("webpack-sources").ConcatSource;

function base64编码(content) {
  let currentRandomStr = randomstring.generate(scriptConfig.base64RandomStrLength);
  let result = Buffer.from(content).toString("base64");
  result = currentRandomStr + result;
  return result;
}

var headerFile = path.join(__dirname, "..", "header.txt");
var header = fs.readFileSync(headerFile, "utf8");
header = header.trim();

class SetHeader {
  apply(compiler) {
    // compiler.hooks.shouldEmit.tap('MyPlugin', params => {
    // compiler.hooks.compile.tap("emit", function(compilation, callback) {
    compiler.hooks.emit.tapAsync("SetHeader", (compilation, callback) => {
      compilation.chunks.forEach((chunk) => {
        chunk.files.forEach((file) => {
          let result = "";
          if (scriptConfig.uiMode) {
            console.log('uiMode = true, 需要添加"ui";');
            result = '"ui";' + "\n" + header + "\n" + compilation.assets[file]["_value"];
          } else {
            result = header + "\n" + compilation.assets[file]["_value"];
          }
          if (scriptConfig.base64) {
            console.log("base64 = true, 需要base64编码");
            result = base64编码(result);
          }
          compilation.assets[file] = new ConcatSource(result);
        });
      });
      callback();
    });
  }
}
module.exports = SetHeader;
