import { SceneState } from "./SceneState";
import { Protos } from "../Libs/protos";
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
		let loginRet = <Protos.BS2GC_LoginRet>param;
	}

	protected OnExit(): void {
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
	}
}