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
export class LoginState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.login;
    }
    OnEnter(param) {
        super.OnEnter(param);
        if (Laya.Browser.onMiniGame) {
            this._ui.mode = UILogin.Mode.WXLogin;
            this.WxAuthorize(this.WXLogin.bind(this));
        }
        else {
            this._ui.mode = UILogin.Mode.WebLogin;
        }
    }
    WxAuthorize(callback) {
        this._sysInfo = wx.getSystemInfoSync();
        Logger.Log("brand:" + this._sysInfo.brand);
        Logger.Log("model:" + this._sysInfo.model);
        Logger.Log("pixelRatio:" + this._sysInfo.pixelRatio);
        Logger.Log("system:" + this._sysInfo.system);
        Logger.Log("platform:" + this._sysInfo.platform);
        Logger.Log("version:" + this._sysInfo.version);
        Logger.Log("sdk:" + this._sysInfo.SDKVersion);
        wx.getSetting({
            "success": resp => {
                if (resp.authSetting["scope.userInfo"]) {
                    wx.getUserInfo({
                        "withCredentials": true,
                        "lang": "zh_CN",
                        "success": resp2 => {
                            callback(resp2.userInfo);
                        },
                        "complete": () => { },
                        "fail": () => { }
                    });
                }
                else {
                    this.CreateAuthorizeButton(callback);
                }
            },
            "fail": () => {
            },
            "complete": () => {
            }
        });
    }
    CreateAuthorizeButton(callback) {
        const s = this._sysInfo.screenWidth / Laya.stage.designWidth;
        const w = s * 187;
        const h = s * 65;
        const userInfoObj = {
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
        };
        const btn = wx.createUserInfoButton(userInfoObj);
        btn.onTap(resp => {
            if (resp.userInfo != null) {
                btn.destroy();
                callback(resp.userInfo);
            }
            else {
                this._ui.OnFail("授权失败[" + resp.errMsg + "]");
            }
        });
    }
    WXLogin(userInfo) {
        const loginObj = {
            "success": resp => {
                this.SendWxLoginToLS(resp.code, userInfo);
            },
            "fail": () => {
                this._ui.OnFail("登陆微信失败", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
            }
        };
        wx.login(loginObj);
    }
    SendWxLoginToLS(code, userInfo) {
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
                const resp = message;
                Logger.Log("gcNID:" + resp.sessionID);
                const fitting = this.SelectFittingBS(resp.gsInfos);
                if (fitting == null) {
                    this._ui.OnFail("无法连接服务器", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
                }
                else {
                    this.LoginGS(fitting.ip, fitting.port, fitting.password, resp.sessionID);
                }
            });
        };
        this.ConnectToLS(connector);
    }
    Login(uname) {
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
        connector.onerror = (e) => this._ui.OnFail("无法连接服务器[" + e.toString() + "]", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
        connector.onclose = () => Logger.Log("connection closed.");
        connector.onopen = (e) => {
            connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
                this._ui.ModalWait(false);
                const resp = message;
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
    SelectFittingBS(gsInfos) {
        let count = gsInfos.length;
        let min = Number.MAX_VALUE;
        let fitting = null;
        for (let i = 0; i < count; ++i) {
            let gsInfo = gsInfos[i];
            const state = gsInfo.state;
            if (state < min) {
                min = state;
                fitting = gsInfo;
            }
        }
        return fitting;
    }
    ConnectToLS(connector) {
        const config = CDefs.GetConfig();
        if (Global.local) {
            connector.Connect("localhost", config["ls_port"]);
        }
        else {
            connector.Connect(config["ls_ip"], config["ls_port"]);
        }
    }
    LoginGS(ip, port, pwd, gcNID) {
        const connector = Global.connector.gsConnector;
        connector.onopen = (e) => {
            Logger.Log("GS Connected");
            const askLogin = ProtoCreator.Q_GC2GS_AskLogin();
            askLogin.pwd = pwd;
            askLogin.sessionID = gcNID;
            connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
                const resp = message;
                switch (resp.result) {
                    case Protos.GS2GC_LoginRet.EResult.Success:
                        const json = JsonHelper.Parse(StringUtils.DecodeUTF8(resp.defs));
                        Defs.Init(json);
                        if (resp.gcState == Protos.GS2GC_LoginRet.EGCCState.Battle) {
                            Global.sceneManager.ChangeState(SceneManager.State.Loading);
                            Global.sceneManager.loading.ConnectToBS(resp.gcNID, resp.bsIP, resp.bsPort);
                        }
                        else {
                            Global.sceneManager.ChangeState(SceneManager.State.Main);
                        }
                        break;
                    case Protos.GS2GC_LoginRet.EResult.SessionExpire:
                        this._ui.OnFail("登陆失败或凭证已过期", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
                        break;
                }
            });
        };
        if (Global.local) {
            connector.Connect("localhost", port);
        }
        else {
            connector.Connect(ip, port);
        }
    }
}
