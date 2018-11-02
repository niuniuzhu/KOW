define(["require", "exports", "../Libs/protos", "./UIAlert", "../Scene/SceneManager"], function (require, exports, protos_1, UIAlert_1, SceneManager_1) {
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
        OnEnterBattleResult(result) {
            switch (result) {
                case protos_1.Protos.CS2GC_EnterBattle.Error.Success:
                    break;
                case protos_1.Protos.CS2GC_EnterBattle.Error.BSLost:
                case protos_1.Protos.CS2GC_EnterBattle.Error.BSNotFound:
                case protos_1.Protos.CS2GC_EnterBattle.Error.BattleCreateFailed:
                    UIAlert_1.UIAlert.Show("登录战场失败", () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    break;
            }
        }
        OnConnectToBSError(e) {
            UIAlert_1.UIAlert.Show("无法连接服务器[" + e.toString() + "]", () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
        }
        OnLoginBSResut(result) {
            switch (result) {
                case protos_1.Protos.Global.ECommon.Success:
                    break;
                default:
                    UIAlert_1.UIAlert.Show("进入战场失败", () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    break;
            }
        }
    }
    exports.UILoading = UILoading;
});
//# sourceMappingURL=UILoading.js.map