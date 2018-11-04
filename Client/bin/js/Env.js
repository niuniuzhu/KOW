define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Platform;
    (function (Platform) {
        Platform[Platform["Editor"] = 0] = "Editor";
        Platform[Platform["Web"] = 1] = "Web";
        Platform[Platform["WXMini"] = 2] = "WXMini";
    })(Platform || (Platform = {}));
    var RunMode;
    (function (RunMode) {
        RunMode[RunMode["Game"] = 0] = "Game";
        RunMode[RunMode["Pressure"] = 1] = "Pressure";
    })(RunMode || (RunMode = {}));
    class Env {
    }
    Env.Platform = Platform;
    Env.RunMode = RunMode;
    exports.Env = Env;
});
//# sourceMappingURL=Env.js.map