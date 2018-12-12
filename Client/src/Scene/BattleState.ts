import { Global } from "../Global";
import { UIBattle } from "../UI/UIBattle";
import { SceneState } from "./SceneState";

export class BattleState extends SceneState {
	private readonly _ui: UIBattle;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = Global.uiManager.battle;
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);
	}

	protected OnExit(): void {
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
		super.OnUpdate(dt);
	}
}