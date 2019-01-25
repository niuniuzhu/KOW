define(["require", "exports", "../RC/Math/Vec2"], function (require, exports, Vec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GestureState2 {
        constructor(root) {
            this.showDuration = 20;
            this.hideDuration = 50;
            this._touchID = -1;
            this._root = root;
            this._joystick = root.getChild("joystick");
            this._joystick.core = root.getChild("joystick").asCom.getChild("n1").asCom;
            this._joystick.cen = new Vec2_1.Vec2(100, 100);
            this._joystick.radius = 100;
            this._joystick.resetDuration = 60;
            this._joystick.visible = true;
        }
        get joystick() {
            return this._joystick;
        }
        set joystick(value) {
            if (this._joystick == value)
                return;
            this._joystick = value;
            if (this._joystick != null) {
                this._joystick.touchable = false;
                this._joystick.radius = this._joystick.width * 0.5;
            }
        }
        set onChanged(value) {
            if (this._joystick != null) {
                this._joystick.onChanged = value;
            }
        }
        Dispose() {
            this._joystick.dispose();
            this._joystick = null;
            this._root = null;
        }
        OnEnter() {
            this._touchID = -1;
            this._joystick.on(Laya.Event.MOUSE_DOWN, this, this.OnDragStart);
        }
        OnExit() {
            this._touchID = -1;
            this._joystick.off(Laya.Event.MOUSE_DOWN, this, this.OnDragStart);
            this._joystick.off(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
            this._root.off(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
        }
        OnUpdate(dt) {
        }
        OnDragStart(e) {
            if (this._touchID != -1)
                return;
            this._touchID = e.touchId;
            this._joystick.on(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
            this._root.on(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
        }
        OnDragEnd(e) {
            if (e.touchId == this._touchID) {
                this._touchID = -1;
                this._joystick.Reset();
                this._joystick.off(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
                this._root.off(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
            }
        }
        OnDrag(e) {
            if (e.touchId == this._touchID) {
                let point = new laya.maths.Point();
                this._joystick.globalToLocal(e.stageX, e.stageY, point);
                this._joystick.touchPosition = new Vec2_1.Vec2(point.x, point.y);
            }
        }
    }
    exports.GestureState2 = GestureState2;
});
//# sourceMappingURL=GestureState2.js.map