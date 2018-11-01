define(["require", "exports", "./MathUtils", "./Quat"], function (require, exports, MathUtils_1, Quat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vec3 {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        static get one() {
            return new Vec3(1, 1, 1);
        }
        static get minusOne() {
            return new Vec3(-1, -1, -1);
        }
        static get zero() {
            return new Vec3(0, 0, 0);
        }
        static get right() {
            return new Vec3(1, 0, 0);
        }
        ;
        static get left() {
            return new Vec3(-1, 0, 0);
        }
        ;
        static get up() {
            return new Vec3(0, 1, 0);
        }
        ;
        static get down() {
            return new Vec3(0, -1, 0);
        }
        ;
        static get forward() {
            return new Vec3(0, 0, 1);
        }
        ;
        static get backward() {
            return new Vec3(0, 0, -1);
        }
        ;
        static get positiveInfinityVector() {
            return new Vec3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        }
        ;
        static get negativeInfinityVector() {
            return new Vec3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        }
        ;
        Clone() {
            let v = new Vec3();
            v.x = this.x;
            v.y = this.y;
            v.z = this.z;
            return v;
        }
        CopyFrom(v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        }
        Set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Clamp(min, max) {
            this.x = MathUtils_1.MathUtils.Clamp(this.x, min.x, max.x);
            this.y = MathUtils_1.MathUtils.Clamp(this.y, min.y, max.y);
            this.z = MathUtils_1.MathUtils.Clamp(this.z, min.z, max.z);
            return this;
        }
        Add(v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        }
        AddN(n) {
            this.x += n;
            this.y += n;
            this.z += n;
            return this;
        }
        Sub(v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        }
        SubN(n) {
            this.x -= n;
            this.y -= n;
            this.z -= n;
            return this;
        }
        SubN2(n) {
            this.x = n - this.x;
            this.y = n - this.y;
            this.z = n - this.z;
            return this;
        }
        Negate() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        }
        Mul(v) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
            return this;
        }
        MulN(n) {
            this.x *= n;
            this.y *= n;
            this.z *= n;
            return this;
        }
        Div(v) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
            return this;
        }
        DivN(n) {
            this.x /= n;
            this.y /= n;
            this.z /= n;
            return this;
        }
        DivN2(n) {
            this.x = n / this.x;
            this.y = n / this.y;
            this.z = n / this.z;
            return this;
        }
        ClampMagnitude(maxLength) {
            let sqrMagnitude = this.SqrMagnitude();
            if (sqrMagnitude > maxLength * maxLength) {
                let f = maxLength / MathUtils_1.MathUtils.Sqrt(sqrMagnitude);
                this.x *= f;
                this.y *= f;
                this.z *= f;
            }
        }
        Magnitude() {
            return MathUtils_1.MathUtils.Sqrt(this.SqrMagnitude());
        }
        SqrMagnitude() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        }
        Distance(vector) {
            return Vec3.Sub(vector, this).Magnitude();
        }
        DistanceSquared(vector) {
            return Vec3.Sub(vector, this).SqrMagnitude();
        }
        Scale(scale) {
            this.x *= scale.x;
            this.y *= scale.y;
            this.z *= scale.z;
        }
        Dot(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }
        Cross(v) {
            return new Vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
        }
        Normalize() {
            let f = 1 / this.Magnitude();
            this.x *= f;
            this.y *= f;
            this.z *= f;
        }
        NormalizeSafe() {
            let f = this.Magnitude();
            if (f == 0)
                return;
            this.x *= f;
            this.y *= f;
            this.z *= f;
        }
        AproxEqualsBox(vector, tolerance) {
            return (MathUtils_1.MathUtils.Abs(this.x - vector.x) <= tolerance) && (MathUtils_1.MathUtils.Abs(this.y - vector.y) <= tolerance) && (MathUtils_1.MathUtils.Abs(this.z - vector.z) <= tolerance);
        }
        ApproxEquals(vector, tolerance) {
            return this.Distance(vector) <= tolerance;
        }
        RotateAround(angle, axis) {
            let quaternion = Quat_1.Quat.AngleAxis(0, axis);
            quaternion = quaternion.Conjugate();
            let worldSpaceVector = quaternion.Transform(this);
            quaternion = Quat_1.Quat.AngleAxis(angle, axis);
            worldSpaceVector = quaternion.Transform(worldSpaceVector);
            return worldSpaceVector;
        }
        IntersectsTriangle(p0, p1, p2) {
            let v0 = Vec3.Sub(p1, p0);
            let v1 = Vec3.Sub(p2, p0);
            let v2 = Vec3.Sub(this, p0);
            let dot00 = v0.SqrMagnitude();
            let dot01 = v0.Dot(v1);
            let dot02 = v0.Dot(v2);
            let dot11 = v1.SqrMagnitude();
            let dot12 = v1.Dot(v2);
            let invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
            let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            let v = (dot00 * dot12 - dot01 * dot02) * invDenom;
            return (u > 0) && (v > 0) && (u + v < 1);
        }
        Reflect(planeNormal) {
            return Vec3.Sub(this, Vec3.MulN(planeNormal, this.Dot(planeNormal) * 2));
        }
        Refract(normal, refractionIndex) {
            let cosI = -normal.Dot(this);
            let sinT2 = refractionIndex * refractionIndex * (1.0 - cosI * cosI);
            if (sinT2 > 1.0)
                return this;
            let cosT = MathUtils_1.MathUtils.Sqrt(1.0 - sinT2);
            return Vec3.Add(Vec3.MulN(this, refractionIndex), Vec3.MulN(normal, (refractionIndex * cosI - cosT)));
        }
        InersectNormal(normal) {
            return Vec3.MulN(normal, this.Dot(normal));
        }
        InersectRay(rayOrigin, rayDirection) {
            let v = Vec3.Sub(this, rayOrigin);
            return Vec3.Add(Vec3.MulN(rayDirection, v.Dot(rayDirection)), rayOrigin);
        }
        InersectLine(line) {
            let pointOffset = Vec3.Sub(this, line.point1);
            let vector = Vec3.Normalize(Vec3.Sub(line.point2, line.point1));
            return Vec3.Add(Vec3.MulN(vector, pointOffset.Dot(vector)), line.point1);
        }
        InersectPlane(planeNormal, planeLocation) {
            let v = Vec3.Sub(this, planeLocation);
            return Vec3.Sub(this, Vec3.MulN(planeNormal, v.Dot(planeNormal)));
        }
        EqualsTo(v) {
            return Vec3.Equals(this, v);
        }
        ToString() {
            return `(${this.x}, ${this.y}, ${this.z})`;
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
        static Equals(v1, v2) {
            if (v1 == null || v2 == null)
                return false;
            return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z;
        }
        static Distance(v0, v1) {
            return Vec3.Sub(v1, v0).Magnitude();
        }
        static DistanceSquared(v0, v1) {
            return Vec3.Sub(v1, v0).SqrMagnitude();
        }
        static Angle(from, to) {
            let v = Vec3.Dot(Vec3.Normalize(from), Vec3.Normalize(to));
            return MathUtils_1.MathUtils.Acos(MathUtils_1.MathUtils.Clamp(v, -1, 1)) * MathUtils_1.MathUtils.RAD_TO_DEG;
        }
        static ClampMagnitude(v, maxLength) {
            let nor = v.Clone();
            let sqrMagnitude = nor.SqrMagnitude();
            if (sqrMagnitude > (maxLength * maxLength))
                nor = Vec3.MulN(nor, (maxLength / MathUtils_1.MathUtils.Sqrt(sqrMagnitude)));
            return nor;
        }
        static Normalize(v) {
            return Vec3.MulN(v, (1 / v.Magnitude()));
        }
        static NormalizeSafe(v) {
            let dis = v.Magnitude();
            if (dis == 0)
                return Vec3.zero;
            return Vec3.MulN(v, 1 / dis);
        }
        static Dot(v0, v1) {
            return v0.Dot(v1);
        }
        static Cross(v0, v1) {
            return v0.Cross(v1);
        }
        static OrthoNormalVector(v) {
            let res = new Vec3();
            if (MathUtils_1.MathUtils.Abs(v.z) > Vec3.OVER_SQRT2) {
                let a = v.y * v.y + v.z * v.z;
                let k = 1 / MathUtils_1.MathUtils.Sqrt(a);
                res.x = 0;
                res.y = -v.z * k;
                res.z = v.y * k;
            }
            else {
                let a = v.x * v.x + v.y * v.y;
                let k = 1 / MathUtils_1.MathUtils.Sqrt(a);
                res.x = -v.y * k;
                res.y = v.x * k;
                res.z = 0;
            }
            return res;
        }
        static SlerpUnclamped(from, to, t) {
            let scale0;
            let scale1;
            let len2 = to.Magnitude();
            let len1 = from.Magnitude();
            let v2 = Vec3.DivN(to, len2);
            let v1 = Vec3.DivN(from, len1);
            let len = (len2 - len1) * t + len1;
            let cosom = Vec3.Dot(v1, v2);
            if (cosom > 1 - 1e-6) {
                scale0 = 1 - t;
                scale1 = t;
            }
            else if (cosom < -1 + 1e-6) {
                let axis = Vec3.OrthoNormalVector(from);
                let q = Quat_1.Quat.AngleAxis(180.0 * t, axis);
                let v = Vec3.MulN(q.Transform(from), len);
                return v;
            }
            else {
                let omega = MathUtils_1.MathUtils.Acos(cosom);
                let sinom = MathUtils_1.MathUtils.Sin(omega);
                scale0 = MathUtils_1.MathUtils.Sin((1 - t) * omega) / sinom;
                scale1 = MathUtils_1.MathUtils.Sin(t * omega) / sinom;
            }
            v2 = Vec3.MulN(Vec3.Add(Vec3.MulN(v2, scale1), Vec3.MulN(v1, scale0)), len);
            return v2;
        }
        static Slerp(from, to, t) {
            return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec3.SlerpUnclamped(from, to, t));
        }
        static LerpUnclamped(from, to, t) {
            return new Vec3(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.z + (to.z - from.z) * t);
        }
        static Lerp(from, to, t) {
            return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec3.LerpUnclamped(from, to, t));
        }
        static SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
            smoothTime = MathUtils_1.MathUtils.Max(0.0001, smoothTime);
            let num = 2 / smoothTime;
            let num2 = num * deltaTime;
            let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
            let maxLength = maxSpeed * smoothTime;
            let vector = Vec3.Sub(current, target);
            vector.ClampMagnitude(maxLength);
            target = Vec3.Sub(current, vector);
            let v = Vec3.MulN(Vec3.Add(currentVelocity[0], Vec3.MulN(vector, num)), deltaTime);
            currentVelocity[0] = Vec3.MulN(Vec3.Sub(currentVelocity[0], Vec3.MulN(v, num)), num3);
            let v2 = Vec3.Add(target, Vec3.MulN(Vec3.Add(vector, v), num3));
            if (Vec3.Dot(Vec3.Sub(target, current), Vec3.Sub(v2, target)) > 0) {
                v2 = target;
                currentVelocity[0].Set(0, 0, 0);
            }
            return v2;
        }
        static MoveTowards(current, target, maxDistanceDelta) {
            let delta = Vec3.Sub(target, current);
            let sqrDelta = delta.SqrMagnitude();
            let sqrDistance = maxDistanceDelta * maxDistanceDelta;
            if (sqrDelta > sqrDistance) {
                let magnitude = MathUtils_1.MathUtils.Sqrt(sqrDelta);
                if (magnitude > 1e-6) {
                    delta = Vec3.Add(Vec3.DivN(Vec3.MulN(delta, maxDistanceDelta), magnitude), current);
                    return delta;
                }
                return current.Clone();
            }
            return target.Clone();
        }
        static ClampedMove(lhs, rhs, clampedDelta) {
            let delta = rhs - lhs;
            if (delta > 0)
                return lhs + MathUtils_1.MathUtils.Min(delta, clampedDelta);
            return lhs - MathUtils_1.MathUtils.Min(-delta, clampedDelta);
        }
        static RotateTowards(current, target, maxRadiansDelta, maxMagnitudeDelta) {
            let len1 = current.Magnitude();
            let len2 = target.Magnitude();
            if (len1 > 1e-6 && len2 > 1e-6) {
                let from = Vec3.DivN(current, len1);
                let to = Vec3.DivN(target, len2);
                let cosom = Vec3.Dot(from, to);
                if (cosom > 1 - 1e-6)
                    return Vec3.MoveTowards(current, target, maxMagnitudeDelta);
                if (cosom < -1 + 1e-6) {
                    let q = Quat_1.Quat.AngleAxis(maxRadiansDelta * MathUtils_1.MathUtils.RAD_TO_DEG, Vec3.OrthoNormalVector(from));
                    return Vec3.MulN(q.Transform(from), Vec3.ClampedMove(len1, len2, maxMagnitudeDelta));
                }
                else {
                    let angle = MathUtils_1.MathUtils.Acos(cosom);
                    let q = Quat_1.Quat.AngleAxis(MathUtils_1.MathUtils.Min(maxRadiansDelta, angle) * MathUtils_1.MathUtils.RAD_TO_DEG, Vec3.Normalize(Vec3.Cross(from, to)));
                    return Vec3.MulN(q.Transform(from), Vec3.ClampedMove(len1, len2, maxMagnitudeDelta));
                }
            }
            return Vec3.MoveTowards(current, target, maxMagnitudeDelta);
        }
        static OrthoNormalize(va, vb, vc) {
            va[0].Normalize();
            vb[0] = Vec3.Sub(vb[0], Vec3.Project(vb[0], va[0]));
            vb[0].Normalize();
            vc[0] = Vec3.Sub(vc[0], Vec3.Project(vc[0], va[0]));
            vc[0] = Vec3.Sub(vc[0], Vec3.Project(vc[0], vb[0]));
            vc[0].Normalize();
        }
        static Project(vector, onNormal) {
            let num = onNormal.SqrMagnitude();
            if (num < 1.175494e-38)
                return Vec3.zero;
            let num2 = Vec3.Dot(vector, onNormal);
            let v3 = Vec3.MulN(onNormal, (num2 / num));
            return v3;
        }
        static ProjectOnPlane(vector, planeNormal) {
            return Vec3.Add(Vec3.Negate(Vec3.Project(vector, planeNormal)), vector);
        }
        static Reflect(inDirection, inNormal) {
            let num = -2 * Vec3.Dot(inNormal, inDirection);
            inNormal = Vec3.MulN(inNormal, num);
            inNormal = Vec3.Add(inNormal, inDirection);
            return inNormal;
        }
        static Hermite(value1, tangent1, value2, tangent2, t) {
            let weightSquared = t * t;
            let weightCubed = t * weightSquared;
            let value1Blend = 2 * weightCubed - 3 * weightSquared + 1;
            let tangent1Blend = weightCubed - 2 * weightSquared + t;
            let value2Blend = -2 * weightCubed + 3 * weightSquared;
            let tangent2Blend = weightCubed - weightSquared;
            return new Vec3(value1.x * value1Blend + value2.x * value2Blend + tangent1.x * tangent1Blend + tangent2.x * tangent2Blend, value1.y * value1Blend + value2.y * value2Blend + tangent1.y * tangent1Blend + tangent2.y * tangent2Blend, value1.z * value1Blend + value2.z * value2Blend + tangent1.z * tangent1Blend + tangent2.z * tangent2Blend);
        }
        static DegToRad(v) {
            return new Vec3(MathUtils_1.MathUtils.DegToRad(v.x), MathUtils_1.MathUtils.DegToRad(v.y), MathUtils_1.MathUtils.DegToRad(v.z));
        }
        static RadToDeg(v) {
            return new Vec3(MathUtils_1.MathUtils.RadToDeg(v.x), MathUtils_1.MathUtils.RadToDeg(v.y), MathUtils_1.MathUtils.RadToDeg(v.z));
        }
        static MaxN(v, value) {
            return new Vec3(MathUtils_1.MathUtils.Max(v.x, value), MathUtils_1.MathUtils.Max(v.y, value), MathUtils_1.MathUtils.Max(v.z, value));
        }
        static Max(v, v1) {
            return new Vec3(MathUtils_1.MathUtils.Max(v.x, v1.x), MathUtils_1.MathUtils.Max(v.y, v1.y), MathUtils_1.MathUtils.Max(v.z, v1.z));
        }
        static MinN(v, v1) {
            return new Vec3(MathUtils_1.MathUtils.Min(v.x, v1), MathUtils_1.MathUtils.Min(v.y, v1), MathUtils_1.MathUtils.Min(v.z, v1));
        }
        static Min(v, v1) {
            return new Vec3(MathUtils_1.MathUtils.Min(v.x, v1.x), MathUtils_1.MathUtils.Min(v.y, v1.y), MathUtils_1.MathUtils.Min(v.z, v1.z));
        }
        static Abs(v) {
            return new Vec3(MathUtils_1.MathUtils.Abs(v.x), MathUtils_1.MathUtils.Abs(v.y), MathUtils_1.MathUtils.Abs(v.z));
        }
        static Pow(v, value) {
            return new Vec3(MathUtils_1.MathUtils.Pow(v.x, value), MathUtils_1.MathUtils.Pow(v.y, value), MathUtils_1.MathUtils.Pow(v.z, value));
        }
        static Floor(v) {
            return new Vec3(MathUtils_1.MathUtils.Floor(v.x), MathUtils_1.MathUtils.Floor(v.y), MathUtils_1.MathUtils.Floor(v.z));
        }
        static Round(v) {
            return new Vec3(MathUtils_1.MathUtils.Round(v.x), MathUtils_1.MathUtils.Round(v.y), MathUtils_1.MathUtils.Round(v.z));
        }
    }
    Vec3.OVER_SQRT2 = 0.7071067811865475244008443621048490;
    exports.Vec3 = Vec3;
});
//# sourceMappingURL=Vec3.js.map