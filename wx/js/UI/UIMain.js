import { SceneManager } from "../Scene/SceneManager";
import { Graphic } from "../Graphic";
export class UIMain {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/main");
        this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
        this._root.setSize(Graphic.uiRoot.width, Graphic.uiRoot.height);
        this._root.addRelation(Graphic.uiRoot, fairygui.RelationType.Size);
        this._root.getChild("n3").onClick(this, this.OnAutoMatchBtnClick);
    }
    Dispose() {
        this._root.dispose();
    }
    Enter(param) {
        Graphic.uiRoot.addChild(this._root);
        this._root.getTransition("t0").play();
    }
    Exit() {
        Graphic.uiRoot.removeChild(this._root);
    }
    Update(dt) {
    }
    OnResize(e) {
    }
    OnAutoMatchBtnClick() {
        SceneManager.ChangeState(SceneManager.State.Matching);
    }
}
