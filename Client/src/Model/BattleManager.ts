import { VBattle } from "./View/VBattle";
import { Battle } from "./Logic/Battle";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { ProtoCreator } from "../Net/ProtoHelper";

export class BattleManager {
	private _vBattle: VBattle;
	private _lBattle: Battle;

	constructor() {
		this._vBattle = new VBattle();
		this._lBattle = new Battle();
	}

	public Init(loginRet: Protos.BS2GC_LoginRet): void {
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
		this._vBattle.Init(loginRet);
		this._lBattle.Init(loginRet);
		//请求快照
		this.RequestSnapshot();
		Logger.Log("battle start");
	}

	public Clear(): void {
		Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
	}

	public Update(dt: number): void {

	}

	private OnBattleEnd(message: any): void {
		let battleEnd: Protos.BS2GC_BattleEnd = <Protos.BS2GC_BattleEnd>message;
		Logger.Log("battle end");
		SceneManager.ChangeState(SceneManager.State.Main);
	}

	private RequestSnapshot(): void {
		let requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
		requestState.frame = 0;
		Connector.SendToBS(Protos.GC2BS_RequestSnapshot, requestState, msg => {
		});
	}
}