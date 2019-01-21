"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec3_1 = require("./Vec3");
const MathUtils_1 = require("./MathUtils");
class Quat {
    static get identity() {
        return new Quat(0, 0, 0, 1);
    }
    get xyz() {
        return new Vec3_1.Vec3(this.x, this.y, this.z);
    }
    set xyz(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }
    set eulerAngles(value) {
        let q = Quat.FromEulerRad(Vec3_1.Vec3.MulN(value, MathUtils_1.MathUtils.DEG_TO_RAD));
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        this.w = q.w;
    }
    get eulerAngles() {
        return Vec3_1.Vec3.MulN(Quat.ToEulerRad(this), MathUtils_1.MathUtils.RAD_TO_DEG);
    }
    get length() {
        return MathUtils_1.MathUtils.Sqrt(this.lengthSquared);
    }
    get lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    Clone() {
        let q = new Quat();
        q.x = this.x;
        q.y = this.y;
        q.z = this.z;
        q.w = this.w;
        return q;
    }
    CopyFrom(q) {
        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        this.w = q.w;
    }
    Set(newX, newY, newZ, newW) {
        this.x = newX;
        this.y = newY;
        this.z = newZ;
        this.w = newW;
    }
    Normalize() {
        let l = this.length;
        if (l == 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
            return;
        }
        let scale = 1.0 / l;
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        this.w *= scale;
    }
    static Normalize(q) {
        let scale = 1.0 / q.length;
        let result = new Quat(q.x * scale, q.y * scale, q.z * scale, q.w * scale);
        return result;
    }
    static Dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }
    Transform(v) {
        let x2 = this.x + this.x;
        let y2 = this.y + this.y;
        let z2 = this.z + this.z;
        let xx2 = this.x * x2;
        let xy2 = this.x * y2;
        let xz2 = this.x * z2;
        let yy2 = this.y * y2;
        let yz2 = this.y * z2;
        let zz2 = this.z * z2;
        let wx2 = this.w * x2;
        let wy2 = this.w * y2;
        let wz2 = this.w * z2;
        return new Vec3_1.Vec3(v.x * (1 - yy2 - zz2) + v.y * (xy2 - wz2) + v.z * (xz2 + wy2), v.x * (xy2 + wz2) + v.y * (1 - xx2 - zz2) + v.z * (yz2 - wx2), v.x * (xz2 - wy2) + v.y * (yz2 + wx2) + v.z * (1 - xx2 - yy2));
    }
    static AngleAxis(angle, axis) {
        let result = Quat.identity;
        let thetaOver2 = angle * MathUtils_1.MathUtils.DEG_TO_RAD * 0.5;
        let sinThetaOver2 = MathUtils_1.MathUtils.Sin(thetaOver2);
        result.x = axis.x * sinThetaOver2;
        result.y = axis.y * sinThetaOver2;
        result.z = axis.z * sinThetaOver2;
        result.w = MathUtils_1.MathUtils.Cos(thetaOver2);
        return result;
    }
    ToAngleAxis() {
        let result = Quat.ToAxisAngleRad(this);
        Vec3_1.Vec3.MulN(result[1], MathUtils_1.MathUtils.RAD_TO_DEG);
        return result;
    }
    static FromToRotation(from, to) {
        let result = Quat.identity;
        let dot = from.Dot(to);
        if (dot < -1 + 1e-6) {
            let v = Vec3_1.Vec3.Normalize(Quat.Orthogonal(from));
            result.Set(v.x, v.y, v.z, 0);
        }
        else if (dot > 1 - 1e-6) {
            result.Set(0, 0, 0, 1);
        }
        else {
            let angle = MathUtils_1.MathUtils.Acos(dot);
            let axis = Vec3_1.Vec3.Normalize(from.Cross(to));
            let thetaOver2 = angle * 0.5;
            let sinThetaOver2 = MathUtils_1.MathUtils.Sin(thetaOver2);
            result.x = axis.x * sinThetaOver2;
            result.y = axis.y * sinThetaOver2;
            result.z = axis.z * sinThetaOver2;
            result.w = MathUtils_1.MathUtils.Cos(thetaOver2);
        }
        return result;
    }
    static Orthogonal(v) {
        let x = MathUtils_1.MathUtils.Abs(v.x);
        let y = MathUtils_1.MathUtils.Abs(v.y);
        let z = MathUtils_1.MathUtils.Abs(v.z);
        let other = x < y ? (x < z ? Vec3_1.Vec3.right : Vec3_1.Vec3.forward) : (y < z ? Vec3_1.Vec3.up : Vec3_1.Vec3.forward);
        return Vec3_1.Vec3.Cross(v, other);
    }
    static LookRotation(forward, upwards) {
        forward = Vec3_1.Vec3.Normalize(forward);
        let right = Vec3_1.Vec3.Normalize(upwards.Cross(forward));
        upwards = forward.Cross(right);
        let m00 = right.x;
        let m01 = right.y;
        let m02 = right.z;
        let m10 = upwards.x;
        let m11 = upwards.y;
        let m12 = upwards.z;
        let m20 = forward.x;
        let m21 = forward.y;
        let m22 = forward.z;
        let num8 = m00 + m11 + m22;
        let quaternion = new Quat();
        if (num8 > 0) {
            let num = MathUtils_1.MathUtils.Sqrt(num8 + 1);
            quaternion.w = num * 0.5;
            num = 0.5 / num;
            quaternion.x = (m12 - m21) * num;
            quaternion.y = (m20 - m02) * num;
            quaternion.z = (m01 - m10) * num;
            return quaternion;
        }
        if ((m00 >= m11) &&
            (m00 >= m22)) {
            let num7 = MathUtils_1.MathUtils.Sqrt(1 + m00 - m11 - m22);
            let num4 = 0.5 / num7;
            quaternion.x = 0.5 * num7;
            quaternion.y = (m01 + m10) * num4;
            quaternion.z = (m02 + m20) * num4;
            quaternion.w = (m12 - m21) * num4;
            return quaternion;
        }
        if (m11 > m22) {
            let num6 = MathUtils_1.MathUtils.Sqrt(1 + m11 - m00 - m22);
            let num3 = 0.5 / num6;
            quaternion.x = (m10 + m01) * num3;
            quaternion.y = 0.5 * num6;
            quaternion.z = (m21 + m12) * num3;
            quaternion.w = (m20 - m02) * num3;
            return quaternion;
        }
        let num5 = MathUtils_1.MathUtils.Sqrt(1 + m22 - m00 - m11);
        let num2 = 0.5 / num5;
        quaternion.x = (m20 + m02) * num2;
        quaternion.y = (m21 + m12) * num2;
        quaternion.z = 0.5 * num5;
        quaternion.w = (m01 - m10) * num2;
        return quaternion;
    }
    SetLookRotation(view, up) {
        let rot = Quat.LookRotation(view, up);
        this.Set(rot.x, rot.y, rot.z, rot.w);
    }
    Conjugate() {
        return new Quat(-this.x, -this.y, -this.z, this.w);
    }
    static Slerp(a, b, t) {
        t = MathUtils_1.MathUtils.Clamp(t, 0, 1);
        return Quat.SlerpUnclamped(a, b, t);
    }
    static SlerpUnclamped(a, b, t) {
        if (a.lengthSquared == 0.0) {
            if (b.lengthSquared == 0.0)
                return Quat.identity;
            return b;
        }
        if (b.lengthSquared == 0.0)
            return a;
        let cosHalfAngle = a.w * b.w + a.xyz.Dot(b.xyz);
        if (cosHalfAngle >= 1.0 ||
            cosHalfAngle <= -1.0) {
            return a;
        }
        if (cosHalfAngle < 0.0) {
            b.xyz = Vec3_1.Vec3.Negate(b.xyz);
            b.w = -b.w;
            cosHalfAngle = -cosHalfAngle;
        }
        let blendA;
        let blendB;
        if (cosHalfAngle < 0.99) {
            let halfAngle = MathUtils_1.MathUtils.Acos(cosHalfAngle);
            let sinHalfAngle = MathUtils_1.MathUtils.Sin(halfAngle);
            let oneOverSinHalfAngle = 1.0 / sinHalfAngle;
            blendA = MathUtils_1.MathUtils.Sin(halfAngle * (1.0 - t)) * oneOverSinHalfAngle;
            blendB = MathUtils_1.MathUtils.Sin(halfAngle * t) * oneOverSinHalfAngle;
        }
        else {
            blendA = 1.0 - t;
            blendB = t;
        }
        let v = Vec3_1.Vec3.Add(Vec3_1.Vec3.MulN(a.xyz, blendA), Vec3_1.Vec3.MulN(b.xyz, blendB));
        let result = new Quat(v.x, v.y, v.z, blendA * a.w + blendB * b.w);
        if (result.lengthSquared > 0.0)
            return Quat.Normalize(result);
        return Quat.identity;
    }
    static Lerp(q1, q2, t) {
        t = MathUtils_1.MathUtils.Clamp(t, 0, 1);
        return Quat.LerpUnclamped(q1, q2, t);
    }
    static LerpUnclamped(q1, q2, t) {
        let q = Quat.identity;
        if (Quat.Dot(q1, q2) < 0) {
            q.x = q1.x + t * (-q2.x - q1.x);
            q.y = q1.y + t * (-q2.y - q1.y);
            q.z = q1.z + t * (-q2.z - q1.z);
            q.w = q1.w + t * (-q2.w - q1.w);
        }
        else {
            q.x = q1.x + (q2.x - q1.x) * t;
            q.y = q1.y + (q2.y - q1.y) * t;
            q.z = q1.z + (q2.z - q1.z) * t;
            q.w = q1.w + (q2.w - q1.w) * t;
        }
        q.Normalize();
        return q;
    }
    static RotateTowards(from, to, maxDegreesDelta) {
        let num = Quat.Angle(from, to);
        if (num == 0)
            return to;
        let t = MathUtils_1.MathUtils.Min(1, maxDegreesDelta / num);
        return Quat.SlerpUnclamped(from, to, t);
    }
    static Invert(rotation) {
        let lengthSq = rotation.lengthSquared;
        if (lengthSq != 0.0) {
            let i = 1.0 / lengthSq;
            let v = Vec3_1.Vec3.MulN(rotation.xyz, -i);
            return new Quat(v.x, v.y, v.z, rotation.w * i);
        }
        return rotation;
    }
    ToString() {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }
    static Angle(a, b) {
        let f = Quat.Dot(a, b);
        return MathUtils_1.MathUtils.Acos(MathUtils_1.MathUtils.Min(MathUtils_1.MathUtils.Abs(f), 1)) * 2 * MathUtils_1.MathUtils.RAD_TO_DEG;
    }
    static Euler(euler) {
        return Quat.FromEulerRad(Vec3_1.Vec3.MulN(euler, MathUtils_1.MathUtils.DEG_TO_RAD));
    }
    static ToEulerRad(rotation) {
        let sqw = rotation.w * rotation.w;
        let sqx = rotation.x * rotation.x;
        let sqy = rotation.y * rotation.y;
        let sqz = rotation.z * rotation.z;
        let unit = sqx + sqy + sqz + sqw;
        let test = rotation.x * rotation.w - rotation.y * rotation.z;
        let v = new Vec3_1.Vec3();
        if (test > 0.4995 * unit) {
            v.y = 2 * MathUtils_1.MathUtils.Atan2(rotation.y, rotation.x);
            v.x = MathUtils_1.MathUtils.PI / 2;
            v.z = 0;
            return Quat.NormalizeAngles(Vec3_1.Vec3.MulN(v, MathUtils_1.MathUtils.RAD_TO_DEG));
        }
        if (test < -0.4995 * unit) {
            v.y = -2 * MathUtils_1.MathUtils.Atan2(rotation.y, rotation.x);
            v.x = -MathUtils_1.MathUtils.PI / 2;
            v.z = 0;
            return Quat.NormalizeAngles(Vec3_1.Vec3.MulN(v, MathUtils_1.MathUtils.RAD_TO_DEG));
        }
        let q = new Quat(rotation.w, rotation.z, rotation.x, rotation.y);
        v.y = MathUtils_1.MathUtils.Atan2(2 * q.x * q.w + 2 * q.y * q.z, 1 - 2 * (q.z * q.z + q.w * q.w));
        v.x = MathUtils_1.MathUtils.Asin(2 * (q.x * q.z - q.w * q.y));
        v.z = MathUtils_1.MathUtils.Atan2(2 * q.x * q.y + 2 * q.z * q.w, 1 - 2 * (q.y * q.y + q.z * q.z));
        return Quat.NormalizeAngles(Vec3_1.Vec3.MulN(v, MathUtils_1.MathUtils.RAD_TO_DEG));
    }
    static NormalizeAngles(angles) {
        angles.x = Quat.NormalizeAngle(angles.x);
        angles.y = Quat.NormalizeAngle(angles.y);
        angles.z = Quat.NormalizeAngle(angles.z);
        return angles;
    }
    static NormalizeAngle(angle) {
        while (angle > 360)
            angle -= 360;
        while (angle < 0)
            angle += 360;
        return angle;
    }
    static FromEulerRad(euler) {
        let yaw = euler.x;
        let pitch = euler.y;
        let roll = euler.z;
        let yawOver2 = yaw * 0.5;
        let cosYawOver2 = MathUtils_1.MathUtils.Cos(yawOver2);
        let sinYawOver2 = MathUtils_1.MathUtils.Sin(yawOver2);
        let pitchOver2 = pitch * 0.5;
        let cosPitchOver2 = MathUtils_1.MathUtils.Cos(pitchOver2);
        let sinPitchOver2 = MathUtils_1.MathUtils.Sin(pitchOver2);
        let rollOver2 = roll * 0.5;
        let cosRollOver2 = MathUtils_1.MathUtils.Cos(rollOver2);
        let sinRollOver2 = MathUtils_1.MathUtils.Sin(rollOver2);
        let result = new Quat();
        result.w = cosYawOver2 * cosPitchOver2 * cosRollOver2 + sinYawOver2 * sinPitchOver2 * sinRollOver2;
        result.x = sinYawOver2 * cosPitchOver2 * cosRollOver2 + cosYawOver2 * sinPitchOver2 * sinRollOver2;
        result.y = cosYawOver2 * sinPitchOver2 * cosRollOver2 - sinYawOver2 * cosPitchOver2 * sinRollOver2;
        result.z = cosYawOver2 * cosPitchOver2 * sinRollOver2 - sinYawOver2 * sinPitchOver2 * cosRollOver2;
        return result;
    }
    static ToAxisAngleRad(q) {
        if (MathUtils_1.MathUtils.Abs(q.w) > 1.0)
            q = Quat.Normalize(q);
        let angle = 2.0 * MathUtils_1.MathUtils.Acos(q.w);
        let den = MathUtils_1.MathUtils.Sqrt(1.0 - q.w * q.w);
        let axis;
        if (den > 0.0001)
            axis = Vec3_1.Vec3.DivN(q.xyz, den);
        else {
            axis = new Vec3_1.Vec3(1, 0, 0);
        }
        return [angle, axis];
    }
    static Equals(q1, q2) {
        if (q1 == null || q2 == null)
            return false;
        return q1.x == q2.x && q1.y == q2.y && q1.z == q2.z && q1.w == q2.w;
    }
    EqualsTo(q) {
        return Quat.Equals(this, q);
    }
    static Mul(lhs, rhs) {
        return new Quat(lhs.w * rhs.x + lhs.x * rhs.w + lhs.y * rhs.z - lhs.z * rhs.y, lhs.w * rhs.y + lhs.y * rhs.w + lhs.z * rhs.x - lhs.x * rhs.z, lhs.w * rhs.z + lhs.z * rhs.w + lhs.x * rhs.y - lhs.y * rhs.x, lhs.w * rhs.w - lhs.x * rhs.x - lhs.y * rhs.y - lhs.z * rhs.z);
    }
}
exports.Quat = Quat;
