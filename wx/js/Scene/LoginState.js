import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { CDefs } from "../Model/CDefs";
import { Defs } from "../Model/Defs";
import { ProtoCreator } from "../Net/ProtoHelper";
import { WSConnector } from "../Net/WSConnector";
import { Logger } from "../RC/Utils/Logger";
import { TextUtils } from "../RC/Utils/TextUtils";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";
export class LoginState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.login;
    }
    ConnectToLS(connector) {
        const config = CDefs.GetConfig();
        if (Global.platform == Global.Platform.Editor) {
            connector.Connect("localhost", config["ls_port"]);
        }
        else {
            connector.Connect(config["ls_ip"], config["ls_port"]);
        }
    }
    Register(uname, platform, sdk) {
        const register = ProtoCreator.Q_GC2LS_AskRegister();
        register.name = uname;
        register.platform = platform;
        register.sdk = sdk;
        const connector = new WSConnector();
        connector.onerror = (e) => this._ui.OnConnectToLSError(e);
        connector.onclose = () => Logger.Log("connection closed.");
        connector.onopen = (e) => {
            connector.Send(Protos.GC2LS_AskRegister, register, message => {
                const resp = message;
                this._ui.OnRegisterResult(resp);
            });
        };
        this.ConnectToLS(connector);
    }
    Login(uname, platform, sdk) {
        const login = ProtoCreator.Q_GC2LS_AskSmartLogin();
        login.name = uname;
        login.platform = platform;
        login.sdk = sdk;
        const connector = new WSConnector();
        connector.onerror = (e) => this._ui.OnConnectToLSError(e);
        connector.onclose = () => Logger.Log("connection closed.");
        connector.onopen = (e) => {
            connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
                const resp = message;
                Logger.Log("gcNID:" + resp.sessionID);
                this._ui.OnLoginResut(resp);
            });
        };
        this.ConnectToLS(connector);
    }
    LoginGS(ip, port, pwd, gcNID) {
        const connector = Global.connector.gsConnector;
        connector.onerror = (e) => this._ui.OnConnectToGSError(e);
        connector.onopen = (e) => {
            Logger.Log("GS Connected");
            const askLogin = ProtoCreator.Q_GC2GS_AskLogin();
            askLogin.pwd = pwd;
            askLogin.sessionID = gcNID;
            connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
                const resp = message;
                this._ui.OnLoginGSResult(resp);
                switch (resp.result) {
                    case Protos.GS2GC_LoginRet.EResult.Success:
                        const json = JSON.parse(TextUtils.DecodeUTF8(resp.defs));
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
        if (Global.platform == Global.Platform.Editor) {
            connector.Connect("localhost", port);
        }
        else {
            connector.Connect(ip, port);
        }
    }
}
