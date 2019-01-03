define(["require", "exports", "../Global", "../Libs/protos", "../Scene/SceneManager", "./UIAlert"], function (require, exports, Global_1, protos_1, SceneManager_1, UIAlert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMatching {
        get root() { return this._root; }
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/matching");
            this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
        }
        Dispose() {
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
        OnBeginMatchResult(result) {
            let error = "";
            switch (result) {
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Success:
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.IllegalID:
                    error = "无效网络ID";
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.NoRoom:
                    error = "匹配失败";
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
                    error = "玩家已在战场中";
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.UserInRoom:
                    error = "玩家已在匹配中";
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Failed:
                    error = "匹配失败";
                    break;
            }
            if (error != "") {
                UIAlert_1.UIAlert.Show(error, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
            }
        }
        OnEnterBattleResult(result, onConfirm) {
            switch (result) {
                case protos_1.Protos.CS2GC_EnterBattle.Result.Success:
                    break;
                case protos_1.Protos.CS2GC_EnterBattle.Result.BSLost:
                case protos_1.Protos.CS2GC_EnterBattle.Result.BSNotFound:
                case protos_1.Protos.CS2GC_EnterBattle.Result.BattleCreateFailed:
                    UIAlert_1.UIAlert.Show("登录战场失败", onConfirm);
                    break;
            }
        }
        UpdateRoomInfo(roomInfo) {
        }
        OnPlayerJoin(player) {
        }
        OnPlayerLeave(player) {
        }
    }
    exports.UIMatching = UIMatching;
});
//# sourceMappingURL=UIMatching.js.map