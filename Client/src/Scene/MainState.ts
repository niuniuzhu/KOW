import { Global } from "../Global";
import { UIMain } from "../UI/UIMain";
import { SceneState } from "./SceneState";

export class MainState extends SceneState {
	private readonly _ui: UIMain;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = Global.uiManager.main;
	}
}