const common = require("./common.js");
const { swipeRandom, waitTime, openApp, random, xs_控件匹配是否存在, xs_控件是否存在, xs_控件点击, noResponse, findNodeXY } = require("./common.js");
var douyinUtils = {};
douyinUtils.appName = "抖音";
douyinUtils.packageName = 'com.ss.android.ugc.aweme';
/**关闭屏幕上“以后再说”对话框*/
douyinUtils.closeFlashWindow = function () {
    try {
        if (xs_控件是否存在("text", "好的")) {
            log("检测到---抖音个人信息保护指引");
            xs_控件点击("text", "好的");//抖音个人信息保护指引
        }
        if (xs_控件是否存在("text", "我知道了")) {
            log("检测到---青少年模式");
            xs_控件点击("text", "我知道了");//青少年模式
        }
        if (xs_控件是否存在("text", "以后再说")) {
            log("检测到---抖音更新界面");
            xs_控件点击("text", "以后再说");//抖音更新界面
        }
        if (xs_控件匹配是否存在("text", "发现通讯录好友")) {
            log("检测到---抖音发现通讯录界面");
            if (xs_控件匹配是否存在("text", "取消")) {
                xs_控件点击("text", "取消");//抖音发现通讯录界面
            }
            if (xs_控件匹配是否存在("text", "暂时不要")) {
                xs_控件点击("text", "暂时不要");//抖音发现通讯录界面
            }
        }
        if (xs_控件是否存在("text", "知道了")) {
            log("检测到---青少年模式");
            xs_控件点击("text", "知道了");//青少年模式
        }
        //TODO
        if (xs_控件是否存在("text", "刷新")) {
            log("检测到---网络异常");
            xs_控件点击("text", "刷新");//网络异常
        }
        if (xs_控件是否存在("text", "挂断")) {
            log("有视频电话打进来");
            xs_控件点击("text", "挂断");//不接视频电话
        }
        if (xs_控件是否存在("text", "取消") && xs_控件是否存在("text", "等待对方接听")) {
            log("拨打出视频电话");
            xs_控件点击("text", "取消");//打视频电话
        }
        if (xs_控件是否存在("text", "好友推荐")) {
            log("检测到---好友推荐");
            back();
        }
        if (xs_控件是否存在("text", "网络错误")) {
            log("检测到---网络错误");
            xs_控件点击("text", "刷新");
        }
        if (xs_控件是否存在("text", "直播已结束")) {
            log("检测到---直播已结束");
            // eslint-disable-next-line no-undef
            swipe(822, 1293, 804, 205, random(500, 1000)); 
            sleep(2000);
        }
        if (xs_控件是否存在("text", "稍后")) {
            log("稍后", "t");
            click("稍后");
        }
        if (xs_控件是否存在("text", "下次再说")) {
            log("下次再说", "t");
            click("下次再说");
        }
        if (xs_控件是否存在("text", "稍后提醒我")) {
            log("稍后提醒我", "t");
            click("稍后提醒我");
        }
        if (findNodeXY(text("暂不绑定"), true)) {
            log("暂不绑定", "t");
        }
        if (click("立即开始")) {
            log("立即開始", "t");
        }
        if (findNodeXY(text("同意授权"), true)) {
            log("同意授权", "t");
        }
        if (findNodeXY(text("同意"), true)) {
            log("同意", "t");
        }
        //TODO
        if (findNodeXY(id("a9p"), true)) {
            log("拒绝", "来电");
        }
        if (findNodeXY(text("忽略"), true)) {
            log("检测到---链接", "t");
        }
        noResponse();
    }catch (e) {
        console.log(e);
    }
}
/**
 * 检查及处理一些意外情况，界面干扰情况，比如弹出的“以后再说”，“不感兴趣”，该方案是单独使用一个独立的线程来执行，不会主线程造成阻塞  ??理解肯定有错
 这个干了两件事，第一个关闭哪些弹出框，第二 检测任务线程是否卡主，如果连续times 次，检测到卡主，就重启任务线程。.
 * @param {*} taskThread 线程 ，任务线程。 
 * @param {*} times  次数，连续检测到任务线程，卡主的次数。每一次是10秒，
 */
