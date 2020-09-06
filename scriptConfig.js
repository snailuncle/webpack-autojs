var baseDir="./work/"
var projectDir="dy/";
var entryFile="main.js";
var config = {
  uiMode: true,
  entry:  baseDir+projectDir+entryFile,
  scriptNamePrefix: "",
  base64: false,
  projectDir:projectDir,
  projectJson: baseDir+projectDir+"project.json",
  advancedEngines: true,
  base64RandomStrLength: 100,
  target: "node", // web || node
};

module.exports = config;
