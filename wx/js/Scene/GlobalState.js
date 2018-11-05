import { SceneState } from "./SceneState";
import { Connector } from "../Net/Connector";
import { UIAlert } from "../UI/UIAlert";
import { Protos } from "../Libs/protos";
import { SceneManager } from "./SceneManager";
import { Logger } from "../RC/Utils/Logger";
import { Global } from "../Global";
export class GlobalState extends SceneState {
    constructor(type) {
        super(type);
        Global.connector.gsConnector.onclose = this.HandleGSDisconnect;
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eGS2GC_Kick, this.HandleKick);
    }
    HandleGSDisconnect(e) {
        Logger.Log("gs connection closed.");
        UIAlert.Show("与服务器断开连接", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true), true);
    }
    HandleKick(message) {
        Logger.Log("kick by server");
        let kick = message;
        switch (kick.reason) {
            case Protos.CS2GS_KickGC.EReason.DuplicateLogin:
                UIAlert.Show("另一台设备正在登陆相同的账号", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true), true);
                break;
            default:
                UIAlert.Show("已被服务器强制下线", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true), true);
                break;
        }
    }
}
