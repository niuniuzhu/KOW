define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Battle {
        get frameRate() { return this._frameRate; }
        get keyframeStep() { return this._keyframeStep; }
        get timeout() { return this._timeout; }
        get mapID() { return this._mapID; }
        get frame() { return this._frame; }
        Init(loginRet) {
            this._frameRate = loginRet.frameRate;
            this._keyframeStep = loginRet.keyframeStep;
            this._timeout = loginRet.battleTime;
            this._mapID = loginRet.mapID;
            this._msPerFrame = 1000 / this._frameRate;
        }
        Clear() {
            this._frame = 0;
        }
        Update(dt) {
            this._elapsed += dt;
        }
    }
    exports.Battle = Battle;
});
//# sourceMappingURL=Battle.js.map