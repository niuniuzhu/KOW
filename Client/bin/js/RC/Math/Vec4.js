define(["require", "exports", "./MathUtils"], function (require, exports, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vec4 {
        static get one() {
            return new Vec4(1, 1, 1, 1);
        }
        static get minusOne() {
            return new Vec4(-1, -1, -1, -1);
        }
        static get zero() {
            return new Vec4(0, 0, 0, 0);
        }
        static get right() {
            return new Vec4(1, 0, 0, 0);
        }
        ;
        static get left() {
            return new Vec4(-1, 0, 0, 0);
        }
        ;
        static get up() {
            return new Vec4(0, 1, 0, 0);
        }
        ;
        static get down() {
            return new Vec4(0, -1, 0, 0);
        }
        ;
        static get forward() {
            return new Vec4(0, 0, 1, 0);
        }
        ;
        static get height() {
            return new Vec4(0, 0, 0, 1);
        }
        ;
        static get low() {
            return new Vec4(0, 0, 0, -1);
        }
        ;
        static get backward() {
            return new Vec4(0, 0, -1, 0);
        }
        ;
        static get positiveInfinityVector() {
            return new Vec4(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        }
        ;
        static get negativeInfinityVector() {
            return new Vec4(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        }
        ;
        constructor(x = 0, y = 0, z = 0, w = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        Clone() {
            let v = new Vec4();
            v.x = this.x;
            v.y = this.y;
            v.z = this.z;
            v.w = this.w;
            return v;
        }
        CopyFrom(v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            this.w = v.w;
        }
        Set(x, y, z, w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        Clamp(min, max) {
            this.x = MathUtils_1.MathUtils.Clamp(this.x, min.x, max.x);
            this.y = MathUtils_1.MathUtils.Clamp(this.y, min.y, max.y);
            this.z = MathUtils_1.MathUtils.Clamp(this.z, min.z, max.z);
            this.w = MathUtils_1.MathUtils.Clamp(this.w, min.w, max.w);
            return this;
        }
        Add(v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            this.w += v.w;
            return this;
        }
        AddN(n) {
            this.x += n;
            this.y += n;
            this.z += n;
            this.w += n;
            return this;
        }
        Sub(v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            this.w -= v.w;
            return this;
        }
        SubN(n) {
            this.x -= n;
            this.y -= n;
            this.z -= n;
            this.w -= n;
            return this;
        }
        SubN2(n) {
            this.x = n - this.x;
            this.y = n - this.y;
            this.z = n - this.z;
            this.w = n - this.w;
            return this;
        }
        Mul(v) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
            this.w *= v.w;
            return this;
        }
        MulN(n) {
            this.x *= n;
            this.y *= n;
            this.z *= n;
            this.w *= n;
            return this;
        }
        Div(v) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
            this.w /= v.w;
            return this;
        }
        DivN(n) {
            this.x /= n;
            this.y /= n;
            this.z /= n;
            this.w /= n;
            return this;
        }
        DivN2(n) {
            this.x = n / this.x;
            this.y = n / this.y;
            this.z = n / this.z;
            this.w = n / this.w;
            return this;
        }
        Negate() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            this.w = -this.w;
            return this;
        }
        ClampMagnitude(maxLength) {
            let sqrMagnitude = this.SqrMagnitude();
            if (sqrMagnitude > (maxLength * maxLength)) {
                let f = maxLength / MathUtils_1.MathUtils.Sqrt(sqrMagnitude);
                this.x *= f;
                this.y *= f;
                this.z *= f;
                this.w *= f;
            }
        }
        Magnitude() {
            return MathUtils_1.MathUtils.Sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        }
        SqrMagnitude() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        }
        Distance(vector) {
            return Vec4.Sub(vector, this).Magnitude();
        }
        DistanceSquared(vector) {
            return Vec4.Sub(vector, this).SqrMagnitude();
        }
        Scale(scale) {
            this.x *= scale.x;
            this.y *= scale.y;
            this.z *= scale.z;
            this.w *= scale.w;
        }
        Dot(vector) {
            return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
        }
        Normalize() {
            let f = 1 / this.Magnitude();
            this.x *= f;
            this.y *= f;
            this.z *= f;
            this.w *= f;
        }
        NormalizeSafe() {
            let f = this.Magnitude();
            if (f == 0)
                return;
            this.x *= f;
            this.y *= f;
            this.z *= f;
            this.w *= f;
        }
        AproxEqualsBox(vector, tolerance) {
            return (MathUtils_1.MathUtils.Abs(this.x - vector.x) <= tolerance) &&
                (MathUtils_1.MathUtils.Abs(this.y - vector.y) <= tolerance) &&
                (MathUtils_1.MathUtils.Abs(this.z - vector.z) <= tolerance) &&
                (MathUtils_1.MathUtils.Abs(this.w - vector.w) <= tolerance);
        }
        ApproxEquals(vector, tolerance) {
            return this.Distance(vector) <= tolerance;
        }
        EqualsTo(v) {
            return Vec4.Equals(this, v);
        }
        ToString() {
            return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
        }
        static Add(v1, v2) {
            v1 = v1.Clone();
            return v1.Add(v2);
        }
        static AddN(v, n) {
            v = v.Clone();
            return v.AddN(n);
        }
        static Sub(v1, v2) {
            v1 = v1.Clone();
            return v1.Sub(v2);
        }
        static SubN(v, n) {
            v = v.Clone();
            return v.SubN(n);
        }
        static SubN2(n, v) {
            v = v.Clone();
            return v.SubN2(n);
        }
        static Mul(v1, v2) {
            v1 = v1.Clone();
            return v1.Mul(v2);
        }
        static MulN(v, n) {
            v = v.Clone();
            return v.MulN(n);
        }
        static Div(v1, v2) {
            v1 = v1.Clone();
            return v1.Div(v2);
        }
        static DivN(v, n) {
            v = v.Clone();
            return v.DivN(n);
        }
        static DivN2(n, v) {
            v = v.Clone();
            return v.DivN2(n);
        }
        static Equals(v1, v2) {
            if (v1 == null || v2 == null)
                return false;
            return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z && v1.w == v2.w;
        }
        static Distance(v0, v1) {
            return Vec4.Sub(v1, v0).Magnitude();
        }
        static DistanceSquared(v0, v1) {
            return Vec4.Sub(v1, v0).SqrMagnitude();
        }
        static ClampMagnitude(v, maxLength) {
            let nor = v.Clone();
            let sqrMagnitude = nor.SqrMagnitude();
            if (sqrMagnitude > (maxLength * maxLength))
                nor = Vec4.MulN(nor, (maxLength / MathUtils_1.MathUtils.Sqrt(sqrMagnitude)));
            return nor;
        }
        static Normalize(v) {
            return Vec4.MulN(v, (1 / v.Magnitude()));
        }
        static NormalizeSafe(v) {
            let f = v.Magnitude();
            if (f == 0)
                return new Vec4();
            return Vec4.MulN(v, (1 / f));
        }
        static LerpUnclamped(from, to, t) {
            return new Vec4(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.z + (to.z - from.z) * t, from.w + (to.w - from.w) * t);
        }
        static Lerp(from, to, t) {
            return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec4.LerpUnclamped(from, to, t));
        }
        static Abs(v) {
            return new Vec4(MathUtils_1.MathUtils.Abs(v.x), MathUtils_1.MathUtils.Abs(v.y), MathUtils_1.MathUtils.Abs(v.z), MathUtils_1.MathUtils.Abs(v.w));
        }
        static Pow(v, power) {
            return new Vec4(MathUtils_1.MathUtils.Pow(v.x, power), MathUtils_1.MathUtils.Pow(v.y, power), MathUtils_1.MathUtils.Pow(v.z, power), MathUtils_1.MathUtils.Pow(v.w, power));
        }
        static Floor(v) {
            return new Vec4(MathUtils_1.MathUtils.Floor(v.x), MathUtils_1.MathUtils.Floor(v.y), MathUtils_1.MathUtils.Floor(v.z), MathUtils_1.MathUtils.Floor(v.w));
        }
        static Round(v) {
            return new Vec4(MathUtils_1.MathUtils.Round(v.x), MathUtils_1.MathUtils.Round(v.y), MathUtils_1.MathUtils.Round(v.z), MathUtils_1.MathUtils.Round(v.w));
        }
    }
    exports.Vec4 = Vec4;
});
//# sourceMappingURL=Vec4.js.map