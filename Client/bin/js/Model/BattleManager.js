define(["require", "exports", "./View/VBattle", "./Logic/Battle", "../Libs/protos", "../Net/Connector", "../RC/Utils/Logger", "../Scene/SceneManager", "../Net/ProtoHelper", "../Global"], function (require, exports, VBattle_1, Battle_1, protos_1, Connector_1, Logger_1, SceneManager_1, ProtoHelper_1, Global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleManager {
        get lBattle() { return this._lBattle; }
        get vBattle() { return this._vBattle; }
        Init() {
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_FrameAction, this.OnFrameAction.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
            this._lBattle = new Battle_1.Battle();
            this._vBattle = new VBattle_1.VBattle();
        }
        SetBattleInfo(battleInfo, completeHandler) {
            this._lBattle.Init(battleInfo);
            this._vBattle.Init(battleInfo);
            this._init = true;
            const request = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestFrameActions();
            request.from = this._lBattle.frame;
            request.to = battleInfo.serverFrame;
            Global_1.Global.connector.SendToBS(protos_1.Protos.GC2BS_RequestFrameActions, request, msg => {
                const ret = msg;
                this.HandleRequestFrameActionsRet(ret.frames, ret.actions);
                Logger_1.Logger.Log("battle start");
                this._lBattle.Chase(false);
                this._lBattle.SyncToView();
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
            this._vBattle.End();
            this._init = false;
            Logger_1.Logger.Log("battle end");
            Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
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
    exports.BattleManager = BattleManager;
});
//# sourceMappingURL=BattleManager.js.map