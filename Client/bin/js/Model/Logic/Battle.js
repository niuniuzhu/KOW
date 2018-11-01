define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Battle {
        Init(loginRet) {
            this.frameRate = loginRet.frameRate;
            this.keyframeStep = loginRet.keyframeStep;
            this.timeout = loginRet.battleTime;
            this.mapID = loginRet.mapID;
        }
    }
    exports.Battle = Battle;
});
//# sourceMappingURL=Battle.js.map