douyinUtils.checkOthers = function (taskThread, times) {
    var tmpIndex = 0;
    var oldActivty = 1;

    if (taskThread) {
        var tTh = taskThread.call(this);
    }
    threads.start(function () {
        var i = 0;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            douyinUtils.closeFlashWindow();
            var curA = common.index;
            if (taskThread) {
                console.log("%d---%d", oldActivty, curA);
                if (oldActivty == curA) {
                    console.log("" + (times - tmpIndex) * 10 + "秒后退出，重新开始");
                    tmpIndex++;
                } else {
                    tmpIndex = 0;
                    oldActivty = curA;
                }
                if (tmpIndex > times) {
                    var txt = "退出任务重新开始";
                    console.log(txt);
                    console.log(txt);
                    console.log(txt);
                    console.log(txt);
                    tTh.interrupt();
                    back();
                    back();
                    sleep(5000);
                    tTh = taskThread.call(this);
                    common.index = 0;
                    tmpIndex = 0;
                }
            }
            if (i % 6 == 0) {
                log("activity-->" + curA);
            }
            sleep(10000);
            i++;
        }
    });
}
/**
 * 跳转到评论
 */
douyinUtils.toComment = function () {
    waitTime(3,"点击评论")
    // eslint-disable-next-line no-constant-condition
    while(true){
        var plwg = descStartsWith("评论").findOnce();
        if (plwg != null) {
            console.log("点击评论");
            plwg.click();
            sleep(3000);
        }
        console.log("检测评论页");
        var t = textMatches(".*条评论.*|.*暂无评论.*").find();
        if(t){
            console.log("加载评论完成");
            break;
        }
        if(text("留下你的精彩评论吧").findOnce()){
            back();
            sleep(3000);
        }
        sleep(1000);
    }
};
/**
 * 点击斗音界面“我” 按钮
 */
douyinUtils.toMy = function () {
    text("我").findOne().parent().parent().parent().click();
}
/**
 * 点击粉丝按钮
 */
douyinUtils.toMyFs = function () {
    text("粉丝").findOne().parent().click();
}
/**
 * 上滑视屏，冷却时间一秒
 */
douyinUtils.nextVideo = function () {
    log("上滑")
    // eslint-disable-next-line no-undef
    swipe(device.width * 0.6 + random(-20, 10), device.height * 0.55 + random(-20, 10),
        device.width * 0.62 + random(-20, 10), device.height * 0.35 + random(-20, 10), 1);
    sleep(1000);
    log("冷却")
}
/**
 * 下滑视屏，冷却时间一秒
 */
douyinUtils.lastVideo = function () {
    log("下滑")
    // eslint-disable-next-line no-undef
    swipe(device.width * 0.6 + random(-20, 10), device.height * 0.35 + random(-20, 10),
        device.width * 0.62 + random(-20, 10), device.height * 0.55 + random(-20, 10), 1);
    log("冷却")
    sleep(1000)
}
/**
 * 评论翻页
 * @param {*} step 一次翻多少页,默认只翻一页
 */
douyinUtils.commentNextPage = function (step) {
    var total = step || 1;
    var index = 0;
    while (index < total) {
        waitTime(1, "下一页")
        swipeRandom(device.width * 0.5, device.height * 0.85, device.width * 0.7, device.height * 0.4, 500);
        waitTime(1, "冷却");
        index++;
    }
}
/**
 * 跟据用户分享的直播间链接，进入直博间 或者某是，（后面发现非直播间也能进，就是用户分享的，名字没改）
 * @param {*} link 直播间链接
 */
douyinUtils.toLiveRoom = function (link) {
    setClip(link);
    douyinUtils.closeDy();
    douyinUtils.openDy();
    waitTime(8, "等待抖音冷却,等待看一看出现，如果没出现可能链接有问题");
    textEndsWith("打开看看").findOne().click();
    waitTime(1, "进入指定视频");
}

douyinUtils.toRoom = function (link) {
    setClip(link);
    douyinUtils.closeDy();
    waitTime(3);
    douyinUtils.openDy();
    waitTime(8, "等待抖音冷却,等待看一看出现，如果没出现可能链接有问题");
    textEndsWith("看看").findOne().click();
    waitTime(1, "进入指定视频");
}
/**
 * 打开抖音
 */
douyinUtils.openDy = function () {
    openApp(douyinUtils.appName);
    waitTime(10, "加载抖音中");
}
/**
 * 等待主页加载完成，等待抖音的主页出现。这些方法都不好使，
 */
