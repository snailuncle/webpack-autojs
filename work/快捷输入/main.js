"ui";

ui.layout(
    <vertical padding="16" id="parent">
        <TextView text="快捷输入" gravity="center" textSize="24sp" padding="10 10 10 10" />
        <horizontal>
            <TextView w="auto" text="表情话术【hs0.txt】+表情话术【hs1.txt】+文本话术【hs2—hsN】,保存在download目录下的文件hs0-n.txt，每一行为一条话术,
            0,1号话术库，会随机添加在 2-N号话术库的前后
            " />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="话术库" />
            <input w="auto" id="totalhs" minWidth="50" inputType="number" text="4" />
            <TextView w="auto" text="个（总数）" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="保存在download/hs0-n.txt" />
            <button w="*" id="hs" text="wps编辑话术" />
        </horizontal>
        <horizontal>
            <TextView w="auto" text="打开app" />
            <input w="auto" id="app" minWidth="150" text="抖音" />
            <button w="auto" id="openapp" text="开始工作" />
        </horizontal>
    </vertical>
);
var Maid = require("../../common/Maid.js");
var common = require("../../common/common.js");
var maid = new Maid("cn.wps.moffice_eng");
var filePath = "/sdcard/Download/";
var storage = storages.create("com.example.kjsr");
var totalhs = storage.get("totalhs", 3);
var appName = storage.get("appName", "抖音");
ui.totalhs.setText(totalhs + "");
ui.app.setText(appName);
ui.hs.click(function () {
    toast("打开wps,表情编辑话术");
    totalhs = Number(ui.totalhs.text());
    storage.put("totalhs", totalhs);
    hszs();
});
ui.openapp.click(function () {
    var appName = ui.app.text();
    threads.start(function () {
        readhss();
        launchApp(appName);
        storage.put("appName", appName);
        floatyWindow();
    });
});
function hszs() {
    threads.start(function () {
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
            <horizontal>
                <button id="qh" text="切换"></button>
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
    var type = false;
    window.actions.setDataSource(initKeys(type));
    window.actions.on("item_bind", function (itemView, itemHolder) {
        itemView.action.on("click", function () {
            var text = itemHolder.item.key;
            log(text)
            threads.start(function () {
                if (text != "del") {
                    var txt = geths(type, text);
                    var edwg = className("android.widget.EditText").findOnce()
                    if (edwg != null) {
                        if (type && edwg.text() != "发送消息...") {
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
    window.qh.click(() => {
        type = !type;
        ui.run(function () {
            window.actions.setDataSource(initKeys(type));
        })
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
                window.actions.setDataSource(initKeys(type));
            })
        }
    });
}
function initKeys(type) {
    var arr = [];
    if (type) {
        arr.push({ key: "表情" });
        arr.push({ key: "1" });
        log("自由组合模式");
    }
    for (var index = 2; index <= totalhs; index++) {
        arr.push({ key: index });
    }
    arr.push({ key: 'del' });
    return arr;
}
function geths(type, index) {
    log(hss)
    if (type) {
        if (index == "表情") {
            index = 0;
        }
        var i=parseInt(index);
        log(hss[i]);
        var rs= randomHs(hss[parseInt(index)]);
        if(i<2){
            return rs;
        }else{
            return jkg(rs);
        }
    }
    log(parseInt(index))
    log(hss[parseInt(index)]);
    return zuhehs(parseInt(index));
}
function randomHs(hs) {
    var rs = hs[random(0, hs.length - 1)];
    if (rs == "" || rs == null) {
        rs = "话术文件没有内容";
    }
    return rs;
}
function getRandomhs(bqhss) {
    var index3 = random(0, 1);
    if (index3 == 0) {
        return "";
    }
    return randomHs(bqhss);
}

function zuhehs(index) { //组合话术
    var result = randomHs(hss[index]);
    var hs= getRandomhs(hss[random(0, 1)]) + getRandomhs(hss[random(0, 1)]) + random(result) + getRandomhs(hss[random(0, 1)]) + getRandomhs(hss[random(0, 1)]);
    return hs;
}
function jkg(hs){
    var hslist = hs.split('');
    var rslist=[];
    var i=0;
     while(i<hslist.length){
         rslist.push(hslist[i]+"");
         if(isr()){
             rslist.push(" ");
         }
         i++
     }
     return rslist.join('');
}

function isr(){
   var x= random(0,100);
   return x%2==0;
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
