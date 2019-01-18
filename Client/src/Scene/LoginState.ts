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
	private _sysInfo: _getSystemInfoSyncReturnValue;

	/**
	 * 构造函数
	 */
	constructor(type: number) {
		super(type);
		this.__ui = this._ui = Global.uiManager.login;
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);
		if (Laya.Browser.onMiniGame) {
			this._ui.mode = UILogin.Mode.WXLogin;
			this.WxAuthorize(this.OnWXAuthorizeSuccess.bind(this));
		}
		else {
			this._ui.mode = UILogin.Mode.WebLogin;
		}
	}

	/**
	 * 开始授权
	 * @param callback 授权成功回调函数
	 */
	private WxAuthorize(callback: (userInfo: _userInfo) => void): void {
		//获取系统信息
		this._sysInfo = wx.getSystemInfoSync();
		Logger.Log("brand:" + this._sysInfo.brand);
		Logger.Log("model:" + this._sysInfo.model);
		Logger.Log("pixelRatio:" + this._sysInfo.pixelRatio);
		Logger.Log("system:" + this._sysInfo.system);
		Logger.Log("platform:" + this._sysInfo.platform);
		Logger.Log("version:" + this._sysInfo.version);
		Logger.Log("sdk:" + this._sysInfo.SDKVersion);
		//检查授权情况
		wx.getSetting({
			"success": resp => {
				if (resp.authSetting["scope.userInfo"]) {//已经授权了
					wx.getUserInfo({
						"withCredentials": true,
						"lang": "zh_CN",
						"success": resp2 => {
							callback(resp2.userInfo);
						},
						"complete": () => { },
						"fail": () => { }
					})
				}
				else {
					this.CreateAuthorizeButton(callback);
				}
			},
			"fail": () => {
				this._ui.OnFail("登陆微信失败", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
			},
			"complete": () => {
			}
		});
	}

	/**
	 * 创建授权按钮
	 * @param callback 授权成功回调函数
	 */
	private CreateAuthorizeButton(callback: (userInfo: _userInfo) => void): void {
		const s = this._sysInfo.screenWidth / Laya.stage.designWidth;//fixed height
		const w = s * 187;
		const h = s * 65;

		const userInfoObj: _createUserInfoButtonObject = {
			"type": "image",
			"text": "",
			"image": "res/wx_login.png",
			"style": {
				"left": (this._sysInfo.screenWidth - w) * 0.5,
				"top": (this._sysInfo.screenHeight - h) * 0.5,
				"width": w,
				"height": h
			},
			"withCredentials": true,
			"lang": "zh_CN"
		}
		//创建微信授权按钮
		const btn = wx.createUserInfoButton(userInfoObj);
		btn.onTap(resp => {
			if (resp.userInfo != null) {//授权成功
				btn.destroy();
				callback(resp.userInfo);
			}
		});
	}

	/**
	 * 授权成功回调
	 * @param userInfo 用户信息
	 */
	private OnWXAuthorizeSuccess(userInfo: _userInfo): void {
		//微信登陆 see https://developers.weixin.qq.com/minigame/dev/api/wx.login.html
		const s = "{		\"wxgame\": {			\"score\": 16,				\"update_time\": 1513080573		}	}";
		wx.login({
			"success": resp => {
				//登陆成功
				// wx.setUserCloudStorage({
				// 	"KVDataList": [{ "key": "test", "value": s }],
				// 	"success": resp2 => {
				// 		Logger.Log(resp2);
				// 	}
				// });
				this.SendWxLoginToLS(resp.code, userInfo);
			},
			"fail": () => {
				this._ui.OnFail("登陆微信失败", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
			}
		});
	}

	/**
	 * 请求服务端验证微信登陆
	 * @param code 微信登陆返回的凭证
	 * @param userInfo 授权的微信用户信息
	 */
	private SendWxLoginToLS(code: string, userInfo: _userInfo): void {
		const login = ProtoCreator.Q_GC2LS_AskWXLogin();
		login.code = code;
		login.nickname = userInfo.nickName;
		login.avatar = userInfo.avatarUrl;
		login.gender = userInfo.gender;
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
		connector.onerror = (e) => this._ui.OnFail("无法连接服务器[" + e.toString() + "]", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
		connector.onclose = () => Logger.Log("connection closed.");
		connector.onopen = (e) => {
			connector.Send(Protos.GC2LS_AskWXLogin, login, message => {
				const resp: Protos.LS2GC_AskLoginRet = <Protos.LS2GC_AskLoginRet>message;
				Logger.Log("gcNID:" + resp.sessionID);
				const fitting = this.SelectFittingBS(resp.gsInfos);
				if (fitting == null) {
					this._ui.OnFail("无法连接服务器", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
				}
				else {
					this.LoginGS(fitting.ip, fitting.port, fitting.password, resp.sessionID);
				}
			});
		}
		this.ConnectToLS(connector);
	}

	/**
	 * Web登陆
	 */
	public Login(uname: string): void {
		const login = ProtoCreator.Q_GC2LS_AskSmartLogin();
		login.id = uname;
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
		connector.onerror = (e) => this._ui.OnFail("无法连接服务器[" + e.toString() + "]", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
		connector.onclose = () => Logger.Log("connection closed.");
		connector.onopen = (e) => {
			connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
				this._ui.ModalWait(false);
				const resp: Protos.LS2GC_AskLoginRet = <Protos.LS2GC_AskLoginRet>message;
				Logger.Log("gcNID:" + resp.sessionID);
				if (resp.result == Protos.LS2GC_AskLoginRet.EResult.Success) {
					const fitting = this.SelectFittingBS(resp.gsInfos);
					if (fitting == null) {
						this._ui.OnFail("无法连接服务器", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
					}
					else {
						this.LoginGS(fitting.ip, fitting.port, fitting.password, resp.sessionID);
					}
				}
				else {
					this._ui.OnLoginResut(resp, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
				}
			});
		};
		this._ui.ModalWait(true);
		this.ConnectToLS(connector);
	}

	private SelectFittingBS(gsInfos: Protos.IGSInfo[]): Protos.IGSInfo {
		let count = gsInfos.length;
		let min = Number.MAX_VALUE;
		let fitting: Protos.IGSInfo = null;
		for (let i = 0; i < count; ++i) {
			let gsInfo = gsInfos[i];
			const state = <number>gsInfo.state;
			if (state < min) {
				min = state;
				fitting = gsInfo;
			}
		}
		return fitting;
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
				this._ui.ModalWait(false);
				const resp: Protos.GS2GC_LoginRet = <Protos.GS2GC_LoginRet>message;
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
							Global.sceneManager.ChangeState(SceneManager.State.Main, resp.userInfo);
						}
						break;
					case Protos.GS2GC_LoginRet.EResult.SessionExpire:
						this._ui.OnFail("登陆失败或凭证已过期", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
						break;
				}
			});
		}
		this._ui.ModalWait(true);
		if (Global.local) {
			connector.Connect("localhost", port);
		} else {
			connector.Connect(ip, port);
		}
	}
}