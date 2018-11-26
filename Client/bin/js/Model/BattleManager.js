define(["require", "exports", "../Global", "../Libs/protos", "../Net/Connector", "../Net/ProtoHelper", "../RC/Utils/Logger", "../Scene/SceneManager", "./Logic/Battle", "./View/VBattle", "./FrameActionGroup", "../RC/Collections/Queue"], function (require, exports, Global_1, protos_1, Connector_1, ProtoHelper_1, Logger_1, SceneManager_1, Battle_1, VBattle_1, FrameActionGroup_1, Queue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleManager {
        get lBattle() { return this._lBattle; }
        get vBattle() { return this._vBattle; }
        Init() {
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
            this._lBattle = new Battle_1.Battle();
            this._vBattle = new VBattle_1.VBattle();
        }
        SetBattleInfo(battleInfo, completeHandler) {
            this._vBattle.SetBattleInfo(battleInfo);
            this._lBattle.SetBattleInfo(battleInfo);
            const curFrame = battleInfo.serverFrame;
            this.RequestSnapshot(() => {
                const request = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestFrameActions();
                request.from = this._lBattle.frame;
                request.to = curFrame;
                Global_1.Global.connector.SendToBS(protos_1.Protos.GC2BS_RequestFrameActions, request, msg => {
                    const ret = msg;
                    const frameActionGroups = this.HandleRequestFrameActions(ret.frames, ret.actions);
                    this._lBattle.Chase(frameActionGroups, false, false);
                    this._lBattle.InitSyncToView();
                    this._init = true;
                    Logger_1.Logger.Log("battle inited");
                    completeHandler();
                });
            });
        }
        Update(dt) {
            if (!this._init)
                return;
            this._lBattle.Update(dt);
            this._vBattle.Update(dt);
        }
        RequestSnapshot(callback) {
            const requestState = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestSnapshot();
            requestState.frame = -1;
            Global_1.Global.connector.SendToBS(protos_1.Protos.GC2BS_RequestSnapshot, requestState, msg => {
                const ret = msg;
                this._lBattle.HandleSnapShot(ret);
                callback();
            });
        }
        HandleBattleEnd(message) {
            const battleEnd = message;
            this._lBattle.End();
            this._vBattle.End();
            this._init = false;
            Logger_1.Logger.Log("battle end");
            Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
        }
        HandleFrameAction(message) {
            const frameAction = message;
            Logger_1.Logger.Log("recv frame action" + frameAction.frame);
            this._lBattle.HandleFrameAction(frameAction.frame, frameAction.action);
        }
        HandleRequestFrameActions(frames, actions) {
            const frameActionGroups = new Queue_1.default();
            const count = frames.length;
            for (let i = 0; i < count; ++i) {
                const frameActionGroup = new FrameActionGroup_1.FrameActionGroup(frames[i]);
                frameActionGroup.DeSerialize(actions[i]);
                frameActionGroups.enqueue(frameActionGroup);
            }
            return frameActionGroups;
        }
    }
    exports.BattleManager = BattleManager;
});
//# sourceMappingURL=BattleManager.js.map