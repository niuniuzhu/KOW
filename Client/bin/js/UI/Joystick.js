define(["require", "exports", "../RC/Math/Vec2"], function (require, exports, Vec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Joystick extends fairygui.GComponent {
        constructor() {
            super();
            this.radius = 100;
            this.cen = Vec2_1.Vec2.zero;
            this.resetDuration = 1;
            this._axis = Vec2_1.Vec2.zero;
            this.draggable = true;
            this._tween = new laya.utils.Tween();
        }
        set touchPosition(value) { this.axis = value.Sub(this.cen); }
        get axis() { return this._axis; }
        set axis(value) {
            let length = value.Magnitude();
            let normalAxis = length < 0.0001 ? Vec2_1.Vec2.zero : value.DivN(length);
            if (this._core != null) {
                let touchAxis = value;
                if (touchAxis.SqrMagnitude() >= this.radius * this.radius)
                    touchAxis = normalAxis.MulN(this.radius);
                this._core.x = touchAxis.x + this.cen.x;
                this._core.y = touchAxis.y + this.cen.y;
            }
            if (this._axis == normalAxis)
                return;
            this._axis = normalAxis;
            this.onChanged(this._axis);
        }
        get worldAxis() {
            let point;
            this.localToGlobal(this._axis.x, this._axis.y, point);
            return new Vec2_1.Vec2(point.x, point.y);
        }
        get sprite() { return this.displayObject; }
        constructFromXML(xml) {
            super.constructFromXML(xml);
            this.cen = new Vec2_1.Vec2(this.width * 0.5, this.height * 0.5);
            this.displayObject.on(laya.events.Event.MOUSE_DOWN, this, this.OnPointerDown);
        }
        dispose() {
            this._tween.clear();
            super.dispose();
        }
        Reset(fadeOut = false) {
            if (fadeOut) {
                this._tween.to(this.axis, { x: 0, y: 0 }, this.resetDuration, laya.utils.Ease.quadOut);
            }
            else {
                this.axis = Vec2_1.Vec2.zero;
            }
        }
        SetAxis(position) {
            let point;
            this.globalToLocal(position.x, position.y, point);
            this.touchPosition = new Vec2_1.Vec2(point.x, point.y);
        }
        OnPointerDown(e) {
            this.SetAxis(new Vec2_1.Vec2(e.stageX, e.stageY));
        }
        OnDrag(e) {
            this.SetAxis(new Vec2_1.Vec2(e.stageX, e.stageY));
        }
        OnPointerUp(e) {
            this.Reset(true);
        }
    }
    exports.Joystick = Joystick;
});
//# sourceMappingURL=Joystick.js.map