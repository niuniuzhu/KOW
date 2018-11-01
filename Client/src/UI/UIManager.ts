import { UILogin } from "./UILogin";
import { UIMain } from "./UIMain";
import { UIMatching } from "./UIMatching";
import { UILoading } from "./UILoading";
import { UIBattle } from "./UIBattle";
import { IUIModule } from "./IUIModule";

export class UIManager {
	private static _login: UILogin;
	private static _main: UIMain;
	private static _matching: UIMatching;
	private static _loading: UILoading;
	private static _battle: UIBattle;
	private static _uis: IUIModule[];

	public static get login(): UILogin { return UIManager._login; }
	public static get main(): UIMain { return UIManager._main; }
	public static get matching(): UIMatching { return UIManager._matching; }
	public static get loading(): UILoading { return UIManager._loading; }
	public static get battle(): UIBattle { return UIManager._battle; }

	public static Init(): void {
		fairygui.UIPackage.addPackage("res/ui/global");
		fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
		fairygui.UIConfig.windowModalWaiting = fairygui.UIPackage.getItemURL("global", "modelWait");
		fairygui.UIConfig.buttonSound = fairygui.UIPackage.getItemURL("global", "click");

		UIManager._main = new UIMain();
		UIManager._login = new UILogin();
		UIManager._matching = new UIMatching();
		UIManager._loading = new UILoading();
		UIManager._battle = new UIBattle();

		UIManager._uis = [];
		UIManager._uis[0] = UIManager._main;
		UIManager._uis[1] = UIManager._login;
		UIManager._uis[2] = UIManager._matching;
		UIManager._uis[3] = UIManager._loading;
		UIManager._uis[4] = UIManager._battle;
	}

	public static Dispose(): void {
		for (let i = 0; i < UIManager._uis.length; i++) {
			UIManager._uis[i].Dispose();
		}
	}

	public static OnResize(e: laya.events.Event): any {
		for (let i = 0; i < UIManager._uis.length; i++) {
			UIManager._uis[i].OnResize(e);
		}
	}
}