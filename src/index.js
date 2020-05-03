"ui";
/*
 * @Author: 家
 * @QQ: 203118908
 * @bilibili: 晓宇小凡
 * @versioin: 1.0
 * @Date: 2020-05-03 03:02:47
 * @LastEditTime: 2020-05-03 14:33:23
 * @LastEditors: 家
 * @Description:
 * @FilePath: \webpack-autojs\src\index.js
 * @学习格言: 即用即学, 即学即用
 */
importClass(android.graphics.Color);
importClass(android.animation.AnimatorSet);
importClass(android.animation.ObjectAnimator);
let font = {
  size: {
    big: "50sp",
    small: "30sp",
  },
  transparency: {
    big: 0.2,
    middle: 0.5,
    small: 0.8,
  },
};
let smallFontColor = "#F3C325";
let bg = "#1D1856";
ui.statusBarColor(bg);
let 白胡子 = "https://autojstest.oss-cn-beijing.aliyuncs.com/EdwardNewgate.jpg";
let 内个谁 = "https://autojstest.oss-cn-beijing.aliyuncs.com/which_who.jpg";
let 大柒 = "https://autojstest.oss-cn-beijing.aliyuncs.com/big7.jpg";
ui.layout(
  <vertical bg="{{bg}}">
    <text id="世界最强的男人title" gravity="center" textSize="{{font.size.big}}" textStyle="bold">
      世界最强的男人
    </text>
    <vertical>
      <vertical layout_weight="1" layout_height="0dp">
        <text gravity="center" textSize="{{font.size.small}}" textColor="{{smallFontColor}}">
          白胡子
        </text>
        <img id="世界最强的男人img" src="{{白胡子}}"></img>
      </vertical>
      <vertical layout_weight="2" layout_height="0dp" bg="{{bg}}">
        <list id="太阳号船员">
          <linear bg="?selectableItemBackground" w="*">
            <horizontal>
              <text id="name" text="{{this.name}}" textSize="{{font.size.small}}" textColor="{{smallFontColor}}" />
              <text id="path" text="{{this.age}}" textSize="{{font.size.small}}" textColor="{{smallFontColor}}" />
            </horizontal>
          </linear>
        </list>
      </vertical>
    </vertical>
  </vertical>
);
let 船员列表 = [
  { name: "蒙奇·D·路飞", age: 19 },
  { name: "罗罗诺亚·卓洛/索隆", age: 21 },
  { name: "娜美", age: 18 },
  { name: "乌索普", age: 19 },
  { name: "文斯莫克·山治", age: 21 },
  { name: "托尼托尼·乔巴", age: 17 },
  { name: "妮可·罗宾", age: 30 },
  { name: "弗兰奇", age: 36 },
  { name: "布鲁克", age: 90 },
  { name: "甚平", age: 46 },
];
ui.太阳号船员.setDataSource(船员列表);

let view = ui.世界最强的男人title;
view.setText("世界最强的男人");
ui.post(function () {
  objectAnimator = ObjectAnimator.ofInt(
    view,
    "textColor",
    rndColor(),
    rndColor(),
    rndColor(),
    rndColor(),
    rndColor(),
    rndColor(),
    rndColor(),
    rndColor(),
    rndColor(),
    rndColor(),
    rndColor(),
    rndColor()
  );
  objectAnimator.setDuration(10000);
  objectAnimator.setEvaluator(new android.animation.ArgbEvaluator());
  objectAnimator.setRepeatMode(android.view.animation.Animation.REVERSE);
  objectAnimator.setRepeatCount(android.view.animation.Animation.INFINITE);
  objectAnimator.start();
  view = ui.世界最强的男人img;
  playAnimationDaShang同时(view);
  setInterval(() => {
    playAnimationDaShang同时(view);
  }, 6000);
}, 200);

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255));
}

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function playAnimationDaShang同时(view) {
  animatorSetPeople = new AnimatorSet(); //多个动画 动画集
  animatorSetPeople.setDuration(3000);
  scaleX = ObjectAnimator.ofFloat(
    view,
    "scaleX",
    1,
    0.5,
    0.2,
    0.8,
    1,
    3,
    1,
    2,
    1,
    2,
    1,
    1.5,
    1,
    1.2,
    1,
    1.1,
    1,
    1.1,
    1,
    1.03,
    1,
    1.01,
    1
  ); //从原始状态放大2倍再回到原始状态
  scaleY = ObjectAnimator.ofFloat(view, "scaleY", 1, 0.5, 0.2, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1);

  animatorSetPeople.play(scaleX).with(scaleY);
  animatorSetPeople.start();
}
