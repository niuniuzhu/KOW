import Decimal from "../../Libs/decimal";
import { MathUtils } from "../Math/MathUtils";
import { FVec2 } from "./FVec2";

export class FRect {
	private _xMin: Decimal;
	private _yMin: Decimal;
	private _width: Decimal;
	private _height: Decimal;

	public static get zero(): FRect {
		return new FRect();
	}

	public get x(): Decimal { return this._xMin; }
	public set x(value: Decimal) { this._xMin = value; }

	public get y(): Decimal { return this._yMin; }
	public set y(value: Decimal) { this._yMin = value; }

	public get position(): FVec2 { return new FVec2(this._xMin, this._yMin); }
	public set position(value: FVec2) {
		this._xMin = value.x;
		this._yMin = value.y;
	}

	public get center(): FVec2 { return new FVec2(this.x.add(this._width.mul(MathUtils.D_HALF)), this.y.add(this._height.mul(MathUtils.D_HALF))); }
	public set center(value: FVec2) {
		this._xMin = value.x.sub(this._width.mul(MathUtils.D_HALF));
		this._yMin = value.y.sub(this._height.mul(MathUtils.D_HALF));
	}

	public get min(): FVec2 { return new FVec2(this.xMin, this.yMin); }
	public set min(value: FVec2) {
		this.xMin = value.x;
		this.yMin = value.y;
	}

	public get max(): FVec2 { return new FVec2(this.xMax, this.yMax); }
	public set max(value: FVec2) {
		this.xMax = value.x;
		this.yMax = value.y;
	}

	public get width(): Decimal { return this._width; }
	public set width(value: Decimal) { this._width = value; }

	public get height(): Decimal { return this._height; }
	public set height(value: Decimal) { this.height = value; }

	public get size(): FVec2 { return new FVec2(this._width, this._height); }
	public set size(value: FVec2) {
		this._width = value.x;
		this._height = value.y;
	}

	public get xMin(): Decimal { return this._xMin; }
	public set xMin(value: Decimal) {
		let xMax = this.xMax;
		this._xMin = value;
		this._width = xMax.sub(this._xMin);
	}

	public get yMin(): Decimal { return this._yMin; }
	public set yMin(value: Decimal) {
		let yMax = this.yMax;
		this._yMin = value;
		this._height = yMax.sub(this._yMin);
	}

	public get xMax(): Decimal { return this._width.add(this._xMin); }
	public set xMax(value: Decimal) {
		this._width = value.sub(this._xMin);
	}

	public get yMax(): Decimal { return this._height.add(this._yMin); }
	public set yMax(value: Decimal) {
		this._height = value.sub(this._yMin);
	}

	public constructor(x?: Decimal, y?: Decimal, width?: Decimal, height?: Decimal) {
		this._xMin = new Decimal(x == null ? 0 : x);
		this._yMin = new Decimal(y == null ? 0 : y);
		this._width = new Decimal(width == null ? 0 : width);
		this._height = new Decimal(height == null ? 0 : height);
	}

	public CopyFrom(source: FRect) {
		this._xMin = new Decimal(source._xMin);
		this._yMin = new Decimal(source._yMin);
		this._width = new Decimal(source._width);
		this._height = new Decimal(source._height);
	}

	public Clone(): FRect {
		let rect = new FRect();
		rect._xMin = new Decimal(this._xMin);
		rect._yMin = new Decimal(this._yMin);
		rect._width = new Decimal(this._width);
		rect._height = new Decimal(this._height);
		return rect;
	}

	public static MinMaxRect(xmin: Decimal, ymin: Decimal, xmax: Decimal, ymax: Decimal): FRect {
		return new FRect(xmin, ymin, xmax.sub(xmin), ymax.sub(ymin));
	}

	public Set(x: Decimal, y: Decimal, width: Decimal, height: Decimal): void {
		this._xMin = new Decimal(x);
		this._yMin = new Decimal(y);
		this._width = new Decimal(width);
		this._height = new Decimal(height);
	}

	public Contains(point: FVec2, allowInverse: boolean = false): boolean {
		let result: boolean;
		if (!allowInverse) {
			result = point.x.greaterThanOrEqualTo(this.xMin) &&
				point.x.lessThan(this.xMax) &&
				point.y.greaterThanOrEqualTo(this.yMin) &&
				point.y.lessThan(this.yMax);
		}
		else {
			let flag = false;
			if ((this.width.lessThan(0) &&
				point.x.lessThanOrEqualTo(this.xMin) &&
				point.x.greaterThan(this.xMax)) ||
				(this.width.greaterThanOrEqualTo(0) &&
					point.x.greaterThanOrEqualTo(this.xMin) &&
					point.x.lessThan(this.xMax))) {
				flag = true;
			}
			result = flag && ((this.height.lessThan(0) && point.y.lessThanOrEqualTo(this.yMin) && point.y.greaterThan(this.yMax)) || (this.height.greaterThanOrEqualTo(0) && point.y.greaterThanOrEqualTo(this.yMin) && point.y.lessThan(this.yMax)));
		}
		return result;
	}

	private static OrderMinMax(rect: FRect): FRect {
		if (rect.xMin.greaterThan(rect.xMax)) {
			let xMin = rect.xMin;
			rect.xMin = rect.xMax;
			rect.xMax = xMin;
		}
		if (rect.yMin.greaterThan(rect.yMax)) {
			let yMin = rect.yMin;
			rect.yMin = rect.yMax;
			rect.yMax = yMin;
		}
		return rect;
	}

	public Overlaps(other: FRect, allowInverse: boolean = false): boolean {
		let rect = this.Clone();
		if (allowInverse) {
			rect = FRect.OrderMinMax(rect);
			other = FRect.OrderMinMax(other);
		}
		return other.xMax.greaterThan(rect.xMin) && other.xMin.lessThan(rect.xMax) && other.yMax.greaterThan(rect.yMin) && other.yMin.lessThan(rect.yMax);
	}
}