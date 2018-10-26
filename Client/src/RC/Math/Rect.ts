import { Vec2 } from "./Vec2";

import { MathUtils } from "./MathUtils";

export class Rect {
	private _xMin: number;
	private _yMin: number;
	private _width: number;
	private _height: number;

	public static get zero(): Rect {
		return new Rect();
	}

	public get x(): number { return this._xMin; }
	public set x(value: number) { this._xMin = value; }

	public get y(): number { return this._yMin; }
	public set y(value: number) { this._yMin = value; }

	public get position(): Vec2 { return new Vec2(this._xMin, this._yMin); }
	public set position(value: Vec2) {
		this._xMin = value.x;
		this._yMin = value.y;
	}

	public get center(): Vec2 { return new Vec2(this.x + this._width / 2, this.y + this._height / 2); }
	public set center(value: Vec2) {
		this._xMin = value.x - this._width / 2;
		this._yMin = value.y - this._height / 2;
	}

	public get min(): Vec2 { return new Vec2(this.xMin, this.yMin); }
	public set min(value: Vec2) {
		this.xMin = value.x;
		this.yMin = value.y;
	}

	public get max(): Vec2 { return new Vec2(this.xMax, this.yMax); }
	public set max(value: Vec2) {
		this.xMax = value.x;
		this.yMax = value.y;
	}

	public get width(): number { return this._width; }
	public set width(value: number) { this._width = value; }

	public get height(): number { return this._height; }
	public set height(value: number) { this.height = value; }

	public get size(): Vec2 { return new Vec2(this._width, this._height); }
	public set size(value: Vec2) {
		this._width = value.x;
		this._height = value.y;
	}

	public get xMin(): number { return this._xMin; }
	public set xMin(value: number) {
		let xMax = this.xMax;
		this._xMin = value;
		this._width = xMax - this._xMin;
	}

	public get yMin(): number { return this._yMin; }
	public set yMin(value: number) {
		let yMax = this.yMax;
		this._yMin = value;
		this._height = yMax - this._yMin;
	}

	public get xMax(): number { return this._width + this._xMin; }
	public set xMax(value: number) {
		this._width = value - this._xMin;
	}

	public get yMax(): number { return this._height + this._yMin; }
	public set yMax(value: number) {
		this._height = value - this._yMin;
	}

	public constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
		this._xMin = x;
		this._yMin = y;
		this._width = width;
		this._height = height;
	}

	public CopyFrom(source: Rect) {
		this._xMin = source._xMin;
		this._yMin = source._yMin;
		this._width = source._width;
		this._height = source._height;
	}

	public Clone(): Rect {
		let rect = new Rect();
		rect._xMin = this._xMin;
		rect._yMin = this._yMin;
		rect._width = this._width;
		rect._height = this._height;
		return rect;
	}

	public static MinMaxRect(xmin: number, ymin: number, xmax: number, ymax: number): Rect {
		return new Rect(xmin, ymin, xmax - xmin, ymax - ymin);
	}

	public Set(x: number, y: number, width: number, height: number): void {
		this._xMin = x;
		this._yMin = y;
		this._width = width;
		this._height = height;
	}

	public Contains(point: Vec2, allowInverse: boolean = false): boolean {
		let result: boolean;
		if (!allowInverse) {
			result = point.x >= this.xMin && point.x < this.xMax && point.y >= this.yMin && point.y < this.yMax;
		}
		else {
			let flag = false;
			if ((this.width < 0 && point.x <= this.xMin && point.x > this.xMax) || (this.width >= 0 && point.x >= this.xMin && point.x < this.xMax)) {
				flag = true;
			}
			result = (flag && ((this.height < 0 && point.y <= this.yMin && point.y > this.yMax) || (this.height >= 0 && point.y >= this.yMin && point.y < this.yMax)));
		}
		return result;
	}

	private static OrderMinMax(rect: Rect): Rect {
		if (rect.xMin > rect.xMax) {
			let xMin = rect.xMin;
			rect.xMin = rect.xMax;
			rect.xMax = xMin;
		}
		if (rect.yMin > rect.yMax) {
			let yMin = rect.yMin;
			rect.yMin = rect.yMax;
			rect.yMax = yMin;
		}
		return rect;
	}

	public Overlaps(other: Rect, allowInverse: boolean = false): boolean {
		let rect = this.Clone();
		if (allowInverse) {
			rect = Rect.OrderMinMax(rect);
			other = Rect.OrderMinMax(other);
		}
		return other.xMax > rect.xMin && other.xMin < rect.xMax && other.yMax > rect.yMin && other.yMin < rect.yMax;
	}

	public static NormalizedToPoint(rectangle: Rect, normalizedRectCoordinates: Vec2): Vec2 {
		return new Vec2(MathUtils.Lerp(rectangle.x, rectangle.xMax, normalizedRectCoordinates.x), MathUtils.Lerp(rectangle.y, rectangle.yMax, normalizedRectCoordinates.y));
	}

	public static PointToNormalized(rectangle: Rect, point: Vec2): Vec2 {
		return new Vec2(MathUtils.InverseLerp(rectangle.x, rectangle.xMax, point.x), MathUtils.InverseLerp(rectangle.y, rectangle.yMax, point.y));
	}
}