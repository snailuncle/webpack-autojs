"ui";
ui.layout(
    <vertical padding="16" id="parent">
        <text text="抖音点赞" gravity="center" textSize="24sp" />
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />
        <horizontal>
            <checkbox w="auto" id="pldz" text="评论点赞" checked="true" />
            <input w="auto" id="numpldz" minWidth="50" inputType="number" text="20" />
            <text w="auto" text="（总数）" />
        </horizontal>
        <horizontal>
            <checkbox w="auto" id="plrzpdz" text="评论人作品点赞" checked="true" />
            <input w="auto" id="numplrzpdz" minWidth="50" inputType="number" text="10" />
            <text w="auto" text="（总数）" />
        </horizontal>
        <horizontal>
            <checkbox w="auto" id="plrzppl" text="评论人作品评论" checked="true" />
            <input w="auto" id="numplrzppl" minWidth="50" inputType="number" text="10" />
            <text w="auto" text="（总数）" />
        </horizontal>
        <horizontal>
            <checkbox w="auto" id="sleepTime" text="跑完休息时间" checked="false" />
            <input w="auto" id="numsleepTime" minWidth="50" inputType="number" text="0.1" />
            <text w="auto" text="分钟" />
        </horizontal>
        <button id="hssz" text="话术设置" />
        <button id="ok1" text="准备抖音,按返回键退出" />
        <button id="ok" text="开始干活" />
        <text w="auto" id="note" text="" />
    </vertical>
);
var Maid = require("./Maid.js");
var common = require("./common.js");
var Map = require("./Map.js");
var commonTools =  require("./common.js");
const { waitTime } = require("./common.js");

ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
ui.hssz.click(function () {
    toast("执行脚本");
    var e = engines.execScriptFile("hssz.js");
});
ui.ok.click(function () {
    toast("开始干活：版本" + 12.6);
    getConfig();
    main();

});
ui.ok1.click(function () {
    var appName = "抖音短视频";
    toast("完全打开后，进入主页，按返回，再【开始干活】");
    common.openApp(appName);
})

var tasks;
var pldzTotal = -1;
var plrzpdzTotal = -1;
var plrzpplTotal = -1;
var sleepTime = -1;
var config_videos = 15;
var config_pagehua = 5;
var config_maxPage = 8;
var isCirculate = false;
function getConfig() {
    tasks = new Array();
    if (ui.pldz.isChecked()) {
        tasks.push(1);
    }
    if (ui.plrzpdz.isChecked()) {
        tasks.push(2);
    }
    if (ui.plrzppl.isChecked()) {
        tasks.push(3);
    }
    if (ui.sleepTime.isChecked()) {
        tasks.push(4);
        isCirculate = true;
    }
    pldzTotal = Number(ui.numpldz.text());
    plrzpdzTotal = Number(ui.numplrzpdz.text());
    plrzpplTotal = Number(ui.numplrzppl.text());
    sleepTime = Number(ui.numsleepTime.text()) * 60;
    log("执行任务--->" + tasks.join(","));
    log("点赞" + pldzTotal);
    log("作品点赞" + plrzpdzTotal);
    log("作品评论" + plrzpplTotal);
    log("休息时间" + sleepTime);
}
var wbhss;
var bqhss;
function readhs() {
    var filePath = "/sdcard/Download/";
    bqhss = common.readlines(filePath + "bqhs.txt");
    wbhss = common.readlines(filePath + "wbhs.txt");
    log(bqhss);
    log(wbhss);
}

