import { VBattle } from "./View/VBattle";
import { Battle } from "./Logic/Battle";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";

export class BattleManager {
	private _lBattle: Battle;
	private _vBattle: VBattle;
	private _init: boolean;

	constructor() {
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_Action, this.OnFrameAction.bind(this));
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));

		this._lBattle = new Battle();
		this._vBattle = new VBattle();
	}

	public Init(loginRet: Protos.BS2GC_LoginRet): void {

		this._lBattle.Init(loginRet);
		this._vBattle.Init(loginRet);
		this._init = true;
		Logger.Log("battle start");
	}

	public Clear(): void {
		this._init = false;
		this._lBattle.Clear();
		this._vBattle.Clear();
	}

	public Update(dt: number): void {
		if (!this._init)
			return;
		this._lBattle.Update(dt);
		this._vBattle.Update(dt);
	}

	private OnBattleEnd(message: any): void {
		let battleEnd = <Protos.BS2GC_BattleEnd>message;
		Logger.Log("battle end");
		SceneManager.ChangeState(SceneManager.State.Main);
	}

	private OnFrameAction(message: any): void {
		this._lBattle.OnFrameAction(message);
	}
}