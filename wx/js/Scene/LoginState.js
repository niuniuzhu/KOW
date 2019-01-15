import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { CDefs } from "../Model/CDefs";
import { Defs } from "../Model/Defs";
import { ProtoCreator } from "../Net/ProtoHelper";
import { WSConnector } from "../Net/WSConnector";
import { JsonHelper } from "../RC/Utils/JsonHelper";
import { Logger } from "../RC/Utils/Logger";
import { StringUtils } from "../RC/Utils/TextUtils";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";
export class LoginState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.login;
    }
    OnEnter(param) {
        if (Laya.Browser.onMiniGame) {
            this.HandleWXLogin();
            return;
        }
        super.OnEnter(param);
    }
    HandleWXLogin() {
        const sysInfo = wx.getSystemInfoSync();
        Logger.Log("brand:" + sysInfo.brand);
        Logger.Log("model:" + sysInfo.model);
        Logger.Log("system:" + sysInfo.system);
        Logger.Log("platform:" + sysInfo.platform);
        Logger.Log("version:" + sysInfo.version);
        Logger.Log("sdk:" + sysInfo.SDKVersion);
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
    }
    SendWxLoginToLS(code) {
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
                const resp = message;
                Logger.Log("gcNID:" + resp.sessionID);
                let count = resp.gsInfos.length;
                let min = Number.MAX_VALUE;
                let fitting = null;
                for (let i = 0; i < count; ++i) {
                    let gsInfo = resp.gsInfos[i];
                    const state = gsInfo.state;
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
        };
        this.ConnectToLS(connector);
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
    Register(uname) {
        const register = ProtoCreator.Q_GC2LS_AskRegister();
        register.name = uname;
        const connector = new WSConnector();
        connector.onerror = (e) => this._ui.OnConnectToLSError(e, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
        connector.onclose = () => Logger.Log("connection closed.");
        connector.onopen = (e) => {
            connector.Send(Protos.GC2LS_AskRegister, register, message => {
                const resp = message;
                this._ui.OnRegisterResult(resp, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
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
        connector.onerror = (e) => this._ui.OnConnectToLSError(e, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
        connector.onclose = () => Logger.Log("connection closed.");
        connector.onopen = (e) => {
            connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
                const resp = message;
                Logger.Log("gcNID:" + resp.sessionID);
                this._ui.OnLoginResut(resp, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
            });
        };
        this.ConnectToLS(connector);
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
                this._ui.OnLoginGSResult(resp, () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
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
