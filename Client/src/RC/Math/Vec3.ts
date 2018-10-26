import { MathUtils } from "./MathUtils";

import { Quat } from "./Quat";

import { Line3 } from "./Line3";

export class Vec3 {
	public x: number;
	public y: number;
	public z: number;

	public static readonly OVER_SQRT2: number = 0.7071067811865475244008443621048490;

	public static get one(): Vec3 {
		return new Vec3(1, 1, 1);
	}
	public static get minusOne(): Vec3 {
		return new Vec3(-1, -1, -1);
	}
	public static get zero(): Vec3 {
		return new Vec3(0, 0, 0);
	}
	public static get right(): Vec3 {
		return new Vec3(1, 0, 0);
	};
	public static get left(): Vec3 {
		return new Vec3(-1, 0, 0);
	};
	public static get up(): Vec3 {
		return new Vec3(0, 1, 0);
	};
	public static get down(): Vec3 {
		return new Vec3(0, -1, 0);
	};
	public static get forward(): Vec3 {
		return new Vec3(0, 0, 1);
	};
	public static get backward(): Vec3 {
		return new Vec3(0, 0, -1);
	};
	public static get positiveInfinityVector(): Vec3 {
		return new Vec3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	};
	public static get negativeInfinityVector(): Vec3 {
		return new Vec3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
	};

	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public Clone(): Vec3 {
		let v = new Vec3();
		v.x = this.x;
		v.y = this.y;
		v.z = this.z;
		return v;
	}

	public CopyFrom(v: Vec3): void {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	}

