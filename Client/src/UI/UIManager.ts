import { IUIModule } from "./IUIModule";
import { UILogin } from "./UILogin";
import { UIMain } from "./UIMain";
import { UICutscene } from "./UICutscene";

export class UIManager {
	private static _login: UILogin;
	private static _main: UIMain;
	private static _currModule: IUIModule;
	private static _cutscene: UICutscene;

	public static get login(): UILogin { return this._login; }
	public static get main(): UIMain { return this._main; }
	public static get cutscene(): UICutscene { return this._cutscene; }

	public static Init(): void {
		Laya.stage.addChild(fairygui.GRoot.inst.displayObject);

		fairygui.UIPackage.addPackage("res/ui/global");
		fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
		fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
		fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");

		this._login = new UILogin();
		this._main = new UIMain();
		this._cutscene = new UICutscene();
	}

	public static Dispose(): void {
		if (this._currModule != null) {
			this._currModule.Leave();
			this._currModule = null;
		}
	}

	public static Update(deltaTime: number): void {
		if (this._currModule != null)
			this._currModule.Update(deltaTime);
	}

	public static OnResize(e: laya.events.Event): any {
		if (this._currModule != null)
			this._currModule.OnResize(e);
	}

	private static EnterModule(module: IUIModule, param?: any): void {
		if (this._currModule != null)
			this._currModule.Leave();
		module.Enter(param);
		this._currModule = module;
	}

	public static LeaveModule(): void {
		if (this._currModule != null)
			this._currModule.Leave();
		this._currModule = null;
	}

	public static EnterLogin(): void {
		this.EnterModule(this._login);
	}

	public static EnterCutscene():void{
		this.EnterModule(this._cutscene);
	}
}