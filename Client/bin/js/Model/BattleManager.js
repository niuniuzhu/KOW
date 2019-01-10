define(["require", "exports", "./BattleEvent/UIEvent", "../Global", "../Libs/protos", "../Net/Connector", "../Net/ProtoHelper", "../RC/Collections/Queue", "../RC/FMath/FMathUtils", "../RC/Utils/Logger", "../Scene/SceneManager", "./FrameActionGroup", "./Logic/Battle", "./View/VBattle", "./BattleEvent/SyncEvent"], function (require, exports, UIEvent_1, Global_1, protos_1, Connector_1, ProtoHelper_1, Queue_1, FMathUtils_1, Logger_1, SceneManager_1, FrameActionGroup_1, Battle_1, VBattle_1, SyncEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleManager {
        get playerID() { return this._playerID; }
        get lBattle() { return this._lBattle; }
        get vBattle() { return this._vBattle; }
        Init() {
            this._lBattle = new Battle_1.Battle();
            this._vBattle = new VBattle_1.VBattle();
        }
        Destroy() {
            if (this._destroied)
                return;
            this._destroied = true;
            this._init = false;
            Global_1.Global.connector.RemoveListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
            Global_1.Global.connector.RemoveListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_OutOfSync, this.HandleOutOfSync.bind(this));
            Global_1.Global.connector.RemoveListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_BSLose, this.HandleBSLose.bind(this));
            Global_1.Global.connector.RemoveListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
            this._lBattle.Destroy();
            this._vBattle.Destroy();
        }
        Start() {
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_OutOfSync, this.HandleOutOfSync.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_BSLose, this.HandleBSLose.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
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
                const request = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestFrameActions();
                request.from = this._lBattle.frame;
                request.to = curFrame;
                Global_1.Global.connector.SendToBS(protos_1.Protos.GC2BS_RequestFrameActions, request, msg => {
                    if (this._destroied)
                        return;
                    const ret = msg;
                    const frameActionGroups = this.HandleRequestFrameActions(ret.frames, ret.actions);
                    this._lBattle.chase = true;
                    this._lBattle.Chase(frameActionGroups);
                    this._lBattle.chase = false;
                    this._lBattle.SyncInitToView();
                    this._init = true;
                    Logger_1.Logger.Log("battle inited");
                    completeHandler();
                });
            });
        }
        Update(dt) {
            if (!this._init)
                return;
            this._lBattle.Update(FMathUtils_1.FMathUtils.ToFixed(dt));
            SyncEvent_1.SyncEvent.Update();
            this._vBattle.Update(dt);
        }
        RequestSnapshot(callback) {
            const requestState = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestSnapshot();
            requestState.frame = -1;
            Global_1.Global.connector.SendToBS(protos_1.Protos.GC2BS_RequestSnapshot, requestState, msg => {
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
            Logger_1.Logger.Log("bs lose");
            this.Destroy();
            Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
        }
        HandleBattleEnd(message) {
            const msg = message;
            UIEvent_1.UIEvent.EndBattle(msg.win, msg.honour, () => {
                this.Destroy();
                Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
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
            const frameActionGroups = new Queue_1.default();
            for (let i = 0; i < count; ++i) {
                const frameActionGroup = new FrameActionGroup_1.FrameActionGroup(frames[i]);
                frameActionGroup.Deserialize(actions[i]);
                frameActionGroups.enqueue(frameActionGroup);
            }
            return frameActionGroups;
        }
    }
    exports.BattleManager = BattleManager;
});
//# sourceMappingURL=BattleManager.js.map