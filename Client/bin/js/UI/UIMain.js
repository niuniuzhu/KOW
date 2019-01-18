define(["require", "exports", "../Global", "../Scene/SceneManager"], function (require, exports, Global_1, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMain {
        get root() { return this._root; }
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/main");
            this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._root.getChild("n3").onClick(this, this.OnAutoMatchBtnClick);
        }
        Dispose() {
            this._root.dispose();
        }
        Enter(param) {
            Global_1.Global.graphic.uiRoot.addChild(this._root);
            this._root.getTransition("t0").play();
            const userInfo = param;
            if (userInfo != null) {
                this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = userInfo.avatar;
                this._root.getChild("nickname").asTextField.text = userInfo.nickname;
            }
        }
        Exit() {
            Global_1.Global.graphic.uiRoot.removeChild(this._root);
        }
        Update(dt) {
        }
        OnResize(e) {
        }
        OnAutoMatchBtnClick() {
            Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Matching);
        }
    }
    exports.UIMain = UIMain;
});
//# sourceMappingURL=UIMain.js.map