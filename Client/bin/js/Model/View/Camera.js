define(["require", "exports", "../../Global", "../../RC/Math/MathUtils", "../../RC/Math/Rect"], function (require, exports, Global_1, MathUtils_1, Rect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Camera {
        constructor() {
            this.smooth = 0.005;
        }
        get width() { return fairygui.GRoot.inst.width; }
        get height() { return fairygui.GRoot.inst.height; }
        UpdatePos() {
            let x = -this.lookAt.position.x;
            let y = -this.lookAt.position.y;
            x = MathUtils_1.MathUtils.Max(x, this._bounds.xMin + this.width * 0.5);
            y = MathUtils_1.MathUtils.Max(y, this._bounds.yMin + this.height * 0.5);
            x = MathUtils_1.MathUtils.Min(x, this._bounds.xMax - this.width * 0.5);
            y = MathUtils_1.MathUtils.Min(y, this._bounds.yMax - this.height * 0.5);
            Global_1.Global.graphic.battleRoot.x = x;
            Global_1.Global.graphic.battleRoot.y = y;
        }
        Update(dt) {
            if (this.lookAt == null)
                return;
            let x = -this.lookAt.position.x;
            let y = -this.lookAt.position.y;
            x = MathUtils_1.MathUtils.Max(x, this._bounds.xMin + this.width * 0.5);
            y = MathUtils_1.MathUtils.Max(y, this._bounds.yMin + this.height * 0.5);
            x = MathUtils_1.MathUtils.Min(x, this._bounds.xMax - this.width * 0.5);
            y = MathUtils_1.MathUtils.Min(y, this._bounds.yMax - this.height * 0.5);
            Global_1.Global.graphic.battleRoot.x = MathUtils_1.MathUtils.Lerp(Global_1.Global.graphic.battleRoot.x, x, dt * this.smooth);
            Global_1.Global.graphic.battleRoot.y = MathUtils_1.MathUtils.Lerp(Global_1.Global.graphic.battleRoot.y, y, dt * this.smooth);
        }
        SetBounds(width, height) {
            this._bounds = new Rect_1.Rect(-MathUtils_1.MathUtils.Floor(width * 0.5), -MathUtils_1.MathUtils.Floor(height * 0.5), width, height);
        }
    }
    exports.Camera = Camera;
});
//# sourceMappingURL=Camera.js.map