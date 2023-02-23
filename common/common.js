
var common = {};
common.index = 0;
common.random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
common.resetConsole = function (x, y, w, h) {
    console.show(true);
    x = x || 0;
    y = y || 0;
    w = w || device.width * 0.7;
    h = h || device.height * 0.2;
    sleep(1000);
    console.setPosition(x, y);
    sleep(1000);
    ui.run(() => {
        console.setSize(w, h);
        console.setCanInput(false);
        console.setTitle("", "#ff11ee00", 30);
        console.setLogSize(8);
    })
}
common.setConsoleTitle = function (title, color, size) {
    console.setTitle(title, color, size);
}
common.getRadioIndex = function (radios) {
    for (let index = 0; index < radios.length; index++) {
        const element = radios[index];
        if (element == true) {
            return index;
        }
    }
    return 0;
}
common.waitTime = function (seconds, txt) {
    var i = seconds;
    var msg = txt || "倒计时";
    if (1 > seconds && seconds > 0) {
        common.index++;
        log(msg);
        sleep(seconds * 1000)
        return;
    }
    var show = true;
    while (i >= 0) {
        show = true;
        if (i > 100 && i % 5 != 0) {
            show = false;
        }
        if (show) {
            log(msg + "-->" + i);
        }
        if (i % 5 == 0) {
            common.index++;
        }
        if (i != 0) {
            sleep(1000)
        }
        i--;
    }
}
common.openApp = function (name) {
    launchApp(name);
}
common.backHomeReloadApp = function (name) {
    common.closeApp(name)
    sleep(1000);
    common.openApp(name);
}
common.swipeToRight = function () {
    // eslint-disable-next-line no-undef
    swipe(device.width * 0.8 + random(-20, 10), device.height * 0.5 + random(-20, 10),
        device.width * 0.2 + random(-20, 10), device.height * 0.5 + random(-20, 10), 1);
}
common.swipeToLeft = function () {
    // eslint-disable-next-line no-undef
    swipe(device.width * 0.2 + random(-20, 10), device.height * 0.5 + random(-20, 10),
        device.width * 0.8 + random(-20, 10), device.height * 0.5 + random(-20, 10), 1);
}
common.closeApp = function (name) {
  //  launchApp(name);
    var i = 0;
    while (i < 5) {
        back();
        sleep(1000);
        i++;
    }
    back();
    sleep(1000);
    back();
}

//短距离测试
//sml_move(400, 1000, 800, 600, 1000);
//此代码由飞云脚本圈整理提供（www.feiyunjs.com）
function bezier_curves(cp, t) {
    var cx = 3.0 * (cp[1].x - cp[0].x);
    var bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    var ax = cp[3].x - cp[0].x - cx - bx;
    var cy = 3.0 * (cp[1].y - cp[0].y);
    var by = 3.0 * (cp[2].y - cp[1].y) - cy;
    var ay = cp[3].y - cp[0].y - cy - by;

    var tSquared = t * t;
    var tCubed = tSquared * t;
    var result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
}
//仿真随机带曲线滑动  
//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
common.swipeRandom = function (qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    point.push(dx0);
    point.push(dx1);
    point.push(dx2);
    point.push(dx3);
    // log(point[3].x)
    for (let i = 0; i < 1.2; i += 0.08) {
        var xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]
        xxy.push(xxyy);
    }
    //  log(xxy);
    gesture.apply(null, xxy);
};

