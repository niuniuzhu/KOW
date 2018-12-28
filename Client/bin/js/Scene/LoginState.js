define(["require", "exports", "../Global", "../Libs/protos", "../Model/CDefs", "../Model/Defs", "../Net/ProtoHelper", "../Net/WSConnector", "../RC/Utils/Logger", "../RC/Utils/TextUtils", "./SceneManager", "./SceneState", "../RC/Utils/JsonHelper"], function (require, exports, Global_1, protos_1, CDefs_1, Defs_1, ProtoHelper_1, WSConnector_1, Logger_1, TextUtils_1, SceneManager_1, SceneState_1, JsonHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoginState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.login;
        }
        ConnectToLS(connector) {
            const config = CDefs_1.CDefs.GetConfig();
            if (Global_1.Global.platform == Global_1.Global.Platform.Editor) {
                connector.Connect("localhost", config["ls_port"]);
            }
            else {
                connector.Connect(config["ls_ip"], config["ls_port"]);
            }
        }
        Register(uname, platform, sdk) {
            const register = ProtoHelper_1.ProtoCreator.Q_GC2LS_AskRegister();
            register.name = uname;
            register.platform = platform;
            register.sdk = sdk;
            const connector = new WSConnector_1.WSConnector();
            connector.onerror = (e) => this._ui.OnConnectToLSError(e);
            connector.onclose = () => Logger_1.Logger.Log("connection closed.");
            connector.onopen = (e) => {
                connector.Send(protos_1.Protos.GC2LS_AskRegister, register, message => {
                    const resp = message;
                    this._ui.OnRegisterResult(resp);
                });
            };
            this.ConnectToLS(connector);
        }
        Login(uname, platform, sdk) {
            const login = ProtoHelper_1.ProtoCreator.Q_GC2LS_AskSmartLogin();
            login.name = uname;
            login.platform = platform;
            login.sdk = sdk;
            const connector = new WSConnector_1.WSConnector();
            connector.onerror = (e) => this._ui.OnConnectToLSError(e);
            connector.onclose = () => Logger_1.Logger.Log("connection closed.");
            connector.onopen = (e) => {
                connector.Send(protos_1.Protos.GC2LS_AskSmartLogin, login, message => {
                    const resp = message;
                    Logger_1.Logger.Log("gcNID:" + resp.sessionID);
                    this._ui.OnLoginResut(resp);
                });
            };
            this.ConnectToLS(connector);
        }
        LoginGS(ip, port, pwd, gcNID) {
            const connector = Global_1.Global.connector.gsConnector;
            connector.onerror = (e) => this._ui.OnConnectToGSError(e);
            connector.onopen = (e) => {
                Logger_1.Logger.Log("GS Connected");
                const askLogin = ProtoHelper_1.ProtoCreator.Q_GC2GS_AskLogin();
                askLogin.pwd = pwd;
                askLogin.sessionID = gcNID;
                connector.Send(protos_1.Protos.GC2GS_AskLogin, askLogin, message => {
                    const resp = message;
                    this._ui.OnLoginGSResult(resp);
                    switch (resp.result) {
                        case protos_1.Protos.GS2GC_LoginRet.EResult.Success:
                            const json = JsonHelper_1.JsonHelper.Parse(TextUtils_1.TextUtils.DecodeUTF8(resp.defs));
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
            if (Global_1.Global.platform == Global_1.Global.Platform.Editor) {
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