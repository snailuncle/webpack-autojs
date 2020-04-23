function MyTapPromise () {
  this.startTime = Date.now();
  this.prevTimestamps = {};
}

MyTapPromise.prototype.apply = function (compiler) {
  compiler.hooks.run.tapPromise('MyPlugin', compiler => {
    return new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      console.log('以具有延迟的异步方式触及 run 钩子')
    })
  })
};

module.exports = MyTapPromise;