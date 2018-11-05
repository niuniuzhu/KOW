import { GestureState } from "./GestureState";
import { Joystick } from "./Joystick";
import { Global } from "../Global";
export class UIBattle {
    constructor() {
        this._gestureState = new GestureState();
        fairygui.UIPackage.addPackage("res/ui/battle");
        fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick);
        this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
        this._root.getChild("n0").onClick(this, this.OnSkillBtnClick);
        this._root.getChild("n1").onClick(this, this.OnSkill2BtnClick);
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
        this._root.displayObject.on(laya.events.Event.DRAG_START, this, this.OnDragStart);
        this._root.displayObject.on(laya.events.Event.DRAG_END, this, this.OnDragEnd);
        this._root.displayObject.on(laya.events.Event.DRAG_MOVE, this, this.OnDrag);
        this._gestureState.joystick = this._root.getChild("joystick");
    }
    get root() { return this._root; }
    Dispose() {
        this._gestureState.Dispose();
        this._root.dispose();
    }
    Enter(param) {
        Global.graphic.uiRoot.addChild(this._root);
    }
    Exit() {
        Global.graphic.uiRoot.removeChild(this._root);
    }
    Update(dt) {
        this._gestureState.Update(dt);
    }
    OnResize(e) {
    }
    OnSkillBtnClick() {
    }
    OnSkill2BtnClick() {
    }
    OnDragStart(e) {
        if (e.touchId == 0)
            this._gestureState.OnTouchBegin(e.stageX, e.stageY);
    }
    OnDragEnd(e) {
        if (e.touchId == 0)
            this._gestureState.OnTouchEnd();
    }
    OnDrag(e) {
        if (e.touchId == 0)
            this._gestureState.OnDrag(e.stageX, e.stageY);
    }
}
