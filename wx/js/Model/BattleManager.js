import { VBattle } from "./View/VBattle";
import { Battle } from "./Logic/Battle";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { ProtoCreator } from "../Net/ProtoHelper";
export class BattleManager {
    static get instance() {
        return this._instance;
    }
    static Init() {
        this._instance = new BattleManager();
    }
    get lBattle() { return this._lBattle; }
    get vBattle() { return this._vBattle; }
    constructor() {
        Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.OnFrameAction.bind(this));
        Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
        this._lBattle = new Battle();
        this._vBattle = new VBattle();
    }
    Init(battleInfo, completeHandler) {
        this._lBattle.Init(battleInfo);
        this._vBattle.Init(battleInfo);
        this._init = true;
        const request = ProtoCreator.Q_GC2BS_RequestFrameActions();
        request.from = this._lBattle.frame;
        request.to = battleInfo.serverFrame;
        Connector.SendToBS(Protos.GC2BS_RequestFrameActions, request, msg => {
            const ret = msg;
            this.HandleRequestFrameActionsRet(ret.frames, ret.actions);
            this._lBattle.Chase();
            Logger.Log("battle start");
            completeHandler();
        });
    }
    Update(dt) {
        if (!this._init)
            return;
        this._lBattle.Update(dt);
        this._vBattle.Update(dt);
    }
    OnBattleEnd(message) {
        const battleEnd = message;
        this._lBattle.End();
        this._init = false;
        Logger.Log("battle end");
        SceneManager.ChangeState(SceneManager.State.Main);
    }
    OnFrameAction(message) {
        const frameAction = message;
        this._lBattle.OnFrameAction(frameAction.frame, frameAction.action);
    }
    HandleRequestFrameActionsRet(frames, actions) {
        const count = frames.length;
        for (let i = 0; i < count; ++i) {
            this._lBattle.OnFrameAction(frames[i], actions[i]);
        }
    }
}
