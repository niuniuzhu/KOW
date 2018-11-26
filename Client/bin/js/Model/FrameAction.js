define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputFlag;
    (function (InputFlag) {
        InputFlag[InputFlag["None"] = 0] = "None";
        InputFlag[InputFlag["Move"] = 1] = "Move";
        InputFlag[InputFlag["Skill1"] = 2] = "Skill1";
        InputFlag[InputFlag["Skill2"] = 4] = "Skill2";
    })(InputFlag || (InputFlag = {}));
    class FrameAction {
        get gcNID() { return this._gcNID; }
        get inputFlag() { return this._inputFlag; }
        get dx() { return this._dx; }
        get dy() { return this._dy; }
        DeSerialize(buffer) {
            this._gcNID = buffer.readUint64();
            this._inputFlag = buffer.readByte();
            if ((this.inputFlag & InputFlag.Move) > 0) {
                this._dx = buffer.readFloat();
                this._dy = buffer.readFloat();
            }
        }
    }
    FrameAction.InputFlag = InputFlag;
    exports.FrameAction = FrameAction;
});
//# sourceMappingURL=FrameAction.js.map