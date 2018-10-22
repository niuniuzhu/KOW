import { SceneState } from "./SceneState";
import { Connector } from "../Net/Connector";
import { Protos } from "../libs/protos";
import { Debug } from "../Misc/Debug";

export class LoginState extends SceneState {
    constructor(type: number) {
        super(type);
    }

    protected OnEnter(param: any): void {
        super.OnEnter(param);
        Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleStart, this.OnBattleStart.bind(this));
    }

    protected OnExit(): void {
        Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleStart, this.OnBattleStart.bind(this));
        super.OnExit();
    }

	protected OnUpdate(dt: number): void {
    }
    
    private OnBattleStart(message: any):void{
        let battleStart: Protos.BS2GC_BattleStart = <Protos.BS2GC_BattleStart>message;
        Debug.Log("battle start");
    }
}