# 概述
本项目是在 https://github.com/snailuncle/webpack-autojs 项目上魔改得来，

本项目的目标是做个 [autoxjs](https://github.com/kkevsekk1/AutoX) （新的开源 autojs）项目的开发工具包，即 autox-cli   
满足工程化（远离刀耕火种）：自动化管理个js类库，自动对源码，编译、混淆、dex加密、打包、部署，让开发人员专心写业务。   
当然要实现 工程化，你需要有一些nodejs开发基础知识。到目前为止尚未封装出cli和dex加密，但是已经实现了除此之外的所以功能， 
所以刚开始你会看到很多文件，请不要害怕，只关心下面文档中提到的几个文件即可。   
项目 直接将编译和的js 转换为 class 转换为 dex 没有实现自动化，   
(除非一开发的功能要授权之类的，其他情况下没有必要，转换为dex。要收费授权，和autojs设计的初衷和开源协议都是背离的。)   
下一步将主要解决这个问题。欢迎有兴趣的fork项目一起实现。   

[优酷视频讲解](https://v.youku.com/v_show/id_XNDg2NjA3NTYyMA==.html)  

## 项目特性清单
- [x] js源码自动编译，混淆、打包、部署手机、重新运行
- [x] vscode 自动提示方法、和说明，有一部分待完善，欢迎pull代码
- [x] 编译后的js 打包成 dex
- [x] 多项目管理
- [x] 自动识别ui模块，源文件 是"ui"; 开头则，编译后同样有，源文件没有，编译后也没有
- [x] 添加多模块编译，一个项目由多个脚本组成，编译后是不同文件，可以相互调用

# 使用方法
1. 你需要安装 nodejs ，安装过程中请注意要 [ 将node添加PATH中 ] 和 安装 npm 这两个选项都要勾选上。(一般的前端工程师都有这个环节)
2.  安装[vscode](https://code.visualstudio.com/) 并安装 autoxjs开发插件即：[Auto.js-VSCodeExt-Fixed](https://marketplace.visualstudio.com/items?itemName=aaroncheng.auto-js-vsce-fixed)  注意是0.3.11 或以上版本。 （ctr+ shift+p 选择autojs 启动服务）
3.  安装全局安装 webpack： ``` npm i -g webpack webpack-cli --registry=https://registry.npm.taobao.org ```
4.  [下载本项目](https://github.com/kkevsekk1/webpack-autojs/archive/master.zip) 或git clone 项目  ``` git clone https://github.com/kkevsekk1/webpack-autojs.git ``` 
    
5. cmd 到项目 ， 运行命令，安装依赖
    ```npm install --registry=https://registry.npm.taobao.org ```

6.  到这来基本上可以说 开发环境 就完成了，（你还要一部手安装 autoxjs），下面说 这项目的配置文件和开发的形式。

# 项目开发、编译、打包、部署介绍

1. work 目录： 这就是我们项目的总目录，即这里面每一个文件夹是一个autoxjs 项目。比如我们 demo,demo1,dy 即为3个项目。 
2. scriptConfig.js 文件： 我们要如何编译项目即在这个文件中配置，打开文件，有注释的可以按照注释改。
3. header.txt 无关紧要的文件，里面的内容会原封不动的添加到 编译后的js代码头部
4. 调整好上面 3处内容 就可用编译了我们的项目了
5. package.json 这个文件规定 看 第6-9行，有两个命令 start 和 build 分别对应开发环境和生成环境的编译，无需修改。只要知道他们 分别对应 npm run start 和 npm run build 。
6. 运行 ```npm run start ``` 即开发环境，没每次修改代码，代码会自动编译，并且 scriptConfig.js 中的wath配置为'rerun'或'deploy' 那么代码将自动在手机中运行 或自动将重新编译的项目保存到手机中。
7. dist目录： 运行上面编译命令（ start或build），就有编译的结果，编译的结果就 dist目录中，这目录下每一个目录代表的就是一个编译后的autoxjs项目.编译后的目录的名称 可以配置一个前缀，以便和编译前的项目区分（当他们都以项目形式保存手中的时候就很有必要）。
8.``` npm run start ``` 这个

# 编译 dex
1. [使用工具](https://github.com/molysama/auto.pro/wiki/dex) 的来源。我用这个工具来打包，不打算重复造轮子了
2. [安装jre](https://www.baidu.com/s?ie=UTF-8&wd=jre)   
3. 安装 auto-cli ``` npm i "@auto.pro/cli" -g ```
4. 运行编译命令 ``` auto-cli dex ./dist/demo/main.js ``` 
5. 如果由于愿意写个 webpapck 插件 ，来执行这里几个命令，实现自动化愿意 pull 代码，我没打算对我的代码 编译为dex 再加固，所以没有动力实现这个插件！

# 其他说明1: 
1. 主要配置文件就一个`scriptConfig.js`
2. `header.txt` 该文件中的内容会被添加到打包后的文件的头部, 默认为空.
3. `uiMode` true: ui模式, false 非ui模式
4.  `base64`webpack打包后是否base64编码
5.  `base64RandomStrLength`base64编码后, 在字符串前面添加的随机字符长度
6.  common 这目录是想放在公共通用包，页希望有 要用的符合 闭包规范的autoxjs的lib可以提供，我知道一个叫 [autojs_sdk](https://github.com/kangour/autojs_sdk) 还行，但是这个封装还是不够，我解决还可以有更好的。
7.  plugin 这目录是自定义 webpack 插件，为编译和自动化服务，一般无需关心。

# 其他说明2:
1. 目前支持的ui有四种, ` ui.layout, ui.inflate, floaty.rawWindow, floaty.window `
2. 如果layoutContent是一个字符串变量, 而不是xml的话, 可以尝试, 将`floaty.window`定义为`floatyWindow`, 其他的` ui.layout, ui.inflate, floaty.rawWindow, floaty.window `也一样:
```
let floatyWindow = floaty.window;
var w = floatyWindow(layoutContent);

```
3. loader文件是`node_modules\webpack-autojs-loader\index.js`

# 其他说明3:
1. webview打包推荐: `https://github.com/molysama/auto.pro`
2. require只能用相对路径, webpack才能正常打包
3. require如果用绝对路径, 请使用global.require代替  如global.require("D:\\module1.js")

# 常见错误
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

## 使用webview，等方式构建应用
[auto.pro](https://github.com/molysama/auto.pro) 可以ts 来编写脚本，构建应用。 如果希望该项目应用 自动部署到手机等功能，请自行配置webpack.config.js即可
