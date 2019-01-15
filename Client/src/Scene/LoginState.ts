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

	protected OnEnter(param: any): void {
		if (Laya.Browser.onMiniGame) {
			this.HandleWXLogin();
			return;
		}
		super.OnEnter(param);
	}

	private HandleWXLogin(): void {
		const sysInfo = wx.getSystemInfoSync();
		Logger.Log("brand:" + sysInfo.brand);
		Logger.Log("model:" + sysInfo.model);
		Logger.Log("system:" + sysInfo.system);
		Logger.Log("platform:" + sysInfo.platform);
		Logger.Log("version:" + sysInfo.version);
		Logger.Log("sdk:" + sysInfo.SDKVersion);

		//微信登陆 see https://developers.weixin.qq.com/minigame/dev/api/wx.login.html
		wx.login({
			"success": res => {
				this.SendWxLoginToLS(res.code);
			},
			"fail": () => {
				this._ui.WxLoginFail(() => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
			},
			"complete": () => {
			}
		});

		// wx.getUserInfo({
		// 	"withCredentials": false,
		// 	"lang": "zh_CN",
		// 	"success": res => {
		// 		Logger.Log(res);
		// 	},
		// 	"fail": () => {
		// 	},
		// 	"complete": () => {
		// 	}
		// });

		// wx.getSetting({
		// 	"success": res => {
		// 		Logger.Log(res);
		// 	},
		// 	"fail": () => {
		// 	},
		// 	"complete": () => {
		// 	}
		// });
	}

	/**
	 * 请求服务端验证微信登陆
	 * @param code 微信登陆返回的凭证
	 */
	private SendWxLoginToLS(code: string): void {
		const login = ProtoCreator.Q_GC2LS_AskWXLogin();
		login.code = code;
		if (Laya.Browser.onIOS) {
			login.platform = Protos.Global.Platform.IOS;
		}
		else if (Laya.Browser.onAndroid) {
			login.platform = Protos.Global.Platform.Android;
		}
		else if (Laya.Browser.onWP) {
			login.platform = Protos.Global.Platform.WP;
		}
		else {
			login.platform = Protos.Global.Platform.PC;
		}

		if (Laya.Browser.onEdge) {
			login.browser = Protos.Global.Browser.Edge;
		}
		else if (Laya.Browser.onFirefox) {
			login.browser = Protos.Global.Browser.Firefox;
		}
		else if (Laya.Browser.onIE) {
			login.browser = Protos.Global.Browser.IE;
		}
		else if (Laya.Browser.onSafari) {
			login.browser = Protos.Global.Browser.Safair;
		}
		else {
			login.browser = Protos.Global.Browser.Chrome;
		}

		const connector = new WSConnector();
		connector.onerror = (e) => this._ui.OnConnectToLSError(e, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
		connector.onclose = () => Logger.Log("connection closed.");
		connector.onopen = (e) => {
			connector.Send(Protos.GC2LS_AskWXLogin, login, message => {
				const resp: Protos.LS2GC_AskLoginRet = <Protos.LS2GC_AskLoginRet>message;
				Logger.Log("gcNID:" + resp.sessionID);
				let count = resp.gsInfos.length;
				let min = Number.MAX_VALUE;
				let fitting: Protos.IGSInfo = null;
				for (let i = 0; i < count; ++i) {
					let gsInfo = resp.gsInfos[i];
					const state = <number>gsInfo.state;
					if (state < min) {
						min = state;
						fitting = gsInfo;
					}
				}
				if (fitting == null) {
					this._ui.GSNotFound(() => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
				}
				else {
					this.LoginGS(fitting.ip, fitting.port, fitting.password, resp.sessionID);
				}
			});
		}
		this.ConnectToLS(connector);
	}

	private ConnectToLS(connector: WSConnector): void {
		const config = CDefs.GetConfig();
		if (Global.local) {
			connector.Connect("localhost", config["ls_port"]);
		} else {
			connector.Connect(config["ls_ip"], config["ls_port"]);
		}
	}

	/**
	 * 注册
	 */
	public Register(uname: string): void {
		const register = ProtoCreator.Q_GC2LS_AskRegister();
		register.name = uname;

		const connector = new WSConnector();
		connector.onerror = (e) => this._ui.OnConnectToLSError(e, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
		connector.onclose = () => Logger.Log("connection closed.");
		connector.onopen = (e) => {
			connector.Send(Protos.GC2LS_AskRegister, register, message => {
				const resp: Protos.LS2GC_AskRegRet = <Protos.LS2GC_AskRegRet>message;
				this._ui.OnRegisterResult(resp, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
			});
		}
		this.ConnectToLS(connector);
	}

	/**
	 * 登陆
	 */
	public Login(uname: string): void {
		const login = ProtoCreator.Q_GC2LS_AskSmartLogin();
		login.name = uname;
		if (Laya.Browser.onIOS) {
			login.platform = Protos.Global.Platform.IOS;
		}
		else if (Laya.Browser.onAndroid) {
			login.platform = Protos.Global.Platform.Android;
		}
		else if (Laya.Browser.onWP) {
			login.platform = Protos.Global.Platform.WP;
		}
		else {
			login.platform = Protos.Global.Platform.PC;
		}

		if (Laya.Browser.onEdge) {
			login.browser = Protos.Global.Browser.Edge;
		}
		else if (Laya.Browser.onFirefox) {
			login.browser = Protos.Global.Browser.Firefox;
		}
		else if (Laya.Browser.onIE) {
			login.browser = Protos.Global.Browser.IE;
		}
		else if (Laya.Browser.onSafari) {
			login.browser = Protos.Global.Browser.Safair;
		}
		else {
			login.browser = Protos.Global.Browser.Chrome;
		}

		if (Laya.Browser.onMiniGame) {
			login.channel = Protos.Global.Channel.WXMini;
		}
		else {
			login.channel = Protos.Global.Channel.Web;
		}

		const connector = new WSConnector();
		connector.onerror = (e) => this._ui.OnConnectToLSError(e, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
		connector.onclose = () => Logger.Log("connection closed.");
		connector.onopen = (e) => {
			connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
				const resp: Protos.LS2GC_AskLoginRet = <Protos.LS2GC_AskLoginRet>message;
				Logger.Log("gcNID:" + resp.sessionID);
				this._ui.OnLoginResut(resp, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
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
		connector.onopen = (e) => {
			Logger.Log("GS Connected");
			const askLogin = ProtoCreator.Q_GC2GS_AskLogin();
			askLogin.pwd = pwd;
			askLogin.sessionID = gcNID;
			connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				const resp: Protos.GS2GC_LoginRet = <Protos.GS2GC_LoginRet>message;
				this._ui.OnLoginGSResult(resp, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
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
		if (Global.local) {
			connector.Connect("localhost", port);
		} else {
			connector.Connect(ip, port);
		}
	}
}