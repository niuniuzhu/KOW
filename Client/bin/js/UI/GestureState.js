define(["require", "exports", "../RC/Math/Vec2"], function (require, exports, Vec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GestureState {
        constructor() {
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
                this._joystick.resetDuration = 0.2;
                this._joystick.onChanged = this.onChanged;
            }
        }
        Dispose() {
            this._joystick.dispose;
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
            let point;
            this._joystick.globalToLocal(px, py, point);
            this._joystick.touchPosition = new Vec2_1.Vec2(point.x, point.y);
        }
        ShowJoystick(point) {
            this._joystick.visible = true;
            let point2;
            this._joystick.parent.globalToLocal(point.x, point.y, point2);
            this._joystick.x = point2.x - this._joystick.width * 0.5;
            this._joystick.y = point2.y - this._joystick.height * 0.5;
            this._tween.to(this._joystick.sprite, { alpha: 1 }, 0.2, laya.utils.Ease.quadOut);
        }
        HideJoystick() {
            this._joystick.Reset(true);
            this._tween.to(this._joystick.sprite, { alpha: 0 }, 0.2, laya.utils.Ease.quadOut, new laya.utils.Handler(this, this.OnJoystickHideComplete));
        }
        OnJoystickHideComplete() {
            this._joystick.visible = false;
        }
        Update(dt) {
            if (!this._active)
                return;
            if (!this._joystick.visible) {
                this._touchTime += dt;
                if (this._touchTime >= GestureState.TIME_TO_SHOW_JOYSTICK) {
                    this.ShowJoystick(this._touchPosition);
                    this._joystick.Reset();
                }
            }
        }
    }
    GestureState.TIME_TO_SHOW_JOYSTICK = 500;
    exports.GestureState = GestureState;
});
//# sourceMappingURL=GestureState.js.map