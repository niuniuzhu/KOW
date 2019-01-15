define(["require", "exports", "../Global", "../Libs/protos", "../Model/CDefs", "../Model/Defs", "../Net/ProtoHelper", "../Net/WSConnector", "../RC/Utils/JsonHelper", "../RC/Utils/Logger", "../RC/Utils/TextUtils", "./SceneManager", "./SceneState"], function (require, exports, Global_1, protos_1, CDefs_1, Defs_1, ProtoHelper_1, WSConnector_1, JsonHelper_1, Logger_1, TextUtils_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoginState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.login;
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
            Logger_1.Logger.Log("brand:" + sysInfo.brand);
            Logger_1.Logger.Log("model:" + sysInfo.model);
            Logger_1.Logger.Log("system:" + sysInfo.system);
            Logger_1.Logger.Log("platform:" + sysInfo.platform);
            Logger_1.Logger.Log("version:" + sysInfo.version);
            Logger_1.Logger.Log("sdk:" + sysInfo.SDKVersion);
            wx.login({
                "success": res => {
                    this.SendWxLoginToLS(res.code);
                },
                "fail": () => {
                    this._ui.WxLoginFail(() => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
                },
                "complete": () => {
                }
            });
        }
        SendWxLoginToLS(code) {
            const login = ProtoHelper_1.ProtoCreator.Q_GC2LS_AskWXLogin();
            login.code = code;
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
            connector.onerror = (e) => this._ui.OnConnectToLSError(e, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
            connector.onclose = () => Logger_1.Logger.Log("connection closed.");
            connector.onopen = (e) => {
                connector.Send(protos_1.Protos.GC2LS_AskWXLogin, login, message => {
                    const resp = message;
                    Logger_1.Logger.Log("gcNID:" + resp.sessionID);
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
                        this._ui.GSNotFound(() => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
                    }
                    else {
                        this.LoginGS(fitting.ip, fitting.port, fitting.password, resp.sessionID);
                    }
                });
            };
            this.ConnectToLS(connector);
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
        Register(uname) {
            const register = ProtoHelper_1.ProtoCreator.Q_GC2LS_AskRegister();
            register.name = uname;
            const connector = new WSConnector_1.WSConnector();
            connector.onerror = (e) => this._ui.OnConnectToLSError(e, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
            connector.onclose = () => Logger_1.Logger.Log("connection closed.");
            connector.onopen = (e) => {
                connector.Send(protos_1.Protos.GC2LS_AskRegister, register, message => {
                    const resp = message;
                    this._ui.OnRegisterResult(resp, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
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
            connector.onerror = (e) => this._ui.OnConnectToLSError(e, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
            connector.onclose = () => Logger_1.Logger.Log("connection closed.");
            connector.onopen = (e) => {
                connector.Send(protos_1.Protos.GC2LS_AskSmartLogin, login, message => {
                    const resp = message;
                    Logger_1.Logger.Log("gcNID:" + resp.sessionID);
                    this._ui.OnLoginResut(resp, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
                });
            };
            this.ConnectToLS(connector);
        }
        LoginGS(ip, port, pwd, gcNID) {
            const connector = Global_1.Global.connector.gsConnector;
            connector.onopen = (e) => {
                Logger_1.Logger.Log("GS Connected");
                const askLogin = ProtoHelper_1.ProtoCreator.Q_GC2GS_AskLogin();
                askLogin.pwd = pwd;
                askLogin.sessionID = gcNID;
                connector.Send(protos_1.Protos.GC2GS_AskLogin, askLogin, message => {
                    const resp = message;
                    this._ui.OnLoginGSResult(resp, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true));
                    switch (resp.result) {
                        case protos_1.Protos.GS2GC_LoginRet.EResult.Success:
                            const json = JsonHelper_1.JsonHelper.Parse(TextUtils_1.StringUtils.DecodeUTF8(resp.defs));
                            Defs_1.Defs.Init(json);
                            if (resp.gcState == protos_1.Protos.GS2GC_LoginRet.EGCCState.Battle) {
                                Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Loading);
                                Global_1.Global.sceneManager.loading.ConnectToBS(resp.gcNID, resp.bsIP, resp.bsPort);
                            }
                            else {
                                Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
                            }
                            break;
                    }
                });
            };
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