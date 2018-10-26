import { SceneState } from "./SceneState";
import { Connector } from "../Net/Connector";
import { Protos } from "../Libs/protos";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "./SceneManager";
import { UIManager } from "../UI/UIManager";
import { UIBattle } from "../UI/UIBattle";

export class BattleState extends SceneState {
	private readonly _ui: UIBattle;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.battle;
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
		Logger.Log("battle start");
	}

	protected OnExit(): void {
		Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
	}

	private OnBattleEnd(message: any): void {
		let battleStart: Protos.BS2GC_BattleStart = <Protos.BS2GC_BattleStart>message;
		Logger.Log("battle end");
		SceneManager.ChangeState(SceneManager.State.Main);
	}
}