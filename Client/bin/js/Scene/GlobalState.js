define(["require", "exports", "../Global", "../Libs/protos", "../Net/Connector", "../RC/Utils/Logger", "../UI/UIAlert", "./SceneManager", "./SceneState"], function (require, exports, Global_1, protos_1, Connector_1, Logger_1, UIAlert_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GlobalState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            Global_1.Global.connector.gsConnector.onclose = this.OnGSLost.bind(this);
            Global_1.Global.connector.gsConnector.onerror = this.OnGSLost.bind(this);
            Global_1.Global.connector.bsConnector.onclose = this.OnBSLost.bind(this);
            Global_1.Global.connector.bsConnector.onerror = this.OnBSLost.bind(this);
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eGS2GC_Kick, this.HandleKick.bind(this));
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eGS2GC_CSLost, this.HandleCSLost.bind(this));
        }
        OnGSLost(e) {
            if (fairygui.GRoot.inst.modalWaiting) {
                fairygui.GRoot.inst.closeModalWait();
            }
            if (Global_1.Global.connector.bsConnector.connected) {
                Global_1.Global.connector.bsConnector.Close();
            }
            if (e instanceof CloseEvent) {
                Logger_1.Logger.Log(`gs lost,code:${e.code},reason:${e.reason}`);
            }
            else {
                Logger_1.Logger.Log(`gs error`);
            }
            UIAlert_1.UIAlert.Show("与服务器断开连接", this.BackToLogin.bind(this));
        }
        OnBSLost(e) {
            if (Global_1.Global.battleManager.destroied) {
                return;
            }
            if (e instanceof CloseEvent) {
                Logger_1.Logger.Log(`bs lost,code:${e.code},reason:${e.reason}`);
            }
            else {
                Logger_1.Logger.Log(`bs error`);
            }
            if (Global_1.Global.connector.gsConnector.connected) {
                Global_1.Global.connector.gsConnector.Close();
            }
        }
        HandleKick(message) {
            Logger_1.Logger.Warn("kick by gs");
            let kick = message;
            switch (kick.reason) {
                case protos_1.Protos.CS2GS_KickGC.EReason.DuplicateLogin:
                    UIAlert_1.UIAlert.Show("另一台设备正在登陆相同的账号", this.BackToLogin.bind(this));
                    break;
                case protos_1.Protos.CS2GS_KickGC.EReason.OutOfSync:
                    UIAlert_1.UIAlert.Show("数据不同步", this.BackToLogin.bind(this));
                    break;
                default:
                    UIAlert_1.UIAlert.Show("已被服务器强制下线", this.BackToLogin.bind(this));
                    break;
            }
        }
        BackToLogin() {
            Global_1.Global.battleManager.Destroy();
            Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login);
        }
        HandleCSLost(message) {
        }
    }
    exports.GlobalState = GlobalState;
});
//# sourceMappingURL=GlobalState.js.map