douyinUtils.waitMain = function () {
    global.waitForActivity("com.ss.android.ugc.aweme.main.MainActivity")
}
/**
 * 等待视频加载完成
 */
douyinUtils.waitVideoDetail = function () {
    global.waitForActivity("com.ss.android.ugc.aweme.detail.ui.DetailActivity")
}
/**
 * 等待用户个人信息加载完成
 */
douyinUtils.waitUserProfile = function () {
    global.waitForActivity("com.ss.android.ugc.aweme.profile.ui.UserProfileActivity")
}
/**
 * 等待用户自己的粉丝列表加载完成 ?? 是的，但是不太好使
 */
douyinUtils.waitFollowRelation = function () {
    global.waitForActivity("com.ss.android.ugc.aweme.following.ui.FollowRelationTabActivity")
}
/**
 * 等待分享?? 对的，不太好使
 */
douyinUtils.waitShare = function () {
    global.waitForActivity("com.ss.android.ugc.aweme.refactor.douyin.share.improve.CommonShareDialog")
}
/**
 * 等待直播 ?? 对的，不太好使
 */
douyinUtils.waitLive = function () {
    global.waitForActivity("com.ss.android.ugc.aweme.live.LivePlayActivity")
}
/**
 * 返回个人信息 
 */
douyinUtils.backToUserProfile = function () {
    while (global.currentActivity() != "com.ss.android.ugc.aweme.profile.ui.UserProfileActivity") {
        back();
        console.log("返回个人信息");
        sleep(2000);
    }

}
/**
 * 返回用户首页
 */
douyinUtils.backToHome = function () {
    while (global.currentActivity() != "com.ss.android.ugc.aweme.main.MainActivity" && global.currentActivity() != "android.app.Dialog") {
        back();
        console.log("返回用户首页");
        sleep(2000);
    }
    click("首页");
    sleep(2000);
    click("推荐");
}
/**
 * 返回用户作品
 */
douyinUtils.backToDetail = function () {
    while (global.currentActivity() != "com.ss.android.ugc.aweme.detail.ui.DetailActivity" && descStartsWith("评论").findOnce() != null) {
        sleep(1000)
        log("返回用户作品")
    }
}
/**
 * 返回评论
 */
douyinUtils.backToPl = function () {
    while (global.currentActivity() != "com.ss.android.ugc.aweme.detail.ui.DetailActivity") {
        back();
        sleep(1000)
        log( "返回评论")
    }
}

/**
 * 是否在评论页中?? ，是的，不好使。偶尔出错
 * @returns 
 */
douyinUtils.isInPly = function () {
    sleep(2000)
    var t = id("title").findOnce();
    if (t) {
        return true;
    }
    return false;
}
/**
 * 检查是否可以评论,是否有评论按钮，检测是否有 ‘写评论’，如果有，就是没有人评论过，点进去 要出问题。
 * @returns 
 */
douyinUtils.checkXPl = function () {
    click(device.width * 0.4, device.height * 0.5);
    var i = 2;
    while (i > 0) {
        var t = text("写评论").findOnce();
        if (t != null) {
            return true;
        }
        sleep(1000);
        i--;
    }
    return false;
}
/**
 * 关闭抖音??不太像啊 是关闭抖音，用了n种方法，都不是特别好使。
 */
douyinUtils.closeDy = function () {
    // closeApp(douyinUtils.appName);
    // close1();
    // common.forceStopApp(douyinUtils.packageName);
    common.closeApp(douyinUtils.appName);
    waitTime(3);
   // close1();
}

/**
 *  点击坐标清理内存。 分辨率不同，可能不好使
 */
// eslint-disable-next-line no-unused-vars
function closex() {
    press(device.width * 0.75, device.height - device.getVirtualBarHeigh() * 0.5, 10);
    waitTime(2, "清理");
    click(device.width * 0.5, device.height - device.getVirtualBarHeigh() * 2);
}
/**
 * 清理后台??，强行结束 抖音，但是结束后，有可能，再也启动不起来了。
 */
