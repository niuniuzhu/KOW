import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { IUIModule } from "./IUIModule";
import { UIAlert } from "./UIAlert";

export class UILogin implements IUIModule {
	private readonly _root: fairygui.GComponent;
	private _areaList: fairygui.GList;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/login");
		this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
		this._root.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
		this._root.getChild("enter_btn").onClick(this, this.OnEnterBtnClick);
		this._areaList = this._root.getChild("alist").asList;
		this._areaList.on(fairygui.Events.CLICK_ITEM, this, this.OnAreaClick);
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

	private OnEnterBtnClick(): void {
		let item = this._areaList.getChildAt(this._areaList.selectedIndex);
		let data: Protos.GSInfo = <Protos.GSInfo>item.data["data"];
		fairygui.GRoot.inst.showModalWait();
		Global.sceneManager.login.LoginGS(data.ip, data.port, data.password, item.data["gcNID"]);
	}

	private OnAreaClick(): void {
	}

	public OnRegisterResult(resp: Protos.LS2GC_AskRegRet, callback: () => void): void {
		fairygui.GRoot.inst.closeModalWait();
		switch (resp.result) {
			case Protos.LS2GC_AskRegRet.EResult.Success:
				this._root.getChild("name").asTextField.text = this._root.getChild("reg_name").asTextField.text;
				this._root.getController("c1").selectedIndex = 0;
				UIAlert.Show("注册成功");
				break;
			case Protos.LS2GC_AskRegRet.EResult.Failed:
				UIAlert.Show("注册失败", callback);
				break;
			case Protos.LS2GC_AskRegRet.EResult.UnameExists:
				UIAlert.Show("用户名已存在", callback);
				break;
			case Protos.LS2GC_AskRegRet.EResult.UnameIllegal:
				UIAlert.Show("无效的用户名", callback);
				break;
			case Protos.LS2GC_AskRegRet.EResult.PwdIllegal:
				UIAlert.Show("无效的密码", callback);
				break;
		}
	}

	public OnLoginResut(resp: Protos.LS2GC_AskLoginRet, callback: () => void): void {
		fairygui.GRoot.inst.closeModalWait();
		switch (resp.result) {
			case Protos.LS2GC_AskLoginRet.EResult.Success:
				this.HandleLoginLSSuccess(resp);
				break;
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

	public OnConnectToLSError(e: Event, callback: () => void): void {
		fairygui.GRoot.inst.closeModalWait();
		UIAlert.Show("无法连接服务器[" + e.toString() + "]", callback);
	}

	private HandleLoginLSSuccess(loginResult: Protos.LS2GC_AskLoginRet): void {
		this._areaList.removeChildrenToPool();
		let count = loginResult.gsInfos.length;
		for (let i = 0; i < count; ++i) {
			let gsInfo = loginResult.gsInfos[i];
			let item = this._areaList.addItemFromPool().asButton;
			item.title = gsInfo.name;
			item.data = { "data": gsInfo, "gcNID": loginResult.sessionID };
		}
		if (count > 0)
			this._areaList.selectedIndex = 0;
		this._root.getController("c1").selectedIndex = 1;
	}

	public OnLoginGSResult(resp: Protos.GS2GC_LoginRet, callback: () => void): void {
		fairygui.GRoot.inst.closeModalWait();
		switch (resp.result) {
			case Protos.GS2GC_LoginRet.EResult.SessionExpire:
				UIAlert.Show("登陆失败或凭证已过期", callback);
				break;
		}
	}

	public WxLoginFail(callback: () => void): void {
		UIAlert.Show("登陆微信失败", callback);
	}

	public GSNotFound(callback: () => void): void {
		UIAlert.Show("无法连接服务器", callback);
	}
}