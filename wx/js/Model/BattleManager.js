import { UIEvent } from "./BattleEvent/UIEvent";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import Queue from "../RC/Collections/Queue";
import { FMathUtils } from "../RC/FMath/FMathUtils";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { FrameActionGroup } from "./FrameActionGroup";
import { Battle } from "./Logic/Battle";
import { VBattle } from "./View/VBattle";
import { SyncEvent } from "./BattleEvent/SyncEvent";
export class BattleManager {
    get playerID() { return this._playerID; }
    get lBattle() { return this._lBattle; }
    get vBattle() { return this._vBattle; }
    Init() {
        this._lBattle = new Battle();
        this._vBattle = new VBattle();
    }
    Destroy() {
        if (this._destroied)
            return;
        this._destroied = true;
        this._init = false;
        Global.connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
        Global.connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_OutOfSync, this.HandleOutOfSync.bind(this));
        Global.connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BSLose, this.HandleBSLose.bind(this));
        Global.connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
        this._lBattle.Destroy();
        this._vBattle.Destroy();
    }
    Start() {
        Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_OutOfSync, this.HandleOutOfSync.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BSLose, this.HandleBSLose.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
        this._destroied = false;
    }
    SetBattleInfo(battleInfo, completeHandler) {
        this._playerID = battleInfo.playerID;
        this._vBattle.SetBattleInfo(battleInfo);
        this._lBattle.SetBattleInfo(battleInfo);
        const curFrame = battleInfo.serverFrame;
        this.RequestSnapshot(success => {
            if (this._destroied)
                return;
            if (!success) {
                this._lBattle.CreatePlayers(battleInfo.playerInfos);
            }
            const request = ProtoCreator.Q_GC2BS_RequestFrameActions();
            request.from = this._lBattle.frame;
            request.to = curFrame;
            Global.connector.SendToBS(Protos.GC2BS_RequestFrameActions, request, msg => {
                if (this._destroied)
                    return;
                const ret = msg;
                const frameActionGroups = this.HandleRequestFrameActions(ret.frames, ret.actions);
                this._lBattle.Chase(frameActionGroups, false, false);
                this._lBattle.SyncInitToView();
                this._init = true;
                Logger.Log("battle inited");
                completeHandler();
            });
        });
    }
    Update(dt) {
        if (!this._init)
            return;
        this._lBattle.Update(FMathUtils.ToFixed(dt));
        SyncEvent.Update();
        this._vBattle.Update(dt);
    }
    RequestSnapshot(callback) {
        const requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
        requestState.frame = -1;
        Global.connector.SendToBS(Protos.GC2BS_RequestSnapshot, requestState, msg => {
            const ret = msg;
            if (ret.snapshot.length == 0) {
                callback(false);
            }
            else {
                this._lBattle.HandleSnapShot(ret);
                callback(true);
            }
        });
    }
    HandleBSLose(message) {
        Logger.Log("bs lose");
        this.Destroy();
        Global.sceneManager.ChangeState(SceneManager.State.Main);
    }
    HandleBattleEnd(message) {
        const msg = message;
        UIEvent.EndBattle(msg.win, msg.honour, () => {
            this.Destroy();
            Global.sceneManager.ChangeState(SceneManager.State.Main);
        });
    }
    HandleFrameAction(message) {
        const frameAction = message;
        this._lBattle.HandleFrameAction(frameAction.frame, frameAction.action);
    }
    HandleOutOfSync(message) {
        const outOfSync = message;
        this._lBattle.HandleOutOfSync(outOfSync);
    }
    HandleRequestFrameActions(frames, actions) {
        const count = frames.length;
        if (count == 0)
            return null;
        const frameActionGroups = new Queue();
        for (let i = 0; i < count; ++i) {
            const frameActionGroup = new FrameActionGroup(frames[i]);
            frameActionGroup.Deserialize(actions[i]);
            frameActionGroups.enqueue(frameActionGroup);
        }
        return frameActionGroups;
    }
}
