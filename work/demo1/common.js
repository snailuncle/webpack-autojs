
var common = {};

common.random=function(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
common.resetConsole = function (x, y, w, h) {
    console.show();
    x=x||-20;
    y=y||-70;
    w=w||device.width-180;
    h=h||device.height/4;
    sleep(1000);
    console.setPosition(x, y);
    sleep(1000);
    console.setSize(w, h);
}
common.waitTime = function (seconds, txt) {
    var i = seconds;
    var msg = txt || "倒计时";
    while (i > 0) {
        if (seconds == 1) {
            log(msg);
        } else {
            log(msg + "--" + i);
        }
        sleep(500);
        i--;
    }
}
common.openApp = function (name) {
    launchApp(name);
}
common.closeApp = function (name) {
    launchApp(name);
    var i = 0;
    while (i < 4) {
        back();
        i++;
    }
}

//短距离测试
//sml_move(400, 1000, 800, 600, 1000);
//此代码由飞云脚本圈整理提供（www.feiyunjs.com）
function bezier_curves(cp, t) {
  var  cx = 3.0 * (cp[1].x - cp[0].x);
  var  bx = 3.0 * (cp[2].x - cp[1].x) - cx;
  var  ax = cp[3].x - cp[0].x - cx - bx;
  var   cy = 3.0 * (cp[1].y - cp[0].y);
  var  by = 3.0 * (cp[2].y - cp[1].y) - cy;
  var   ay = cp[3].y - cp[0].y - cy - by;

  var  tSquared = t * t;
  var tCubed = tSquared * t;
  var result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
};

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
    for (let i = 0; i < 1; i += 0.08) {
        var  xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]
        xxy.push(xxyy);
    }

    //  log(xxy);
    gesture.apply(null, xxy);
};

common.readlines= function (dir) {
    files.ensureDir(dir);
    if (!files.exists(dir)) {
        files.create(dir);
    }
    var m= files.open(dir,"r").readlines();
    return m;
}

module.exports = common