import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import { WSConnector } from "../Net/WSConnector";
import { UIManager } from "../UI/UIManager";
import { UILogin } from "../UI/UILogin";
import { SceneState } from "./SceneState";
import { SceneManager } from "./SceneManager";
import { Defs } from "../Defs";
import { Logger } from "../RC/Utils/Logger";
import { Env } from "../Env";

export class LoginState extends SceneState {
	private readonly _ui: UILogin;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.login;
	}

	private ConnectToLS(connector: WSConnector): void {
		if (Env.platform == Env.Platform.Editor) {
			connector.Connect("localhost", Defs.config["ls_port"]);
		}
		else {
			connector.Connect(Defs.config["ls_ip"], Defs.config["ls_port"]);
		}
	}

	public RequestRegister(uname: string, platform: number, sdk: number): void {
		let register = ProtoCreator.Q_GC2LS_AskRegister();
		register.name = uname;
		register.platform = platform;
		register.sdk = sdk;

		let connector = new WSConnector();
		connector.onerror = (e) => this._ui.OnConnectToLSError(e);
		connector.onclose = () => Logger.Log("connection closed.");
		connector.onopen = () => {
			connector.Send(Protos.GC2LS_AskRegister, register, message => {
				let resp: Protos.LS2GC_AskRegRet = <Protos.LS2GC_AskRegRet>message;
				this._ui.OnRegisterResult(resp);
			});
		}
		this.ConnectToLS(connector);
	}

	public RequestLogin(uname: string, platform: number, sdk: number): void {
		let login = ProtoCreator.Q_GC2LS_AskSmartLogin();
		login.name = uname;
		login.platform = platform;
		login.sdk = sdk;

		let connector = new WSConnector();
		connector.onerror = (e) => this._ui.OnConnectToLSError(e);
		connector.onclose = () => Logger.Log("connection closed.");
		connector.onopen = () => {
			connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
				let resp: Protos.LS2GC_AskLoginRet = <Protos.LS2GC_AskLoginRet>message;
				Logger.Log("gcNID:" + resp.sessionID);
				this._ui.OnLoginResut(resp);
			});
		};
		this.ConnectToLS(connector);
	}

	public RequestLoginGS(ip: string, port: number, pwd: string, sessionID: Long): void {
		let connector = Connector.gsConnector;
		connector.onerror = () => this._ui.OnConnectToGSError();
		connector.onopen = () => {
			Logger.Log("GS Connected");
			let askLogin = ProtoCreator.Q_GC2GS_AskLogin();
			askLogin.pwd = pwd;
			askLogin.sessionID = sessionID;
			connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				let resp: Protos.GS2GC_LoginRet = <Protos.GS2GC_LoginRet>message;
				this._ui.OnLoginGSResult(resp);
				switch (resp.result) {
					case Protos.GS2GC_LoginRet.EResult.Success:
						if (resp.gcState == Protos.GS2GC_LoginRet.EGCCState.Battle) {
							this.ReconnectToBS(resp);
						}
						else {
							SceneManager.ChangeState(SceneManager.State.Main);
						}
						break;
				}
			});
		}
		if (Env.platform == Env.Platform.Editor) {
			connector.Connect("localhost", port);
		}
		else {
			connector.Connect(ip, port);
		}
	}

	private ReconnectToBS(ret: Protos.GS2GC_LoginRet): void {
		let connector = Connector.bsConnector;
		connector.onerror = (e) => this._ui.OnConnectToBSError(e);
		connector.onopen = () => {
			Logger.Log("BS Connected");
			let askLogin = ProtoCreator.Q_GC2BS_AskLogin();
			askLogin.sessionID = ret.gcNID;
			//请求登陆BS
			connector.Send(Protos.GC2BS_AskLogin, askLogin, message => {
				let resp: Protos.BS2GC_LoginRet = <Protos.BS2GC_LoginRet>message;
				this._ui.OnLoginBSResut(resp.result);
				switch (resp.result) {
					case Protos.Global.ECommon.Success:
						//登陆BS成功,切换到战场状态
						SceneManager.ChangeState(SceneManager.State.Battle, resp);
						break;
				}
			});
		}
		//todo 这里最好用kcp连接
		if (Env.platform == Env.Platform.Editor) {
			connector.Connect("localhost", ret.bsPort);
		}
		else {
			connector.Connect(ret.bsIP, ret.bsPort);
		}
	}
}