define(["require", "exports", "../Libs/protos", "../Net/Connector", "../Net/ProtoHelper", "../Net/WSConnector", "../UI/UIManager", "./SceneState", "./SceneManager", "../Defs", "../RC/Utils/Logger", "../Env"], function (require, exports, protos_1, Connector_1, ProtoHelper_1, WSConnector_1, UIManager_1, SceneState_1, SceneManager_1, Defs_1, Logger_1, Env_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoginState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = UIManager_1.UIManager.login;
        }
        ConnectToLS(connector) {
            if (Env_1.Env.platform == Env_1.Env.Platform.Editor) {
                connector.Connect("localhost", Defs_1.Defs.config["ls_port"]);
            }
            else {
                connector.Connect(Defs_1.Defs.config["ls_ip"], Defs_1.Defs.config["ls_port"]);
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
            connector.onopen = () => {
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
            connector.onopen = () => {
                connector.Send(protos_1.Protos.GC2LS_AskSmartLogin, login, message => {
                    const resp = message;
                    Logger_1.Logger.Log("gcNID:" + resp.sessionID);
                    this._ui.OnLoginResut(resp);
                });
            };
            this.ConnectToLS(connector);
        }
        LoginGS(ip, port, pwd, gcNID) {
            const connector = Connector_1.Connector.gsConnector;
            connector.onerror = () => this._ui.OnConnectToGSError();
            connector.onopen = () => {
                Logger_1.Logger.Log("GS Connected");
                const askLogin = ProtoHelper_1.ProtoCreator.Q_GC2GS_AskLogin();
                askLogin.pwd = pwd;
                askLogin.sessionID = gcNID;
                connector.Send(protos_1.Protos.GC2GS_AskLogin, askLogin, message => {
                    const resp = message;
                    this._ui.OnLoginGSResult(resp);
                    switch (resp.result) {
                        case protos_1.Protos.GS2GC_LoginRet.EResult.Success:
                            if (resp.gcState == protos_1.Protos.GS2GC_LoginRet.EGCCState.Battle) {
                                SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Loading);
                                SceneManager_1.SceneManager.loading.ConnectToBS(resp.gcNID, resp.bsIP, resp.bsPort);
                            }
                            else {
                                SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Main);
                            }
                            break;
                    }
                });
            };
            if (Env_1.Env.platform == Env_1.Env.Platform.Editor) {
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