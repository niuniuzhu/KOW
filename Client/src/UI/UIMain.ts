import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { IUIModule } from "./IUIModule";
import { UIAlert } from "./UIAlert";

export class UIMain implements IUIModule {
	private readonly _root: fairygui.GComponent;
	private static readonly RANK_STEP = 400;
	private static readonly RANK_START = 1200;

	public get root(): fairygui.GComponent { return this._root; }

	private readonly _matchBtn: fairygui.GComponent;
	private readonly _matchBtn2: fairygui.GComponent;
	private readonly _matchBtn4: fairygui.GComponent;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/main");
		this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);

		this._matchBtn = this._root.getChild("n3").asCom;
		this._matchBtn2 = this._root.getChild("n13").asCom;
		this._matchBtn4 = this._root.getChild("n15").asCom;
		this._matchBtn.onClick(this, this.OnMatchBtnClick);
		this._matchBtn2.onClick(this, this.OnMatchBtn2Click);
		this._matchBtn4.onClick(this, this.OnMatchBtn4Click);
	}

	public Dispose(): void {
		this._root.dispose();
	}

	public Enter(param: any): void {
		this.SetMatchBtnEnable(true);
		Global.graphic.uiRoot.addChild(this._root);
		this._root.getTransition("t0").play();

		const userInfo = <Protos.IG_UserInfo>param;
		if (userInfo != null) {
			this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = userInfo.avatar;
			this._root.getChild("nickname").asTextField.text = userInfo.nickname;
			let r = userInfo.rank < UIMain.RANK_START ? UIMain.RANK_START : userInfo.rank;
			r = userInfo.rank - userInfo.rank % UIMain.RANK_STEP;
			this._root.getChild("rank_icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "r" + r);
			this._root.getChild("rank").asTextField.text = "" + (userInfo.rank < 0 ? 0 : userInfo.rank);
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
		this._matchBtn.enabled = value;
		this._matchBtn2.enabled = value;
		this._matchBtn4.enabled = value;
	}

	private OnMatchBtnClick(): void {
		this.SetMatchBtnEnable(false);
		Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T2P1);
	}

	private OnMatchBtn2Click(): void {
		this.SetMatchBtnEnable(false);
		Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T1P1);
	}

	private OnMatchBtn4Click(): void {
		this.SetMatchBtnEnable(false);
		Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T2P2);
	}

	public OnFail(message: string, callback: () => void = null): void {
		UIAlert.Show(message, callback);
	}
}