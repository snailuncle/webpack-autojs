"ui";

ui.layout(
    <vertical padding="16" id="parent">
        <TextView text="快捷输入" gravity="center" textSize="24sp" padding="10 10 10 10" />
        <horizontal>
            <TextView w="auto" text="文本话术库【hs0—hsN】,保存在download目录下的文件hs0到hsN.txt，每一行为一条话术" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="话术库" />
            <input w="auto" id="totalhs" minWidth="50" inputType="number" text="4" />
            <TextView w="auto" text="个（总数）" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="保存在download/hs0-hsN.txt" />
            <button w="*" id="hs" text="wps编辑话术" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="打开app" />
            <input w="auto" id="app" minWidth="150" text="抖音" />
            <button w="auto" id="openapp" text="开始工作" />
        </horizontal>
    </vertical>
);
var common = require("../../common/common.js");
const { resetConsole } = require("../../common/common.js");
var filePath = "/sdcard/Download/";
var storage = storages.create("com.example.kjsr");
var totalhs = storage.get("totalhs", 3);
var appName = storage.get("appName", "抖音");
ui.totalhs.setText(totalhs + "");
ui.app.setText(appName);
ui.hs.click(function () {
    toast("打开wps,表情编辑话术");
    launch("cn.wps.moffice_eng");
    totalhs = Number(ui.totalhs.text());
    storage.put("totalhs", totalhs);
    hszs();
});
ui.openapp.click(function () {
    var appName = ui.app.text();
    threads.start(function () {
       // resetConsole();
        readhss();
        launchApp(appName);
        storage.put("appName", appName);
        floatyWindow();
    });
});
function hszs() {
    threads.start(function () {
        for (var index = 0; index <= totalhs; index++) {
            common.checkFile(filePath + "hs" + index + ".txt");
        }
    })
}
function floatyWindow() {
    var window = floaty.window(
        <vertical>
            <horizontal>
                <button id="tu" text="移动"></button>
                <button id="yc" text="隐藏"></button>
            </horizontal>
            <grid id="actions" spanCount="7" >
                <button id="action" text="{{this.key}}" h="40" bg="#ffffffff" />
            </grid>
        </vertical>
    );
    window.setPosition(device.width * 0.1, device.height * 0.5);
    window.exitOnClose();
    window.actions.setDataSource(initKeys());
    window.actions.on("item_bind", function (itemView, itemHolder) {
        itemView.action.on("click", function () {
            var text = itemHolder.item.key;
            log(text)
            threads.start(function () {
                if (text != "del") {
                    var txt = geths(text);
                    var edwg = className("android.widget.EditText").findOnce()
                    if (edwg != null) {
                        if (edwg.text() != "发送消息...") {
                            txt = edwg.text() + txt;
                        }
                        ui.run(() => {
                            edwg.setText(txt);
                        })
                    }
                } else {
                    var edwg = className("android.widget.EditText").findOnce()
                    if (edwg != null) {
                        ui.run(() => {
                            edwg.setText(" ");
                        })
                    }
                }
            });
        });
    });
    window.tu.click(() => {
        window.setAdjustEnabled(!window.isAdjustEnabled());
        return true;
    });
    var yc = false;
    window.yc.click(() => {
        yc = !yc;
        if (yc) {
            ui.run(function () {
                window.actions.setDataSource([]);
            })
        } else {
            ui.run(function () {
                window.actions.setDataSource(initKeys());
            })
        }
    });
}
function initKeys() {
    var arr = [];
    for (var index = 0; index <= totalhs; index++) {
        arr.push({ key: index });
    }
    arr.push({ key: 'del' });
    return arr;
}
function geths(index) {
    log(parseInt(index))
    log(hss[parseInt(index)]);
    return zuhehs(parseInt(index));
}
function randomHs(hs) {
    var rs = hs[random(0, hs.length - 1)];
    if (rs == "" || rs == null) {
        rs = "话术文1件没有内容";
    }
    return rs;
}
function zuhehs(index) { //组合话术
    var result = randomHs(hss[index]);
    return result;
}
var hss = [];
function readhss() { //读取话术
    var filePath = "/sdcard/Download/";
    for (var index = 0; index <= totalhs; index++) {
        var bqhss = common.readlines(filePath + "hs" + index + ".txt");
        log(bqhss);
        hss.push(bqhss);
    }
}
setInterval(
    function () {
    }, 1000
)
