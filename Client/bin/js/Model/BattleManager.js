define(["require", "exports", "./View/VBattle", "./Logic/Battle", "../Libs/protos", "../Net/Connector", "../RC/Utils/Logger", "../Scene/SceneManager", "../Net/ProtoHelper"], function (require, exports, VBattle_1, Battle_1, protos_1, Connector_1, Logger_1, SceneManager_1, ProtoHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleManager {
        constructor() {
            this._lBattle = new Battle_1.Battle();
            this._vBattle = new VBattle_1.VBattle();
        }
        Init(loginRet) {
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_Action, this.OnFrameAction.bind(this));
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
            this._lBattle.Init(loginRet);
            this._vBattle.Init(loginRet);
            this.RequestSnapshot();
            this._init = true;
            Logger_1.Logger.Log("battle start");
        }
        Clear() {
            this._init = false;
            this._lBattle.Clear();
            this._vBattle.Clear();
            Connector_1.Connector.RemoveListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_Action, this.OnFrameAction.bind(this));
            Connector_1.Connector.RemoveListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
        }
        Update(dt) {
            if (!this._init)
                return;
            this._lBattle.Update(dt);
            this._vBattle.Update(dt);
        }
        OnBattleEnd(message) {
            let battleEnd = message;
            Logger_1.Logger.Log("battle end");
            SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
        }
        OnFrameAction(message) {
            let frameAction = message;
            Logger_1.Logger.Log(frameAction.frame);
        }
        RequestSnapshot() {
            let requestState = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestSnapshot();
            requestState.frame = 0;
            Connector_1.Connector.SendToBS(protos_1.Protos.GC2BS_RequestSnapshot, requestState, msg => {
            });
        }
    }
    exports.BattleManager = BattleManager;
});
//# sourceMappingURL=BattleManager.js.map