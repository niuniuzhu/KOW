define(["require", "exports", "../Global", "../Libs/protos", "../Net/Connector", "./SceneManager", "./SceneState"], function (require, exports, Global_1, protos_1, Connector_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MatchingState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.matching;
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_MatchState, this.OnMotchState.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_RemoveFromMatch, this.OnRemoveFromMatch.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
        }
        OnMotchState(message) {
            const msg = message;
            this._ui.UpdatePlayerInfos(msg.playerInfos);
        }
        OnRemoveFromMatch(message) {
            this._ui.SetCancelBtnEnable(true);
            Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
        }
        OnEnterBattle(message) {
            const enterBattle = message;
            if (enterBattle.result != protos_1.Protos.CS2GC_EnterBattle.Result.Success) {
                this._ui.OnEnterBattleResult(enterBattle.result, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
            }
            else {
                Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Loading);
                if (!Global_1.Global.sceneManager.loading.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port)) {
                    this._ui.OnFail("连接服务器失败", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
                }
            }
        }
    }
    exports.MatchingState = MatchingState;
});
//# sourceMappingURL=MatchingState.js.map