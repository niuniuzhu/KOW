define(["require", "exports", "../Libs/protos", "./UIAlert"], function (require, exports, protos_1, UIAlert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UILoading {
        get root() { return this._root; }
        constructor() {
        }
        Dispose() {
            this._root.dispose();
        }
        Enter(param) {
        }
        Exit() {
        }
        Update(dt) {
        }
        OnResize(e) {
        }
        OnEnterBattleResult(result, onConfirm) {
            switch (result) {
                case protos_1.Protos.CS2GC_EnterBattle.Error.Success:
                    break;
                case protos_1.Protos.CS2GC_EnterBattle.Error.BSLost:
                case protos_1.Protos.CS2GC_EnterBattle.Error.BSNotFound:
                case protos_1.Protos.CS2GC_EnterBattle.Error.BattleCreateFailed:
                    UIAlert_1.UIAlert.Show("登录战场失败", onConfirm);
                    break;
            }
        }
        OnConnectToBSError(e, onConfirm) {
            UIAlert_1.UIAlert.Show("无法连接服务器[" + e.toString() + "]", onConfirm);
        }
        OnLoginBSResut(result, onConfirm) {
            switch (result) {
                case protos_1.Protos.Global.ECommon.Success:
                    break;
                default:
                    UIAlert_1.UIAlert.Show("进入战场失败", onConfirm);
                    break;
            }
        }
    }
    exports.UILoading = UILoading;
});
//# sourceMappingURL=UILoading.js.map