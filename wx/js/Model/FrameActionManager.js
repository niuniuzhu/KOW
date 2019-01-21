"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Consts_1 = require("../Consts");
const Global_1 = require("../Global");
const protos_1 = require("../Libs/protos");
const ProtoHelper_1 = require("../Net/ProtoHelper");
const Timer_1 = require("../RC/Utils/Timer");
var InputFlag;
(function (InputFlag) {
    InputFlag[InputFlag["None"] = 0] = "None";
    InputFlag[InputFlag["Move"] = 1] = "Move";
    InputFlag[InputFlag["S1"] = 2] = "S1";
    InputFlag[InputFlag["S2"] = 4] = "S2";
})(InputFlag || (InputFlag = {}));
class FrameAciontManager {
    constructor() {
        this._infos = [];
        this._nextFrameActionSendTime = 0;
    }
    Reset() {
        this._nextFrameActionSendTime = 0;
        this._infos.splice(0);
    }
    SetInputDirection(direction) {
        if (this._infos.length == FrameAciontManager.MAX_ACTIONS)
            return;
        const info = new protos_1.Protos.GC2BS_FrameActionInfo();
        info.frame = 0;
        info.inputFlag = InputFlag.Move;
        info.v0 = direction.x;
        info.v1 = direction.y;
        this._infos.push(info);
    }
    SetS1(press) {
        if (this._infos.length == FrameAciontManager.MAX_ACTIONS)
            return;
        const info = new protos_1.Protos.GC2BS_FrameActionInfo();
        info.frame = 0;
        info.inputFlag = InputFlag.S1;
        info.v0 = press ? 1 : 0;
        this._infos.push(info);
    }
    SetS2(press) {
        if (this._infos.length == FrameAciontManager.MAX_ACTIONS)
            return;
        const info = new protos_1.Protos.GC2BS_FrameActionInfo();
        info.frame = 0;
        info.inputFlag = InputFlag.S2;
        info.v0 = press ? 1 : 0;
        this._infos.push(info);
    }
    Update(dt) {
        if (this._infos.length > 0 && Timer_1.Timer.utcTime >= this._nextFrameActionSendTime) {
            this._nextFrameActionSendTime = Timer_1.Timer.utcTime + Consts_1.Consts.FRAME_ACTION_SEND_INTERVAL;
            const frameAction = ProtoHelper_1.ProtoCreator.Q_GC2BS_FrameAction();
            const count = this._infos.length;
            for (let i = 0; i < count; ++i) {
                frameAction.infos.push(this._infos[i]);
            }
            Global_1.Global.connector.bsConnector.Send(protos_1.Protos.GC2BS_FrameAction, frameAction);
            this.Reset();
        }
    }
}
FrameAciontManager.MAX_ACTIONS = 16;
FrameAciontManager.InputFlag = InputFlag;
exports.FrameAciontManager = FrameAciontManager;