function close1() {
    // currentPackage();
    app.openAppSetting(douyinUtils.packageName);
    text(app.getAppName(douyinUtils.packageName)).waitFor();
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(douyinUtils.packageName) + "应用已被关闭");
        sleep(2000);
        back();
    } else {
        log(app.getAppName(douyinUtils.packageName) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}
/**
 * 随机进入直播间 
 */
douyinUtils.toLive = function () {
    click(device.width * 0.4, device.height * 0.5);
    waitTime(3, "点击直播");
    desc("直播").findOne().click();
    waitTime(3, "直播加载中")
}
/**
 * 点赞
 */
douyinUtils.Dz = function () {
    press(device.width * 0.4, device.height * 0.4, 10);
    sleep(50)
    press(device.width * 0.4, device.height * 0.4, 10);
}
/**
 * 识别性别 
 * @returns 0,是男,1是女,2是未知
 */
douyinUtils.getSex = function () {
    waitTime(0, "识别性别");
    var p = images.captureScreen();
    waitTime(1, '识别性别');
    var sexwg = className("android.widget.TextView").textMatches("\\d+岁").findOnce();
    if (sexwg == null) {
        return 2;
    }
    var bound = sexwg.bounds();
    // eslint-disable-next-line no-undef
    var point = findColor(p, "#18DCF3", {
        region: [bound.left, bound.top, 100, 50],
        threshold: 8
    });
    log("坐标", point)
    if (point != null) {
        return 0;
    }
    // eslint-disable-next-line no-undef
    var point2 = findColor(p, "#FD5473", {
        region: [bound.left, bound.top, 100, 50],
        threshold: 8
    });
    if (point2 != null) {
        return 1;
    }
    return 2;
}
/**
 * 取得用户的年龄和地区?? 
 * @returns 
 */
douyinUtils.getUserAgeAndArea = function () {
    var wg = id("im2").findOnce()
    var rs = { age: '未知', area: '未知' }
    if (!wg) {
        return rs;
    }
    var children = wg.find(className('android.widget.TextView'));
    var ta;
    if (children.length > 1) {
        rs.area = children[1].text();

        ta = children[0].text();
        if (ta.indexOf('岁') != -1) {
            rs.age = ta.replace("岁", '');
        }
        if (ta.replace(/\d+岁/, '').length > 1) {
            rs.area = ta;
        }
        console.log(1, rs);
        return rs;

    }
    if (children.length > 0) {
        ta = children[0].text();
        if (!ta.indexOf('岁') == -1) {
            rs.age = ta.replace("", '');
        }
        if (ta.replace(/\d+岁/, '').length > 1) {
            rs.area = ta;
        }
        console.log(2, rs);
        return rs;
    }
    return rs;
}
/**
 * 把字符串格试的日期转换成标准时间
 * @param {*} timeStr 字符串格试的日期
 * @returns 反回成标准时间
 */
douyinUtils.toStandardTime = function (timeStr) {
    var units = ["刚刚", "分钟", '小时', "昨天", '天'];
    var unitVales = [0, 0.0166, 1, 1, 24];
    let index = 0;
    for (; index < units.length; index++) {
        const element = units[index];
        if (timeStr.indexOf(element) != -1) {
            break;
        }
    }
    console.log(index, "index");
    var time;
    if (index == units.length) {
        console.log("固定日期", timeStr)
        console.log(timeStr.match(/(\d+-\d+-\d+)|(\d+-\d+)/g).join(''))
        timeStr = timeStr.match(/(\d+-\d+-\d+)|(\d+-\d+)/g).join('');
        if (timeStr.length < 6) {
            timeStr = '2021-' + timeStr;
        }
        time = StringToDate(timeStr)
        console.log(time)
        var cha = (new Date().getTime() - time.getTime()) / 1000 / 60 / 60;
        return cha;
    }
    var num = parseInt(timeStr.replace(/[^0-9]/ig, "")) || 1;
    if (index == 3) {
        num = 18
    }
    return unitVales[index] * num;
}
/**
 * 字符串转日期
 * @param {*} str 
 * @returns 
 */
function StringToDate(str) {
    var strDate = str.split(" ");
    var strDatepart = strDate[0].split("-");
    var dtDate = new Date(strDatepart[0], strDatepart[1] - 1, strDatepart[2]);
    return dtDate;

}
/**
 * 抖音搜索 
 * @param {*} text 内容 输入的文字
 */
function inputHs(text) {
    className("android.widget.EditText").findOne().click();
    waitTime(1, "进入输入框页，准备输入文字");
    className("android.widget.EditText").findOne().setText(text);
    log("停留在这里,说明id发生了变化,手动点点击输入框试试");
    var times = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        //发送id
        var t = id("b4l").findOnce();
        if (t != null) {
            t.click();
            break;
        }
        t = desc("发送").findOnce()
        if (t != null) {
            t.click();
            break;
        }
        if (times > 1) {
            log("一直无法点到发送,点击坐标试试");
            var bqwg = desc("表情").findOnce();
            if (bqwg != null) {
                let rect = bqwg.bounds();
                click(rect.right + 10, rect.centerY());
                break;
            }
        }
        var m = className("android.widget.EditText").findOnce();
        if (m != null) {
            click(m.bounds().centerX(), m.bounds().centerY())
        }
        times++;
        sleep(1000);
    }
}
douyinUtils.sentMsg=function(msg){
    inputHs(msg);
}
/**
 *  随机选择一条进行发送
 * @param {话术数组} msgs 
 */
