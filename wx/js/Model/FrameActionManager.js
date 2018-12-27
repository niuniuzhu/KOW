import { Consts } from "../Consts";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Vec2 } from "../RC/Math/Vec2";
import { Timer } from "../RC/Utils/Timer";
import { MathUtils } from "../RC/Math/MathUtils";
var InputFlag;
(function (InputFlag) {
    InputFlag[InputFlag["None"] = 0] = "None";
    InputFlag[InputFlag["Move"] = 1] = "Move";
    InputFlag[InputFlag["S1"] = 2] = "S1";
    InputFlag[InputFlag["S2"] = 4] = "S2";
})(InputFlag || (InputFlag = {}));
export class FrameAciontManager {
    constructor() {
        this._direction = Vec2.zero;
        this._inputFlag = InputFlag.None;
        this._nextFrameActionSendTime = 0;
        this._changed = false;
    }
    get direction() { return this._direction; }
    get inputFlag() { return this._inputFlag; }
    Reset() {
        this._nextFrameActionSendTime = 0;
        this._direction.Set(0, 0);
        this._inputFlag = InputFlag.None;
        this._changed = false;
    }
    SetInputDirection(direction) {
        this._direction.CopyFrom(direction);
        this._inputFlag |= InputFlag.Move;
        this._press = direction.SqrMagnitude() > MathUtils.EPSILON;
        this._changed = true;
    }
    SetS1(press) {
        this._inputFlag |= InputFlag.S1;
        this._press = press;
        this._changed = true;
    }
    SetS2(press) {
        this._inputFlag |= InputFlag.S2;
        this._press = press;
        this._changed = true;
    }
    Update(dt) {
        if (this._changed && Timer.utcTime >= this._nextFrameActionSendTime) {
            this._nextFrameActionSendTime = Timer.utcTime + Consts.FRAME_ACTION_SEND_INTERVAL;
            const frameAction = ProtoCreator.Q_GC2BS_FrameAction();
            frameAction.inputFlag = this.inputFlag;
            if ((this.inputFlag & InputFlag.Move) > 0) {
                frameAction.dx = this.direction.x;
                frameAction.dy = this.direction.y;
                frameAction.press = this._press;
            }
            if ((this.inputFlag & InputFlag.S1) > 0 || (this.inputFlag & InputFlag.S2) > 0) {
                frameAction.press = this._press;
            }
            Global.connector.bsConnector.Send(Protos.GC2BS_FrameAction, frameAction);
            this.Reset();
        }
    }
}
FrameAciontManager.InputFlag = InputFlag;
