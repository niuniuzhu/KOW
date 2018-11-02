define(["require", "exports", "../Libs/protos", "./UIAlert", "../Scene/SceneManager", "../Graphic"], function (require, exports, protos_1, UIAlert_1, SceneManager_1, Graphic_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMatching {
        get root() { return this._root; }
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/matching");
            this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
            this._root.setSize(Graphic_1.Graphic.uiRoot.width, Graphic_1.Graphic.uiRoot.height);
            this._root.addRelation(Graphic_1.Graphic.uiRoot, fairygui.RelationType.Size);
        }
        Dispose() {
        }
        Enter(param) {
            Graphic_1.Graphic.uiRoot.addChild(this._root);
        }
        Exit() {
            Graphic_1.Graphic.uiRoot.removeChild(this._root);
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
                UIAlert_1.UIAlert.Show(error, () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
            }
        }
        UpdateRoomInfo(roomInfo) {
        }
        UpdatePlayers(_players) {
        }
        HandleFullPlayer(completeHandler) {
            completeHandler();
        }
    }
    exports.UIMatching = UIMatching;
});
//# sourceMappingURL=UIMatching.js.map