	public Set(x: number, y: number, z: number): void {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public Clamp(min: Vec3, max: Vec3): Vec3 {
		this.x = MathUtils.Clamp(this.x, min.x, max.x);
		this.y = MathUtils.Clamp(this.y, min.y, max.y);
		this.z = MathUtils.Clamp(this.z, min.z, max.z);
		return this;
	}

	public Add(v: Vec3): Vec3 {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}

	public AddN(n: number): Vec3 {
		this.x += n;
		this.y += n;
		this.z += n;
		return this;
	}

	public Sub(v: Vec3): Vec3 {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	}

	public SubN(n: number): Vec3 {
		this.x -= n;
		this.y -= n;
		this.z -= n;
		return this;
	}

	public SubN2(n: number): Vec3 {
		this.x = n - this.x;
		this.y = n - this.y;
		this.z = n - this.z;
		return this;
	}

	public Negate(): Vec3 {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this;
	}

	public Mul(v: Vec3): Vec3 {
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		return this;
	}

	public MulN(n: number): Vec3 {
		this.x *= n;
		this.y *= n;
		this.z *= n;
		return this;
	}

	public Div(v: Vec3): Vec3 {
		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;
		return this;
	}

	public DivN(n: number): Vec3 {
		this.x /= n;
		this.y /= n;
		this.z /= n;
		return this;
	}

	public DivN2(n: number): Vec3 {
		this.x = n / this.x;
		this.y = n / this.y;
		this.z = n / this.z;
		return this;
	}

	public ClampMagnitude(maxLength: number): void {
		let sqrMagnitude = this.SqrMagnitude();
		if (sqrMagnitude > maxLength * maxLength) {
			let f = maxLength / MathUtils.Sqrt(sqrMagnitude);
			this.x *= f;
			this.y *= f;
			this.z *= f;
		}
	}

	public Magnitude(): number {
		return MathUtils.Sqrt(this.SqrMagnitude());
	}

	public SqrMagnitude(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}

	public Distance(vector: Vec3): number {
		return Vec3.Sub(vector, this).Magnitude();
	}

	public DistanceSquared(vector: Vec3): number {
		return Vec3.Sub(vector, this).SqrMagnitude();
	}

	public Scale(scale: Vec3): void {
		this.x *= scale.x;
		this.y *= scale.y;
		this.z *= scale.z;
	}

	public Dot(v: Vec3): number {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	public Cross(v: Vec3): Vec3 {
		return new Vec3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	}

	public Normalize(): void {
		let f = 1 / this.Magnitude();
		this.x *= f;
		this.y *= f;
		this.z *= f;
	}

	public NormalizeSafe(): void {
		let f = this.Magnitude();
		if (f == 0)
			return;
		this.x *= f;
		this.y *= f;
		this.z *= f;
	}

	public AproxEqualsBox(vector: Vec3, tolerance: number): boolean {
		return (MathUtils.Abs(this.x - vector.x) <= tolerance) && (MathUtils.Abs(this.y - vector.y) <= tolerance) && (MathUtils.Abs(this.z - vector.z) <= tolerance);
	}

	public ApproxEquals(vector: Vec3, tolerance: number): boolean {
		return this.Distance(vector) <= tolerance;
	}

	public RotateAround(angle: number, axis: Vec3): Vec3 {
		// rotate numbero world space
		let quaternion = Quat.AngleAxis(0, axis);
		quaternion = quaternion.Conjugate();
		let worldSpaceVector = quaternion.Transform(this);

		// rotate back to vector space
		quaternion = Quat.AngleAxis(angle, axis);
		worldSpaceVector = quaternion.Transform(worldSpaceVector);
		return worldSpaceVector;
	}

	public IntersectsTriangle(p0: Vec3, p1: Vec3, p2: Vec3): boolean {
		let v0 = Vec3.Sub(p1, p0);
		let v1 = Vec3.Sub(p2, p0);
		let v2 = Vec3.Sub(this, p0);

		let dot00 = v0.SqrMagnitude();
		let dot01 = v0.Dot(v1);
		let dot02 = v0.Dot(v2);
		let dot11 = v1.SqrMagnitude();
		let dot12 = v1.Dot(v2);

		let invDenom: number = 1 / (dot00 * dot11 - dot01 * dot01);
		let u: number = (dot11 * dot02 - dot01 * dot12) * invDenom;
		let v: number = (dot00 * dot12 - dot01 * dot02) * invDenom;
		return (u > 0) && (v > 0) && (u + v < 1);
	}

	public Reflect(planeNormal: Vec3): Vec3 {
		return Vec3.Sub(this, Vec3.MulN(planeNormal, this.Dot(planeNormal) * 2));
	}

	public Refract(normal: Vec3, refractionIndex: number): Vec3 {
		let cosI = -normal.Dot(this);
		let sinT2 = refractionIndex * refractionIndex * (1.0 - cosI * cosI);

		if (sinT2 > 1.0) return this;

		let cosT = MathUtils.Sqrt(1.0 - sinT2);
		return Vec3.Add(Vec3.MulN(this, refractionIndex), Vec3.MulN(normal, (refractionIndex * cosI - cosT)));
	}

	public InersectNormal(normal: Vec3): Vec3 {
		return Vec3.MulN(normal, this.Dot(normal));
	}

	public InersectRay(rayOrigin: Vec3, rayDirection: Vec3): Vec3 {
		let v = Vec3.Sub(this, rayOrigin);
		return Vec3.Add(Vec3.MulN(rayDirection, v.Dot(rayDirection)), rayOrigin);
	}

	public InersectLine(line: Line3): Vec3 {
		let pointOffset = Vec3.Sub(this, line.point1);
		let vector = Vec3.Normalize(Vec3.Sub(line.point2, line.point1));
		return Vec3.Add(Vec3.MulN(vector, pointOffset.Dot(vector)), line.point1);
	}

	public InersectPlane(planeNormal: Vec3, planeLocation: Vec3): Vec3 {
		let v = Vec3.Sub(this, planeLocation);
		return Vec3.Sub(this, Vec3.MulN(planeNormal, v.Dot(planeNormal)));
	}

	public EqualsTo(v: Vec3): boolean {
		return Vec3.Equals(this, v);
	}

	public ToString(): string {
		return `(${this.x}, ${this.y}, ${this.z})`;
	}

	public static Add(v1: Vec3, v2: Vec3): Vec3 {
		v1 = v1.Clone();
		return v1.Add(v2);
	}

	public static AddN(v: Vec3, n: number): Vec3 {
		v = v.Clone();
		return v.AddN(n);
	}

	public static Sub(v1: Vec3, v2: Vec3): Vec3 {
		v1 = v1.Clone();
		return v1.Sub(v2);
	}

	public static SubN(v: Vec3, n: number): Vec3 {
		v = v.Clone();
		return v.SubN(n);
	}

	public static SubN2(n: number, v: Vec3): Vec3 {
		v = v.Clone();
		return v.SubN2(n);
	}

	public static Mul(v1: Vec3, v2: Vec3): Vec3 {
		v1 = v1.Clone();
		return v1.Mul(v2);
	}

	public static MulN(v: Vec3, n: number): Vec3 {
		v = v.Clone();
		return v.MulN(n);
	}

	public static Div(v1: Vec3, v2: Vec3): Vec3 {
		v1 = v1.Clone();
		return v1.Div(v2);
	}

	public static DivN(v: Vec3, n: number): Vec3 {
		v = v.Clone();
		return v.DivN(n);
	}

	public static DivN2(n: number, v: Vec3): Vec3 {
		v = v.Clone();
		return v.DivN2(n);
	}

	public static Negate(v: Vec3): Vec3 {
		v = v.Clone();
		return v.Negate();
	}

	public static Equals(v1: Vec3, v2: Vec3): boolean {
		if (v1 == null || v2 == null)
			return false;
		return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z;
	}

	public static Distance(v0: Vec3, v1: Vec3): number {
		return Vec3.Sub(v1, v0).Magnitude();
	}

	public static DistanceSquared(v0: Vec3, v1: Vec3): number {
		return Vec3.Sub(v1, v0).SqrMagnitude();
	}

	public static Angle(from: Vec3, to: Vec3): number {
		let v = Vec3.Dot(Vec3.Normalize(from), Vec3.Normalize(to));
		return MathUtils.Acos(MathUtils.Clamp(v, -1, 1)) * MathUtils.RAD_TO_DEG;
	}

	public static ClampMagnitude(v: Vec3, maxLength: number): Vec3 {
		let nor = v.Clone();
		let sqrMagnitude = nor.SqrMagnitude();
		if (sqrMagnitude > (maxLength * maxLength))
			nor = Vec3.MulN(nor, (maxLength / MathUtils.Sqrt(sqrMagnitude)));
		return nor;
	}

	public static Normalize(v: Vec3): Vec3 {
		return Vec3.MulN(v, (1 / v.Magnitude()));
	}

	public static NormalizeSafe(v: Vec3): Vec3 {
		let dis = v.Magnitude();
		if (dis == 0)
			return Vec3.zero;
		return Vec3.MulN(v, 1 / dis);
	}

	public static Dot(v0: Vec3, v1: Vec3): number {
		return v0.Dot(v1);
	}

	public static Cross(v0: Vec3, v1: Vec3): Vec3 {
		return v0.Cross(v1);
	}

	public static OrthoNormalVector(v: Vec3): Vec3 {
		let res = new Vec3();

		if (MathUtils.Abs(v.z) > Vec3.OVER_SQRT2) {
			let a = v.y * v.y + v.z * v.z;
			let k = 1 / MathUtils.Sqrt(a);
			res.x = 0;
			res.y = -v.z * k;
			res.z = v.y * k;
		}
		else {
			let a = v.x * v.x + v.y * v.y;
			let k = 1 / MathUtils.Sqrt(a);
			res.x = -v.y * k;
			res.y = v.x * k;
			res.z = 0;
		}

		return res;
	}

	public static SlerpUnclamped(from: Vec3, to: Vec3, t: number): Vec3 {
		let scale0: number;
		let scale1: number;

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
			let q = Quat.AngleAxis(180.0 * t, axis);
			let v = Vec3.MulN(q.Transform(from), len);
			return v;
		}
		else {
			let omega = MathUtils.Acos(cosom);
			let sinom = MathUtils.Sin(omega);
			scale0 = MathUtils.Sin((1 - t) * omega) / sinom;
			scale1 = MathUtils.Sin(t * omega) / sinom;
		}

		v2 = Vec3.MulN(Vec3.Add(Vec3.MulN(v2, scale1), Vec3.MulN(v1, scale0)), len);
		return v2;
	}

	public static Slerp(from: Vec3, to: Vec3, t: number): Vec3 {
		return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec3.SlerpUnclamped(from, to, t));
	}

