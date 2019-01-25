define(["require", "exports", "../RC/Math/Vec2"], function (require, exports, Vec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Joystick extends fairygui.GComponent {
        constructor() {
            super(...arguments);
            this.radius = 100;
            this.cen = Vec2_1.Vec2.zero;
            this.resetDuration = 60;
            this._axis = Vec2_1.Vec2.zero;
        }
        set touchPosition(value) { this.axis = Vec2_1.Vec2.Sub(value, this.cen); }
        get axis() { return this._axis; }
        set axis(value) {
            const length = value.Magnitude();
            const normalAxis = length < 0.0001 ? Vec2_1.Vec2.zero : Vec2_1.Vec2.DivN(value, length);
            if (this.core != null) {
                let touchAxis = value;
                if (touchAxis.SqrMagnitude() >= this.radius * this.radius)
                    touchAxis = Vec2_1.Vec2.MulN(normalAxis, this.radius);
                this.core.x = touchAxis.x + this.cen.x;
                this.core.y = touchAxis.y + this.cen.y;
            }
            if (this._axis == normalAxis)
                return;
            this._axis = normalAxis;
            if (this.onChanged != null)
                this.onChanged(this._axis);
        }
        get worldAxis() {
            let point = new laya.maths.Point();
            ;
            this.localToGlobal(this._axis.x, this._axis.y, point);
            return new Vec2_1.Vec2(point.x, point.y);
        }
        get sprite() { return this.displayObject; }
        constructFromXML(xml) {
            super.constructFromXML(xml);
            this.cen = new Vec2_1.Vec2(this.width * 0.5, this.height * 0.5);
        }
        dispose() {
            fairygui.tween.GTween.kill(this, true);
            fairygui.tween.GTween.kill(this._axis, true);
            super.dispose();
        }
        Reset(fadeOut = false) {
            if (fadeOut) {
                fairygui.tween.GTween.to(0, 0, this.resetDuration).setEase(fairygui.tween.EaseType.QuadOut).setTarget(this._axis);
            }
            else {
                this.axis = Vec2_1.Vec2.zero;
            }
        }
        SetAxis(position) {
            let point = new laya.maths.Point();
            this.globalToLocal(position.x, position.y, point);
            this.touchPosition = new Vec2_1.Vec2(point.x, point.y);
        }
        TweenAlpha(from, to, duration, ease, completeHandler, caller) {
            fairygui.tween.GTween.kill(this, true);
            if (from == null || from == undefined) {
                from = this.displayObject.alpha;
            }
            fairygui.tween.GTween.to(from, to, duration).setEase(ease || fairygui.tween.EaseType.Linear).onUpdate(t => {
                this.displayObject.alpha = t.value.x;
            }, this).onComplete(completeHandler, caller).setTarget(this);
        }
    }
    exports.Joystick = Joystick;
});
//# sourceMappingURL=Joystick.js.map