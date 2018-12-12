define(["require", "exports", "../RC/Math/Vec2"], function (require, exports, Vec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GestureState {
        constructor() {
            this.showDuration = 20;
            this.hideDuration = 50;
            this._tween = new laya.utils.Tween();
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
        OnTouchBegin(px, py) {
            this._active = true;
            this._touchTime = 0;
            this._touchPosition = new Vec2_1.Vec2(px, py);
        }
        OnTouchEnd() {
            this._active = false;
            this.HideJoystick();
        }
        OnDrag(px, py) {
            this._active = true;
            this.ShowJoystick(this._touchPosition);
            let point = new laya.maths.Point();
            this._joystick.globalToLocal(px, py, point);
            this._joystick.touchPosition = new Vec2_1.Vec2(point.x, point.y);
        }
        ShowJoystick(point) {
            this._joystick.visible = true;
            let point2 = new laya.maths.Point();
            this._joystick.parent.globalToLocal(point.x, point.y, point2);
            this._joystick.x = point2.x - this._joystick.width * 0.5;
            this._joystick.y = point2.y - this._joystick.height * 0.5;
            this._tween.to(this._joystick.sprite, { alpha: 1 }, this.showDuration);
        }
        HideJoystick() {
            this._joystick.Reset();
            this._tween.to(this._joystick.sprite, { alpha: 0 }, this.hideDuration, laya.utils.Ease.linearInOut, Laya.Handler.create(this, this.OnJoystickHideComplete));
        }
        OnJoystickHideComplete() {
            this._joystick.visible = false;
        }
        Update(dt) {
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
    }
    GestureState.TIME_TO_SHOW_JOYSTICK = 500;
    exports.GestureState = GestureState;
});
//# sourceMappingURL=GestureState.js.map