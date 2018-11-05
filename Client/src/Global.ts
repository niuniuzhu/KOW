import { Connector } from "./Net/Connector";
import { Graphic } from "./Graphic";
import { UIManager } from "./UI/UIManager";
import { SceneManager } from "./Scene/SceneManager";
import { BattleManager } from "./Model/BattleManager";
import { ProtoCreator } from "./Net/ProtoHelper";

enum Platform {
	Editor,
	Web,
	WXMini
}

enum RunMode {
	Game,
	Pressure
}

export class Global {
	public static readonly Platform = Platform;
	public static readonly RunMode = RunMode;

	public static platform: Platform;

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

	public static Init() {
		ProtoCreator.Init();
		this._connector.Init();
		this._graphic.Init();
		this._uiManager.Init();
		this._sceneManager.Init();
		this._battleManager.Init();
	}
}