var maid = new Maid("com.ss.android.ugc.aweme");
var key = -1, currentVideo = -1, desVideo = -1, currentTask = -1; totalTask = -1; //当前第几个视频
var doneMap = new Map();
var OPENAPP = 0, MY = 1, FIRST = 3, CHOISE = 4, COMMENT = 5, FIRSTCLICKZANPL = 6, CHANGETASK = 7;
var thread;
var myFloaty;
function main() {
    key = OPENAPP;
    if (thread != null) {
        thread.interrupt()
    }
    thread = threads.start(function () {
        common.resetConsole();
        myFloaty =floatyWindow();
        readhs();
        test();
        maid.before(true);
        while (true) {
            switch (key) {
                case OPENAPP:
                    open();
                    break;
                case MY:
                    my();
                    break;
                case FIRST:
                    tofirst();
                    break;
                case CHOISE:
                    choise();
                    break;
                case COMMENT:
                    toComment();
                    break;
                case FIRSTCLICKZANPL:
                    fistClickZanPL();
                    break;
                case CHANGETASK:
                    changeTask();
                    break;
                case 199:
                    exitApp();
                                
                    return;
                default:
                    break;
            }

        }
    })
}
function exitApp(){
    log("---任务退出----");
    waitTime(10);
    while(true){
       var t= text("我").findOnce();
       if(t==null){
           back();
           sleep(1000);
       }else{
           break;
       } 
    }
    maid.clickTextCenter("我");
    console.hide();
    common.waitTime(2, "隐藏日志点击更多----");
    maid.clickDescCenter("更多");
    common.waitTime(2, "设置");
    console.hide();
    maid.clickTextCenter("设置");
    ui.run(function(){
        setPosit(0,0);
     });
    nextPage();
    nextPage();
    nextPage();
    maid.clickTextCenter("清理占用空间");
    common.waitTime(5, "清理占用空间");
    maid.clickTextCenter("清空");
    waitTime(5);
    maid.clickTextCenter("清空");
    common.resetConsole(0,700);
    common.swipeRandom(300,0,400,1000,200);
    waitTime(3);
    common.swipeRandom(300,0,400,1000,200);   
    waitTime(3);
    click(92,304);
    waitTime(1);
    common.swipeRandom(300,500,400,0,500);   
    var x=0;
    console.clear();
    console.hide();
    while(true){
        if(x>20){
            break;
        }
        sleep(500);
        back();
        x++;
    }
 
}


function open() {
    var appName = "抖音短视频";
    common.openApp(appName);
    common.waitTime(3, "进入抖音首页");
    key = MY;
};
function my() {
    common.waitTime(2, "进入抖音[我]");
    text("我").findOne();
    maid.clickTextCenter("我");
    console.hide();
    common.waitTime(2, "隐藏日志点击更多----");
    maid.clickDescCenter("更多");
    common.waitTime(2, "我的二维码");
    console.hide();
    maid.clickTextCenter("我的二维码");
    common.waitTime(2, "扫一扫");
    maid.clickTextCenter("扫一扫");
    common.waitTime(5, "相册");
    maid.clickTextCenter("相册");
    common.waitTime(5, "选二维码");
    log("停留在这，软件需要升级");
    common.resetConsole(-20, 700);
    maid.clickMultiChildIndex(className("androidx.recyclerview.widget.RecyclerView").findOne().children(), className("android.view.View"), 0);
    common.waitTime(2, "确认");
    maid.clickTextCenter("确认");
    //进入第一个，
    key = FIRST;
    common.resetConsole();
    pauseTask();
}
var feature = 1;
//到第一个,2,3个功能，//
function tofirst() {
    log("识别照片失败，停留在这，可以用摄像头扫码")
    textStartsWith("喜欢").findOne();
    maid.clickTextStartCenter("喜欢");
    waitTime(3, "第一个视频");
    clickFistbounds();//点击第一个视频
    if (currentVideo == -1) {
        currentVideo = 0;
    }
    key = CHANGETASK;
}



