import { Global } from "../Global";
import Decimal from "../Libs/decimal";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import Queue from "../RC/Collections/Queue";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { FrameActionGroup } from "./FrameActionGroup";
import { Battle } from "./Logic/Battle";
import { VBattle } from "./View/VBattle";
export class BattleManager {
    get lBattle() { return this._lBattle; }
    get vBattle() { return this._vBattle; }
    Init() {
        Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
        this._lBattle = new Battle();
        this._vBattle = new VBattle();
    }
    Destroy() {
        this._lBattle.Destroy();
        this._vBattle.Destroy();
        this._init = false;
    }
    SetBattleInfo(battleInfo, completeHandler) {
        this._vBattle.SetBattleInfo(battleInfo);
        this._lBattle.SetBattleInfo(battleInfo);
        const curFrame = battleInfo.serverFrame;
        this.RequestSnapshot(() => {
            const request = ProtoCreator.Q_GC2BS_RequestFrameActions();
            request.from = this._lBattle.frame;
            request.to = curFrame;
            Global.connector.SendToBS(Protos.GC2BS_RequestFrameActions, request, msg => {
                const ret = msg;
                const frameActionGroups = this.HandleRequestFrameActions(ret.frames, ret.actions);
                this._lBattle.Chase(frameActionGroups, false, false);
                this._lBattle.InitSyncToView();
                this._init = true;
                Logger.Log("battle inited");
                completeHandler();
            });
        });
    }
    Update(dt) {
        if (!this._init)
            return;
        this._lBattle.Update(new Decimal(dt));
        this._vBattle.Update(dt);
    }
    RequestSnapshot(callback) {
        const requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
        requestState.frame = -1;
        Global.connector.SendToBS(Protos.GC2BS_RequestSnapshot, requestState, msg => {
            const ret = msg;
            this._lBattle.HandleSnapShot(ret);
            callback();
        });
    }
    HandleBattleEnd(message) {
        Logger.Log("battle end");
        const battleEnd = message;
        this.Destroy();
        Global.sceneManager.ChangeState(SceneManager.State.Main);
    }
    HandleFrameAction(message) {
        const frameAction = message;
        this._lBattle.HandleFrameAction(frameAction.frame, frameAction.action);
    }
    HandleRequestFrameActions(frames, actions) {
        const frameActionGroups = new Queue();
        const count = frames.length;
        for (let i = 0; i < count; ++i) {
            const frameActionGroup = new FrameActionGroup(frames[i]);
            frameActionGroup.Deserialize(actions[i]);
            frameActionGroups.enqueue(frameActionGroup);
        }
        return frameActionGroups;
    }
}
