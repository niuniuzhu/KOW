import { Global } from "../Global";
import { FrameAciontManager } from "../Model/FrameActionManager";
import { Vec2 } from "../RC/Math/Vec2";
import { GestureState } from "./GestureState";
import { Joystick } from "./Joystick";
export class UIBattle {
    constructor() {
        this._gestureState = new GestureState();
        this._frameActionManager = new FrameAciontManager();
        fairygui.UIPackage.addPackage("res/ui/battle");
        fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick);
        this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
        this._root.getChild("n0").onClick(this, this.OnSkillBtnClick);
        this._root.getChild("n1").onClick(this, this.OnSkill2BtnClick);
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
        this._gestureState.joystick = this._root.getChild("joystick");
        this._gestureState.joystick.core = this._root.getChild("joystick").asCom.getChild("n1").asCom;
        this._gestureState.joystick.cen = new Vec2(100, 100);
        this._gestureState.joystick.radius = 100;
        this._gestureState.joystick.resetDuration = 60;
        this._gestureState.onChanged = this.HandleAxisInput.bind(this);
    }
    get root() { return this._root; }
    Dispose() {
        this._gestureState.Dispose();
        this._root.dispose();
    }
    Enter(param) {
        Global.graphic.uiRoot.addChild(this._root);
        fairygui.GRoot.inst.on(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
        this._frameActionManager.Reset();
    }
    Exit() {
        this._gestureState.OnTouchEnd();
        fairygui.GRoot.inst.off(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
        fairygui.GRoot.inst.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
        fairygui.GRoot.inst.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
        Global.graphic.uiRoot.removeChild(this._root);
    }
    Update(dt) {
        this._gestureState.Update(dt);
        this._frameActionManager.Update(dt);
    }
    OnResize(e) {
    }
    OnSkillBtnClick() {
    }
    OnSkill2BtnClick() {
    }
    HandleAxisInput(value) {
        this._frameActionManager.SetInputDirection(value);
    }
    OnDragStart(e) {
        if (e.touchId == 0) {
            fairygui.GRoot.inst.on(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
            fairygui.GRoot.inst.on(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
            this._gestureState.OnTouchBegin(e.stageX, e.stageY);
        }
    }
    OnDragEnd(e) {
        if (e.touchId == 0) {
            this._gestureState.OnTouchEnd();
            fairygui.GRoot.inst.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
            fairygui.GRoot.inst.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
        }
    }
    OnDrag(e) {
        if (e.touchId == 0) {
            this._gestureState.OnDrag(e.stageX, e.stageY);
        }
    }
}
