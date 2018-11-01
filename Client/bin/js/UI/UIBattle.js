define(["require", "exports", "./GestureState", "./Joystick", "../Graphic"], function (require, exports, GestureState_1, Joystick_1, Graphic_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIBattle {
        constructor() {
            this._gestureState = new GestureState_1.GestureState();
            fairygui.UIPackage.addPackage("res/ui/battle");
            fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick_1.Joystick);
            this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
            this._root.getChild("n0").onClick(this, this.OnSkillBtnClick);
            this._root.getChild("n1").onClick(this, this.OnSkill2BtnClick);
            this._root.setSize(Graphic_1.Graphic.uiRoot.width, Graphic_1.Graphic.uiRoot.height);
            this._root.addRelation(Graphic_1.Graphic.uiRoot, fairygui.RelationType.Size);
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
            Graphic_1.Graphic.uiRoot.addChild(this._root);
        }
        Exit() {
            Graphic_1.Graphic.uiRoot.removeChild(this._root);
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
    exports.UIBattle = UIBattle;
});
//# sourceMappingURL=UIBattle.js.map