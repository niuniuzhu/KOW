define(["require", "exports", "../Global", "../Libs/protos", "../Model/CDefs", "../Model/Defs", "../Net/ProtoHelper", "../Net/WSConnector", "../RC/Utils/JsonHelper", "../RC/Utils/Logger", "../RC/Utils/TextUtils", "../UI/UILogin", "./SceneManager", "./SceneState"], function (require, exports, Global_1, protos_1, CDefs_1, Defs_1, ProtoHelper_1, WSConnector_1, JsonHelper_1, Logger_1, TextUtils_1, UILogin_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoginState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.login;
        }
        OnEnter(param) {
            super.OnEnter(param);
            if (Laya.Browser.onMiniGame) {
                this._ui.mode = UILogin_1.UILogin.Mode.WXLogin;
                this.WxAuthorize(this.OnWXAuthorizeSuccess.bind(this));
            }
            else {
                this._ui.mode = UILogin_1.UILogin.Mode.WebLogin;
            }
        }
        WxAuthorize(callback) {
            this._sysInfo = wx.getSystemInfoSync();
            Logger_1.Logger.Log("brand:" + this._sysInfo.brand);
            Logger_1.Logger.Log("model:" + this._sysInfo.model);
            Logger_1.Logger.Log("pixelRatio:" + this._sysInfo.pixelRatio);
            Logger_1.Logger.Log("system:" + this._sysInfo.system);
            Logger_1.Logger.Log("platform:" + this._sysInfo.platform);
            Logger_1.Logger.Log("version:" + this._sysInfo.version);
            Logger_1.Logger.Log("sdk:" + this._sysInfo.SDKVersion);
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
            });
        }
        OnWXAuthorizeSuccess(userInfo) {
            const s = "{		\"wxgame\": {			\"score\": 16,				\"update_time\": 1513080573		}	}";
            wx.login({
                "success": resp => {
                    this.SendWxLoginToLS(resp.code, userInfo);
                },
                "fail": () => {
                    this._ui.OnFail("登陆微信失败", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
                }
            });
        }
        SendWxLoginToLS(code, userInfo) {
            const login = ProtoHelper_1.ProtoCreator.Q_GC2LS_AskWXLogin();
            login.code = code;
            login.nickname = userInfo.nickName;
            login.avatar = userInfo.avatarUrl;
            login.gender = userInfo.gender;
            if (Laya.Browser.onIOS) {
                login.platform = protos_1.Protos.Global.Platform.IOS;
            }
            else if (Laya.Browser.onAndroid) {
                login.platform = protos_1.Protos.Global.Platform.Android;
            }
            else if (Laya.Browser.onWP) {
                login.platform = protos_1.Protos.Global.Platform.WP;
            }
            else {
                login.platform = protos_1.Protos.Global.Platform.PC;
            }
            if (Laya.Browser.onEdge) {
                login.browser = protos_1.Protos.Global.Browser.Edge;
            }
            else if (Laya.Browser.onFirefox) {
                login.browser = protos_1.Protos.Global.Browser.Firefox;
            }
            else if (Laya.Browser.onIE) {
                login.browser = protos_1.Protos.Global.Browser.IE;
            }
            else if (Laya.Browser.onSafari) {
                login.browser = protos_1.Protos.Global.Browser.Safair;
            }
            else {
                login.browser = protos_1.Protos.Global.Browser.Chrome;
            }
            const connector = new WSConnector_1.WSConnector();
            connector.onerror = (e) => this._ui.OnFail("无法连接服务器[" + e.toString() + "]", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
            connector.onclose = () => Logger_1.Logger.Log("connection closed.");
            connector.onopen = (e) => {
                connector.Send(protos_1.Protos.GC2LS_AskWXLogin, login, message => {
                    const resp = message;
                    Logger_1.Logger.Log("gcNID:" + resp.sessionID);
                    const fitting = this.SelectFittingBS(resp.gsInfos);
                    if (fitting == null) {
                        this._ui.OnFail("无法连接服务器", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
                    }
                    else {
                        this.LoginGS(fitting.ip, fitting.port, fitting.password, resp.sessionID);
                    }
                });
            };
            this.ConnectToLS(connector);
        }
        Login(uname) {
            const login = ProtoHelper_1.ProtoCreator.Q_GC2LS_AskSmartLogin();
            login.name = uname;
            if (Laya.Browser.onIOS) {
                login.platform = protos_1.Protos.Global.Platform.IOS;
            }
            else if (Laya.Browser.onAndroid) {
                login.platform = protos_1.Protos.Global.Platform.Android;
            }
            else if (Laya.Browser.onWP) {
                login.platform = protos_1.Protos.Global.Platform.WP;
            }
            else {
                login.platform = protos_1.Protos.Global.Platform.PC;
            }
            if (Laya.Browser.onEdge) {
                login.browser = protos_1.Protos.Global.Browser.Edge;
            }
            else if (Laya.Browser.onFirefox) {
                login.browser = protos_1.Protos.Global.Browser.Firefox;
            }
            else if (Laya.Browser.onIE) {
                login.browser = protos_1.Protos.Global.Browser.IE;
            }
            else if (Laya.Browser.onSafari) {
                login.browser = protos_1.Protos.Global.Browser.Safair;
            }
            else {
                login.browser = protos_1.Protos.Global.Browser.Chrome;
            }
            if (Laya.Browser.onMiniGame) {
                login.channel = protos_1.Protos.Global.Channel.WXMini;
            }
            else {
                login.channel = protos_1.Protos.Global.Channel.Web;
            }
            const connector = new WSConnector_1.WSConnector();
            connector.onerror = (e) => this._ui.OnFail("无法连接服务器[" + e.toString() + "]", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
            connector.onclose = () => Logger_1.Logger.Log("connection closed.");
            connector.onopen = (e) => {
                connector.Send(protos_1.Protos.GC2LS_AskSmartLogin, login, message => {
                    this._ui.ModalWait(false);
                    const resp = message;
                    Logger_1.Logger.Log("gcNID:" + resp.sessionID);
                    if (resp.result == protos_1.Protos.LS2GC_AskLoginRet.EResult.Success) {
                        const fitting = this.SelectFittingBS(resp.gsInfos);
                        if (fitting == null) {
                            this._ui.OnFail("无法连接服务器", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
                        }
                        else {
                            this.LoginGS(fitting.ip, fitting.port, fitting.password, resp.sessionID);
                        }
                    }
                    else {
                        this._ui.OnLoginResut(resp, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
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
            const config = CDefs_1.CDefs.GetConfig();
            if (Global_1.Global.local) {
                connector.Connect("localhost", config["ls_port"]);
            }
            else {
                connector.Connect(config["ls_ip"], config["ls_port"]);
            }
        }
        LoginGS(ip, port, pwd, gcNID) {
            const connector = Global_1.Global.connector.gsConnector;
            connector.onopen = (e) => {
                Logger_1.Logger.Log("GS Connected");
                const askLogin = ProtoHelper_1.ProtoCreator.Q_GC2GS_AskLogin();
                askLogin.pwd = pwd;
                askLogin.sessionID = gcNID;
                connector.Send(protos_1.Protos.GC2GS_AskLogin, askLogin, message => {
                    this._ui.ModalWait(false);
                    const resp = message;
                    switch (resp.result) {
                        case protos_1.Protos.GS2GC_LoginRet.EResult.Success:
                            const json = JsonHelper_1.JsonHelper.Parse(TextUtils_1.StringUtils.DecodeUTF8(resp.defs));
                            Defs_1.Defs.Init(json);
                            if (resp.gcState == protos_1.Protos.GS2GC_LoginRet.EGCCState.Battle) {
                                Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Loading);
                                Global_1.Global.sceneManager.loading.ConnectToBS(resp.gcNID, resp.bsIP, resp.bsPort);
                            }
                            else {
                                Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Main, resp.userInfo);
                            }
                            break;
                        case protos_1.Protos.GS2GC_LoginRet.EResult.SessionExpire:
                            this._ui.OnFail("登陆失败或凭证已过期", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
                            break;
                    }
                });
            };
            this._ui.ModalWait(true);
            if (Global_1.Global.local) {
                connector.Connect("localhost", port);
            }
            else {
                connector.Connect(ip, port);
            }
        }
    }
    exports.LoginState = LoginState;
});
//# sourceMappingURL=LoginState.js.map