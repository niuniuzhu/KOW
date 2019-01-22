// if ((typeof swan !== 'undefined') && (typeof swanGlobal !== 'undefined')) {
//   require("./js/Libs/swan-game-adapter.js");
//   require("./js/Libs/laya.bdmini.js");
// } else if (typeof wx !== "undefined") {
// require("./js/Libs/weapp-adapter.js");
// }
// window.loadLib = require;
require('./js/Libs/weapp-adapter/index.js');
require("./js/Libs/laya.wxmini.min.js");
require("index.js");