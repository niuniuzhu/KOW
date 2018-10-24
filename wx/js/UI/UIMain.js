import { SceneManager } from "../Scene/SceneManager";
export class UIMain {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/main");
        this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
        this._root.getChild("n3").onClick(this, this.OnAutoMatchBtnClick);
    }
    Dispose() {
    }
    Enter(param) {
        fairygui.GRoot.inst.addChild(this._root);
        this._root.getTransition("t0").play(new laya.utils.Handler(this, () => {
            this._root.getController("c1").selectedIndex = 1;
            this._root.getTransition("t1").play();
        }), 0, 0, 0, -1);
    }
    Exit() {
        fairygui.GRoot.inst.removeChild(this._root);
    }
    Update(dt) {
    }
    OnResize(e) {
    }
    OnAutoMatchBtnClick() {
        SceneManager.ChangeState(SceneManager.State.Matching);
    }
}
//# sourceMappingURL=UIMain.js.map