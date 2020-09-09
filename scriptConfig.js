
var projects = [ //项目数组，放的是每一个要编译的项目，
  {
    id: 1, //项目号
    name: "demo", //项目名称，需要和文件夹名相同
    main: "./main.js" //主入文件，入口文件，按autojs目录，一般和project.json 同级
  },
  {
    id:2,
    name: "dy",
    main: "./dy.js"
  },
]

var config = {
  watch:"rerun", //watch模式的时候，是否自动deploy（部署）、rerun（重新运行）、none（不操作），
  baseDir: "./work", //放置多个项目的工作目录，每一个项目独立文件夹，
  base64: false,
  advancedEngines: true,
  uiMode: true,  //项目是否有ui，这里有个bug，一旦设置，所以项目都是相同的
  header: "header.txt", 
  base64RandomStrLength: 100,
  target: "node", // web || node
  projects: projects,
};
module.exports = config;
