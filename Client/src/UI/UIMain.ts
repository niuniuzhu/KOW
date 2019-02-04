import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { IUIModule } from "./IUIModule";
import { UIAlert } from "./UIAlert";

export class UIMain implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/main");
		this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
		this._root.getChild("n3").onClick(this, this.OnMatchBtnClick);
	}

	public Dispose(): void {
		this._root.dispose();
	}

	public Enter(param: any): void {
		this._root.getChild("n3").enabled = true;
		Global.graphic.uiRoot.addChild(this._root);
		this._root.getTransition("t0").play();

		const userInfo = <Protos.IG_UserInfo>param;
		if (userInfo != null) {
			this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = userInfo.avatar;
			this._root.getChild("nickname").asTextField.text = userInfo.nickname;
		}
	}

	public Exit(): void {
		Global.graphic.uiRoot.removeChild(this._root);
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	public SetMatchBtnEnable(value: boolean): void {
		this._root.getChild("n3").enabled = value;
	}

	private OnMatchBtnClick(): void {
		this.SetMatchBtnEnable(false);
		Global.sceneManager.main.BeginMatch();
	}

	public OnFail(message: string, callback: () => void = null): void {
		UIAlert.Show(message, callback);
	}
}