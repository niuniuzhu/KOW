import { SceneState } from "./SceneState";
import { Connector } from "../Net/Connector";
import { UIAlert } from "../UI/UIAlert";
import { Debug } from "../Misc/Debug";
import { Protos } from "../libs/protos";
import { SceneManager } from "./SceneManager";
export class GlobalState extends SceneState {
    constructor(type) {
        super(type);
        Connector.gsConnector.onclose = this.HandleGSDisconnect;
        Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eGS2GC_Kick, this.HandleKick);
    }
    HandleGSDisconnect(e) {
        RC.Logger.Log("gs connection closed.");
        UIAlert.Show("与服务器断开连接", () => SceneManager.ChangeState(SceneManager.State.Login, null, true), true);
    }
    HandleKick(message) {
        Debug.Log("kick by server");
        let kick = message;
        switch (kick.reason) {
            case Protos.CS2GS_KickGC.EReason.DuplicateLogin:
                UIAlert.Show("另一台设备正在登陆相同的账号", () => SceneManager.ChangeState(SceneManager.State.Login, null, true), true);
                break;
            default:
                UIAlert.Show("已被服务器强制下线", () => SceneManager.ChangeState(SceneManager.State.Login, null, true), true);
                break;
        }
    }
}
//# sourceMappingURL=GlobalState.js.map