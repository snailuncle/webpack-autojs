
### bilibili 本仓库的使用教程  https://www.bilibili.com/video/BV1n7411q7rC/

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
3. `entry` 如果是文件, 打包后是一个文件
4. `entry` 如果是文件夹, 打包后是多个文件
5. `entry` 如果是文件夹, 目录要求如下:     
   entry放文件夹路径parentFolder , 子项目的名称要和子项目的入口文件名一致, 子项目入口文件的后缀为.js
   ```    
   parentFolder--    
                  project1--    
                               project1.js
                  project2--
                               project2.js
                  project3--
                               project3.js
   ```
7. `scriptNamePrefix`是文件前缀, 可以为打包后的文件加一个文件前缀, 比如打包`index.js`, 前缀为`测试_`, 那么打包后的文件名就是`测试_index.js`
8. `header.txt` 该文件中的内容会被添加到打包后的文件的头部, 默认为空.
9. `uiMode` true: ui模式, false 非ui模式
10. `base64`webpack打包后是否base64编码
11. `base64RandomStrLength`base64编码后, 在字符串前面添加的随机字符长度

其他说明2:
1. 简单的ui可以正常打包, webpack-autojs-loader是用户正常打包autojs的loader, 该loader功能就是一个正则解析文件内容, 将ui中的xml内容, 变为字符串
2. 目前支持的ui有四种, ` ui.layout, ui.inflate, floaty.rawWindow, floaty.window `
3. 替换文件是`node_modules\webpack-autojs-loader\index.js`

其他说明3:
1. webview打包推荐: `https://github.com/molysama/auto.pro`
2. require只能用相对路径, webpack才能正常打包
3. require如果用绝对路径, 请使用global.require代替  如global.require("/sdcard/module1.js")
