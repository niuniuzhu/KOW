define(["require", "exports", "../Consts", "../Global", "../Libs/protos", "../Net/ProtoHelper", "../RC/Math/Vec2", "../RC/Utils/Timer", "../RC/Math/MathUtils"], function (require, exports, Consts_1, Global_1, protos_1, ProtoHelper_1, Vec2_1, Timer_1, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputFlag;
    (function (InputFlag) {
        InputFlag[InputFlag["None"] = 0] = "None";
        InputFlag[InputFlag["Move"] = 1] = "Move";
        InputFlag[InputFlag["S1"] = 2] = "S1";
        InputFlag[InputFlag["S2"] = 4] = "S2";
    })(InputFlag || (InputFlag = {}));
    class FrameAciontManager {
        constructor() {
            this._direction = Vec2_1.Vec2.zero;
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
            this._press = direction.SqrMagnitude() > MathUtils_1.MathUtils.EPSILON;
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
            if (this._changed && Timer_1.Timer.utcTime >= this._nextFrameActionSendTime) {
                this._nextFrameActionSendTime = Timer_1.Timer.utcTime + Consts_1.Consts.FRAME_ACTION_SEND_INTERVAL;
                const frameAction = ProtoHelper_1.ProtoCreator.Q_GC2BS_FrameAction();
                frameAction.inputFlag = this.inputFlag;
                if ((this.inputFlag & InputFlag.Move) > 0) {
                    frameAction.dx = this.direction.x;
                    frameAction.dy = this.direction.y;
                    frameAction.press = this._press;
                }
                if ((this.inputFlag & InputFlag.S1) > 0 || (this.inputFlag & InputFlag.S2) > 0) {
                    frameAction.press = this._press;
                }
                Global_1.Global.connector.bsConnector.Send(protos_1.Protos.GC2BS_FrameAction, frameAction);
                this.Reset();
            }
        }
    }
    FrameAciontManager.InputFlag = InputFlag;
    exports.FrameAciontManager = FrameAciontManager;
});
//# sourceMappingURL=FrameActionManager.js.map