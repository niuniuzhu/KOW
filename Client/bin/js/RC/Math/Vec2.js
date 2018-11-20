define(["require", "exports", "./MathUtils"], function (require, exports, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vec2 {
        static get one() {
            return new Vec2(1, 1);
        }
        static get minusOne() {
            return new Vec2(-1, -1);
        }
        static get zero() {
            return new Vec2(0, 0);
        }
        static get right() {
            return new Vec2(1, 0);
        }
        ;
        static get left() {
            return new Vec2(-1, 0);
        }
        ;
        static get up() {
            return new Vec2(0, 1);
        }
        ;
        static get down() {
            return new Vec2(0, -1);
        }
        ;
        static get positiveInfinityVector() {
            return new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        }
        ;
        static get negativeInfinityVector() {
            return new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        }
        ;
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        Set(x, y) {
            this.x = x;
            this.y = y;
        }
        Clone() {
            let v = new Vec2();
            v.x = this.x;
            v.y = this.y;
            return v;
        }
        CopyFrom(v) {
            this.x = v.x;
            this.y = v.y;
        }
        Clamp(min, max) {
            this.x = MathUtils_1.MathUtils.Clamp(this.x, min.x, max.x);
            this.y = MathUtils_1.MathUtils.Clamp(this.y, min.y, max.y);
            return this;
        }
        Add(v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        }
        AddN(n) {
            this.x += n;
            this.y += n;
            return this;
        }
        Sub(v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        }
        SubN(n) {
            this.x -= n;
            this.y -= n;
            return this;
        }
        SubN2(n) {
            this.x = n - this.x;
            this.y = n - this.y;
            return this;
        }
        Mul(v) {
            this.x *= v.x;
            this.y *= v.y;
            return this;
        }
        MulN(n) {
            this.x *= n;
            this.y *= n;
            return this;
        }
        Div(v) {
            this.x /= v.x;
            this.y /= v.y;
            return this;
        }
        DivN(n) {
            this.x /= n;
            this.y /= n;
            return this;
        }
        DivN2(n) {
            this.x = n / this.x;
            this.y = n / this.y;
            return this;
        }
        Negate() {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }
        Scale(scale) {
            this.x *= scale.x;
            this.y *= scale.y;
        }
        Dot(v) {
            return this.x * v.x + this.y * v.y;
        }
        Normalize() {
            let f = 1 / this.Magnitude();
            this.x *= f;
            this.y *= f;
        }
        NormalizeSafe() {
            let f = this.Magnitude();
            if (f == 0)
                return;
            this.x *= f;
            this.y *= f;
        }
        ClampMagnitude(maxLength) {
            let sqrMagnitude = this.SqrMagnitude();
            if (sqrMagnitude > (maxLength * maxLength)) {
                let f = maxLength / MathUtils_1.MathUtils.Sqrt(sqrMagnitude);
                this.x *= f;
                this.y *= f;
            }
        }
        Magnitude() {
            return MathUtils_1.MathUtils.Sqrt(this.x * this.x + this.y * this.y);
        }
        SqrMagnitude() {
            return this.x * this.x + this.y * this.y;
        }
        Distance(vector) {
            return Vec2.Sub(vector, this).Magnitude();
        }
        DistanceSquared(vector) {
            return Vec2.Sub(vector, this).SqrMagnitude();
        }
        AproxEqualsBox(vector, tolerance) {
            return (MathUtils_1.MathUtils.Abs(this.x - vector.x) <= tolerance) &&
                (MathUtils_1.MathUtils.Abs(this.y - vector.y) <= tolerance);
        }
        ApproxEquals(vector, tolerance) {
            return this.Distance(vector) <= tolerance;
        }
        Angle(vector) {
            let vec = Vec2.Normalize(this);
            let val = vec.Dot(Vec2.Normalize(vector));
            val = val > 1 ? 1 : val;
            val = val < -1 ? -1 : val;
            return MathUtils_1.MathUtils.Acos(val);
        }
        Rotate(angle) {
            let x = this.x * MathUtils_1.MathUtils.Cos(angle) - this.y * MathUtils_1.MathUtils.Sin(angle);
            let y = this.x * MathUtils_1.MathUtils.Sin(angle) + this.y * MathUtils_1.MathUtils.Cos(angle);
            return new Vec2(x, y);
        }
        EqualsTo(v) {
            return Vec2.Equals(this, v);
        }
        ToString() {
            return `(${this.x}, ${this.y})`;
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
        static Negate(v) {
            v = v.Clone();
            return v.Negate();
        }
        static Normalize(v) {
            return Vec2.MulN(v, (1 / v.Magnitude()));
        }
        static NormalizeSafe(v) {
            let dis = v.Magnitude();
            if (dis == 0)
                return new Vec2();
            return Vec2.MulN(v, (1 / dis));
        }
        static Dot(v0, v1) {
            return v0.x * v1.x + v0.y * v1.y;
        }
        static Distance(v0, v1) {
            return Vec2.Sub(v1, v0).Magnitude();
        }
        static DistanceSquared(v0, v1) {
            return Vec2.Sub(v1, v0).SqrMagnitude();
        }
        static ClampMagnitude(v, maxLength) {
            let nor = v.Clone();
            let sqrMagnitude = nor.SqrMagnitude();
            if (sqrMagnitude > (maxLength * maxLength))
                nor = Vec2.MulN(nor, (maxLength / MathUtils_1.MathUtils.Sqrt(sqrMagnitude)));
            return nor;
        }
        static LerpUnclamped(from, to, t) {
            return new Vec2(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
        }
        static Lerp(from, to, t) {
            return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec2.LerpUnclamped(from, to, t));
        }
        static SlopeXy(v) {
            return v.x / v.y;
        }
        static SlopeYx(v) {
            return v.y / v.x;
        }
        static DegToRad(v) {
            return new Vec2(MathUtils_1.MathUtils.DegToRad(v.x), MathUtils_1.MathUtils.DegToRad(v.y));
        }
        static RadToDeg(v) {
            return new Vec2(MathUtils_1.MathUtils.RadToDeg(v.x), MathUtils_1.MathUtils.RadToDeg(v.y));
        }
        static Abs(v) {
            return new Vec2(MathUtils_1.MathUtils.Abs(v.x), MathUtils_1.MathUtils.Abs(v.y));
        }
        static Pow(v, value) {
            return new Vec2(MathUtils_1.MathUtils.Pow(v.x, value), MathUtils_1.MathUtils.Pow(v.y, value));
        }
        static Floor(v) {
            return new Vec2(MathUtils_1.MathUtils.Floor(v.x), MathUtils_1.MathUtils.Floor(v.y));
        }
        static Round(v) {
            return new Vec2(MathUtils_1.MathUtils.Round(v.x), MathUtils_1.MathUtils.Round(v.y));
        }
        static Equals(v1, v2) {
            if (v1 == null || v2 == null)
                return false;
            return v1.x == v2.x && v1.y == v2.y;
        }
    }
    exports.Vec2 = Vec2;
});
//# sourceMappingURL=Vec2.js.map