import Decimal from "../Libs/decimal";
import { MathUtils } from "./Math/MathUtils";
export class FVec2 {
    static get one() {
        return new FVec2(MathUtils.D_ONE, MathUtils.D_ONE);
    }
    static get minusOne() {
        return new FVec2(MathUtils.D_N_ONE, MathUtils.D_N_ONE);
    }
    static get zero() {
        return new FVec2(MathUtils.D_ZERO, MathUtils.D_ZERO);
    }
    static get right() {
        return new FVec2(MathUtils.D_ONE, MathUtils.D_ZERO);
    }
    ;
    static get left() {
        return new FVec2(MathUtils.D_N_ONE, MathUtils.D_ZERO);
    }
    ;
    static get up() {
        return new FVec2(MathUtils.D_ZERO, MathUtils.D_ONE);
    }
    ;
    static get down() {
        return new FVec2(MathUtils.D_ZERO, MathUtils.D_N_ONE);
    }
    ;
    constructor(x = new Decimal(0), y = new Decimal(0)) {
        this.x = x;
        this.y = y;
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
        let f = MathUtils.D_ONE.div(this.Magnitude());
        this.x = this.x.mul(f);
        this.y = this.y.mul(f);
    }
    NormalizeSafe() {
        let f = this.Magnitude();
        if (f.equals(MathUtils.D_ZERO))
            return;
        this.x = this.x.mul(f);
        this.y = this.y.mul(f);
    }
    ClampMagnitude(maxLength) {
        let sqrMagnitude = this.SqrMagnitude();
        if (sqrMagnitude.greaterThan(maxLength.mul(maxLength))) {
            let f = maxLength.sub(sqrMagnitude.sqrt());
            this.x = this.x.mul(f);
            this.y = this.y.mul(f);
        }
    }
    Magnitude() {
        return Decimal.sqrt(this.x.mul(this.x).add(this.y.mul(this.y)));
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
        return (Decimal.abs(this.x.sub(vector.x)).lessThanOrEqualTo(tolerance)) &&
            (Decimal.abs(this.y.sub(vector.y)).lessThanOrEqualTo(tolerance));
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
        return FVec2.MulN(v, (MathUtils.D_ONE.div(v.Magnitude())));
    }
    static NormalizeSafe(v) {
        let dis = v.Magnitude();
        if (dis.equals(MathUtils.D_ZERO))
            return null;
        return FVec2.MulN(v, (MathUtils.D_ONE.div(dis)));
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
        let sqrMagnitude = nor.SqrMagnitude();
        if (sqrMagnitude.greaterThan(maxLength.mul(maxLength)))
            nor = FVec2.MulN(nor, (maxLength.div(sqrMagnitude.sqrt())));
        return nor;
    }
    static LerpUnclamped(from, to, t) {
        return new FVec2(from.x.add(to.x.sub(from.x).mul(t)), from.y.add(to.y.sub(from.y).mul(t)));
    }
    static Lerp(from, to, t) {
        return t.lessThanOrEqualTo(MathUtils.D_ZERO) ? from.Clone() : (t.greaterThanOrEqualTo(MathUtils.D_ONE) ? to.Clone() : FVec2.LerpUnclamped(from, to, t));
    }
    static Equals(v1, v2) {
        if (v1 == null || v2 == null)
            return false;
        return v1.x == v2.x && v1.y == v2.y;
    }
}
