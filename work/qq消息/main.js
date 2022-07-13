const { waitTime } = require("../../common/common");
const common = require("../../common/common");

var qqmsg={};

function main(options){
    options=options||{};
    common.resetConsole();
    common.init(options);
    qqmsg.toLxr();

}
qqmsg.init =function(options){
    


}
qqmsg.toLxr=function(){
    common.openApp("QQ");
    waitTime(10,"等待qq启动")
    click('联系人')
    waitTime(1,"联系人")
    click('我的好友');
    waitTime(1,"联系人")
    click('好友');
    waitTime(3,"好友列表");
    var iconWgs = id("icon").find();
    console.log(iconWgs.length);
    
    for (let index = 0; index < iconWgs.length; index++) {
        const element = iconWgs[index];
        waitTime(3);
        element.click();
        console.log(element)
    }
}
main();

