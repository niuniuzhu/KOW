export class UIBattle {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/battle");
        this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
        this._root.getChild("n0").onClick(this, this.OnSkillBtnClick);
        this._root.getChild("n1").onClick(this, this.OnSkill2BtnClick);
        this._root.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
    }
    Dispose() {
        this._root.dispose();
    }
    Enter(param) {
        fairygui.GRoot.inst.addChild(this._root);
    }
    Exit() {
        fairygui.GRoot.inst.removeChild(this._root);
    }
    Update(dt) {
    }
    OnResize(e) {
    }
    OnSkillBtnClick() {
    }
    OnSkill2BtnClick() {
    }
}
