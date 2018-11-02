define(["require", "exports", "./View/VBattle", "./Logic/Battle", "../Libs/protos", "../Net/Connector", "../RC/Utils/Logger", "../Scene/SceneManager"], function (require, exports, VBattle_1, Battle_1, protos_1, Connector_1, Logger_1, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattleManager {
        static get instance() {
            if (this._instance == null)
                this._instance = new BattleManager();
            return this._instance;
        }
        constructor() {
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_Action, this.OnFrameAction.bind(this));
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.BS, protos_1.Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
            this._lBattle = new Battle_1.Battle();
            this._vBattle = new VBattle_1.VBattle();
        }
        Init(battleInfo) {
            this._lBattle.Init(battleInfo);
            this._vBattle.Init(battleInfo);
            this._init = true;
            Logger_1.Logger.Log("battle start");
        }
        Clear() {
            this._init = false;
            this._lBattle.Clear();
            this._vBattle.Clear();
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
            this._lBattle.OnFrameAction(message);
        }
    }
    exports.BattleManager = BattleManager;
});
//# sourceMappingURL=BattleManager.js.map