import { VBattle } from "./View/VBattle";
import { Battle } from "./Logic/Battle";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { ProtoCreator } from "../Net/ProtoHelper";
export class BattleManager {
    constructor() {
        this._vBattle = new VBattle();
        this._lBattle = new Battle();
    }
    Init(loginRet) {
        Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
        this._vBattle.Init(loginRet);
        this._lBattle.Init(loginRet);
        this.RequestSnapshot();
        Logger.Log("battle start");
    }
    Clear() {
        Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
    }
    Update(dt) {
    }
    OnBattleEnd(message) {
        let battleEnd = message;
        Logger.Log("battle end");
        SceneManager.ChangeState(SceneManager.State.Main);
    }
    RequestSnapshot() {
        let requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
        requestState.frame = 0;
        Connector.SendToBS(Protos.GC2BS_RequestSnapshot, requestState, msg => {
        });
    }
}
