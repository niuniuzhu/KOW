define(["require", "exports", "../Libs/long", "../RC/Utils/Logger"], function (require, exports, Long, Logger_1) {
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
        Deserialize(buffer) {
            const low = buffer.ReadInt();
            const high = buffer.ReadInt();
            this._gcNID = new Long(low, high, true);
            Logger_1.Logger.Log(this._gcNID.toString());
            this._inputFlag = buffer.ReadByte();
            if ((this.inputFlag & InputFlag.Move) > 0) {
                this._dx = buffer.ReadFloat();
                this._dy = buffer.ReadFloat();
            }
        }
    }
    FrameAction.InputFlag = InputFlag;
    exports.FrameAction = FrameAction;
});
//# sourceMappingURL=FrameAction.js.map