define(["require", "exports", "../Libs/protos", "./UIAlert", "../Global"], function (require, exports, protos_1, UIAlert_1, Global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UILoading {
        get root() { return this._root; }
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/loading");
            this._root = fairygui.UIPackage.createObject("loading", "Main").asCom;
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._progressBar = this._root.getChild("n0").asProgress;
            this._progressBar.max = 100;
            this._progressBar.value = 10;
        }
        Dispose() {
            this._root.dispose();
        }
        Enter(param) {
            Global_1.Global.graphic.uiRoot.addChild(this._root);
        }
        Exit() {
            Global_1.Global.graphic.uiRoot.removeChild(this._root);
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
        OnLoadProgress(p) {
            this._progressBar.value = 10 + p * 90;
        }
    }
    exports.UILoading = UILoading;
});
//# sourceMappingURL=UILoading.js.map