
var common = require("./common.js");
const { waitTime } = require("./common.js");

function nextVideo() {
    common.waitTime(1, "下一个视频")
    app.swipe(500, 1000, 580, 480, 2);
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
var DyDinaZan = {}; 
DyDinaZan.openApp = function () {
    var appName = "抖音短视频";
    log("正在打开抖音app");
    launchApp(appName);
    waitTime(10,"正在打开"+appName);
}
DyDinaZan.openComment = function () {
    log("打开评论");
    click(500, 500);
    var pl = className("android.widget.LinearLayout").descStartsWith("评论").findOne();
    var info = pl.desc();
    var needdo = false;
    if (info.indexOf("w") != -1) {
        needdo = true;
    }
    var infoNumber = info.match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g);
    log(infoNumber);
    if (parseInt(infoNumber)>200) {
        needdo = true;
    }
    if (needdo) {
        log(info);
        log("满足要求数量要求");
        pl.click();
    }
    waitTime(3);
    return needdo;
}
DyDinaZan.analysisComment = function () {
    waitTime(1,"分析刚刚的的数量")
    var validCommentCount = 0;
    for (var i = 0; i < 8; i++) {
        //处理当前页
       var gg= text("刚刚").find();
        validCommentCount+=gg.length;
        if(validCommentCount>=3){
            waitTime(1,"功能找到"+validCommentCount+"個,返回点赞了")
            return true;
        }
        if (text("暂时没有更多了").findOnce()!=null) {
            log("暂时没有更多了");
            break;
        }
        waitTime(1,"下一页");
        nextPage();
        waitTime(1);
    }
    return false;
}

//点赞
DyDinaZan.giveTheThumbsUp = function () {
    var comment = className("android.widget.LinearLayout").descStartsWith("未选中，喜欢").findOnce();
    if(comment!=null){
        waitTime(1,"点赞");
        comment.click();
    }
    waitTime(1);
}
function main2() {
    common.resetConsole();
    log("开始");
    DyDinaZan.openApp();
    while (true) {
        waitTime(1);
        var liveBroadcast = text("点击进入直播间").findOne(1000);
        if (liveBroadcast != null) {
            log("划过直播间");
            nextVideo();
            continue;
        }
        if (!DyDinaZan.openComment()) {
            nextVideo();
            continue;
        }
        var canGiveTheThumbsUp = DyDinaZan.analysisComment();
        waitTime(1,"返回---");
        back();
        if (canGiveTheThumbsUp) {
            log("满足点赞条件---");
            DyDinaZan.giveTheThumbsUp();
        }
        nextVideo();
    }
}
threads.start(function () {
    main2();
});