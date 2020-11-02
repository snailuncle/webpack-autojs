"ui";
ui.layout(
    <vertical padding="16" id="parent">
        <TextView text="快捷输入" gravity="center" textSize="24sp" padding="10 10 10 10" />
        <horizontal>
            <TextView w="auto" text="表情话术【hs0.txt】+文本话术【hs1—hsN】,保存在download目录下的文件hs1-n.txt，每一行为一条话术" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="话术库" />
            <input w="auto" id="totalhs" minWidth="50" inputType="number" text="7" />
            <TextView w="auto" text="个（总数）" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="保存在download/hs0-n.txt" />
            <button w="*" id="hs" text="编辑话术" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="打开app" />
            <input w="auto" id="app" minWidth="150" text="抖音" />
            <button w="auto" id="openapp" text="开始工作" />
        </horizontal>
    </vertical>
);
var Maid = require("../../common/Maid.js");
var maid = new Maid("cn.wps.moffice_eng");
var filePath = "/sdcard/Download/";
var totalhs = 0;
ui.hs.click(function () {
    toast("打开wps,表情编辑话术");
    totalhs = Number(ui.totalhs.text());
    hszs();
    
});
ui.openapp.click(function () {
    var appName = ui.app.text();
    threads.start(function () {
        launchApp(appName);
        floatyWindow();
    });
});
function hszs() {
    threads.start(function () {
        totalhs = Number(ui.totalhs.text());
        maid.before(true);
        maid.launch();
        for (var index = 0; index <= totalhs; index++) {
            maid.checkFile(filePath + "hs" + index + ".txt");
        }

    })
}
function floatyWindow() {
    var window = floaty.window(
        <vertical>
            <button id="tu" text="快捷输入法，点击移动"></button>
            <grid id="actions" spanCount="6" >
                <button id="action" text="{{this.key}}" h="40" bg="#ffffffff" />
            </grid>
        </vertical>
    );
    window.setPosition(device.width * 0.1, device.height * 0.5);
    window.exitOnClose();
    var arr=[];
    for (var index = 0; index <= totalhs; index++) {
          arr.push({ key: index });
    }
    arr.push({ key: 'del' });
    window.actions.setDataSource(arr); 

    window.tu.click(() => {
        window.setAdjustEnabled(!window.isAdjustEnabled());
        return true;
    });
}
setInterval(
    function () {
    }, 1000
)