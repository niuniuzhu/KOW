import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { IUIModule } from "./IUIModule";
import { UIAlert } from "./UIAlert";

enum Mode {
	WXLogin,
	WebLogin
}

export class UILogin implements IUIModule {
	public static readonly Mode = Mode;

	public set mode(value: Mode) {
		if (this._mode == value)
			return;
		this._mode = value;
		switch (this._mode) {
			case Mode.WXLogin:
				this._root.getController("c1").selectedIndex = 0;
				break;
			case Mode.WebLogin:
				this._root.getController("c1").selectedIndex = 1;
				break;
		}
	}

	private readonly _root: fairygui.GComponent;
	private _mode: Mode = Mode.WXLogin;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/login");
		this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
		this._root.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
	}

	protected onInit(): void {
	}

	public Dispose(): void {
		this._root.dispose();
	}

	public Enter(param: any): void {
		Global.graphic.uiRoot.addChild(this._root);
	}

	public Exit(): void {
		Global.graphic.uiRoot.removeChild(this._root);
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnLoginBtnClick(): void {
		let uname = this._root.getChild("name").asTextField.text;
		if (uname == "") {
			UIAlert.Show("无效用户名");
			return;
		}
		fairygui.GRoot.inst.showModalWait();
		Global.sceneManager.login.Login(uname);
	}

	public OnLoginResut(resp: Protos.LS2GC_AskLoginRet, callback: () => void): void {
		fairygui.GRoot.inst.closeModalWait();
		switch (resp.result) {
			case Protos.LS2GC_AskLoginRet.EResult.Failed:
				UIAlert.Show("登陆失败", callback);
				break;
			case Protos.LS2GC_AskLoginRet.EResult.InvalidUname:
				UIAlert.Show("请输入正确的用户名", callback);
				break;
			case Protos.LS2GC_AskLoginRet.EResult.InvalidPwd:
				UIAlert.Show("请输入正确的密码", callback);
				break;
		}
	}

	public OnFail(message: string, callback: () => void = null): void {
		UIAlert.Show(message, callback);
	}

	public ModalWait(value: boolean): void {
		if (value)
			fairygui.GRoot.inst.showModalWait();
		else
			fairygui.GRoot.inst.closeModalWait();
	}
}