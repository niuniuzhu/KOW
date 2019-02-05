import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";
export class MatchingState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.matching;
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_MatchState, this.OnMotchState.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_RemoveFromMatch, this.OnRemoveFromMatch.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
    }
    OnMotchState(message) {
        const msg = message;
        this._ui.UpdatePlayerInfos(msg.playerInfos);
    }
    OnRemoveFromMatch(message) {
        this._ui.SetCancelBtnEnable(true);
        Global.sceneManager.ChangeState(SceneManager.State.Main);
    }
    OnEnterBattle(message) {
        const enterBattle = message;
        if (enterBattle.result != Protos.CS2GC_EnterBattle.Result.Success) {
            this._ui.OnEnterBattleResult(enterBattle.result, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
        }
        else {
            Global.sceneManager.ChangeState(SceneManager.State.Loading);
            if (!Global.sceneManager.loading.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port)) {
                this._ui.OnFail("连接服务器失败", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
            }
        }
    }
}
