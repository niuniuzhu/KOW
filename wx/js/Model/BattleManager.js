import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import { FMathUtils } from "../RC/FMath/FMathUtils";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { SyncEvent } from "./BattleEvent/SyncEvent";
import { UIEvent } from "./BattleEvent/UIEvent";
import { Battle } from "./Logic/Battle";
import { FrameActionGroup } from "./Logic/FrameActionGroup";
import { VBattle } from "./View/VBattle";
export class BattleManager {
    constructor() {
        this._messageQueue = [];
    }
    get playerID() { return this._playerID; }
    get lBattle() { return this._lBattle; }
    get vBattle() { return this._vBattle; }
    get destroied() { return this._destroied; }
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
        this._messageQueue.splice(0);
    }
    Start() {
        this._destroied = false;
        Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_OutOfSync, this.HandleOutOfSync.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BSLose, this.HandleBSLose.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
    }
    Preload(battleInfo, caller, onComplete, onProgress) {
        this._vBattle.Preload(battleInfo, caller, onComplete, onProgress);
    }
    SetBattleInfo(battleInfo, completeHandler) {
        this._playerID = battleInfo.playerID;
        this._vBattle.SetBattleInfo(battleInfo);
        this._lBattle.SetBattleInfo(battleInfo);
        const serverFrame = battleInfo.serverFrame;
        const playerInfos = battleInfo.playerInfos;
        this.RequestSnapshot(serverFrame, success => {
            if (this._destroied)
                return;
            if (!success) {
                this._lBattle.CreatePlayers(playerInfos);
            }
            const request = ProtoCreator.Q_GC2BS_RequestFrameActions();
            request.from = this._lBattle.frame;
            request.to = serverFrame;
            Global.connector.SendToBS(Protos.GC2BS_RequestFrameActions, request, msg => {
                if (this._destroied)
                    return;
                const ret = msg;
                const frameActionGroups = this.HandleRequestFrameActions(ret.frames, ret.actions);
                if (frameActionGroups != null) {
                    this._lBattle.chase = true;
                    this._lBattle.Chase(frameActionGroups);
                    this._lBattle.chase = false;
                }
                this._lBattle.SyncInitToView();
                this._init = true;
                Logger.Log("battle inited");
                completeHandler();
            });
        });
    }
    RequestSnapshot(serverFrame, callback) {
        const requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
        requestState.frame = serverFrame;
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
    Update(dt) {
        if (!this._init)
            return;
        this.HandleMessageQueue();
        this._lBattle.Update(FMathUtils.ToFixed(dt));
        SyncEvent.Update();
        this._vBattle.Update(dt);
    }
    QueueMessage(message, handler) {
        this._messageQueue.push({ message: message, handler: handler });
    }
    HandleMessageQueue() {
        for (const messageInfo of this._messageQueue) {
            messageInfo.handler(messageInfo.message);
        }
        this._messageQueue.splice(0);
    }
    HandleBSLose(message) {
        this.QueueMessage(message, msg => {
            Logger.Log("bs lose");
            this.Destroy();
            Global.sceneManager.ChangeState(SceneManager.State.Main);
        });
    }
    HandleBattleEnd(message) {
        this.QueueMessage(message, msg => {
            const battleEnd = msg;
            UIEvent.EndBattle(battleEnd.win, battleEnd.honour, () => {
                this.Destroy();
                Global.sceneManager.ChangeState(SceneManager.State.Main);
            });
        });
    }
    HandleFrameAction(message) {
        this.QueueMessage(message, msg => {
            const frameAction = msg;
            this._lBattle.HandleFrameAction(frameAction.frame, frameAction.action);
        });
    }
    HandleOutOfSync(message) {
        this.QueueMessage(message, msg => {
            const outOfSync = msg;
            this._lBattle.HandleOutOfSync(outOfSync);
        });
    }
    HandleRequestFrameActions(frames, actions) {
        const count = frames.length;
        if (count == 0)
            return null;
        const frameActionGroups = [];
        for (let i = 0; i < count; ++i) {
            const frameActionGroup = new FrameActionGroup(frames[i]);
            frameActionGroup.Deserialize(actions[i]);
            frameActionGroups.push(frameActionGroup);
        }
        return frameActionGroups;
    }
}
