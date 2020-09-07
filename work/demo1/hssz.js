"ui";
ui.layout(
    <vertical padding="16" id="parent">
        <text text="话术设置" gravity="center" textSize="24sp" padding="10 10 10 10" />
        <horizontal>
            <text w="auto" text="表情话术+文本话术,保存在download目录中,你也可以在电脑上编辑好一会放入手机文件夹中" />
        </horizontal>
        <horizontal>
        <text w="auto" text="保存在download/bqhs.txt" />
            <button w="*" id="bqhs" text="编辑表情话术" />
        </horizontal>
        <horizontal>
          <text w="auto" text="保存在download/wbhs.txt" />
            <button w="*" id="wbhs" text="编辑文本话术" />
        </horizontal>
        <text w="auto" text="使用的时候回随机选一条表情，组合在文本前或后" color="red" />
        <button w="*" id="back" text="返回" />
    </vertical>
);
var Maid = require("./Maid.js");
var maid =new Maid("cn.wps.moffice_eng");
var appName = "WPS Office"
var filePath ="/sdcard/Download/";
ui.bqhs.click(function(){
    toast("打开wps,表情编辑话术");
    main();

});
ui.wbhs.click(function(){
    main();
    toast("打开wps,文本编辑话术");
});
ui.back.click(function(){
    back();
})

function main(type){
    var fileNames=["表情话术","文本话术"];
    threads.start(function (){
        maid.before(true);
        maid.launch();
        maid.checkFile(filePath+"wbhs.txt");
        maid.checkFile(filePath+"bqhs.txt");
    })
}
