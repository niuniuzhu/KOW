import { UILogin } from "./UILogin";
import { UIMain } from "./UIMain";
import { UIMatching } from "./UIMatching";
import { UILoading } from "./UILoading";
import { UIBattle } from "./UIBattle";
import { IUIModule } from "./IUIModule";

export class UIManager {
	private _login: UILogin;
	private _main: UIMain;
	private _matching: UIMatching;
	private _loading: UILoading;
	private _battle: UIBattle;
	private _uis: IUIModule[];

	public get login(): UILogin { return this._login; }
	public get main(): UIMain { return this._main; }
	public get matching(): UIMatching { return this._matching; }
	public get loading(): UILoading { return this._loading; }
	public get battle(): UIBattle { return this._battle; }

	public Init(): void {
		fairygui.UIPackage.addPackage("res/ui/global");
		fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
		fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
		fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");

		this._main = new UIMain();
		this._login = new UILogin();
		this._matching = new UIMatching();
		this._loading = new UILoading();
		this._battle = new UIBattle();

		this._uis = [];
		this._uis[0] = this._main;
		this._uis[1] = this._login;
		this._uis[2] = this._matching;
		this._uis[3] = this._loading;
		this._uis[4] = this._battle;
	}

	public Dispose(): void {
		for (let i = 0; i < this._uis.length; i++) {
			this._uis[i].Dispose();
		}
	}

	public OnResize(e: laya.events.Event): any {
		for (let i = 0; i < this._uis.length; i++) {
			this._uis[i].OnResize(e);
		}
	}
}