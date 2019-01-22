import { Vec2 } from "./Vec2";
import { MathUtils } from "./MathUtils";
export class Rect {
    static get zero() {
        return new Rect();
    }
    get x() { return this._xMin; }
    set x(value) { this._xMin = value; }
    get y() { return this._yMin; }
    set y(value) { this._yMin = value; }
    get position() { return new Vec2(this._xMin, this._yMin); }
    set position(value) {
        this._xMin = value.x;
        this._yMin = value.y;
    }
    get center() { return new Vec2(this.x + this._width / 2, this.y + this._height / 2); }
    set center(value) {
        this._xMin = value.x - this._width / 2;
        this._yMin = value.y - this._height / 2;
    }
    get min() { return new Vec2(this.xMin, this.yMin); }
    set min(value) {
        this.xMin = value.x;
        this.yMin = value.y;
    }
    get max() { return new Vec2(this.xMax, this.yMax); }
    set max(value) {
        this.xMax = value.x;
        this.yMax = value.y;
    }
    get width() { return this._width; }
    set width(value) { this._width = value; }
    get height() { return this._height; }
    set height(value) { this.height = value; }
    get size() { return new Vec2(this._width, this._height); }
    set size(value) {
        this._width = value.x;
        this._height = value.y;
    }
    get xMin() { return this._xMin; }
    set xMin(value) {
        let xMax = this.xMax;
        this._xMin = value;
        this._width = xMax - this._xMin;
    }
    get yMin() { return this._yMin; }
    set yMin(value) {
        let yMax = this.yMax;
        this._yMin = value;
        this._height = yMax - this._yMin;
    }
    get xMax() { return this._width + this._xMin; }
    set xMax(value) {
        this._width = value - this._xMin;
    }
    get yMax() { return this._height + this._yMin; }
    set yMax(value) {
        this._height = value - this._yMin;
    }
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this._xMin = x;
        this._yMin = y;
        this._width = width;
        this._height = height;
    }
    CopyFrom(source) {
        this._xMin = source._xMin;
        this._yMin = source._yMin;
        this._width = source._width;
        this._height = source._height;
    }
    Clone() {
        let rect = new Rect();
        rect._xMin = this._xMin;
        rect._yMin = this._yMin;
        rect._width = this._width;
        rect._height = this._height;
        return rect;
    }
    static MinMaxRect(xmin, ymin, xmax, ymax) {
        return new Rect(xmin, ymin, xmax - xmin, ymax - ymin);
    }
    Set(x, y, width, height) {
        this._xMin = x;
        this._yMin = y;
        this._width = width;
        this._height = height;
    }
    Contains(point, allowInverse = false) {
        let result;
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
    static OrderMinMax(rect) {
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
    Overlaps(other, allowInverse = false) {
        let rect = this.Clone();
        if (allowInverse) {
            rect = Rect.OrderMinMax(rect);
            other = Rect.OrderMinMax(other);
        }
        return other.xMax > rect.xMin && other.xMin < rect.xMax && other.yMax > rect.yMin && other.yMin < rect.yMax;
    }
    static NormalizedToPoint(rectangle, normalizedRectCoordinates) {
        return new Vec2(MathUtils.Lerp(rectangle.x, rectangle.xMax, normalizedRectCoordinates.x), MathUtils.Lerp(rectangle.y, rectangle.yMax, normalizedRectCoordinates.y));
    }
    static PointToNormalized(rectangle, point) {
        return new Vec2(MathUtils.InverseLerp(rectangle.x, rectangle.xMax, point.x), MathUtils.InverseLerp(rectangle.y, rectangle.yMax, point.y));
    }
}
