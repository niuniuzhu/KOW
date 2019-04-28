import { Consts } from "../Consts";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Logger } from "../RC/Utils/Logger";
import { IUIModule } from "./IUIModule";
import { UIAlert } from "./UIAlert";
import { UIInviting } from "./UIInviting";
import { UIRanking } from "./UIRanking";

export class UIMain implements IUIModule {
	private readonly _root: fairygui.GComponent;
	private _userInfo: Protos.IG_UserInfo;

	public get root(): fairygui.GComponent { return this._root; }

	private readonly _matchBtn: fairygui.GComponent;
	private readonly _matchBtn3: fairygui.GComponent;
	private readonly _inviteBtn: fairygui.GComponent;
	private readonly _closeBtn: fairygui.GComponent;
	private readonly _ranking: UIRanking;
	private readonly _invating: UIInviting;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/main");
		this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);

		this._ranking = new UIRanking();
		this._invating = new UIInviting();

		this._matchBtn = this._root.getChild("n3").asCom;
		this._matchBtn3 = this._root.getChild("n19").asCom;
		this._inviteBtn = this._root.getChild("n4").asCom;
		this._closeBtn = this._root.getChild("close_btn").asCom;
		this._matchBtn.onClick(this, this.OnMatchBtnClick);
		this._matchBtn3.onClick(this, this.OnMatchBtn3Click);
		this._inviteBtn.onClick(this, this.OnInviteBtnClick);
		this._closeBtn.onClick(this, this.OnCloseBtnClick);

		if ( !Laya.Browser.onWeiXin ){
			this._closeBtn.visible = false;
		}

		this._root.getChild("n22").asCom.onClick(this, this.OnRankingBtnClick);
	}

	public Dispose(): void {
		this._ranking.dispose();
		this._invating.dispose();
		this._root.dispose();
	}

	public Enter(param: any): void {
		this.SetMatchBtnEnable(true);
		Global.graphic.uiRoot.addChild(this._root);
		// this._root.getTransition("t0").play();

		this._userInfo = <Protos.IG_UserInfo>param;
		if (this._userInfo != null) {
			this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = this._userInfo.avatar;
			this._root.getChild("nickname").asTextField.text = this._userInfo.nickname;
			let r = this._userInfo.rank - this._userInfo.rank % Consts.RANK_STEP;
			r = r < Consts.RANK_START ? Consts.RANK_START : r;
			this._root.getChild("rank_icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "r" + r);
			this._root.getChild("rank").asTextField.text = "" + (this._userInfo.rank < 0 ? 0 : this._userInfo.rank);
		}
	}

	public Exit(): void {
		fairygui.GRoot.inst.hidePopup(this._invating);
		Global.graphic.uiRoot.removeChild(this._root);
		this._userInfo = null;
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	public UpdateRank(delta: number): void {
		const rank = Number.parseInt(this._root.getChild("rank").asTextField.text) + delta;
		this._root.getChild("rank").asTextField.text = "" + (rank < 0 ? 0 : rank);
	}

	public SetMatchBtnEnable(value: boolean): void {
		this._matchBtn.enabled = value;
		this._matchBtn3.enabled = value;
	}

	public ShowModalWait(): void {
		fairygui.GRoot.inst.showModalWait();
	}

	public CloseModalWait(): void {
		fairygui.GRoot.inst.closeModalWait();
	}

	private OnMatchBtnClick(): void {
		this.SetMatchBtnEnable(false);
		Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T2P1);
	}

	private OnMatchBtn3Click(): void {
		this.SetMatchBtnEnable(false);
		Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T4P1);
	}

	private OnInviteBtnClick(): void {
		if (Laya.Browser.onMiniGame) {
			fairygui.GRoot.inst.showModalWait();
			Global.sceneManager.main.InviteFriend();
		}
		else {
			Logger.Log("wx function only");
		}
	}

	private OnCloseBtnClick(): void {
		wx.exitMiniProgram({
			success: () => { },
			fail: () => {
				Logger.Log("exit program failed")
			},
			complete: () => { }
		});
	}

	private OnRankingBtnClick(): void {
		fairygui.GRoot.inst.showPopup(this._ranking);
		this._ranking.center();
	}

	public OnFail(message: string, callback: () => void = null): void {
		UIAlert.Show(message, callback);
	}

	public ShowInvating(): void {
		fairygui.GRoot.inst.showPopup(this._invating);
		this._invating.center();
		this._invating.contentPane.getController("c1").selectedIndex = 0;
	}

	public Showjoining(): void {
		fairygui.GRoot.inst.showPopup(this._invating);
		this._invating.center();
		this._invating.contentPane.getController("c1").selectedIndex = 1;
	}
}