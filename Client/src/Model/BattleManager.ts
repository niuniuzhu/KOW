import { VBattle } from "./View/VBattle";
import { Battle } from "./Logic/Battle";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { ProtoCreator } from "../Net/ProtoHelper";

export class BattleManager {
	private _lBattle: Battle;
	private _vBattle: VBattle;
	private _init: boolean;

	constructor() {
		this._lBattle = new Battle();
		this._vBattle = new VBattle();
	}

	public Init(loginRet: Protos.BS2GC_LoginRet): void {
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_Action, this.OnFrameAction.bind(this));
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));

		this._lBattle.Init(loginRet);
		this._vBattle.Init(loginRet);
		//请求快照
		this.RequestSnapshot();
		this._init = true;
		Logger.Log("battle start");
	}

	public Clear(): void {
		this._init = false;
		this._lBattle.Clear();
		this._vBattle.Clear();

		Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_Action, this.OnFrameAction.bind(this));
		Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
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
		let frameAction = <Protos.BS2GC_Action>message;
		Logger.Log(frameAction.frame);
	}

	private RequestSnapshot(): void {
		let requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
		requestState.frame = 0;
		Connector.SendToBS(Protos.GC2BS_RequestSnapshot, requestState, msg => {
		});
	}
}