var baseDir="./work/"
var projectDir="dy/";
var entryFile="main.js";
var packProjects = ['dy','demo1']
var config = {
  uiMode: true,
  baseDir: baseDir,
  entryFile: entryFile,
  // entry:  baseDir + projectDir + entryFile,
  packProjects:packProjects,
  scriptNamePrefix: "",
  base64: false,
  projectDir:projectDir,
  copyFiles: 'static',
  // projectJson: baseDir + projectDir + "project.json",
  advancedEngines: true,
  base64RandomStrLength: 100,
  target: "node", // web || node
};

module.exports = config;
