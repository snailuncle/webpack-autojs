### 20200920 添加一个字符串替换的正则, 比如
```
    InputLayout.prototype.render = function () {
        return <EditText padding='10 5' drawablePadding="5" gravity='center_vertical' />
    }
```
替换为
```
    InputLayout.prototype.render = function () {
        return `<EditText padding='10 5' drawablePadding="5" gravity='center_vertical' />`
    }
```
就是在xml两边加上反引号, 其他啥也没动.

## QQ交流群 1019208967  webpack-autojs
#### bilibili 本仓库的使用教程  https://www.bilibili.com/video/BV1n7411q7rC/
### 该视频已作废, 因为是好几月前录制的, 请以README为准


-2. 无法加载文件, 因为在此系统上禁止运行脚本。 cmd管理员执行该代码 `set-ExecutionPolicy RemoteSigned`

-1. 需要全局安装webpack webpack-cli `npm i -g webpack webpack-cli --registry=https://registry.npm.taobao.org`

0. 功能: 打包autojs, 不论单个文件, 还是多个文件, 不管有ui还是没ui, 都可以正常打包使用
1. 下载仓库

    `git clone https://github.com/snailuncle/webpack-autojs`
2. 命令行
    `npm install --registry=https://registry.npm.taobao.org`
3. 复制autojs项目的入口文件路径到`entry.txt`
4. 命令行 `webpack`
5. 打包后的文件在`dist`目录下

其他说明:
1. 主要配置文件就一个`scriptConfig.js`
2. `scriptNamePrefix`是文件前缀, 可以为打包后的文件加一个文件前缀, 比如打包`index.js`, 前缀为`测试_`, 那么打包后的文件名就是`测试_index.js`
3. `header.txt` 该文件中的内容会被添加到打包后的文件的头部, 默认为空.
4. `uiMode` true: ui模式, false 非ui模式
5.  `base64`webpack打包后是否base64编码
6.  `base64RandomStrLength`base64编码后, 在字符串前面添加的随机字符长度

其他说明2:
1. 目前支持的ui有四种, ` ui.layout, ui.inflate, floaty.rawWindow, floaty.window `
2. 如果layoutContent是一个字符串变量, 而不是xml的话, 可以尝试, 将`floaty.window`定义为`floatyWindow`, 其他的` ui.layout, ui.inflate, floaty.rawWindow, floaty.window `也一样:
```
let floatyWindow = floaty.window;
var w = floatyWindow(layoutContent);
```
3. loader文件是`node_modules\webpack-autojs-loader\index.js`

其他说明3:
1. webview打包推荐: `https://github.com/molysama/auto.pro`
2. require只能用相对路径, webpack才能正常打包
3. require如果用绝对路径, 请使用global.require代替  如global.require("/sdcard/module1.js")

## 常见错误
1. xml中使用了圆括号, 由于loader使用了正则匹配, 圆括号会影响正则, 请使用中文括号
2. require使用了绝对路径, 请避免使用绝对路径,
3. 如果require用了绝对路径, webpack是找不到的, webpack是电脑使用的工具, 不是手机使用的工具,他找不到/sdcard, 请使用global.require代替
4. 若果xml中有list, 请不要省略this, 因为loader正则中会区分xml中的{{}}中是不是带了this, 来进行不同的处理
5. 变量未定义, 请注意所有变量都要先定义, 再使用; 注意js的变量提升, 导致打包后的运行错误.
6. 如果不定义就使用, 请在变量前面加上   global.   这7个字符, 可以避免一些变量提升导致的错误
7. 如果导入jar或者dex, 使用java对象, 建议直接使用对象的完整名字, 比如`var url = new java.net.URL(myUrl);`, 而不是`var url = new URL(myUrl);`
## js转dex, 可以参考此仓库
[batchJs2Dex](https://github.com/snailuncle/batchJs2Dex)

## so中执行autojs脚本, 可以参考此仓库
[autojsNativeJs](https://github.com/snailuncle/autojsNativeJs)
