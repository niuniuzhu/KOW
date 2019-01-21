if ((typeof swan !== 'undefined') && (typeof swanGlobal !== 'undefined')) {
  require("./js/Libs/swan-game-adapter.js");
  require("./js/Libs/laya.bdmini.js");
} else if (typeof wx !== "undefined") {
	require("./js/Libs/weapp-adapter.js");
	require("./js/Libs/laya.wxmini.min.js");
}
window.loadLib = require;
require("index.js");