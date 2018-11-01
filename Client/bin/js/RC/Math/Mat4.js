define(["require", "exports", "./Vec4", "./Vec3", "./Quat", "./Mat3", "./MathUtils"], function (require, exports, Vec4_1, Vec3_1, Quat_1, Mat3_1, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Mat4 {
        static get identity() {
            return new Mat4(new Vec4_1.Vec4(1, 0, 0, 0), new Vec4_1.Vec4(0, 1, 0, 0), new Vec4_1.Vec4(0, 0, 1, 0), new Vec4_1.Vec4(0, 0, 0, 1));
        }
        ;
        constructor(x = Vec4_1.Vec4.zero, y = Vec4_1.Vec4.zero, z = Vec4_1.Vec4.zero, w = Vec4_1.Vec4.zero) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        CopyFrom(m) {
            this.x.CopyFrom(m.x);
            this.y.CopyFrom(m.y);
            this.z.CopyFrom(m.z);
            this.w.CopyFrom(m.w);
        }
        Clone() {
            let m = new Mat4();
            m.x = this.x.Clone();
            m.y = this.y.Clone();
            m.z = this.z.Clone();
            m.w = this.w.Clone();
            return m;
        }
        Add(m) {
            this.x.Add(m.x);
            this.y.Add(m.y);
            this.z.Add(m.z);
            this.w.Add(m.w);
            return this;
        }
        AddN(m) {
            this.x.AddN(m);
            this.y.AddN(m);
            this.z.AddN(m);
            this.w.AddN(m);
            return this;
        }
        Sub(m) {
            this.x.Sub(m.x);
            this.y.Sub(m.y);
            this.z.Sub(m.z);
            this.w.Sub(m.w);
            return this;
        }
        SubN(m) {
            this.x.SubN(m);
            this.y.SubN(m);
            this.z.SubN(m);
            this.w.SubN(m);
            return this;
        }
        SubN2(n) {
            this.x.SubN2(n);
            this.y.SubN2(n);
            this.z.SubN2(n);
            this.w.SubN2(n);
            return this;
        }
        Mul(m) {
            let xx = this.x.x * m.x.x + this.x.y * m.y.x + this.x.z * m.z.x + this.x.w * m.w.x;
            let xy = this.x.x * m.x.y + this.x.y * m.y.y + this.x.z * m.z.y + this.x.w * m.w.y;
            let xz = this.x.x * m.x.z + this.x.y * m.y.z + this.x.z * m.z.z + this.x.w * m.w.z;
            let xw = this.x.x * m.x.w + this.x.y * m.y.w + this.x.z * m.z.w + this.x.w * m.w.w;
            let yx = this.y.x * m.x.x + this.y.y * m.y.x + this.y.z * m.z.x + this.y.w * m.w.x;
            let yy = this.y.x * m.x.y + this.y.y * m.y.y + this.y.z * m.z.y + this.y.w * m.w.y;
            let yz = this.y.x * m.x.z + this.y.y * m.y.z + this.y.z * m.z.z + this.y.w * m.w.z;
            let yw = this.y.x * m.x.w + this.y.y * m.y.w + this.y.z * m.z.w + this.y.w * m.w.w;
            let zx = this.z.x * m.x.x + this.z.y * m.y.x + this.z.z * m.z.x + this.z.w * m.w.x;
            let zy = this.z.x * m.x.y + this.z.y * m.y.y + this.z.z * m.z.y + this.z.w * m.w.y;
            let zz = this.z.x * m.x.z + this.z.y * m.y.z + this.z.z * m.z.z + this.z.w * m.w.z;
            let zw = this.z.x * m.x.w + this.z.y * m.y.w + this.z.z * m.z.w + this.z.w * m.w.w;
            let wx = this.w.x * m.x.x + this.w.y * m.y.x + this.w.z * m.z.x + this.w.w * m.w.x;
            let wy = this.w.x * m.x.y + this.w.y * m.y.y + this.w.z * m.z.y + this.w.w * m.w.y;
            let wz = this.w.x * m.x.z + this.w.y * m.y.z + this.w.z * m.z.z + this.w.w * m.w.z;
            let ww = this.w.x * m.x.w + this.w.y * m.y.w + this.w.z * m.z.w + this.w.w * m.w.w;
            this.x.x = xx;
            this.x.y = xy;
            this.x.z = xz;
            this.x.w = xw;
            this.y.x = yx;
            this.y.y = yy;
            this.y.z = yz;
            this.y.w = yw;
            this.z.x = zx;
            this.z.y = zy;
            this.z.z = zz;
            this.z.w = zw;
            this.w.x = wx;
            this.w.y = wy;
            this.w.z = wz;
            this.w.w = ww;
            return this;
        }
        Mul2(m) {
            let xx = m.x.x * this.x.x + m.x.y * this.y.x + m.x.z * this.z.x + m.x.w * this.w.x;
            let xy = m.x.x * this.x.y + m.x.y * this.y.y + m.x.z * this.z.y + m.x.w * this.w.y;
            let xz = m.x.x * this.x.z + m.x.y * this.y.z + m.x.z * this.z.z + m.x.w * this.w.z;
            let xw = m.x.x * this.x.w + m.x.y * this.y.w + m.x.z * this.z.w + m.x.w * this.w.w;
            let yx = m.y.x * this.x.x + m.y.y * this.y.x + m.y.z * this.z.x + m.y.w * this.w.x;
            let yy = m.y.x * this.x.y + m.y.y * this.y.y + m.y.z * this.z.y + m.y.w * this.w.y;
            let yz = m.y.x * this.x.z + m.y.y * this.y.z + m.y.z * this.z.z + m.y.w * this.w.z;
            let yw = m.y.x * this.x.w + m.y.y * this.y.w + m.y.z * this.z.w + m.y.w * this.w.w;
            let zx = m.z.x * this.x.x + m.z.y * this.y.x + m.z.z * this.z.x + m.z.w * this.w.x;
            let zy = m.z.x * this.x.y + m.z.y * this.y.y + m.z.z * this.z.y + m.z.w * this.w.y;
            let zz = m.z.x * this.x.z + m.z.y * this.y.z + m.z.z * this.z.z + m.z.w * this.w.z;
            let zw = m.z.x * this.x.w + m.z.y * this.y.w + m.z.z * this.z.w + m.z.w * this.w.w;
            let wx = m.w.x * this.x.x + m.w.y * this.y.x + m.w.z * this.z.x + m.w.w * this.w.x;
            let wy = m.w.x * this.x.y + m.w.y * this.y.y + m.w.z * this.z.y + m.w.w * this.w.y;
            let wz = m.w.x * this.x.z + m.w.y * this.y.z + m.w.z * this.z.z + m.w.w * this.w.z;
            let ww = m.w.x * this.x.w + m.w.y * this.y.w + m.w.z * this.z.w + m.w.w * this.w.w;
            this.x.x = xx;
            this.x.y = xy;
            this.x.z = xz;
            this.x.w = xw;
            this.y.x = yx;
            this.y.y = yy;
            this.y.z = yz;
            this.y.w = yw;
            this.z.x = zx;
            this.z.y = zy;
            this.z.z = zz;
            this.z.w = zw;
            this.w.x = wx;
            this.w.y = wy;
            this.w.z = wz;
            this.w.w = ww;
            return this;
        }
        MulN(m) {
            this.x.MulN(m);
            this.y.MulN(m);
            this.z.MulN(m);
            this.w.MulN(m);
            return this;
        }
        Div(m) {
            this.x.Div(m.x);
            this.y.Div(m.y);
            this.z.Div(m.z);
            this.w.Div(m.w);
            return this;
        }
        DivN(m) {
            this.x.DivN(m);
            this.y.DivN(m);
            this.z.DivN(m);
            this.w.DivN(m);
            return this;
        }
        DivN2(n) {
            this.x.DivN2(n);
            this.y.DivN2(n);
            this.z.DivN2(n);
            this.w.DivN2(n);
            return this;
        }
        Transform(v) {
            return new Vec4_1.Vec4(v.x * this.x.x + v.y * this.y.x + v.z * this.z.x + v.w * this.w.x, v.x * this.x.y + v.y * this.y.y + v.z * this.z.y + v.w * this.w.y, v.x * this.x.z + v.y * this.y.z + v.z * this.z.z + v.w * this.w.z, v.x * this.x.w + v.y * this.y.w + v.z * this.z.w + v.w * this.w.w);
        }
        TransformPoint(v) {
            return new Vec3_1.Vec3(v.x * this.x.x + v.y * this.y.x + v.z * this.z.x + this.w.x, v.x * this.x.y + v.y * this.y.y + v.z * this.z.y + this.w.y, v.x * this.x.z + v.y * this.y.z + v.z * this.z.z + this.w.z);
        }
        TransformVector(v) {
            return new Vec3_1.Vec3(v.x * this.x.x + v.y * this.y.x + v.z * this.z.x, v.x * this.x.y + v.y * this.y.y + v.z * this.z.y, v.x * this.x.z + v.y * this.y.z + v.z * this.z.z);
        }
        Identity() {
            this.x.x = 1;
            this.x.y = 0;
            this.x.z = 0;
            this.x.w = 0;
            this.y.x = 0;
            this.y.y = 1;
            this.y.z = 0;
            this.y.w = 0;
            this.z.x = 0;
            this.z.y = 0;
            this.z.z = 1;
            this.z.w = 0;
            this.w.x = 0;
            this.w.y = 0;
            this.w.z = 0;
            this.w.w = 1;
            return this;
        }
        SetTranslate(translate) {
            this.w.x = translate.x;
            this.w.y = translate.y;
            this.w.z = translate.z;
            return this;
        }
        SetScale(scale) {
            this.x.x = scale.x;
            this.x.y = 0;
            this.x.z = 0;
            this.x.w = 0;
            this.y.x = 0;
            this.y.y = scale.y;
            this.y.z = 0;
            this.y.w = 0;
            this.z.x = 0;
            this.z.y = 0;
            this.z.z = scale.z;
            this.z.w = 0;
            this.w.x = 0;
            this.w.y = 0;
            this.w.z = 0;
            this.w.w = 1;
            return this;
        }
        SetRotation(quaternion) {
            let squared = new Vec4_1.Vec4(quaternion.x * quaternion.x, quaternion.y * quaternion.y, quaternion.z * quaternion.z, quaternion.w * quaternion.w);
            let invSqLength = 1 / (squared.x + squared.y + squared.z + squared.w);
            let temp1 = quaternion.x * quaternion.y;
            let temp2 = quaternion.z * quaternion.w;
            let temp3 = quaternion.x * quaternion.z;
            let temp4 = quaternion.y * quaternion.w;
            let temp5 = quaternion.y * quaternion.z;
            let temp6 = quaternion.x * quaternion.w;
            this.x.x = (squared.x - squared.y - squared.z + squared.w) * invSqLength;
            this.x.y = 2 * (temp1 + temp2) * invSqLength;
            this.x.z = 2 * (temp3 - temp4) * invSqLength;
            this.x.w = 0;
            this.y.x = 2 * (temp1 - temp2) * invSqLength;
            this.y.y = (-squared.x + squared.y - squared.z + squared.w) * invSqLength;
            this.y.z = 2 * (temp5 + temp6) * invSqLength;
            this.y.w = 0;
            this.z.x = 2 * (temp3 + temp4) * invSqLength;
            this.z.y = 2 * (temp5 - temp6) * invSqLength;
            this.z.z = (-squared.x - squared.y + squared.z + squared.w) * invSqLength;
            this.z.w = 0;
            this.w.x = 0;
            this.w.y = 0;
            this.w.z = 0;
            this.w.w = 1;
            return this;
        }
        Transpose() {
            let m00 = this.x.x;
            let m01 = this.y.x;
            let m02 = this.z.x;
            let m03 = this.w.x;
            let m10 = this.x.y;
            let m11 = this.y.y;
            let m12 = this.z.y;
            let m13 = this.w.y;
            let m20 = this.x.z;
            let m21 = this.y.z;
            let m22 = this.z.z;
            let m23 = this.w.z;
            let m30 = this.x.w;
            let m31 = this.y.w;
            let m32 = this.z.w;
            let m33 = this.w.w;
            this.x.x = m00;
            this.x.y = m01;
            this.x.z = m02;
            this.x.w = m03;
            this.y.x = m10;
            this.y.y = m11;
            this.y.z = m12;
            this.y.w = m13;
            this.z.x = m20;
            this.z.y = m21;
            this.z.z = m22;
            this.z.w = m23;
            this.w.x = m30;
            this.w.y = m31;
            this.w.z = m32;
            this.w.w = m33;
            return this;
        }
        Determinant() {
            let det1 = this.z.z * this.w.w - this.z.w * this.w.z;
            let det2 = this.z.y * this.w.w - this.z.w * this.w.y;
            let det3 = this.z.y * this.w.z - this.z.z * this.w.y;
            let det4 = this.z.x * this.w.w - this.z.w * this.w.x;
            let det5 = this.z.x * this.w.z - this.z.z * this.w.x;
            let det6 = this.z.x * this.w.y - this.z.y * this.w.x;
            return this.x.x * (this.y.y * det1 - this.y.z * det2 + this.y.w * det3) -
                this.x.y * (this.y.x * det1 - this.y.z * det4 + this.y.w * det5) +
                this.x.z * (this.y.x * det2 - this.y.y * det4 + this.y.w * det6) -
                this.x.w * (this.y.x * det3 - this.y.y * det5 + this.y.z * det6);
        }
        NonhomogeneousInvert() {
            let m3 = new Mat3_1.Mat3();
            m3.x.x = this.x.x;
            m3.x.y = this.x.y;
            m3.x.z = this.x.z;
            m3.y.x = this.y.x;
            m3.y.y = this.y.y;
            m3.y.z = this.y.z;
            m3.z.x = this.z.x;
            m3.z.y = this.z.y;
            m3.z.z = this.z.z;
            m3.Invert();
            let o = Mat4.identity;
            this.x.x = m3.x.x;
            this.x.y = m3.x.y;
            this.x.z = m3.x.z;
            this.y.x = m3.y.x;
            this.y.y = m3.y.y;
            this.y.z = m3.y.z;
            this.z.x = m3.z.x;
            this.z.y = m3.z.y;
            this.z.z = m3.z.z;
            let v = m3.Transform(new Vec3_1.Vec3(this.w.x, this.w.y, this.w.z));
            this.w.x = -v.x;
            this.w.y = -v.y;
            this.w.z = -v.z;
            return this;
        }
        Invert() {
            let determinant = 1 / this.Determinant();
            let m00 = (this.y.y * this.z.z * this.w.w + this.y.z * this.z.w * this.w.y + this.y.w * this.z.y * this.w.z -
                this.y.y * this.z.w * this.w.z - this.y.z * this.z.y * this.w.w - this.y.w * this.z.z * this.w.y) * determinant;
            let m01 = (this.x.y * this.z.w * this.w.z + this.x.z * this.z.y * this.w.w + this.x.w * this.z.z * this.w.y -
                this.x.y * this.z.z * this.w.w - this.x.z * this.z.w * this.w.y - this.x.w * this.z.y * this.w.z) * determinant;
            let m02 = (this.x.y * this.y.z * this.w.w + this.x.z * this.y.w * this.w.y + this.x.w * this.y.y * this.w.z -
                this.x.y * this.y.w * this.w.z - this.x.z * this.y.y * this.w.w - this.x.w * this.y.z * this.w.y) * determinant;
            let m03 = (this.x.y * this.y.w * this.z.z + this.x.z * this.y.y * this.z.w + this.x.w * this.y.z * this.z.y -
                this.x.y * this.y.z * this.z.w - this.x.z * this.y.w * this.z.y - this.x.w * this.y.y * this.z.z) * determinant;
            let m10 = (this.y.x * this.z.w * this.w.z + this.y.z * this.z.x * this.w.w + this.y.w * this.z.z * this.w.x -
                this.y.x * this.z.z * this.w.w - this.y.z * this.z.w * this.w.x - this.y.w * this.z.x * this.w.z) * determinant;
            let m11 = (this.x.x * this.z.z * this.w.w + this.x.z * this.z.w * this.w.x + this.x.w * this.z.x * this.w.z -
                this.x.x * this.z.w * this.w.z - this.x.z * this.z.x * this.w.w - this.x.w * this.z.z * this.w.x) * determinant;
            let m12 = (this.x.x * this.y.w * this.w.z + this.x.z * this.y.x * this.w.w + this.x.w * this.y.z * this.w.x -
                this.x.x * this.y.z * this.w.w - this.x.z * this.y.w * this.w.x - this.x.w * this.y.x * this.w.z) * determinant;
            let m13 = (this.x.x * this.y.z * this.z.w + this.x.z * this.y.w * this.z.x + this.x.w * this.y.x * this.z.z -
                this.x.x * this.y.w * this.z.z - this.x.z * this.y.x * this.z.w - this.x.w * this.y.z * this.z.x) * determinant;
            let m20 = (this.y.x * this.z.y * this.w.w + this.y.y * this.z.w * this.w.x + this.y.w * this.z.x * this.w.y -
                this.y.x * this.z.w * this.w.y - this.y.y * this.z.x * this.w.w - this.y.w * this.z.y * this.w.x) * determinant;
            let m21 = (this.x.x * this.z.w * this.w.y + this.x.y * this.z.x * this.w.w + this.x.w * this.z.y * this.w.x -
                this.x.x * this.z.y * this.w.w - this.x.y * this.z.w * this.w.x - this.x.w * this.z.x * this.w.y) * determinant;
            let m22 = (this.x.x * this.y.y * this.w.w + this.x.y * this.y.w * this.w.x + this.x.w * this.y.x * this.w.y -
                this.x.x * this.y.w * this.w.y - this.x.y * this.y.x * this.w.w - this.x.w * this.y.y * this.w.x) * determinant;
            let m23 = (this.x.x * this.y.w * this.z.y + this.x.y * this.y.x * this.z.w + this.x.w * this.y.y * this.z.x -
                this.x.x * this.y.y * this.z.w - this.x.y * this.y.w * this.z.x - this.x.w * this.y.x * this.z.y) * determinant;
            let m30 = (this.y.x * this.z.z * this.w.y + this.y.y * this.z.x * this.w.z + this.y.z * this.z.y * this.w.x -
                this.y.x * this.z.y * this.w.z - this.y.y * this.z.z * this.w.x - this.y.z * this.z.x * this.w.y) * determinant;
            let m31 = (this.x.x * this.z.y * this.w.z + this.x.y * this.z.z * this.w.x + this.x.z * this.z.x * this.w.y -
                this.x.x * this.z.z * this.w.y - this.x.y * this.z.x * this.w.z - this.x.z * this.z.y * this.w.x) * determinant;
            let m32 = (this.x.x * this.y.z * this.w.y + this.x.y * this.y.x * this.w.z + this.x.z * this.y.y * this.w.x -
                this.x.x * this.y.y * this.w.z - this.x.y * this.y.z * this.w.x - this.x.z * this.y.x * this.w.y) * determinant;
            let m33 = (this.x.x * this.y.y * this.z.z + this.x.y * this.y.z * this.z.x + this.x.z * this.y.x * this.z.y -
                this.x.x * this.y.z * this.z.y - this.x.y * this.y.x * this.z.z - this.x.z * this.y.y * this.z.x) * determinant;
            this.x.x = m00;
            this.x.y = m01;
            this.x.z = m02;
            this.x.w = m03;
            this.y.x = m10;
            this.y.y = m11;
            this.y.z = m12;
            this.y.w = m13;
            this.z.x = m20;
            this.z.y = m21;
            this.z.z = m22;
            this.z.w = m23;
            this.w.x = m30;
            this.w.y = m31;
            this.w.z = m32;
            this.w.w = m33;
            return this;
        }
        EqualsTo(m) {
            return Mat4.Equals(this, m);
        }
        ToString() {
            return `(${this.x.ToString()}, ${this.y.ToString()}, ${this.z.ToString()}, ${this.w.ToString()})`;
        }
        static FromScale(scale) {
            return new Mat4(new Vec4_1.Vec4(scale.x, 0, 0, 0), new Vec4_1.Vec4(0, scale.y, 0, 0), new Vec4_1.Vec4(0, 0, scale.z, 0), new Vec4_1.Vec4(0, 0, 0, 1));
        }
        static FromEuler(euler) {
            let eulerX = MathUtils_1.MathUtils.DegToRad(euler.x);
            let eulerY = MathUtils_1.MathUtils.DegToRad(euler.y);
            let eulerZ = MathUtils_1.MathUtils.DegToRad(euler.z);
            let cx = MathUtils_1.MathUtils.Cos(eulerX);
            let sx = MathUtils_1.MathUtils.Sin(eulerX);
            let cy = MathUtils_1.MathUtils.Cos(eulerY);
            let sy = MathUtils_1.MathUtils.Sin(eulerY);
            let cz = MathUtils_1.MathUtils.Cos(eulerZ);
            let sz = MathUtils_1.MathUtils.Sin(eulerZ);
            return new Mat4(new Vec4_1.Vec4(cy * cz, cy * sz, -sy, 0), new Vec4_1.Vec4(cz * sx * sy - cx * sz, cx * cz + sx * sy * sz, cy * sx, 0), new Vec4_1.Vec4(cx * cz * sy + sx * sz, -cz * sx + cx * sy * sz, cx * cy, 0), new Vec4_1.Vec4(0, 0, 0, 1));
        }
        static FromQuaternion(quaternion) {
            let squared = new Vec4_1.Vec4(quaternion.x * quaternion.x, quaternion.y * quaternion.y, quaternion.z * quaternion.z, quaternion.w * quaternion.w);
            let invSqLength = 1 / (squared.x + squared.y + squared.z + squared.w);
            let temp1 = quaternion.x * quaternion.y;
            let temp2 = quaternion.z * quaternion.w;
            let temp3 = quaternion.x * quaternion.z;
            let temp4 = quaternion.y * quaternion.w;
            let temp5 = quaternion.y * quaternion.z;
            let temp6 = quaternion.x * quaternion.w;
            return new Mat4(new Vec4_1.Vec4((squared.x - squared.y - squared.z + squared.w) * invSqLength, 2 * (temp1 + temp2) * invSqLength, 2 * (temp3 - temp4) * invSqLength, 0), new Vec4_1.Vec4(2 * (temp1 - temp2) * invSqLength, (-squared.x + squared.y - squared.z + squared.w) * invSqLength, 2 * (temp5 + temp6) * invSqLength, 0), new Vec4_1.Vec4(2 * (temp3 + temp4) * invSqLength, 2 * (temp5 - temp6) * invSqLength, (-squared.x - squared.y + squared.z + squared.w) * invSqLength, 0), new Vec4_1.Vec4(0, 0, 0, 1));
        }
        static FromRotationAxis(angle, axis) {
            let quaternion = Quat_1.Quat.AngleAxis(angle, axis);
            return Mat4.FromQuaternion(quaternion);
        }
        static FromTRS(pos, q, scale) {
            let m = Mat4.FromScale(scale).Mul(Mat4.FromQuaternion(q));
            m.w.x = pos.x;
            m.w.y = pos.y;
            m.w.z = pos.z;
            return m;
        }
        static NonhomogeneousInvert(m) {
            let m1 = m.Clone();
            m1.NonhomogeneousInvert();
            return m1;
        }
        static Invert(m) {
            m = m.Clone();
            return m.Invert();
        }
        static Transpose(m) {
            m = m.Clone();
            return m.Transpose();
        }
        static Equals(m1, m2) {
            if (m1 == null || m2 == null)
                return false;
            return m1.x.EqualsTo(m2.x) && m1.y.EqualsTo(m2.y) && m1.z.EqualsTo(m2.z) && m1.w.EqualsTo(m2.w);
        }
        static Abs(m) {
            return new Mat4(Vec4_1.Vec4.Abs(m.x), Vec4_1.Vec4.Abs(m.y), Vec4_1.Vec4.Abs(m.z), Vec4_1.Vec4.Abs(m.w));
        }
        static Add(m1, m2) {
            m1 = m1.Clone();
            return m1.Add(m2);
        }
        static AddN(m1, n) {
            m1 = m1.Clone();
            return m1.AddN(n);
        }
        static Sub(m1, m2) {
            m1 = m1.Clone();
            return m1.Sub(m2);
        }
        static SubN(m1, n) {
            m1 = m1.Clone();
            return m1.SubN(n);
        }
        static SubN2(n, p) {
            p = p.Clone();
            return p.SubN2(n);
        }
        static Mul(m1, m2) {
            m1 = m1.Clone();
            return m1.Mul(m2);
        }
        static Mul2(m1, m2) {
            m1 = m1.Clone();
            return m1.Mul2(m2);
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
        static View(position, lookAt, upVector) {
            let forward = Vec3_1.Vec3.Normalize(Vec3_1.Vec3.Sub(lookAt, position));
            let xVec = Vec3_1.Vec3.Normalize(forward.Cross(upVector));
            let up = xVec.Cross(forward);
            let result = new Mat4();
            result.x.x = xVec.x;
            result.x.y = xVec.y;
            result.x.z = xVec.z;
            result.x.w = Vec3_1.Vec3.Dot(position, Vec3_1.Vec3.Negate(xVec));
            result.y.x = up.x;
            result.y.y = up.y;
            result.y.z = up.z;
            result.y.w = Vec3_1.Vec3.Dot(position, Vec3_1.Vec3.Negate(up));
            result.z.x = -forward.x;
            result.z.y = -forward.y;
            result.z.z = -forward.z;
            result.z.w = Vec3_1.Vec3.Dot(position, forward);
            result.w.x = 0;
            result.w.y = 0;
            result.w.z = 0;
            result.w.w = 1;
            return result;
        }
        static Perspective(fov, aspect, near, far) {
            let top = near * MathUtils_1.MathUtils.Tan(fov * .5);
            let bottom = -top;
            let right = top * aspect;
            let left = -right;
            return Mat4.Frustum(left, right, bottom, top, near, far);
        }
        static Frustum(left, right, bottom, top, near, far) {
            let width = right - left;
            let height = top - bottom;
            let depth = far - near;
            let n = near * 2;
            let result = new Mat4();
            result.x.x = n / width;
            result.x.y = 0;
            result.x.z = (right + left) / width;
            result.x.w = 0;
            result.y.x = 0;
            result.y.y = n / height;
            result.y.z = (top + bottom) / height;
            result.y.w = 0;
            result.z.x = 0;
            result.z.y = 0;
            result.z.z = -(far + near) / depth;
            result.z.w = -(n * far) / depth;
            result.w.x = 0;
            result.w.y = 0;
            result.w.z = -1;
            result.w.w = 0;
            return result;
        }
        static Orthographic(left, right, bottom, top, near, far) {
            let width = right - left;
            let height = top - bottom;
            let depth = far - near;
            let result = new Mat4();
            ;
            result.x.x = 2 / width;
            result.x.y = 0;
            result.x.z = 0;
            result.x.w = -(right + left) / width;
            result.y.x = 0;
            result.y.y = 2 / height;
            result.y.z = 0;
            result.y.w = -(top + bottom) / height;
            result.z.x = 0;
            result.z.y = 0;
            result.z.z = -2 / depth;
            result.z.w = -(far + near) / depth;
            result.w.x = 0;
            result.w.y = 0;
            result.w.z = 0;
            result.w.w = 1;
            return result;
        }
        static OrthographicCentered(left, right, bottom, top, near, far) {
            let width = right - left;
            let height = top - bottom;
            let depth = far - near;
            let result = new Mat4();
            ;
            result.x.x = 2 / width;
            result.x.y = 0;
            result.x.z = 0;
            result.x.w = 0;
            result.y.x = 0;
            result.y.y = 2 / height;
            result.y.z = 0;
            result.y.w = 0;
            result.z.x = 0;
            result.z.y = 0;
            result.z.z = -2 / depth;
            result.z.w = -((far + near) / depth);
            result.w.x = 0;
            result.w.y = 0;
            result.w.z = 0;
            result.w.w = 1;
            return result;
        }
    }
    exports.Mat4 = Mat4;
});
//# sourceMappingURL=Mat4.js.map