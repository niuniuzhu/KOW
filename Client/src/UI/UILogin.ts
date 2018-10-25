import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
import { IUIModule } from "./IUIModule";
import { SceneManager } from "../Scene/SceneManager";

export class UILogin extends fairygui.Window implements IUIModule {
	private _areaList: fairygui.GList;

	constructor() {
		super();
		fairygui.UIPackage.addPackage("res/ui/login");
	}

	protected onInit(): void {
		this.contentPane = fairygui.UIPackage.createObject("login", "Main").asCom;
		this.contentPane.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
		this.contentPane.getChild("reg_btn").onClick(this, this.OnRegBtnClick);
		this.contentPane.getChild("enter_btn").onClick(this, this.OnEnterBtnClick);
		this._areaList = this.contentPane.getChild("alist").asList;
		this._areaList.on(fairygui.Events.CLICK_ITEM, this, this.OnAreaClick);
	}

	public Dispose(): void {
		this.contentPane.dispose();
		this.contentPane = null;
		this.dispose();
	}

	public Enter(): void {
		this.show();
		this.center();
		this.BackToLogin();
	}

	public Exit(): void {
		this.hide();
	}

	public AnimIn(): void {

	}

	public AnimOut(): void {

	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private BackToRegister(): void {
		this.contentPane.getController("c1").selectedIndex = 1;
	}

	private BackToLogin(): void {
		this.contentPane.getController("c1").selectedIndex = 0;
	}

	private OnRegBtnClick(): void {
		let regName = this.contentPane.getChild("reg_name").asTextField.text;
		if (regName == "") {
			UIAlert.Show("无效的用户名");
			return;
		}
		this.showModalWait();
		SceneManager.login.RequestRegister(regName, 0, 0);
	}

	private OnLoginBtnClick(): void {
		let uname = this.contentPane.getChild("name").asTextField.text;
		if (uname == "") {
			UIAlert.Show("无效用户名");
			return;
		}
		this.showModalWait();
		SceneManager.login.RequestLogin(uname, 0, 0);
	}

	private OnEnterBtnClick(): void {
		let item = this._areaList.getChildAt(this._areaList.selectedIndex);
		let data: Protos.GSInfo = <Protos.GSInfo>item.data["data"];
		this.showModalWait();
		SceneManager.login.RequestLoginGS(data.ip, data.port, data.password, item.data["sid"]);
	}

	private OnAreaClick(): void {
	}

	public OnRegisterResult(resp: Protos.LS2GC_AskRegRet): void {
		this.closeModalWait();
		switch (resp.result) {
			case Protos.LS2GC_AskRegRet.EResult.Success:
				this.contentPane.getChild("name").asTextField.text = this.contentPane.getChild("reg_name").asTextField.text;
				this.contentPane.getController("c1").selectedIndex = 0;
				UIAlert.Show("注册成功");
				break;
			case Protos.LS2GC_AskRegRet.EResult.Failed:
				UIAlert.Show("注册失败", this.BackToRegister.bind(this));
				break;
			case Protos.LS2GC_AskRegRet.EResult.UnameExists:
				UIAlert.Show("用户名已存在", this.BackToRegister.bind(this));
				break;
			case Protos.LS2GC_AskRegRet.EResult.UnameIllegal:
				UIAlert.Show("无效的用户名", this.BackToRegister.bind(this));
				break;
			case Protos.LS2GC_AskRegRet.EResult.PwdIllegal:
				UIAlert.Show("无效的密码", this.BackToRegister.bind(this));
				break;
		}
	}

	public OnLoginResut(resp: Protos.LS2GC_AskLoginRet): void {
		this.closeModalWait();
		switch (resp.result) {
			case Protos.LS2GC_AskLoginRet.EResult.Success:
				this.HandleLoginLSSuccess(resp);
				break;
			case Protos.LS2GC_AskLoginRet.EResult.Failed:
				UIAlert.Show("登陆失败", this.BackToLogin.bind(this));
				break;
			case Protos.LS2GC_AskLoginRet.EResult.InvalidUname:
				UIAlert.Show("请输入正确的用户名", this.BackToLogin.bind(this));
				break;
			case Protos.LS2GC_AskLoginRet.EResult.InvalidPwd:
				UIAlert.Show("请输入正确的密码", this.BackToLogin.bind(this));
				break;
		}
	}

	public OnConnectToLSError(confirmCallback: () => void): void {
		UIAlert.Show("无法连接服务器", confirmCallback);
	}

	private HandleLoginLSSuccess(loginResult: Protos.LS2GC_AskLoginRet): void {
		this._areaList.removeChildrenToPool();
		let count = loginResult.gsInfos.length;
		for (let i = 0; i < count; ++i) {
			let gsInfo = loginResult.gsInfos[i];
			let item = this._areaList.addItemFromPool().asButton;
			item.title = gsInfo.name;
			item.data = { "data": gsInfo, "sid": loginResult.sessionID };
		}
		if (count > 0)
			this._areaList.selectedIndex = 0;
		this.contentPane.getController("c1").selectedIndex = 2;
	}

	public OnConnectToGSError(): void {
		this.closeModalWait();
		UIAlert.Show("无法连接服务器", this.BackToLogin.bind(this));
	}

	public OnLoginGSResult(resp: Protos.GS2GC_LoginRet): void {
		this.closeModalWait();
		switch (resp.result) {
			case Protos.GS2GC_LoginRet.EResult.SessionExpire:
				UIAlert.Show("登陆失败或凭证已过期", this.BackToLogin.bind(this));
				break;
		}
	}
}