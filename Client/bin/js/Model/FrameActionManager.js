define(["require", "exports", "../Consts", "../Global", "../Libs/protos", "../Net/ProtoHelper", "../RC/Math/Vec2", "../RC/Utils/Timer"], function (require, exports, Consts_1, Global_1, protos_1, ProtoHelper_1, Vec2_1, Timer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputFlag;
    (function (InputFlag) {
        InputFlag[InputFlag["None"] = 0] = "None";
        InputFlag[InputFlag["Move"] = 1] = "Move";
        InputFlag[InputFlag["Skill1"] = 2] = "Skill1";
        InputFlag[InputFlag["Skill2"] = 4] = "Skill2";
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
        }
        SetInputDirection(direction) {
            this._direction.CopyFrom(direction);
            this._inputFlag |= InputFlag.Move;
            this._changed = true;
        }
        SetInputSkill1() {
            this._inputFlag |= InputFlag.Skill1;
            this._changed = true;
        }
        SetInputSkill2() {
            this._inputFlag |= InputFlag.Skill2;
            this._changed = true;
        }
        Update(dt) {
            if (this._changed && Timer_1.Timer.utcTime >= this._nextFrameActionSendTime) {
                this._nextFrameActionSendTime = Timer_1.Timer.utcTime + Consts_1.Consts.FRAME_ACTION_SEND_INTERVAL;
                const frameAction = ProtoHelper_1.ProtoCreator.Q_GC2BS_FrameAction();
                frameAction.inputFlag = this.inputFlag;
                frameAction.dx = this.direction.x;
                frameAction.dy = this.direction.y;
                Global_1.Global.connector.bsConnector.Send(protos_1.Protos.GC2BS_FrameAction, frameAction);
                this._inputFlag = 0;
                this._changed = false;
            }
        }
    }
    FrameAciontManager.InputFlag = InputFlag;
    exports.FrameAciontManager = FrameAciontManager;
});
//# sourceMappingURL=FrameActionManager.js.map