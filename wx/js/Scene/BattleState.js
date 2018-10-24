import { SceneState } from "./SceneState";
import { Connector } from "../Net/Connector";
import { Protos } from "../libs/protos";
import { Debug } from "../Misc/Debug";
export class LoginState extends SceneState {
    constructor(type) {
        super(type);
    }
    OnEnter(param) {
        super.OnEnter(param);
        Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleStart, this.OnBattleStart.bind(this));
        Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
    }
    OnExit() {
        Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleStart, this.OnBattleStart.bind(this));
        Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
        super.OnExit();
    }
    OnUpdate(dt) {
    }
    OnBattleStart(message) {
        let battleStart = message;
        Debug.Log("battle start");
    }
    OnBattleEnd(message) {
        let battleStart = message;
        Debug.Log("battle end");
    }
}
//# sourceMappingURL=BattleState.js.map