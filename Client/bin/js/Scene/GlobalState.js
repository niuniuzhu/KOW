define(["require", "exports", "./SceneState", "../Net/Connector", "../UI/UIAlert", "../Libs/protos", "./SceneManager", "../RC/Utils/Logger"], function (require, exports, SceneState_1, Connector_1, UIAlert_1, protos_1, SceneManager_1, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GlobalState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            Connector_1.Connector.gsConnector.onclose = this.HandleGSDisconnect;
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eGS2GC_Kick, this.HandleKick);
        }
        HandleGSDisconnect(e) {
            Logger_1.Logger.Log("gs connection closed.");
            UIAlert_1.UIAlert.Show("与服务器断开连接", () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true), true);
        }
        HandleKick(message) {
            Logger_1.Logger.Log("kick by server");
            let kick = message;
            switch (kick.reason) {
                case protos_1.Protos.CS2GS_KickGC.EReason.DuplicateLogin:
                    UIAlert_1.UIAlert.Show("另一台设备正在登陆相同的账号", () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true), true);
                    break;
                default:
                    UIAlert_1.UIAlert.Show("已被服务器强制下线", () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login, null, true), true);
                    break;
            }
        }
    }
    exports.GlobalState = GlobalState;
});
//# sourceMappingURL=GlobalState.js.map