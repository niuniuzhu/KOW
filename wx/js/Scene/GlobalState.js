import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { Logger } from "../RC/Utils/Logger";
import { UIAlert } from "../UI/UIAlert";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";
export class GlobalState extends SceneState {
    constructor(type) {
        super(type);
        Global.connector.gsConnector.onclose = this.OnGSDisconnect.bind(this);
        Global.connector.gsConnector.onerror = this.OnGSError.bind(this);
        Global.connector.bsConnector.onclose = this.OnBSDisconnect.bind(this);
        Global.connector.bsConnector.onerror = this.OnBSError.bind(this);
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eGS2GC_Kick, this.HandleKick.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eGS2GC_CSLost, this.HandleCSLost.bind(this));
    }
    OnGSDisconnect(e) {
        Logger.Log("gs connection closed.");
    }
    OnGSError(e) {
        Logger.Log("gs connection error.");
        if (fairygui.GRoot.inst.modalWaiting) {
            fairygui.GRoot.inst.closeModalWait();
        }
        UIAlert.Show("与服务器断开连接[" + e.toString() + "]", this.BackToLogin.bind(this));
    }
    OnBSDisconnect(e) {
        Logger.Log("bs connection closed.");
    }
    OnBSError(e) {
        Logger.Log("bs connection error.");
        if (fairygui.GRoot.inst.modalWaiting) {
            fairygui.GRoot.inst.closeModalWait();
        }
        if (Global.connector.gsConnector.connected) {
            Global.connector.gsConnector.Close();
        }
        UIAlert.Show("与服务器断开连接[" + e.toString() + "]", this.BackToLogin.bind(this));
    }
    HandleKick(message) {
        Logger.Warn("kick by gs");
        let kick = message;
        switch (kick.reason) {
            case Protos.CS2GS_KickGC.EReason.DuplicateLogin:
                UIAlert.Show("另一台设备正在登陆相同的账号", this.BackToLogin.bind(this));
                break;
            case Protos.CS2GS_KickGC.EReason.OutOfSync:
                UIAlert.Show("数据不同步", this.BackToLogin.bind(this));
                break;
            default:
                UIAlert.Show("已被服务器强制下线", this.BackToLogin.bind(this));
                break;
        }
    }
    BackToLogin() {
        if (Global.connector.bsConnector.connected) {
            Global.connector.bsConnector.Close();
        }
        Global.battleManager.Destroy();
        Global.sceneManager.ChangeState(SceneManager.State.Login);
    }
    HandleCSLost(message) {
        Logger.Error("cs lost");
        UIAlert.Show("与服务器断开连接", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
    }
}
