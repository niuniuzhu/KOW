import { SceneState } from "./SceneState";
import { UIMain } from "../UI/UIMain";
import { Global } from "../Global";

export class MainState extends SceneState {
	private readonly _ui: UIMain;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = Global.uiManager.main;
	}
}