var http = require("http");
var path= require("path");
class WatchDeployPlugin {
  sendCmd(cmd, path) {
    http.get("http://127.0.0.1:9317/exec?cmd=" + cmd + "&path=" + path, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => {
        console.error("请求成功", data);
      });
    });
  }
  constructor(options = {}) {
    this.options = options;
    this.changFile = "";
  }
  apply(compiler) {
    if (this.options.type != null && this.options.type != "none") {

      compiler.hooks.invalid.tap("WatchDeployPlugin", (fileName, changTime) => {
        //console.error(fileName, changTime);
        this.changFile = fileName;
      });
      compiler.hooks.done.tap("WatchDeployPlugin", (stats) => {
        var compilation = stats.compilation;
        if (this.changFile != "") {
          compilation.chunks.forEach(chunk => {
            var modules = chunk.getModules();
            modules.forEach(module => {
              //console.error("r---c", module.userRequest,this.changFile);
              if (module.userRequest == this.changFile) {
                 //console.error("chunk", chunk.files);
                chunk.files.forEach(file => {
                  var outFilePath = compiler.outputPath+file;
                  var projectName= path.posix.normalize(file).split(path.posix.sep)[1];
                  //console.error("projectName", projectName);
                 var outProjecPath= path.resolve(compiler.outputPath,projectName);
                  //console.error("outFilePath", outFilePath);
                  //console.error("outFilePath", outProjecPath);
                  switch (this.options.type) {
                    case "deploy":
                      this.sendCmd("save", "/"+outProjecPath);
                      break;
                    case "rerun":
                      this.sendCmd("rerun","/"+outFilePath);
                      break;
                    default:
                      break;
                  }
                })
              }
            })
          })
        }
      })
    }
  }
}
module.exports = WatchDeployPlugin;