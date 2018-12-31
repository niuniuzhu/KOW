import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { CDefs } from "../Model/CDefs";
import { Defs } from "../Model/Defs";
import { ProtoCreator } from "../Net/ProtoHelper";
import { WSConnector } from "../Net/WSConnector";
import { JsonHelper } from "../RC/Utils/JsonHelper";
import { Logger } from "../RC/Utils/Logger";
import { StringUtils } from "../RC/Utils/TextUtils";
import { UILogin } from "../UI/UILogin";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";

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
		this.__ui = this._ui = Global.uiManager.login;
	}

	private ConnectToLS(connector: WSConnector): void {
		const config = CDefs.GetConfig();
		if (Global.platform == Global.Platform.Editor) {
			connector.Connect("localhost", config["ls_port"]);
		}
		else {
			connector.Connect(config["ls_ip"], config["ls_port"]);
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
		connector.onopen = (e) => {
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
		connector.onopen = (e) => {
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
		const connector = Global.connector.gsConnector;
		connector.onerror = (e) => this._ui.OnConnectToGSError(e);
		connector.onopen = (e) => {
			Logger.Log("GS Connected");
			const askLogin = ProtoCreator.Q_GC2GS_AskLogin();
			askLogin.pwd = pwd;
			askLogin.sessionID = gcNID;
			connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				const resp: Protos.GS2GC_LoginRet = <Protos.GS2GC_LoginRet>message;
				this._ui.OnLoginGSResult(resp);
				switch (resp.result) {
					case Protos.GS2GC_LoginRet.EResult.Success:
						//处理定义文件
						const json = JsonHelper.Parse(StringUtils.DecodeUTF8(resp.defs));
						Defs.Init(json);
						if (resp.gcState == Protos.GS2GC_LoginRet.EGCCState.Battle) {
							//玩家处于战场,重新连接到BS
							Global.sceneManager.ChangeState(SceneManager.State.Loading);
							Global.sceneManager.loading.ConnectToBS(resp.gcNID, resp.bsIP, resp.bsPort);
						}
						else {
							//进去主界面
							Global.sceneManager.ChangeState(SceneManager.State.Main);
						}
						break;
				}
			});
		}
		if (Global.platform == Global.Platform.Editor) {
			connector.Connect("localhost", port);
		}
		else {
			connector.Connect(ip, port);
		}
	}
}