define(["require", "exports", "../Libs/long"], function (require, exports, Long) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputFlag;
    (function (InputFlag) {
        InputFlag[InputFlag["None"] = 0] = "None";
        InputFlag[InputFlag["Move"] = 1] = "Move";
        InputFlag[InputFlag["Skill"] = 2] = "Skill";
    })(InputFlag || (InputFlag = {}));
    class FrameAction {
        get gcNID() { return this._gcNID; }
        get inputFlag() { return this._inputFlag; }
        get dx() { return this._dx; }
        get dy() { return this._dy; }
        get sid() { return this._sid; }
        Deserialize(buffer) {
            const low = buffer.ReadInt();
            const high = buffer.ReadInt();
            this._gcNID = Long.fromBits(low, high, true);
            this._inputFlag = buffer.ReadByte();
            if ((this.inputFlag & InputFlag.Move) > 0) {
                this._dx = buffer.ReadFloat();
                this._dy = buffer.ReadFloat();
            }
            if ((this.inputFlag & InputFlag.Skill) > 0) {
                this._sid = buffer.ReadByte();
            }
        }
    }
    FrameAction.InputFlag = InputFlag;
    exports.FrameAction = FrameAction;
});
//# sourceMappingURL=FrameAction.js.map