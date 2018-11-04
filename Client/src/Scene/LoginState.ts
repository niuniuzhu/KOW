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

/**
 * 登陆状态
 */
export class LoginState extends SceneState {
	private readonly _ui: UILogin;

	/**
	 * 构造函数
	 */
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

	/**
	 * 注册
	 */
	public Register(uname: string, platform: number, sdk: number): void {
		const register = ProtoCreator.Q_GC2LS_AskRegister();
		register.name = uname;
		register.platform = platform;
		register.sdk = sdk;

		const connector = new WSConnector();
		connector.onerror = (e) => this._ui.OnConnectToLSError(e);
		connector.onclose = () => Logger.Log("connection closed.");
		connector.onopen = () => {
			connector.Send(Protos.GC2LS_AskRegister, register, message => {
				const resp: Protos.LS2GC_AskRegRet = <Protos.LS2GC_AskRegRet>message;
				this._ui.OnRegisterResult(resp);
			});
		}
		this.ConnectToLS(connector);
	}

	/**
	 * 登陆
	 */
	public Login(uname: string, platform: number, sdk: number): void {
		const login = ProtoCreator.Q_GC2LS_AskSmartLogin();
		login.name = uname;
		login.platform = platform;
		login.sdk = sdk;

		const connector = new WSConnector();
		connector.onerror = (e) => this._ui.OnConnectToLSError(e);
		connector.onclose = () => Logger.Log("connection closed.");
		connector.onopen = () => {
			connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
				const resp: Protos.LS2GC_AskLoginRet = <Protos.LS2GC_AskLoginRet>message;
				Logger.Log("gcNID:" + resp.sessionID);
				this._ui.OnLoginResut(resp);
			});
		};
		this.ConnectToLS(connector);
	}

	/**
	 * 请求登陆GS
	 * @param ip GS IP
	 * @param port GS Port
	 * @param pwd 密码
	 * @param gcNID 客户端网络ID
	 */
	public LoginGS(ip: string, port: number, pwd: string, gcNID: Long): void {
		const connector = Connector.gsConnector;
		connector.onerror = (e) => this._ui.OnConnectToGSError(e);
		connector.onopen = () => {
			Logger.Log("GS Connected");
			const askLogin = ProtoCreator.Q_GC2GS_AskLogin();
			askLogin.pwd = pwd;
			askLogin.sessionID = gcNID;
			connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				const resp: Protos.GS2GC_LoginRet = <Protos.GS2GC_LoginRet>message;
				this._ui.OnLoginGSResult(resp);
				switch (resp.result) {
					case Protos.GS2GC_LoginRet.EResult.Success:
						if (resp.gcState == Protos.GS2GC_LoginRet.EGCCState.Battle) {
							//玩家处于战场,重新连接到BS
							SceneManager.ChangeState(SceneManager.State.Loading);
							SceneManager.loading.ConnectToBS(resp.gcNID, resp.bsIP, resp.bsPort);
						}
						else {
							//进去主界面
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
}