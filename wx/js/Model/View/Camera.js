import { Global } from "../../Global";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Rect } from "../../RC/Math/Rect";
export class Camera {
    constructor() {
        this.smooth = 0.005;
    }
    get width() { return fairygui.GRoot.inst.width; }
    get height() { return fairygui.GRoot.inst.height; }
    UpdatePos() {
        let x = -this.lookAt.position.x;
        let y = -this.lookAt.position.y;
        x = MathUtils.Max(x, this._bounds.xMin + this.width * 0.5);
        y = MathUtils.Max(y, this._bounds.yMin + this.height * 0.5);
        x = MathUtils.Min(x, this._bounds.xMax - this.width * 0.5);
        y = MathUtils.Min(y, this._bounds.yMax - this.height * 0.5);
        Global.graphic.battleRoot.x = x;
        Global.graphic.battleRoot.y = y;
    }
    Update(dt) {
        if (this.lookAt == null)
            return;
        let x = -this.lookAt.position.x;
        let y = -this.lookAt.position.y;
        x = MathUtils.Max(x, this._bounds.xMin + this.width * 0.5);
        y = MathUtils.Max(y, this._bounds.yMin + this.height * 0.5);
        x = MathUtils.Min(x, this._bounds.xMax - this.width * 0.5);
        y = MathUtils.Min(y, this._bounds.yMax - this.height * 0.5);
        Global.graphic.battleRoot.x = MathUtils.Lerp(Global.graphic.battleRoot.x, x, dt * this.smooth);
        Global.graphic.battleRoot.y = MathUtils.Lerp(Global.graphic.battleRoot.y, y, dt * this.smooth);
    }
    SetBounds(width, height) {
        this._bounds = new Rect(-MathUtils.Floor(width * 0.5), -MathUtils.Floor(height * 0.5), width, height);
    }
}
