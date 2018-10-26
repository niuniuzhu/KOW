import { SceneState } from "./SceneState";
import { Connector } from "../Net/Connector";
import { Protos } from "../Libs/protos";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "./SceneManager";
import { UIManager } from "../UI/UIManager";
export class BattleState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = UIManager.battle;
    }
    OnEnter(param) {
        super.OnEnter(param);
        Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
        Logger.Log("battle start");
    }
    OnExit() {
        Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
        super.OnExit();
    }
    OnUpdate(dt) {
    }
    OnBattleEnd(message) {
        let battleStart = message;
        Logger.Log("battle end");
        SceneManager.ChangeState(SceneManager.State.Main);
    }
}
