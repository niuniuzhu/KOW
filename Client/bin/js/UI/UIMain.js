define(["require", "exports", "../Scene/SceneManager", "../Graphic"], function (require, exports, SceneManager_1, Graphic_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMain {
        get root() { return this._root; }
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/main");
            this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
            this._root.setSize(Graphic_1.Graphic.uiRoot.width, Graphic_1.Graphic.uiRoot.height);
            this._root.addRelation(Graphic_1.Graphic.uiRoot, fairygui.RelationType.Size);
            this._root.getChild("n3").onClick(this, this.OnAutoMatchBtnClick);
        }
        Dispose() {
            this._root.dispose();
        }
        Enter(param) {
            Graphic_1.Graphic.uiRoot.addChild(this._root);
            this._root.getTransition("t0").play(new laya.utils.Handler(this, () => {
                this._root.getController("c1").selectedIndex = 1;
                this._root.getTransition("t1").play();
            }), 0, 0, 0, -1);
        }
        Exit() {
            Graphic_1.Graphic.uiRoot.removeChild(this._root);
        }
        Update(dt) {
        }
        OnResize(e) {
        }
        OnAutoMatchBtnClick() {
            SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Matching);
        }
    }
    exports.UIMain = UIMain;
});
//# sourceMappingURL=UIMain.js.map