common.readlines = function (dir) {
    files.ensureDir(dir);
    if (!files.exists(dir)) {
        files.create(dir);
    }
    var m = files.open(dir, "r").readlines();
    return m;
}
common.deviceHeight = function () {
    return device.height - device.getVirtualBarHeigh();
}
common.clickDesc = function (desc) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        desc("desc").findOnce();
        break;
    }
}
common.getRandomMsg = function (msgs) {
    var index = random(0, msgs.length - 1);
    return msgs[index];
}
common.timeToSec = function (time) {
    var min = time.split(':')[0]
    var sec = time.split(':')[1]
    var s = Number(min * 60) + Number(sec)
    return s
}
common.timestampToHMS = function (timestamp) {
    var date = new Date(Number(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var h = (date.getHours() < 10 ? '0' + date.getHours() : "" + date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : "" + date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : "" + date.getSeconds());
    return h + m + s;

}
common.textToList = function (str) {
    var snsArr = str.split('\n');
   snsArr =  snsArr.filter(function (s) {
      return s && s.trim();
   });
    return snsArr;
}
var storageKey = "cslcommon";
common.saveObj = function (key, obj) {
    var storage = storages.create(storageKey);
    storage.put(key, obj);
}
common.getObj = function (key) {
    var storage = storages.create(storageKey);
    return storage.get(key);
}
common.contains = function (key) {
    var storage = storages.create(storageKey);
    return storage.contains(key);
}
common.remove = function (key) {
    var storage = storages.create(storageKey);
    storage.remove(key)
}
common.clear = function () {
    var storage = storages.create(storageKey);
    storage.clear();
}
common.httptext = function (id) {
    try {
        var r = http.get(common.origin + "/material/getText?id=" + id);
        return r.body.json();
    } catch (error) {
        console.log(error)
    }
    return {};
}
common.dateFormat = function (fmt, date) {
    var o = {
        "M+": date.getMonth() + 1,                 //月份 
        "d+": date.getDate(),                    //日 
        "h+": date.getHours(),                   //小时 
        "m+": date.getMinutes(),                 //分 
        "s+": date.getSeconds(),                 //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
common.init = function (options) {
    common.userCode = options.userCode || 2;
    common.origin = options.origin || 'http://112.74.161.35:9317';
    common.deviceCode = this.getDeviceCode();
}
common.strToNumber = function (str) {
    var dw = 1;
    if (str.indexOf("w") != -1) {
        dw = 10000;
    }
    return parseInt(str.replace('w', "")) * parseInt(dw);
}
common.getDeviceCode = function () {
    if (!common.deviceCode) {
        common.deviceCode = device.getIMEI() || device.getAndroidId();
    }
    return common.deviceCode;
}
common.stringIsBlank = function (string) {
    if (string == null || string == undefined || string == "" || string == 'undefined') {
        return true;
    }
    return false;
}
/**
 * 
 * @param {*} status  1在线(空闲)，0离线,3停用,-1删除,4未激活,2任务中
 */
common.updateDeviceStatus = function (status = status || 1) {
    var qurl = common.origin + "/device/updateStatusByImei?imei" + this.getDeviceCode() + "&status=" + status;
    var r = http.get(qurl);
    var msg = r.body.json();
    console.log(msg);
}
common.forceStopApp = function (e) {
    try {
        shell("am force-stop " + e, true)
    } catch (e) {
        console.log(e)
    }
}

common.noResponse = function () {
    var e;
    if (text("等待").findOnce() && (e = text("关闭应用").findOnce())) {
        e.click();
        sleep(1e3);
        return true
    }
    return false
}
common.topClickedView = function (e) {
    while (e && !e.clickable()) {
        e = e.parent()
    }
    return e
}
common.xs_控件坐标点击 = function (UiObject, M) {
    if (UiObject) {
        if (M) {
            var rect = UiObject.bounds();
            return click(rect.centerX(), rect.centerY());
        } else {
            if (UiObject.clickable()) {
                return UiObject.click();
            } else {
                return arguments.callee(UiObject.parent());
            };
        };
    };
};
common.xs_控件点击 = function (nr1, nr2) {
    if (nr1 == "text") {
        text(nr2).findOne(1000).click();
    }
    if (nr1 == "name") {
        className(nr2).findOne(1000).click();
    }
    if (nr1 == "desc") {
        desc(nr2).findOne(1000).click();
    }
    if (nr1 == "id") {
        id(nr2).findOne(1000).click();
    }
};
common.xs_控件匹配点击 = function (nr1) {
    if (nr1) {
        var rect = textContains(nr1).findOne(1000)
        if (rect != null) {
            rect = rect.text();
            return click(rect);
        } else {
            return false
        }
    }
};
common.xs_删除写入文本 = function (nr1, nr2) {
    file = open(nr1, "w");
    file.write(nr2);
    file.close(); //关闭文件
};
common.xs_叠加写入文本 = function (nr1, nr2) {
    file = open(nr1, "a");
    file.writeline(nr2);
    file.close(); //关闭文件
};
common.xs_读取txt第一行 = function (nr1, nr2) {  //nr1是路径,,nr2是编码 常用编码(utf-8)(gb2312) 
    var text = open(nr1, "r", nr2);
    var t = text.readlines();
    text.close();
    for (a in t) {
        if (a == 0) {
            //  log("txt第一行:" + t[i])
            return t[a]
        }
    }
};
common.xs_读取txt全部内容 = function (nr1, nr2) {  //nr1是路径,,nr2是编码 常用编码(utf-8)(gb2312) 
    var text = open(nr1, "r", nr2);
    var t = text.read();
    text.close();
    return t
};
common.xs_读取txt数组内容 = function (nr1, nr2) {  //nr1是路径,,nr2是编码 常用编码(utf-8)(gb2312) 
    var text = open(nr1, "r", nr2);
    var t = text.readlines();
    text.close();
    return t
};
common.xs_删除txt第一行 = function (nr1) {
    var text = open(nr1, "r", "utf-8")
    var t = text.readlines();
    text.close();
    files.remove(nr1)
    files.createWithDirs(nr1)
    var Text = open(nr1, "w", "utf-8");
    for (a in t) {
        if (a != 0) {
            Text.write(t[a] + "\r\n")
        }
    }
    Text.close()
    return t[1]
};

common.xs_控件是否存在 = function (nr1, nr2) {
    if (nr1 == "text") {
        if (text(nr2).exists()) {
            return true
        } else {
            return false
        }
    }
    if (nr1 == "name") {
        if (className(nr2).exists()) {
            return true
        } else {
            return false
        }
    }
    if (nr1 == "desc") {
        if (desc(nr2).exists()) {
            return true
        } else {
            return false
        }
    }
    if (nr1 == "id") {
        if (id(nr2).exists()) {
            return true
        } else {
            return false
        }
    }
};
common.xs_控件匹配是否存在 = function (nr1, nr2) {
    if (nr1 == "text") {
        if (textContains(nr2).exists()) {
            return true;
        } else {
            return false;
        }
    }
    if (nr1 == "desc") {
        if (descContains(nr2).exists()) {
            return true;
        } else {
            return false;
        }
    }
};
common.xs_全屏正则匹配是否存在 = function (reg) {
        if (descMatches(reg).boundsInside(0,0,device.width,device.height).exists()) {
             console.log("文本-->",reg, descMatches(reg).findOne().desc());
            return true;
        }
        if (textMatches(reg).boundsInside(0,0,device.width,device.height).exists()) {
            console.log("文本-->",reg, textMatches(reg).findOne().text());
            return true;
        }
    return false;
};

common.findNode = function (selecter, isclick) {  //text("在线")    textContains("在线")    desc("在线")    descContains("在线")
    let g_ret = null;
    try {
        g_ret = selecter.visibleToUser(true).findOne(10);
        if (g_ret != null) {
            if (isclick) {
                g_ret.click();
            }
            return true;
        }
    } catch (e) {
        log(e);
    }
    return false;
};
common.findNodeXY = function (selecter, isclick) {   //text("在线")    textContains("在线")    desc("在线")    descContains("在线")
    let g_ret = null;
    try {
        g_ret = selecter.visibleToUser(true).findOne(10);
        if (g_ret != null) {
            if (isclick) {
                g_ret = g_ret.bounds(); sleep(20);
                click(g_ret.centerX(), g_ret.centerY());
            }
            return true;
        }
    } catch (e) {
        log(e);
    }
    return false;
};
common.foreachClick = function (node) {
    if (!node) return "";
    if (node.clickable()) {
        return node;
    } else {
        if (!node.parent()) return "";
        return foreachClick(node.parent());
    }
};
/**
 *
 * @param {*} userInfo 
 *  userInfo.huozanNumber  //喜欢数
    userInfo.concernNumber = //点赞数
    userInfo.friendNumber =  //粉丝数

    userInfo.name  //名字 唯一标识
    userInfo.account  //账号唯一标识
    userInfo.synopsis  //概要
    userInfo.gender  // 性别
    userInfo.age  //年龄
    userInfo.address //地址 infos[5]
    userInfo.school  // 学习 infos[6]
 */
common.saveInfo =function (userInfo){
  var qurl = common.origin + "/appuser/update";
    userInfo.userId = common.userCode;
    userInfo.deviceCode=common.getDeviceCode();
    try {
      var r = http.postJson(qurl, userInfo);
      console.log(r.body.json());
    } catch (error) {
      console.log(error);      
    }
}
common.checkFile = function(dirPath){
    files.ensureDir(dirPath);
    if (!files.exists(dirPath)) {
        files.create(dirPath);
    }
}
module.exports = common