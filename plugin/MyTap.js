function MyTap () {
  this.startTime = Date.now();
  this.prevTimestamps = {};
}

MyTap.prototype.apply = function (compiler) {
  compiler.hooks.compile.tap('MyPlugin', params => {
    console.log('以同步方式触及 compile 钩子。')
  })
};

module.exports = MyTap;