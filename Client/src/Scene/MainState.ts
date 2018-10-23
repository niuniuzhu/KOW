import { SceneState } from "./SceneState";
import { UIManager } from "../UI/UIManager";
import { UIMain } from "../UI/UIMain";

export class MainState extends SceneState {
	private readonly _ui: UIMain;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.main;
	}
}