function choise() {
    pauseTask();
    var index = currentVideo - desVideo;
    log("总任务数" + totalTask + "已执行" + currentTask);
    if (currentTask >= totalTask) {//达到目标总数了，退出
        //任务执行完了，换下一波任务，由换任务的地方负责，继续执行，还是休息
        key = CHANGETASK;
        return;
    }
    if (desVideo > config_videos) {//已经变量完15个视频了,
        waitTime(3, "查完前" + config_videos + "个视频，任务未完成");
        waitTime(3, "返回用户也");
        back();
        waitTime(3, "返回扫码页");
        back();
        waitTime(3, "返回我的页面");
        back();
        currentVideo = 0;
        desVideo = 0; //回到第一个
        key = MY;
        return;
    }
    log("当前视频" + currentVideo + "-->" + desVideo);
    if (index != 0) {
        while (currentVideo < desVideo) {
            nextVideo();
            currentVideo++;
        }
        while (currentVideo > desVideo) {
            lastVideo();
            currentVideo--;
        }
    }
    maid.click(device.width/2,device.height/2);
    waitTime(3, "点击评论")
    maid.click(668, 678); //点击评论，进入评论页
    waitTime(3, "页面跳转冷却")
    if (feature == 1) {
        key = COMMENT;
        //重新开始计数
        numOfPage = 0;
        numOfClick = 0;
    }
    if (feature == 2 || feature == 3) {
        key = FIRSTCLICKZANPL;
        //给第一个作品点赞，先滑动5页
        nextPage(config_pagehua);
    }
}
function getHs() {
    var min =0;
    var rs = wbhss[commonTools.random(min, wbhss.length - 1)];
    if (rs == "" || rs == null) {
        rs = "很好看哟";
    }
    var index3 = commonTools.random(0, 100);
    var result = rs;
    switch (index3 % 3) {
        case 0:
            result;
            break;
        case 1:
            result = bqhss[commonTools.random(min, bqhss.length - 1)] + rs;
            break;
        case 2:
            result = bqhss[commonTools.random(min, bqhss.length - 1)] + rs + bqhss[commonTools.random(min, bqhss.length - 1)];
            break
        default:
            break;
    }
    return result;
}

function logTask() {
    log("第" + currentVideo + "个视频，滑动" + numOfPage + "页，点" + numOfClick + ",总：" + totalTask + "-->" + currentTask);
}



var featureindex = -1;
var featureNames = ["", "评论点赞", "评论人作品点赞", "评论人作品评论", "休息"];
function changeTask() {
    pauseTask();
    if (feature == 1 && currentTask != 0 && totalTask > currentTask) {

    } else {
        featureindex++;
    }
    log("循环？"+isCirculate);
    log("index"+featureindex + tasks.length);
    if (!isCirculate) {
        if (featureindex >= tasks.length) {
            waitTime(30, "清理现场退出程序了");
            key=199;
            return;
        }
    }
    log("任务号：" + featureindex);
    var index = featureindex % tasks.length;
    feature = tasks[index];
    waitTime(5, "马上开始任务-->" + featureNames[feature]);
    doneMap.clear();
    switch (feature) {
        case 1:
            desVideo = 0;
            totalTask = pldzTotal;
            key = CHOISE;
            if (currentTask == -1) {
                currentTask = 0;
            }
            break;
        case 2:
            currentTask = 0;
            totalTask = plrzpdzTotal;
            desVideo = commonTools.random(0, 14);
            key = CHOISE;
            break;
        case 3:
            key = CHOISE;
            currentTask = 0;
            totalTask = plrzpplTotal;
            desVideo = commonTools.random(0, 14);
            break;
        case 4:
            feature4();
            break;
        default:
            break;
    }

}

function test() {
     return;
    featureindex = 2;
    currentVideo = 0;
    desVideo = 5;
    totalTask = 10;
    key = 199;
}

function feature4() {
    waitTime(sleepTime*2, "正在执行休息");
    key = CHANGETASK;
}

