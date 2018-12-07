define(["require", "exports", "../../Libs/decimal", "../Math/MathUtils"], function (require, exports, decimal_1, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FVec2 {
        static get one() {
            return new FVec2(MathUtils_1.MathUtils.D_ONE, MathUtils_1.MathUtils.D_ONE);
        }
        static get minusOne() {
            return new FVec2(MathUtils_1.MathUtils.D_N_ONE, MathUtils_1.MathUtils.D_N_ONE);
        }
        static get zero() {
            return new FVec2(MathUtils_1.MathUtils.D_ZERO, MathUtils_1.MathUtils.D_ZERO);
        }
        static get right() {
            return new FVec2(MathUtils_1.MathUtils.D_ONE, MathUtils_1.MathUtils.D_ZERO);
        }
        ;
        static get left() {
            return new FVec2(MathUtils_1.MathUtils.D_N_ONE, MathUtils_1.MathUtils.D_ZERO);
        }
        ;
        static get up() {
            return new FVec2(MathUtils_1.MathUtils.D_ZERO, MathUtils_1.MathUtils.D_ONE);
        }
        ;
        static get down() {
            return new FVec2(MathUtils_1.MathUtils.D_ZERO, MathUtils_1.MathUtils.D_N_ONE);
        }
        ;
        constructor(x, y) {
            this.x = new decimal_1.default(x == null ? 0 : x);
            this.y = new decimal_1.default(y == null ? 0 : y);
        }
        Set(x, y) {
            this.x = new decimal_1.default(x);
            this.y = new decimal_1.default(y);
        }
        Clone() {
            const v = new FVec2();
            v.x = new decimal_1.default(this.x);
            v.y = new decimal_1.default(this.y);
            return v;
        }
        CopyFrom(v) {
            this.x = new decimal_1.default(v.x);
            this.y = new decimal_1.default(v.y);
        }
        Add(v) {
            this.x = this.x.add(v.x);
            this.y = this.y.add(v.y);
            return this;
        }
        AddN(n) {
            this.x = this.x.add(n);
            this.y = this.y.add(n);
            return this;
        }
        Sub(v) {
            this.x = this.x.sub(v.x);
            this.y = this.y.sub(v.y);
            return this;
        }
        SubN(n) {
            this.x = this.x.sub(n);
            this.y = this.y.sub(n);
            return this;
        }
        SubN2(n) {
            this.x = n.sub(this.x);
            this.y = n.sub(this.y);
            return this;
        }
        Mul(v) {
            this.x = this.x.mul(v.x);
            this.y = this.y.mul(v.y);
            return this;
        }
        MulN(n) {
            this.x = this.x.mul(n);
            this.y = this.y.mul(n);
            return this;
        }
        Div(v) {
            this.x = this.x.div(v.x);
            this.y = this.y.div(v.y);
            return this;
        }
        DivN(n) {
            this.x = this.x.div(n);
            this.y = this.y.div(n);
            return this;
        }
        DivN2(n) {
            this.x = n.div(this.x);
            this.y = n.div(this.y);
            return this;
        }
        Negate() {
            this.x = this.x.neg();
            this.y = this.y.neg();
            return this;
        }
        Scale(scale) {
            this.x = this.x.mul(scale.x);
            this.y = this.y.mul(scale.y);
        }
        Dot(v) {
            return this.x.mul(v.x).add(this.y.mul(v.y));
        }
        Normalize() {
            const f = MathUtils_1.MathUtils.D_ONE.div(this.Magnitude());
            this.x = this.x.mul(f);
            this.y = this.y.mul(f);
        }
        NormalizeSafe() {
            const f = this.Magnitude();
            if (f.equals(MathUtils_1.MathUtils.D_ZERO))
                return;
            this.x = this.x.mul(f);
            this.y = this.y.mul(f);
        }
        ClampMagnitude(maxLength) {
            const sqrMagnitude = this.SqrMagnitude();
            if (sqrMagnitude.greaterThan(maxLength.mul(maxLength))) {
                const f = maxLength.sub(sqrMagnitude.sqrt());
                this.x = this.x.mul(f);
                this.y = this.y.mul(f);
            }
        }
        Magnitude() {
            return decimal_1.default.sqrt(this.x.mul(this.x).add(this.y.mul(this.y)));
        }
        SqrMagnitude() {
            return this.x.mul(this.x).add(this.y.mul(this.y));
        }
        Distance(vector) {
            return FVec2.Sub(vector, this).Magnitude();
        }
        DistanceSquared(vector) {
            return FVec2.Sub(vector, this).SqrMagnitude();
        }
        AproxEqualsBox(vector, tolerance) {
            return (decimal_1.default.abs(this.x.sub(vector.x)).lessThanOrEqualTo(tolerance)) &&
                (decimal_1.default.abs(this.y.sub(vector.y)).lessThanOrEqualTo(tolerance));
        }
        ApproxEquals(vector, tolerance) {
            return this.Distance(vector).lessThanOrEqualTo(tolerance);
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
            return FVec2.MulN(v, (MathUtils_1.MathUtils.D_ONE.div(v.Magnitude())));
        }
        static NormalizeSafe(v) {
            const dis = v.Magnitude();
            if (dis.equals(MathUtils_1.MathUtils.D_ZERO))
                return null;
            return FVec2.MulN(v, (MathUtils_1.MathUtils.D_ONE.div(dis)));
        }
        static Dot(v0, v1) {
            return v0.x.mul(v1.x).add(v0.y.mul(v1.y));
        }
        static Distance(v0, v1) {
            return FVec2.Sub(v1, v0).Magnitude();
        }
        static DistanceSquared(v0, v1) {
            return FVec2.Sub(v1, v0).SqrMagnitude();
        }
        static ClampMagnitude(v, maxLength) {
            let nor = v.Clone();
            const sqrMagnitude = nor.SqrMagnitude();
            if (sqrMagnitude.greaterThan(maxLength.mul(maxLength)))
                nor = FVec2.MulN(nor, (maxLength.div(sqrMagnitude.sqrt())));
            return nor;
        }
        static LerpUnclamped(from, to, t) {
            return new FVec2(from.x.add(to.x.sub(from.x).mul(t)), from.y.add(to.y.sub(from.y).mul(t)));
        }
        static Lerp(from, to, t) {
            return t.lessThanOrEqualTo(MathUtils_1.MathUtils.D_ZERO) ? from.Clone() : (t.greaterThanOrEqualTo(MathUtils_1.MathUtils.D_ONE) ? to.Clone() : FVec2.LerpUnclamped(from, to, t));
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