define(["require", "exports", "../Libs/long"], function (require, exports, Long) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputFlag;
    (function (InputFlag) {
        InputFlag[InputFlag["None"] = 0] = "None";
        InputFlag[InputFlag["Move"] = 1] = "Move";
        InputFlag[InputFlag["S1"] = 2] = "S1";
        InputFlag[InputFlag["S2"] = 4] = "S2";
    })(InputFlag = exports.InputFlag || (exports.InputFlag = {}));
    class FrameAction {
        get gcNID() { return this._gcNID; }
        get inputFlag() { return this._inputFlag; }
        get dx() { return this._dx; }
        get dy() { return this._dy; }
        get press() { return this._press; }
        Deserialize(buffer) {
            const low = buffer.ReadInt();
            const high = buffer.ReadInt();
            this._gcNID = Long.fromBits(low, high, true);
            this._inputFlag = buffer.ReadByte();
            if ((this.inputFlag & InputFlag.Move) > 0) {
                this._dx = buffer.ReadFloat();
                this._dy = buffer.ReadFloat();
                this._press = buffer.ReadBool();
            }
            if ((this.inputFlag & InputFlag.S1) > 0 || (this.inputFlag & InputFlag.S2) > 0) {
                this._press = buffer.ReadBool();
            }
        }
    }
    exports.FrameAction = FrameAction;
});
//# sourceMappingURL=FrameAction.js.map