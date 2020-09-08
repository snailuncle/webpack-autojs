class HelloWorldPlugin {
  constructor(options = {}) {
    
  }
  apply(compiler) {
    var changFile;
    compiler.hooks.invalid.tap("HelloWorldPlugin", (fileName, changTime) => {
      console.error(fileName, changTime);
      changFile = fileName;
    });
    compiler.hooks.done.tap("HelloWorldPlugin", (stats) => {
      var compilation =stats.compilation;
      if (changFile != null) {
        compilation.chunks.forEach(chunk => {
          var modules = chunk.getModules();
          modules.forEach(module => {
            // console.error("userRequest", module.userRequest);
            console.error("resource", module.resource);
          })
        })
      }
    })
  }
}
module.exports = HelloWorldPlugin;