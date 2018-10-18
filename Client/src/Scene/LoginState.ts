import { Protos } from "../libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import { WSConnector } from "../Net/WSConnector";
import { UIManager } from "../UI/UIManager";
import { UILogin } from "../UI/UILogin";
import { SceneState } from "./SceneState";
import { SceneManager } from "./SceneManager";
import { Defs } from "../Model/Defs";

export class LoginState extends SceneState {
	private readonly _ui: UILogin;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.login;
	}

	public RequestRegister(uname: string, platform: number, sdk: number): void {
		let register = ProtoCreator.Q_GC2LS_AskRegister();
		register.name = uname;
		register.platform = platform;
		register.sdk = sdk;

		let connector = new WSConnector();
		connector.onerror = () => this._ui.OnConnectToLSError(() => connector.Connect(Defs.config["ls_ip"], Defs.config["ls_port"]));
		connector.onclose = () => RC.Logger.Log("connection closed.");
		connector.onopen = () => {
			connector.Send(Protos.GC2LS_AskRegister, register, message => {
				let resp: Protos.LS2GC_AskRegRet = <Protos.LS2GC_AskRegRet>message;
				this._ui.OnRegisterResult(resp);
			});
		}
		connector.Connect(Defs.config["ls_ip"], Defs.config["ls_port"]);
	}

	public RequestLogin(uname: string, platform: number, sdk: number): void {
		let login = ProtoCreator.Q_GC2LS_AskSmartLogin();
		login.name = uname;
		login.platform = platform;
		login.sdk = sdk;

		let connector = new WSConnector();
		connector.onerror = () => this._ui.OnConnectToLSError(() => connector.Connect(Defs.config["ls_ip"], Defs.config["ls_port"]));
		connector.onclose = () => RC.Logger.Log("connection closed.");
		connector.onopen = () => {
			connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
				let resp: Protos.LS2GC_AskLoginRet = <Protos.LS2GC_AskLoginRet>message;
				this._ui.OnLoginResut(resp);
			});
		};
		connector.Connect(Defs.config["ls_ip"], Defs.config["ls_port"]);
	}

	public RequestLoginGS(ip: string, port: number, pwd: string, sessionID: Long): void {
		let connector = Connector.gsConnector;
		connector.onerror = () => this._ui.OnConnectToGSError();
		connector.onopen = () => {
			console.log("GS Connected");
			let askLogin = ProtoCreator.Q_GC2GS_AskLogin();
			askLogin.pwd = pwd;
			askLogin.sessionID = sessionID;
			connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				let resp: Protos.GS2GC_LoginRet = <Protos.GS2GC_LoginRet>message;
				this._ui.OnLoginGSResut(resp);
				switch (resp.result) {
					case Protos.GS2GC_LoginRet.EResult.Success:
						SceneManager.ChangeState(SceneManager.State.Matching);
						break;
				}
			});
		}
		connector.Connect(ip, port);
	}
}