import * as Long from "../Libs/long";
import { Logger } from "../RC/Utils/Logger";
var InputFlag;
(function (InputFlag) {
    InputFlag[InputFlag["None"] = 0] = "None";
    InputFlag[InputFlag["Move"] = 1] = "Move";
    InputFlag[InputFlag["Skill1"] = 2] = "Skill1";
    InputFlag[InputFlag["Skill2"] = 4] = "Skill2";
})(InputFlag || (InputFlag = {}));
export class FrameAction {
    get gcNID() { return this._gcNID; }
    get inputFlag() { return this._inputFlag; }
    get dx() { return this._dx; }
    get dy() { return this._dy; }
    Deserialize(buffer) {
        const low = buffer.ReadInt();
        const high = buffer.ReadInt();
        this._gcNID = Long.fromBits(low, high, true);
        Logger.Log(this._gcNID.toString());
        this._inputFlag = buffer.ReadByte();
        if ((this.inputFlag & InputFlag.Move) > 0) {
            this._dx = buffer.ReadFloat();
            this._dy = buffer.ReadFloat();
        }
    }
}
FrameAction.InputFlag = InputFlag;