//第一个作品，后，如果没有第一个作品，返回到评论页，
function clickFirst() {
    waitTime(4, "用户作品,没有进入可以手动")
    var into = textStartsWith("作品").findOne(4000);
    if (into != null) {
        log(into.text());
        var notZp = text("作品 0").findOnce();
        if (notZp != null) {
            log("没有作品");
            back();
            return false;
        } else {
            waitTime(4, "进入第一个作品");
            clickFistbounds();
            return true;
        }
    }else{
        var x=textEndsWith("条评论").findOnce();
        if(x!=null){
            log("本该在用页，准备点击第一个作品，但是没有进入");
            return false;
        }

    }
    back();
    waitTime(2, "返回")
    return false;
}
function clickFistbounds() {
    var into = textStartsWith("作品").findOne();
    var b = into.bounds();
    b.bottom = b.bottom + 150
    b.top = b.top + 150
    maid.click(b.centerX(), b.centerY());
}
var numOfClick = -1;
var numOfPage = -1;
function toComment() {
    pauseTask();
    log(1, "待进入评论列表")
    textEndsWith("条评论").findOne();
    var x = textMatches("刚刚").find();
    for (let index = 0; index < x.length; index++) {
        var element = x[index];
        var name = findName(element.parent());
        log("点赞第" + numOfClick + "个用户" + name)
        logTask()
        if (doneMap.has(name)) {
            continue;
        }
        if (checkAndClick(element.parent())) {
            log("点击成功");
            doneMap.put(name, 1);
            currentTask++;
            numOfClick++;
        }
        if (numOfClick >= 10) {
            log("满10个了")
            break; //点够10个了
        }
    }
    var wgs = id("d57").find();
    var uc = new Array();
    wgs.forEach(element => {
        if (element.findOne(id("ham")) == null) {
            uc.push(element);
        }
    });
    for (let index = 0; index < uc.length; index++) {
        var element = uc[index];
        var name = findName(element);
        if (doneMap.has(name)) {
            continue;
        }
        log("点赞第" + numOfClick + "个用户" + name)
        if (checkAndClick(element)) {
            doneMap.put(name, 1);
            log("点击成功");
            currentTask++;
            numOfClick++;
        }
        if (numOfClick >= 10) {
            log("满10个了")
            break; //点够10个了
        }
    }
    numOfPage++;
    if (numOfPage > config_maxPage || numOfClick >= 10) {
        waitTime(2, "赞:" + numOfClick + "页：" + numOfPage + "，换下一个");
        key = CHOISE; //
        back();
        desVideo++;
        waitTime(3);
        return; //直接返回了,换下一个视频
    }
    //前面条件都没满足，换下一页
    nextPage();
}
function fistClickZanPL() {
    pauseTask();
    waitTime(2, "进入评论列表");
    log("进入评论列表，没有进入，可以手动点评论")
    textEndsWith("条评论").findOne();
    var comments = className("android.view.ViewGroup").id("d57").find();
    for (let index = 1; index < comments.length - 1; index++) {
        logTask();
        var name = findName(comments[index])
        if (doneMap.has(name)) {
            waitTime(1, "已处理【" + name + "】下一个")
            continue;
        }
        doneMap.put(name, 1);
        waitTime(3, "检测第" + currentTask + "个【" + name + "】")
        //点击数组里面第几个孩子的某个选择器,头像的id
        maid.clickMultiChildIndex(comments, id("bji"), index);
        var have = clickFirst();
        if (!have) {
            log("跳过，下一个")
            continue;
        }
        waitTime(4, "准备点赞")
        maid.click(device.width/2, device.height/2);
        if (feature == 2) {
            //点赞
            log("点赞")
            maid.click(666, 555);
            waitTime(2, "返回用户页");
            back();
            waitTime(2, "返回列表页");
            back();
        }
        if (feature == 3) {
            log("进入评论，写评论");
            maid.click(666, 687);//进入评论
            className("android.widget.EditText").findOne().click();
            waitTime(1, "进入评论，写评论");
            className("android.widget.EditText").findOne().setText(getHs());
            log("停留在这里，说明id发生了变化，手动点点击输入框试试");
            while (true) {
                var t = id("agv").findOne(1000);
                if (t != null) {
                    t.click();
                    break;
                }
                var m = className("android.widget.EditText").findOnce();
                if (m != null) {
                    maid.clickCenter(m);
                }
                sleep(1000);
            }
            waitTime(1, "返回视频");
            back();
            waitTime(1, "返回用户");
            back();
            waitTime(1, "返回评论");
            back();
        }
        currentTask++;
        if (currentTask > totalTask) {
            waitTime(5, "任务已经完成，返回视频页");
            logTask();
            back();
            key = CHANGETASK;
            return;
        }
    }
    waitTime(4);
    nextPage();
    waitTime(2);
}

