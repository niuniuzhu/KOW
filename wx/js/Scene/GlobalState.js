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
        Global.connector.gsConnector.onclose = this.OnGSLost.bind(this);
        Global.connector.gsConnector.onerror = this.OnGSLost.bind(this);
        Global.connector.bsConnector.onclose = this.OnBSLost.bind(this);
        Global.connector.bsConnector.onerror = this.OnBSLost.bind(this);
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eGS2GC_Kick, this.HandleKick.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eGS2GC_CSLost, this.HandleCSLost.bind(this));
    }
    OnGSLost(e) {
        if (fairygui.GRoot.inst.modalWaiting) {
            fairygui.GRoot.inst.closeModalWait();
        }
        if (Global.connector.bsConnector.connected) {
            Global.connector.bsConnector.Close();
        }
        if (e instanceof CloseEvent) {
            Logger.Log(`gs lost,code:${e.code},reason:${e.reason}`);
        }
        else {
            Logger.Log(`gs error`);
        }
        UIAlert.Show("与服务器断开连接", this.BackToLogin.bind(this));
    }
    OnBSLost(e) {
        if (Global.battleManager.destroied) {
            return;
        }
        if (e instanceof CloseEvent) {
            Logger.Log(`bs lost,code:${e.code},reason:${e.reason}`);
        }
        else {
            Logger.Log(`bs error`);
        }
        if (Global.connector.gsConnector.connected) {
            Global.connector.gsConnector.Close();
        }
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
        Global.battleManager.Destroy();
        Global.sceneManager.ChangeState(SceneManager.State.Login);
    }
    HandleCSLost(message) {
    }
}
