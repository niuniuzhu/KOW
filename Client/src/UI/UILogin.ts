import { Protos } from "../libs/protos";
import { WSConnector } from "../Net/WSConnector";
import { Network } from "../Net/Network";
import { ProtoCreator } from "../Net/ProtoHelper";
import { UIAlert } from "./UIAlert";
import { IUIModule } from "./IUIModule";
import { UIManager } from "./UIManager";

export class UILogin extends fairygui.Window implements IUIModule {
	private _areaList: fairygui.GList;

	constructor() {
		super();
		fairygui.UIPackage.addPackage("res/ui/login");
	}

    protected onInit(): void {
        this.contentPane = fairygui.UIPackage.createObject("login","Main").asCom;
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

	public Enter(param: any): void{
		this.show();
		this.center();
	}

	public Leave(): void{
		this.hide();
	}

	public Update(deltaTime: number): void {
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
		let regPwd = this.contentPane.getChild("reg_password").asTextField.text;
		if (regPwd == "") {
			UIAlert.Show("无效的密码");
			return;
		}

		let register = ProtoCreator.Q_GC2LS_AskRegister();
		register.name = regName;
		register.passwd = regPwd;
		register.platform = 0;
		register.sdk = 0;

		let connector = new WSConnector();
		connector.onerror = () => UIAlert.Show("无法连接服务器", () => connector.Connect("localhost", 49996));
		connector.onclose = () => RC.Logger.Log("connection closed.");
		connector.onopen = () => {
			connector.Send(Protos.GC2LS_AskRegister, register, message => {
				this.closeModalWait();
				let resp: Protos.LS2GC_AskRegRet = <Protos.LS2GC_AskRegRet>message;
				switch (resp.result) {
					case Protos.LS2GC_AskRegRet.EResult.Success:
						UIAlert.Show("注册成功");
						this.contentPane.getChild("name").asTextField.text = regName;
						this.contentPane.getChild("password").asTextField.text = regPwd;
						this.contentPane.getController("c1").selectedIndex = 0;
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
				connector.Close();
			});
		}
		this.showModalWait();
		connector.Connect("localhost", 49996);
	}

	private OnLoginBtnClick(): void {
		let uname = this.contentPane.getChild("name").asTextField.text;
		if (uname == "") {
			UIAlert.Show("无效用户名");
			return;
		}
		let password = this.contentPane.getChild("password").asTextField.text;
		if (password == "") {
			UIAlert.Show("无效密码");
			return;
		}

		let login = ProtoCreator.Q_GC2LS_AskLogin();
		login.name = uname;
		login.passwd = password;

		let connector = new WSConnector();
		connector.onerror = () => UIAlert.Show("无法连接服务器", () => connector.Connect("localhost", 49996));
		connector.onclose = () => RC.Logger.Log("connection closed.");
		connector.onopen = () => {
			connector.Send(Protos.GC2LS_AskLogin, login, message => {
				this.closeModalWait();
				let resp: Protos.LS2GC_AskLoginRet = <Protos.LS2GC_AskLoginRet>message;
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
			});
		};
		this.showModalWait();
		connector.Connect("localhost", 49996);
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

	private OnAreaClick(): void {
	}

	private OnEnterBtnClick(): void {
		let item = this._areaList.getChildAt(this._areaList.selectedIndex);
		let data: Protos.GSInfo = <Protos.GSInfo>item.data["data"];
		this.ConnectToGS(data.ip, data.port, data.password, item.data["sid"]);
	}

	private ConnectToGS(ip: string, port: number, pwd: string, sessionID: Long): void {
		let connector = new WSConnector();
		connector.onerror = () => UIAlert.Show("无法连接服务器", this.BackToLogin.bind(this));
		connector.onclose = () => RC.Logger.Log("connection closed.");
		connector.onopen = () => {
			let askLogin = ProtoCreator.Q_GC2GS_AskLogin();
			askLogin.pwd = pwd;
			askLogin.sessionID = sessionID;
			connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				this.closeModalWait();
				let resp: Protos.GS2GC_LoginRet = <Protos.GS2GC_LoginRet>message;
				switch (resp.result) {
					case Protos.GS2GC_LoginRet.EResult.Success:
						this.HandleLoginBSSuccess(connector);
						break;
					case Protos.GS2GC_LoginRet.EResult.Failed:
						UIAlert.Show("登陆失败", this.BackToLogin.bind(this));
						break;
				}
			});
		}
		this.showModalWait();
		connector.Connect(ip, port);
	}

	private HandleLoginBSSuccess(connector: WSConnector): void {
		Network.Init(connector);
		UIManager.EnterCutscene();
	}
}