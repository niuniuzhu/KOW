import { Vec2 } from "../RC/Math/Vec2";
export class GestureState {
    constructor(root) {
        this.showDuration = 0.2;
        this.hideDuration = 0.5;
        this._touchID = -1;
        this._root = root;
        this._joystick = this._root.getChild("joystick");
        this._joystick.core = this._root.getChild("joystick").asCom.getChild("n1").asCom;
        this._joystick.cen = new Vec2(100, 100);
        this._joystick.radius = 100;
        this._joystick.resetDuration = 60;
        this._joystick.visible = false;
        this._joystick.alpha = 0;
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
    }
    OnEnter() {
        this._touchID = -1;
        this._root.on(Laya.Event.MOUSE_DOWN, this, this.OnDragStart);
    }
    OnExit() {
        this._active = false;
        this.HideJoystick();
        this._touchID = -1;
        this._root.off(Laya.Event.MOUSE_DOWN, this, this.OnDragStart);
        this._root.off(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
        this._root.off(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
    }
    OnUpdate(dt) {
        if (!this._active)
            return;
        if (!this._joystick.visible) {
            if (this._touchTime >= GestureState.TIME_TO_SHOW_JOYSTICK) {
                this.ShowJoystick(this._touchPosition);
                this._joystick.Reset();
                return;
            }
            this._touchTime += dt;
        }
    }
    OnDragStart(e) {
        if (this._touchID != -1 ||
            fairygui.GComponent.cast(e.currentTarget) != this._root)
            return;
        this._touchID = e.touchId;
        this._root.on(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
        this._root.on(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
        this._active = true;
        this._touchTime = 0;
        this._touchPosition = new Vec2(e.stageX, e.stageY);
    }
    OnDragEnd(e) {
        if (e.touchId == this._touchID) {
            this._touchID = -1;
            this._active = false;
            this.HideJoystick();
            this._root.off(Laya.Event.MOUSE_UP, this, this.OnDragEnd);
            this._root.off(Laya.Event.MOUSE_MOVE, this, this.OnDrag);
        }
    }
    OnDrag(e) {
        if (e.touchId == this._touchID) {
            this._active = true;
            this.ShowJoystick(this._touchPosition);
            let point = new laya.maths.Point();
            this._joystick.globalToLocal(e.stageX, e.stageY, point);
            this._joystick.touchPosition = new Vec2(point.x, point.y);
        }
    }
    ShowJoystick(point) {
        let point2 = new laya.maths.Point();
        this._joystick.parent.globalToLocal(point.x, point.y, point2);
        this._joystick.x = point2.x - this._joystick.width * 0.5;
        this._joystick.y = point2.y - this._joystick.height * 0.5;
        this._joystick.visible = true;
        this._joystick.TweenAlpha(null, 1, this.showDuration);
    }
    HideJoystick() {
        this._joystick.Reset();
        this._joystick.TweenAlpha(null, 0, this.hideDuration, fairygui.tween.EaseType.Linear, this.OnJoystickHideComplete, this);
    }
    OnJoystickHideComplete() {
        this._joystick.visible = false;
    }
}
GestureState.TIME_TO_SHOW_JOYSTICK = 500;