	public static LerpUnclamped(from: Vec3, to: Vec3, t: number): Vec3 {
		return new Vec3(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.z + (to.z - from.z) * t);
	}

	public static Lerp(from: Vec3, to: Vec3, t: number): Vec3 {
		return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec3.LerpUnclamped(from, to, t));
	}

	public static SmoothDamp(current: Vec3, target: Vec3, currentVelocity: Vec3[], smoothTime: number, maxSpeed: number, deltaTime: number): Vec3 {
		smoothTime = MathUtils.Max(0.0001, smoothTime);

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

	public static MoveTowards(current: Vec3, target: Vec3, maxDistanceDelta: number): Vec3 {
		let delta = Vec3.Sub(target, current);
		let sqrDelta = delta.SqrMagnitude();
		let sqrDistance = maxDistanceDelta * maxDistanceDelta;

		if (sqrDelta > sqrDistance) {
			let magnitude = MathUtils.Sqrt(sqrDelta);
			if (magnitude > 1e-6) {
				delta = Vec3.Add(Vec3.DivN(Vec3.MulN(delta, maxDistanceDelta), magnitude), current);
				return delta;
			}
			return current.Clone();
		}
		return target.Clone();
	}

	private static ClampedMove(lhs: number, rhs: number, clampedDelta: number): number {
		let delta = rhs - lhs;
		if (delta > 0)
			return lhs + MathUtils.Min(delta, clampedDelta);
		return lhs - MathUtils.Min(-delta, clampedDelta);
	}

	public static RotateTowards(current: Vec3, target: Vec3, maxRadiansDelta: number, maxMagnitudeDelta: number): Vec3 {
		let len1 = current.Magnitude();
		let len2 = target.Magnitude();

		if (len1 > 1e-6 && len2 > 1e-6) {
			let from = Vec3.DivN(current, len1);
			let to = Vec3.DivN(target, len2);
			let cosom = Vec3.Dot(from, to);

			if (cosom > 1 - 1e-6)
				return Vec3.MoveTowards(current, target, maxMagnitudeDelta);
			if (cosom < -1 + 1e-6) {
				let q = Quat.AngleAxis(maxRadiansDelta * MathUtils.RAD_TO_DEG, Vec3.OrthoNormalVector(from));
				return Vec3.MulN(q.Transform(from), Vec3.ClampedMove(len1, len2, maxMagnitudeDelta));
			}
			else {
				let angle = MathUtils.Acos(cosom);
				let q = Quat.AngleAxis(MathUtils.Min(maxRadiansDelta, angle) * MathUtils.RAD_TO_DEG, Vec3.Normalize(Vec3.Cross(from, to)));
				return Vec3.MulN(q.Transform(from), Vec3.ClampedMove(len1, len2, maxMagnitudeDelta));
			}
		}

		return Vec3.MoveTowards(current, target, maxMagnitudeDelta);
	}

	public static OrthoNormalize(va: Vec3[], vb: Vec3[], vc: Vec3[]): void {
		va[0].Normalize();
		vb[0] = Vec3.Sub(vb[0], Vec3.Project(vb[0], va[0]));
		vb[0].Normalize();

		vc[0] = Vec3.Sub(vc[0], Vec3.Project(vc[0], va[0]));
		vc[0] = Vec3.Sub(vc[0], Vec3.Project(vc[0], vb[0]));
		vc[0].Normalize();
	}

	public static Project(vector: Vec3, onNormal: Vec3): Vec3 {
		let num = onNormal.SqrMagnitude();

		if (num < 1.175494e-38)
			return Vec3.zero;

		let num2 = Vec3.Dot(vector, onNormal);
		let v3 = Vec3.MulN(onNormal, (num2 / num));
		return v3;
	}

	public static ProjectOnPlane(vector: Vec3, planeNormal: Vec3): Vec3 {
		return Vec3.Add(Vec3.Negate(Vec3.Project(vector, planeNormal)), vector);
	}

	public static Reflect(inDirection: Vec3, inNormal: Vec3): Vec3 {
		let num = -2 * Vec3.Dot(inNormal, inDirection);
		inNormal = Vec3.MulN(inNormal, num);
		inNormal = Vec3.Add(inNormal, inDirection);
		return inNormal;
	}

	public static Hermite(value1: Vec3, tangent1: Vec3, value2: Vec3, tangent2: Vec3, t: number): Vec3 {
		let weightSquared = t * t;
		let weightCubed = t * weightSquared;
		let value1Blend = 2 * weightCubed - 3 * weightSquared + 1;
		let tangent1Blend = weightCubed - 2 * weightSquared + t;
		let value2Blend = -2 * weightCubed + 3 * weightSquared;
		let tangent2Blend = weightCubed - weightSquared;

		return new Vec3
			(
			value1.x * value1Blend + value2.x * value2Blend + tangent1.x * tangent1Blend + tangent2.x * tangent2Blend,
			value1.y * value1Blend + value2.y * value2Blend + tangent1.y * tangent1Blend + tangent2.y * tangent2Blend,
			value1.z * value1Blend + value2.z * value2Blend + tangent1.z * tangent1Blend + tangent2.z * tangent2Blend
			);
	}

	public static DegToRad(v: Vec3): Vec3 {
		return new Vec3(MathUtils.DegToRad(v.x), MathUtils.DegToRad(v.y), MathUtils.DegToRad(v.z));
	}

	public static RadToDeg(v: Vec3): Vec3 {
		return new Vec3(MathUtils.RadToDeg(v.x), MathUtils.RadToDeg(v.y), MathUtils.RadToDeg(v.z));
	}

	public static MaxN(v: Vec3, value: number): Vec3 {
		return new Vec3(MathUtils.Max(v.x, value), MathUtils.Max(v.y, value), MathUtils.Max(v.z, value));
	}

	public static Max(v: Vec3, v1: Vec3): Vec3 {
		return new Vec3(MathUtils.Max(v.x, v1.x), MathUtils.Max(v.y, v1.y), MathUtils.Max(v.z, v1.z));
	}

	public static MinN(v: Vec3, v1: number): Vec3 {
		return new Vec3(MathUtils.Min(v.x, v1), MathUtils.Min(v.y, v1), MathUtils.Min(v.z, v1));
	}

	public static Min(v: Vec3, v1: Vec3): Vec3 {
		return new Vec3(MathUtils.Min(v.x, v1.x), MathUtils.Min(v.y, v1.y), MathUtils.Min(v.z, v1.z));
	}

	public static Abs(v: Vec3): Vec3 {
		return new Vec3(MathUtils.Abs(v.x), MathUtils.Abs(v.y), MathUtils.Abs(v.z));
	}

	public static Pow(v: Vec3, value: number): Vec3 {
		return new Vec3(MathUtils.Pow(v.x, value), MathUtils.Pow(v.y, value), MathUtils.Pow(v.z, value));
	}

	public static Floor(v: Vec3): Vec3 {
		return new Vec3(MathUtils.Floor(v.x), MathUtils.Floor(v.y), MathUtils.Floor(v.z));
	}

	public static Round(v: Vec3): Vec3 {
		return new Vec3(MathUtils.Round(v.x), MathUtils.Round(v.y), MathUtils.Round(v.z));
	}
}