"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = require("./Vec2");
class Mat2 {
    static get identity() {
        return new Mat2(new Vec2_1.Vec2(1, 0), new Vec2_1.Vec2(0, 1));
    }
    constructor(x = Vec2_1.Vec2.zero, y = Vec2_1.Vec2.zero) {
        this.x = x;
        this.y = y;
    }
    CopyFrom(m) {
        this.x.CopyFrom(m.x);
        this.y.CopyFrom(m.y);
    }
    Clone() {
        let m = new Mat2();
        m.x = this.x.Clone();
        m.y = this.y.Clone();
        return m;
    }
    Add(p2) {
        this.x.Add(p2.x);
        this.y.Add(p2.y);
        return this;
    }
    AddN(p2) {
        this.x.AddN(p2);
        this.y.AddN(p2);
        return this;
    }
    Sub(p2) {
        this.x.Sub(p2.x);
        this.y.Sub(p2.y);
        return this;
    }
    SubN(p2) {
        this.x.SubN(p2);
        this.y.SubN(p2);
        return this;
    }
    SubN2(n) {
        this.x.SubN2(n);
        this.y.SubN2(n);
        return this;
    }
    Mul(m) {
        let xx = this.x.x * m.x.x + this.x.y * m.y.x;
        let xy = this.x.x * m.x.y + this.x.y * m.y.y;
        let yx = this.y.x * m.x.x + this.y.y * m.y.x;
        let yy = this.y.x * m.x.y + this.y.y * m.y.y;
        this.x.x = xx;
        this.x.y = xy;
        this.y.x = yx;
        this.y.y = yy;
        return this;
    }
    Mul2(m) {
        let xx = m.x.x * this.x.x + m.x.y * this.y.x;
        let xy = m.x.x * this.x.y + m.x.y * this.y.y;
        let yx = m.y.x * this.x.x + m.y.y * this.y.x;
        let yy = m.y.x * this.x.y + m.y.y * this.y.y;
        this.x.x = xx;
        this.x.y = xy;
        this.y.x = yx;
        this.y.y = yy;
        return this;
    }
    MulN(p2) {
        this.x.MulN(p2);
        this.y.MulN(p2);
        return this;
    }
    Div(p2) {
        this.x.Div(p2.x);
        this.y.Div(p2.y);
        return this;
    }
    DivN(p2) {
        this.x.DivN(p2);
        this.y.DivN(p2);
        return this;
    }
    DivN2(n) {
        this.x.DivN2(n);
        this.y.DivN2(n);
        return this;
    }
    Identity() {
        this.x.x = 1;
        this.x.y = 0;
        this.y.x = 0;
        this.y.y = 1;
    }
    Transform(v) {
        return new Vec2_1.Vec2(v.x * this.x.x + v.y * this.y.x, v.x * this.x.y + v.y * this.y.y);
    }
    Transpose() {
        let m00 = this.x.x;
        let m01 = this.y.x;
        let m10 = this.x.y;
        let m11 = this.y.y;
        this.x.x = m00;
        this.x.y = m01;
        this.y.x = m10;
        this.y.y = m11;
        return this;
    }
    Determinant() {
        return this.x.x * this.y.y - this.x.y * this.y.x;
    }
    Invert() {
        let determinant = 1 / (this.x.x * this.y.y - this.x.y * this.y.x);
        let m00 = this.y.y * determinant;
        let m01 = -this.x.y * determinant;
        let m10 = -this.y.x * determinant;
        let m11 = this.x.x * determinant;
        this.x.x = m00;
        this.x.y = m01;
        this.y.x = m10;
        this.y.y = m11;
        return this;
    }
    EqualsTo(m) {
        return Mat2.Equals(this, m);
    }
    ToString() {
        return `(${this.x.ToString()}, ${this.y.ToString()})`;
    }
    static FromCross(xVector) {
        return new Mat2(xVector, new Vec2_1.Vec2(-xVector.y, xVector.x));
    }
    static Abs(m) {
        return new Mat2(Vec2_1.Vec2.Abs(m.x), Vec2_1.Vec2.Abs(m.y));
    }
    static Transpose(m) {
        m = m.Clone();
        return m.Transpose();
    }
    static Invert(m) {
        m = m.Clone();
        return m.Invert();
    }
    static Add(m1, m2) {
        m1 = m1.Clone();
        return m1.Add(m2);
    }
    static AddN(m, n) {
        m = m.Clone();
        return m.AddN(n);
    }
    static Sub(m1, m2) {
        m1 = m1.Clone();
        return m1.Sub(m2);
    }
    static SubN(m, n) {
        m = m.Clone();
        return m.SubN(n);
    }
    static SubN2(n, m) {
        m = m.Clone();
        return m.SubN2(n);
    }
    static Mul(m1, m2) {
        m1 = m1.Clone();
        return m1.Mul(m2);
    }
    static MulN(m, n) {
        m = m.Clone();
        return m.MulN(n);
    }
    static Div(m1, m2) {
        m1 = m1.Clone();
        return m1.Div(m2);
    }
    static DivN(m, n) {
        m = m.Clone();
        return m.DivN(n);
    }
    static DivN2(n, m) {
        m = m.Clone();
        return m.DivN2(n);
    }
    static Equals(m1, m2) {
        if (m1 == null || m2 == null)
            return false;
        return m1.x.EqualsTo(m2.x) && m1.y.EqualsTo(m2.y);
    }
}
exports.Mat2 = Mat2;