douyinUtils.sendHs = function (msgs) {
    var tmp = msgs[random(0, msgs.length - 1)];
    var contents = tmp.split(/-+/);
    for (let index = 0; index < contents.length; index++) {
        const element = contents[index];
        inputHs(element);
    }
}

/**
 * 输入搜索文字
 * @param {*} txt 要搜索的内容
 */
douyinUtils.inputToSearch = function (txt) {
    waitTime(6, "准备输入文字");
    className("android.widget.EditText").findOne().setText(txt);
    waitTime(6, "输入完成");
    //click("搜索")
    //eslint-disable-next-line no-constant-condition
    while (true) {
      console.log(text('搜索').find().length);
      var t = text("搜索").findOnce();
        // console.log("查找搜索",t);
        if(t){
            let rect = t.bounds();
            log(rect.centerX(), rect.centerY());
            click(rect.centerX(), rect.centerY());  
        }
        sleep(1000)
        if (id("android:id/text1").text("视频").exists()) {
            sleep(3000)
            break;
        }
    }
}
/**
 * 点击作品
 */
douyinUtils.clickZp = function () {
    var t = id("android:id/text1").textStartsWith("作品").findOnce();
    if (t) {
        var txt = t.text();
        click(txt);
        waitTime(1);
    }
    //部分作品看不到
    var i = random(0,5);
    while (i < 5) {
        douyinUtils.commentNextPage();
        i++;
    }
    // eslint-disable-next-line no-undef
    var vwg = descMatches("视频\\d+").findOne().parent();
    //console.log(vwg);
    var sp1 = vwg.findOne(className("android.view.View"));
    if (sp1 != null) {
        sp1.click();
    }
}
douyinUtils.isEndOfComment=function(){
 var rs =false;
     rs =rs||text("暂时没有更多了").findOnce()
     rs=rs||textMatches(".*来抢沙发.*").findOnce()
     rs=rs||textMatches(".*部分评论.*").findOnce();
     rs=rs||textMatches(".*上限.*").findOnce();
     return rs;
}
/**
 * 跟据抖音UID跳转到用户页
 * @param {*} uid 
 */
douyinUtils.openUserProfileByUid = function (uid) {
    var tmp = "snssdk1128://user/profile/" + uid + "?refer=web&gd_label=click_wap_profile_follow&type=need_follow&needlaunchlog=1"
    app.startActivity({
        data: tmp
    });
}
/**
 * 读取用户信息
 * @returns 反回用户信息
 */
douyinUtils.readUserInfo = function () {

  douyinUtils.toMy();
  var userInfo={};
  try {
    waitTime(3);
    var liked = id('bmk').findOne().text();
    var subed = id('co9').findOne().text();
    var friends = id('co3').findOne().text();
    console.log(common.strToNumber(liked));
    userInfo.huozanNumber = common.strToNumber(liked);
    userInfo.concernNumber = common.strToNumber(subed);
    userInfo.friendNumber = common.strToNumber(friends);
    click('编辑资料');
    waitTime(3)
    var items = id('k6c').find();
    var infos = [];
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        var info = item.text();
        console.log(info);
        infos.push(info);
    }
    if (infos.length == 0) {
        waitTime(10, "读取失败");
        return null;
    }
    userInfo.name = infos[0];
    userInfo.account = infos[1];
    userInfo.synopsis = infos[2]; //概要
    userInfo.gender = infos[3]
    userInfo.age = infos[4]
    userInfo.address = infos[5]
    userInfo.school = infos[6]
} catch (error) {
    console.log(error);
}
return userInfo;
}

module.exports = douyinUtils;
