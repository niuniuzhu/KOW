define(["require", "exports", "../../Libs/decimal", "../Math/MathUtils", "./FVec2"], function (require, exports, decimal_1, MathUtils_1, FVec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FRect {
        static get zero() {
            return new FRect();
        }
        get x() { return this._xMin; }
        set x(value) { this._xMin = value; }
        get y() { return this._yMin; }
        set y(value) { this._yMin = value; }
        get position() { return new FVec2_1.FVec2(this._xMin, this._yMin); }
        set position(value) {
            this._xMin = value.x;
            this._yMin = value.y;
        }
        get center() { return new FVec2_1.FVec2(this.x.add(this._width.mul(MathUtils_1.MathUtils.D_HALF)), this.y.add(this._height.mul(MathUtils_1.MathUtils.D_HALF))); }
        set center(value) {
            this._xMin = value.x.sub(this._width.mul(MathUtils_1.MathUtils.D_HALF));
            this._yMin = value.y.sub(this._height.mul(MathUtils_1.MathUtils.D_HALF));
        }
        get min() { return new FVec2_1.FVec2(this.xMin, this.yMin); }
        set min(value) {
            this.xMin = value.x;
            this.yMin = value.y;
        }
        get max() { return new FVec2_1.FVec2(this.xMax, this.yMax); }
        set max(value) {
            this.xMax = value.x;
            this.yMax = value.y;
        }
        get width() { return this._width; }
        set width(value) { this._width = value; }
        get height() { return this._height; }
        set height(value) { this.height = value; }
        get size() { return new FVec2_1.FVec2(this._width, this._height); }
        set size(value) {
            this._width = value.x;
            this._height = value.y;
        }
        get xMin() { return this._xMin; }
        set xMin(value) {
            let xMax = this.xMax;
            this._xMin = value;
            this._width = xMax.sub(this._xMin);
        }
        get yMin() { return this._yMin; }
        set yMin(value) {
            let yMax = this.yMax;
            this._yMin = value;
            this._height = yMax.sub(this._yMin);
        }
        get xMax() { return this._width.add(this._xMin); }
        set xMax(value) {
            this._width = value.sub(this._xMin);
        }
        get yMax() { return this._height.add(this._yMin); }
        set yMax(value) {
            this._height = value.sub(this._yMin);
        }
        constructor(x, y, width, height) {
            this._xMin = new decimal_1.default(x == null ? 0 : x);
            this._yMin = new decimal_1.default(y == null ? 0 : y);
            this._width = new decimal_1.default(width == null ? 0 : width);
            this._height = new decimal_1.default(height == null ? 0 : height);
        }
        CopyFrom(source) {
            this._xMin = new decimal_1.default(source._xMin);
            this._yMin = new decimal_1.default(source._yMin);
            this._width = new decimal_1.default(source._width);
            this._height = new decimal_1.default(source._height);
        }
        Clone() {
            let rect = new FRect();
            rect._xMin = new decimal_1.default(this._xMin);
            rect._yMin = new decimal_1.default(this._yMin);
            rect._width = new decimal_1.default(this._width);
            rect._height = new decimal_1.default(this._height);
            return rect;
        }
        static MinMaxRect(xmin, ymin, xmax, ymax) {
            return new FRect(xmin, ymin, xmax.sub(xmin), ymax.sub(ymin));
        }
        Set(x, y, width, height) {
            this._xMin = new decimal_1.default(x);
            this._yMin = new decimal_1.default(y);
            this._width = new decimal_1.default(width);
            this._height = new decimal_1.default(height);
        }
        Contains(point, allowInverse = false) {
            let result;
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
        static OrderMinMax(rect) {
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
        Overlaps(other, allowInverse = false) {
            let rect = this.Clone();
            if (allowInverse) {
                rect = FRect.OrderMinMax(rect);
                other = FRect.OrderMinMax(other);
            }
            return other.xMax.greaterThan(rect.xMin) && other.xMin.lessThan(rect.xMax) && other.yMax.greaterThan(rect.yMin) && other.yMin.lessThan(rect.yMax);
        }
    }
    exports.FRect = FRect;
});
//# sourceMappingURL=FRect.js.map