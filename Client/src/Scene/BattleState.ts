import { SceneState } from "./SceneState";
import { Connector } from "../Net/Connector";
import { Protos } from "../Libs/protos";
import { UIManager } from "../UI/UIManager";
import { UIBattle } from "../UI/UIBattle";
import { BattleManager } from "../Model/BattleManager";

export class BattleState extends SceneState {
	private readonly _ui: UIBattle;
	private readonly _battleManager: BattleManager;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.battle;
		this._battleManager = new BattleManager();
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);
		let loginRet = <Protos.BS2GC_LoginRet>param;
		this._battleManager.Init(loginRet);
	}

	protected OnExit(): void {
		this._battleManager.Clear();
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
		this._battleManager.Update(dt);
	}
}