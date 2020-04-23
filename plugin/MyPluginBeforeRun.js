
class MyPluginBeforeRun {
  apply(compiler) {
    // compiler.hooks.shouldEmit.tap('MyPlugin', params => {
    compiler.hooks.compile.tap('MyPlugin', params => {
      console.log('Synchronously tapping the compile hook.');
      console.log('params')
      console.log(params)
      console.log('---------------------------------------------------------------------------------------------------------')
    });
  }
  // const source = this._source.source();
  // NormalModule
  // apply (compiler) {
  //   compiler.hooks.compile.tapAsync('MyPluginBeforeRun', (compilation, callback) => {
  //     console.log('this is plugin MyPluginBeforeRun !')
  //     // Explore each chunk (build output):
  //     // console.log(compilation)

  //     console.log(compilation)

  //     console.log('---------------------------------------------------------------------------------------------------------')
  //     callback();
  //   });
  // }
}
module.exports = MyPluginBeforeRun;



// beforeRun: AsyncSeriesHook {
//   _args: [Array],
//   taps: [Array],
//   interceptors: [],
//   call: undefined,
//   promise: [Function: lazyCompileHook],
//   callAsync: [Function: anonymous],
//   _x: [Array]
// },