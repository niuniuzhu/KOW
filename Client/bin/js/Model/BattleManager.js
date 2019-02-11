define(["require", "exports", "../Global", "../Libs/protos", "../Net/Connector", "../Net/ProtoHelper", "../RC/FMath/FMathUtils", "../RC/Utils/Logger", "../Scene/SceneManager", "./BattleEvent/SyncEvent", "./BattleEvent/UIEvent", "./Logic/Battle", "./Logic/FrameActionGroup", "./View/VBattle"], function (require, exports, Global_1, protos_1, Connector_1, ProtoHelper_1, FMathUtils_1, Logger_1, SceneManager_1, SyncEvent_1, UIEvent_1, Battle_1, FrameActionGroup_1, VBattle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleManager {
        constructor() {
            this._messageQueue = [];
            this._lBattle = new Battle_1.Battle();
            this._vBattle = new VBattle_1.VBattle();
        }
        get playerID() { return this._playerID; }
        get lBattle() { return this._lBattle; }
        get vBattle() { return this._vBattle; }
        get ready() { return this._ready; }
        get destroied() { return this._destroied; }
        Destroy() {
            if (this._destroied)
                return;
            this._ready = false;
            this._destroied = true;
            Global_1.Global.connector.RemoveListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
            Global_1.Global.connector.RemoveListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_OutOfSync, this.HandleOutOfSync.bind(this));
            Global_1.Global.connector.RemoveListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
            Global_1.Global.connector.RemoveListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_BSLose, this.HandleBSLost.bind(this));
            this._lBattle.Destroy();
            this._vBattle.Destroy();
            this._messageQueue.splice(0);
        }
        Init() {
            this._ready = false;
            this._destroied = false;
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_OutOfSync, this.HandleOutOfSync.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_BSLose, this.HandleBSLost.bind(this));
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
                const request = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestFrameActions();
                request.from = this._lBattle.frame;
                request.to = serverFrame;
                Logger_1.Logger.Log(`request frame from ${request.from} to ${request.to}`);
                Global_1.Global.connector.SendToBS(protos_1.Protos.GC2BS_RequestFrameActions, request, msg => {
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
                    this._ready = true;
                    Logger_1.Logger.Log("battle inited");
                    completeHandler();
                });
            });
        }
        RequestSnapshot(serverFrame, callback) {
            const requestState = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestSnapshot();
            requestState.frame = serverFrame;
            Global_1.Global.connector.SendToBS(protos_1.Protos.GC2BS_RequestSnapshot, requestState, msg => {
                const ret = msg;
                if (ret.snapshot.length == 0) {
                    Logger_1.Logger.Log("no snapshot");
                    callback(false);
                }
                else {
                    Logger_1.Logger.Log(`snapshot reqframe:${ret.reqFrame}, curframe:${ret.curFrame}`);
                    this._lBattle.HandleSnapShot(ret);
                    callback(true);
                }
            });
        }
        Update(dt) {
            if (!this._ready)
                return;
            this.ProcessMessageQueue();
            this._lBattle.Update(FMathUtils_1.FMathUtils.ToFixed(dt));
            SyncEvent_1.SyncEvent.Update();
            this._vBattle.Update(dt);
        }
        QueueMessage(message, handler) {
            this._messageQueue.push({ message: message, handler: handler });
        }
        ProcessMessageQueue() {
            for (const messageInfo of this._messageQueue) {
                messageInfo.handler(messageInfo.message);
            }
            this._messageQueue.splice(0);
        }
        HandleRequestFrameActions(frames, actions) {
            const count = frames.length;
            if (count == 0)
                return null;
            const frameActionGroups = [];
            for (let i = 0; i < count; ++i) {
                const frameActionGroup = new FrameActionGroup_1.FrameActionGroup(frames[i]);
                frameActionGroup.Deserialize(actions[i]);
                frameActionGroups.push(frameActionGroup);
            }
            return frameActionGroups;
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
        HandleBattleEnd(message) {
            this.QueueMessage(message, msg => {
                const battleEnd = msg;
                UIEvent_1.UIEvent.EndBattle(battleEnd.result, battleEnd.rank, () => {
                    this.Destroy();
                    Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
                });
            });
        }
        HandleBSLost(e) {
            this.QueueMessage(null, msg => {
                Logger_1.Logger.Log(`bs error`);
            });
        }
    }
    exports.BattleManager = BattleManager;
});
//# sourceMappingURL=BattleManager.js.map