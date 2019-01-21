"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = require("../../Global");
const MathUtils_1 = require("../../RC/Math/MathUtils");
const Rect_1 = require("../../RC/Math/Rect");
class Camera {
    get width() { return fairygui.GRoot.inst.width; }
    get height() { return fairygui.GRoot.inst.height; }
    Update(dt) {
        if (this.lookAt == null)
            return;
        let x = -this.lookAt.position.x;
        let y = -this.lookAt.position.y;
        x = MathUtils_1.MathUtils.Max(x, this._bounds.xMin + this.width * 0.5);
        y = MathUtils_1.MathUtils.Max(y, this._bounds.yMin + this.height * 0.5);
        x = MathUtils_1.MathUtils.Min(x, this._bounds.xMax - this.width * 0.5);
        y = MathUtils_1.MathUtils.Min(y, this._bounds.yMax - this.height * 0.5);
        Global_1.Global.graphic.battleRoot.x = x;
        Global_1.Global.graphic.battleRoot.y = y;
    }
    SetBounds(width, height) {
        this._bounds = new Rect_1.Rect(-MathUtils_1.MathUtils.Floor(width * 0.5), -MathUtils_1.MathUtils.Floor(height * 0.5), width, height);
    }
}
exports.Camera = Camera;
