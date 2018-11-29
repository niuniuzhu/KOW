define(["require", "exports", "../Global", "../Libs/protos", "../Net/Connector", "../RC/Utils/Logger", "../UI/UIAlert", "./SceneManager", "./SceneState"], function (require, exports, Global_1, protos_1, Connector_1, Logger_1, UIAlert_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GlobalState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            Global_1.Global.connector.gsConnector.onclose = this.HandleGSDisconnect;
            Global_1.Global.connector.bsConnector.onclose = this.HandleBSDisconnect;
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eGS2GC_Kick, this.HandleKick);
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eGS2GC_CSLost, this.HandleCSLost);
        }
        HandleGSDisconnect(e) {
            Logger_1.Logger.Error("gs connection closed.");
        }
        HandleBSDisconnect(e) {
            Logger_1.Logger.Error("bs connection closed.");
        }
        HandleKick(message) {
            Logger_1.Logger.Warn("kick by gs");
            let kick = message;
            switch (kick.reason) {
                case protos_1.Protos.CS2GS_KickGC.EReason.DuplicateLogin:
                    UIAlert_1.UIAlert.Show("另一台设备正在登陆相同的账号", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    break;
                case protos_1.Protos.CS2GS_KickGC.EReason.OutOfSync:
                    UIAlert_1.UIAlert.Show("数据不同步", () => {
                        Global_1.Global.battleManager.Destroy();
                        Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login);
                    });
                    break;
                default:
                    UIAlert_1.UIAlert.Show("已被服务器强制下线", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    break;
            }
        }
        HandleCSLost(message) {
            Logger_1.Logger.Error("cs lost");
            UIAlert_1.UIAlert.Show("与服务器断开连接", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
        }
    }
    exports.GlobalState = GlobalState;
});
//# sourceMappingURL=GlobalState.js.map