function findName(wg) {
    var nameWg = wg.findOne(id("title"));
    var name = "错误数据";
    if (nameWg != null) {
        name = nameWg.text();
    }
    return name;
}


function checkAndClick(wg) {
    var m = wg;
    if (m == null) {
        return false;
    }
    var iv = m.findOne(className("android.view.View"));
    if (iv != null && !iv.select()) {
        iv.click();
        waitTime(1, "---点赞成功---");
        return true;
    }
    waitTime(1, "----没有----");
    return false;
}
function nextVideo() {
    common.waitTime(1, "下一个视频")
    maid.swipe(500, 1000, 580, 480, 2);
    common.waitTime(3, "冷却")
}
function lastVideo() {
    common.waitTime(1, "上一个视频")
    maid.swipe(500, 480, 580, 1000, 2);
    common.waitTime(3, "冷却")
}

function nextPage(step) {
    var total = step || 1;
    var index = 0;
    while (index < total) {
        common.waitTime(1, "下一页")
        common.swipeRandom(500, 1090, 580, 350, 300);
        common.waitTime(1, "冷却");
        index++;
    }
}
var isPause = false;
function pauseTask() {
    if (isPause) {
        waitTime(1, "任务已经暂停，请记住该页面，恢复的时候请保证停留在这里");
        console.hide();
        ui.run(function(){
           setTxt("已暂停");
        });
        var i = 0;
        while (true) {
            if (!isPause) {
                common.resetConsole();
                waitTime(1, "---任务已恢复---");
                ui.run(function(){
                   setTxt("运行中");
                });
                return;
            }
            sleep(2000)
            if (i % 10 == 0) {
                logTask();
                log("---任务已暂停---");
            }
            i++;
        }
    }
}

var window ;
function floatyWindow(){
   window= floaty.window(
        <frame>
            <button id="action" text="运行中" w="90" h="40" bg="#77ffffff"/>
        </frame>
    );
    window.setPosition(device.width-180, 100);
    window.exitOnClose();
    window.action.click(()=>{
        //运行中---即将暂停--暂停中--即将恢复---运行中
        if(window.action.getText() == '运行中'){
            isPause=true;
            log("任务即将暂停---请耐心等待----");
            log("任务即将暂停---请耐心等待----");
            log("任务即将暂停---请耐心等待----");
            window.action.setText('即将暂停');
        }else if(window.action.getText() == '即将暂停'){
            isPause=true;
        }else if(window.action.getText() == '已暂停'){
            isPause=false;
            log("马上恢复任务---请耐心等待----");
            log("马上恢复任务---请耐心等待----");
            log("马上恢复任务---请耐心等待----");
            window.action.setText('即将恢复');
        }else if(window.action.getText() == '即将恢复'){
            isPause=false;
        }
    });
    window.action.longClick(()=>{
       window.setAdjustEnabled(!window.isAdjustEnabled());
       return true;
    }); 
}

function setPosit(x,y){
    window.setPosition(x, y);
};
function setTxt(txt){
    window.action.setText(txt);
};
setInterval(
    function(){
    },1000
  )







