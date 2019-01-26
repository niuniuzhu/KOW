import { Graphic } from "./Graphic";
import { BattleManager } from "./Model/BattleManager";
import { Connector } from "./Net/Connector";
import { ProtoCreator } from "./Net/ProtoHelper";
import { SceneManager } from "./Scene/SceneManager";
import { UIManager } from "./UI/UIManager";

export class Global {
	private static _connector: Connector = new Connector();
	private static _graphic: Graphic = new Graphic();
	private static _uiManager: UIManager = new UIManager();
	private static _sceneManager: SceneManager = new SceneManager();
	private static _battleManager: BattleManager = new BattleManager();

	public static get connector(): Connector { return this._connector; }
	public static get graphic(): Graphic { return this._graphic; }
	public static get uiManager(): UIManager { return this._uiManager; }
	public static get sceneManager(): SceneManager { return this._sceneManager; }
	public static get battleManager(): BattleManager { return this._battleManager; }

	public static local: boolean;

	public static Init() {
		ProtoCreator.Init();
		this._connector.Init();
		this._graphic.Init();
		this._uiManager.Init();
		this._sceneManager.Init();
	}
}