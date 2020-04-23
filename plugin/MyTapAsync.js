function MyTapAsync () {
  this.startTime = Date.now();
  this.prevTimestamps = {};
}

MyTapAsync.prototype.apply = function (compiler) {
  compiler.hooks.run.tapAsync('MyPlugin', (compiler, callback) => {
    console.log('以异步方式触及 run 钩子。')
    callback()
  })
};

module.exports = MyTapAsync;