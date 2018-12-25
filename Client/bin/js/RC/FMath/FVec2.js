define(["require", "exports", "./FMathUtils"], function (require, exports, FMathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FVec2 {
        static get one() {
            return new FVec2(1, 1);
        }
        static get minusOne() {
            return new FVec2(-1, -1);
        }
        static get zero() {
            return new FVec2(0, 0);
        }
        static get right() {
            return new FVec2(1, 0);
        }
        ;
        static get left() {
            return new FVec2(-1, 0);
        }
        ;
        static get up() {
            return new FVec2(0, 1);
        }
        ;
        static get down() {
            return new FVec2(0, -1);
        }
        ;
        constructor(x = 0, y = 0) {
            this.Set(x, y);
        }
        Set(x, y) {
            this.x = x;
            this.y = y;
        }
        Clone() {
            let v = new FVec2();
            v.x = this.x;
            v.y = this.y;
            return v;
        }
        CopyFrom(v) {
            this.x = v.x;
            this.y = v.y;
        }
        Clamp(min, max) {
            this.Set(FMathUtils_1.FMathUtils.Clamp(this.x, min.x, max.x), FMathUtils_1.FMathUtils.Clamp(this.y, min.y, max.y));
            return this;
        }
        Add(v) {
            this.x = FMathUtils_1.FMathUtils.Add(this.x, v.x);
            this.y = FMathUtils_1.FMathUtils.Add(this.y, v.y);
            return this;
        }
        AddN(n) {
            this.x = FMathUtils_1.FMathUtils.Add(this.x, n);
            this.y = FMathUtils_1.FMathUtils.Add(this.y, n);
            return this;
        }
        Sub(v) {
            this.x = FMathUtils_1.FMathUtils.Sub(this.x, v.x);
            this.y = FMathUtils_1.FMathUtils.Sub(this.y, v.y);
            return this;
        }
        SubN(n) {
            this.x = FMathUtils_1.FMathUtils.Sub(this.x, n);
            this.y = FMathUtils_1.FMathUtils.Sub(this.y, n);
            return this;
        }
        SubN2(n) {
            this.x = FMathUtils_1.FMathUtils.Sub(n, this.x);
            this.y = FMathUtils_1.FMathUtils.Sub(n, this.y);
            return this;
        }
        Mul(v) {
            this.x = FMathUtils_1.FMathUtils.Mul(this.x, v.x);
            this.y = FMathUtils_1.FMathUtils.Mul(this.y, v.y);
            return this;
        }
        MulN(n) {
            this.x = FMathUtils_1.FMathUtils.Mul(this.x, n);
            this.y = FMathUtils_1.FMathUtils.Mul(this.y, n);
            return this;
        }
        Div(v) {
            this.x = FMathUtils_1.FMathUtils.Div(this.x, v.x);
            this.y = FMathUtils_1.FMathUtils.Div(this.y, v.y);
            return this;
        }
        DivN(n) {
            this.x = FMathUtils_1.FMathUtils.Div(this.x, n);
            this.y = FMathUtils_1.FMathUtils.Div(this.y, n);
            return this;
        }
        DivN2(n) {
            this.x = FMathUtils_1.FMathUtils.Div(n, this.x);
            this.y = FMathUtils_1.FMathUtils.Div(n, this.y);
            return this;
        }
        Negate() {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        }
        Dot(v) {
            return FMathUtils_1.FMathUtils.Add(FMathUtils_1.FMathUtils.Mul(this.x, v.x), FMathUtils_1.FMathUtils.Mul(this.y, v.y));
        }
        Magnitude() {
            return FMathUtils_1.FMathUtils.Sqrt(this.SqrMagnitude());
        }
        SqrMagnitude() {
            return FMathUtils_1.FMathUtils.Add(FMathUtils_1.FMathUtils.Mul(this.x, this.x), FMathUtils_1.FMathUtils.Mul(this.y, this.y));
        }
        Normalize() {
            let f = FMathUtils_1.FMathUtils.Div(1, this.Magnitude());
            this.MulN(f);
        }
        NormalizeSafe() {
            let f = this.Magnitude();
            if (f == 0)
                return;
            this.MulN(f);
        }
        ClampMagnitude(maxLength) {
            let sqrMagnitude = this.SqrMagnitude();
            if (sqrMagnitude > FMathUtils_1.FMathUtils.Mul(maxLength, maxLength)) {
                let f = FMathUtils_1.FMathUtils.Div(maxLength, FMathUtils_1.FMathUtils.Sqrt(sqrMagnitude));
                this.MulN(f);
            }
        }
        Distance(vector) {
            return FVec2.Sub(vector, this).Magnitude();
        }
        DistanceSquared(vector) {
            return FVec2.Sub(vector, this).SqrMagnitude();
        }
        AproxEqualsBox(vector, tolerance) {
            return FMathUtils_1.FMathUtils.Abs(FMathUtils_1.FMathUtils.Sub(this.x, vector.x)) <= tolerance &&
                FMathUtils_1.FMathUtils.Abs(FMathUtils_1.FMathUtils.Sub(this.y, vector.y)) <= tolerance;
        }
        ApproxEquals(vector, tolerance) {
            return this.Distance(vector) <= tolerance;
        }
        Angle(vector) {
            const vec = FVec2.Normalize(this);
            let val = vec.Dot(FVec2.Normalize(vector));
            val = val > 1 ? 1 : val;
            val = val < -1 ? -1 : val;
            return FMathUtils_1.FMathUtils.Acos(val);
        }
        static Angle(v1, v2) {
            return v1.Angle(v2);
        }
        Rotate(angle) {
            const x = FMathUtils_1.FMathUtils.Sub(FMathUtils_1.FMathUtils.Mul(this.x, FMathUtils_1.FMathUtils.Cos(angle)), FMathUtils_1.FMathUtils.Mul(this.y, FMathUtils_1.FMathUtils.Sin(angle)));
            const y = FMathUtils_1.FMathUtils.Add(FMathUtils_1.FMathUtils.Mul(this.x, FMathUtils_1.FMathUtils.Sin(angle)), FMathUtils_1.FMathUtils.Mul(this.y, FMathUtils_1.FMathUtils.Cos(angle)));
            this.Set(x, y);
        }
        static Rotate(v, angle) {
            const x = FMathUtils_1.FMathUtils.Sub(FMathUtils_1.FMathUtils.Mul(v.x, FMathUtils_1.FMathUtils.Cos(angle)), FMathUtils_1.FMathUtils.Mul(v.y, FMathUtils_1.FMathUtils.Sin(angle)));
            const y = FMathUtils_1.FMathUtils.Add(FMathUtils_1.FMathUtils.Mul(v.x, FMathUtils_1.FMathUtils.Sin(angle)), FMathUtils_1.FMathUtils.Mul(v.y, FMathUtils_1.FMathUtils.Cos(angle)));
            return new FVec2(x, y);
        }
        EqualsTo(v) {
            return FVec2.Equals(this, v);
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
            return FVec2.MulN(v, FMathUtils_1.FMathUtils.Div(1, v.Magnitude()));
        }
        static NormalizeSafe(v) {
            let dis = v.Magnitude();
            if (dis == 0)
                return new FVec2();
            return FVec2.MulN(v, FMathUtils_1.FMathUtils.Div(1, dis));
        }
        static Dot(v0, v1) {
            return v0.Dot(v1);
        }
        static Distance(v0, v1) {
            return v0.Distance(v1);
        }
        static DistanceSquared(v0, v1) {
            return v0.DistanceSquared(v1);
        }
        static ClampMagnitude(v, maxLength) {
            let nor = v.Clone();
            let sqrMagnitude = nor.SqrMagnitude();
            if (sqrMagnitude > FMathUtils_1.FMathUtils.Mul(maxLength, maxLength)) {
                let f = FMathUtils_1.FMathUtils.Div(maxLength, FMathUtils_1.FMathUtils.Sqrt(sqrMagnitude));
                nor.MulN(f);
            }
            return nor;
        }
        static LerpUnclamped(from, to, t) {
            return new FVec2(FMathUtils_1.FMathUtils.Add(from.x, FMathUtils_1.FMathUtils.Mul(FMathUtils_1.FMathUtils.Sub(to.x, from.x), t)), FMathUtils_1.FMathUtils.Add(from.y, FMathUtils_1.FMathUtils.Mul(FMathUtils_1.FMathUtils.Sub(to.y, from.y), t)));
        }
        static Lerp(from, to, t) {
            return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : FVec2.LerpUnclamped(from, to, t));
        }
        static SlopeXy(v) {
            return FMathUtils_1.FMathUtils.Div(v.x, v.y);
        }
        static SlopeYx(v) {
            return FMathUtils_1.FMathUtils.Div(v.y, v.x);
        }
        static DegToRad(v) {
            return new FVec2(FMathUtils_1.FMathUtils.DegToRad(v.x), FMathUtils_1.FMathUtils.DegToRad(v.y));
        }
        static RadToDeg(v) {
            return new FVec2(FMathUtils_1.FMathUtils.RadToDeg(v.x), FMathUtils_1.FMathUtils.RadToDeg(v.y));
        }
        static Abs(v) {
            return new FVec2(FMathUtils_1.FMathUtils.Abs(v.x), FMathUtils_1.FMathUtils.Abs(v.y));
        }
        static Pow(v, value) {
            return new FVec2(FMathUtils_1.FMathUtils.Pow(v.x, value), FMathUtils_1.FMathUtils.Pow(v.y, value));
        }
        static Floor(v) {
            return new FVec2(FMathUtils_1.FMathUtils.Floor(v.x), FMathUtils_1.FMathUtils.Floor(v.y));
        }
        static Round(v) {
            return new FVec2(FMathUtils_1.FMathUtils.Round(v.x), FMathUtils_1.FMathUtils.Round(v.y));
        }
        static Equals(v1, v2) {
            if (v1 == null || v2 == null)
                return false;
            return v1.x == v2.x && v1.y == v2.y;
        }
    }
    exports.FVec2 = FVec2;
});
//# sourceMappingURL=FVec2.js.map