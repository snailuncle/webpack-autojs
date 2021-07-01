
/**
 * 这个是一个简单的云控 测试demo，可以在本地运行，也可以在远端运行。
 * 
 */

var user = {
  name: '张三'
};  //定义一个简单对象

/**
 * 定义主函数，入口函数，
 * @param {*} options 服务器端穿过来的参数，
 * 在本地测试的是 options 是没有值的。
 * 
 */
function main(options) {
  options = options || {};
  console.show();
  let key=options.key||'touke....'
  console.log('options---->',options)
  console.log('key---->',key)
  console.log(user);
}
//
main();