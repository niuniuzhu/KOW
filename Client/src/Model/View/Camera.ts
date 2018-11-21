import { Global } from "../../Global";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Rect } from "../../RC/Math/Rect";
import { VEntity } from "./VEntity";

export class Camera {
	public lookAt: VEntity;

	public get width(): number { return fairygui.GRoot.inst.width; }
	public get height(): number { return fairygui.GRoot.inst.height; }

	private _bounds: Rect;

	public Update(dt: number) {
		if (this.lookAt == null)
			return;

		//限制范围
		let x = -this.lookAt.position.x;
		let y = -this.lookAt.position.y;
		x = MathUtils.Max(x, this._bounds.xMin + this.width * 0.5);
		y = MathUtils.Max(y, this._bounds.yMin + this.height * 0.5);
		x = MathUtils.Min(x, this._bounds.xMax - this.width * 0.5);
		y = MathUtils.Min(y, this._bounds.yMax - this.height * 0.5);

		Global.graphic.battleRoot.x = x;
		Global.graphic.battleRoot.y = y;
	}

	/**
	 * 设置限制范围
	 * @param width 宽度
	 * @param height 高度
	 */
	public SetBounds(width: number, height: number): void {
		this._bounds = new Rect(-MathUtils.Floor(width * 0.5), -MathUtils.Floor(height * 0.5), width, height);
	}
}