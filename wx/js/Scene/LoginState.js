import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import { WSConnector } from "../Net/WSConnector";
import { UIManager } from "../UI/UIManager";
import { SceneState } from "./SceneState";
import { SceneManager } from "./SceneManager";
import { Defs } from "../Model/Defs";
import { Logger } from "../RC/Utils/Logger";
export class LoginState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = UIManager.login;
    }
    RequestRegister(uname, platform, sdk) {
        let register = ProtoCreator.Q_GC2LS_AskRegister();
        register.name = uname;
        register.platform = platform;
        register.sdk = sdk;
        let connector = new WSConnector();
        connector.onerror = () => this._ui.OnConnectToLSError(() => connector.Connect(Defs.config["ls_ip"], Defs.config["ls_port"]));
        connector.onclose = () => Logger.Log("connection closed.");
        connector.onopen = () => {
            connector.Send(Protos.GC2LS_AskRegister, register, message => {
                let resp = message;
                this._ui.OnRegisterResult(resp);
            });
        };
        connector.Connect(Defs.config["ls_ip"], Defs.config["ls_port"]);
    }
    RequestLogin(uname, platform, sdk) {
        let login = ProtoCreator.Q_GC2LS_AskSmartLogin();
        login.name = uname;
        login.platform = platform;
        login.sdk = sdk;
        let connector = new WSConnector();
        connector.onerror = () => this._ui.OnConnectToLSError(() => connector.Connect(Defs.config["ls_ip"], Defs.config["ls_port"]));
        connector.onclose = () => Logger.Log("connection closed.");
        connector.onopen = () => {
            connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
                let resp = message;
                this._ui.OnLoginResut(resp);
            });
        };
        connector.Connect(Defs.config["ls_ip"], Defs.config["ls_port"]);
    }
    RequestLoginGS(ip, port, pwd, sessionID) {
        let connector = Connector.gsConnector;
        connector.onerror = () => this._ui.OnConnectToGSError();
        connector.onopen = () => {
            Logger.Log("GS Connected");
            let askLogin = ProtoCreator.Q_GC2GS_AskLogin();
            askLogin.pwd = pwd;
            askLogin.sessionID = sessionID;
            connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
                let resp = message;
                this._ui.OnLoginGSResult(resp);
                switch (resp.result) {
                    case Protos.GS2GC_LoginRet.EResult.Success:
                        if (resp.gcState == Protos.GS2GC_LoginRet.EGCCState.Battle) {
                            Logger.Log("reconnect to battle");
                        }
                        else {
                            SceneManager.ChangeState(SceneManager.State.Main);
                        }
                        break;
                }
            });
        };
        connector.Connect(ip, port);
    }
}
