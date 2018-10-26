import { Vec3 } from "./Vec3";

import { MathUtils } from "./MathUtils";

export class Quat {
	public x: number;
	public y: number;
	public z: number;
	public w: number;

	public static get identity(): Quat {
		return new Quat(0, 0, 0, 1);
	}

	public get xyz(): Vec3 {
		return new Vec3(this.x, this.y, this.z);
	}

	public set xyz(v: Vec3) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	}

	public set eulerAngles(value: Vec3) {
		let q = Quat.FromEulerRad(Vec3.MulN(value, MathUtils.DEG_TO_RAD));
		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
		this.w = q.w;
	}

	public get eulerAngles(): Vec3 {
		return Vec3.MulN(Quat.ToEulerRad(this), MathUtils.RAD_TO_DEG);
	}

	/// <summary>
	///     Gets the length (magnitude) of the quaternion.
	/// </summary>
	/// <seealso cref="lengthSquared" />
	public get length(): number {
		return MathUtils.Sqrt(this.lengthSquared);
	}

	/// <summary>
	///     Gets the square of the quaternion length (magnitude).
	/// </summary>
	public get lengthSquared(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
	}

	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	public Clone(): Quat {
		let q = new Quat();
		q.x = this.x;
		q.y = this.y;
		q.z = this.z;
		q.w = this.w;
		return q;
	}

	public CopyFrom(q: Quat): void {
		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
		this.w = q.w;
	}

	/// <summary>
	///     <para>Set x, y, z and w components of an existing Quat.</para>
	/// </summary>
	/// <param name="newX"></param>
	/// <param name="newY"></param>
	/// <param name="newZ"></param>
	/// <param name="newW"></param>
	public Set(newX: number, newY: number, newZ: number, newW: number): void {
		this.x = newX;
		this.y = newY;
		this.z = newZ;
		this.w = newW;
	}

	/// <summary>
	///     Scales the to:Quat unit length.
	/// </summary>
	public Normalize(): void {
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

	/// <summary>
	///     Scale the given quaternion to unit length
	/// </summary>
	/// <param name="q">The quaternion to normalize</param>
	/// <returns>The normalized quaternion</returns>
	public static Normalize(q: Quat): Quat {
		let scale = 1.0 / q.length;
		let result = new Quat(q.x * scale, q.y * scale, q.z * scale, q.w * scale);
		return result;
	}

	/// <summary>
	///     <para>The dot product between two rotations.</para>
	/// </summary>
	/// <param name="a"></param>
	/// <param name="b"></param>
	public static Dot(a: Quat, b: Quat): number {
		return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
	}

	public Transform(v: Vec3): Vec3 {
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
		return new Vec3(v.x * (1 - yy2 - zz2) + v.y * (xy2 - wz2) + v.z * (xz2 + wy2), v.x * (xy2 + wz2) + v.y * (1 - xx2 - zz2) + v.z * (yz2 - wx2), v.x * (xz2 - wy2) + v.y * (yz2 + wx2) + v.z * (1 - xx2 - yy2));
	}

	/// <summary>
	///     <para>Creates a rotation which rotates /angle/ degrees around /axis/.</para>
	/// </summary>
	/// <param name="angle"></param>
	/// <param name="axis"></param>
	public static AngleAxis(angle: number, axis: Vec3): Quat {
		let result = Quat.identity;
		let thetaOver2 = angle * MathUtils.DEG_TO_RAD * 0.5;
		let sinThetaOver2 = MathUtils.Sin(thetaOver2);
		result.x = axis.x * sinThetaOver2;
		result.y = axis.y * sinThetaOver2;
		result.z = axis.z * sinThetaOver2;
		result.w = MathUtils.Cos(thetaOver2);
		return result;
	}

	public ToAngleAxis(): any[] {
		let result = Quat.ToAxisAngleRad(this);
		Vec3.MulN((<Vec3>result[1]), MathUtils.RAD_TO_DEG);
		return result;
	}

	/// <summary>
	///     <para>Creates a rotation which rotates from /from/ to /to/.</para>
	/// </summary>
	/// <param name="from"></param>
	/// <param name="to"></param>
	public static FromToRotation(from: Vec3, to: Vec3): Quat {
		let result = Quat.identity;
		let dot = from.Dot(to);
		if (dot < -1 + 1e-6) {
			let v = Vec3.Normalize(Quat.Orthogonal(from));
			result.Set(v.x, v.y, v.z, 0);
		}
		else if (dot > 1 - 1e-6) {
			result.Set(0, 0, 0, 1);
		}
		else {
			let angle = MathUtils.Acos(dot);
			let axis = Vec3.Normalize(from.Cross(to));
			let thetaOver2 = angle * 0.5;
			let sinThetaOver2 = MathUtils.Sin(thetaOver2);
			result.x = axis.x * sinThetaOver2;
			result.y = axis.y * sinThetaOver2;
			result.z = axis.z * sinThetaOver2;
			result.w = MathUtils.Cos(thetaOver2);
		}
		return result;
	}

	public static Orthogonal(v: Vec3): Vec3 {
		let x = MathUtils.Abs(v.x);
		let y = MathUtils.Abs(v.y);
		let z = MathUtils.Abs(v.z);
		let other = x < y ? (x < z ? Vec3.right : Vec3.forward) : (y < z ? Vec3.up : Vec3.forward);
		return Vec3.Cross(v, other);
	}

	/// <summary>
	///     <para>Creates a rotation with the specified /forward/ and /upwards/ directions.</para>
	/// </summary>
	/// <param name="forward">The direction to look in.</param>
	/// <param name="upwards">The vector that defines in which direction up is.</param>
	public static LookRotation(forward: Vec3, upwards: Vec3): Quat {
		forward = Vec3.Normalize(forward);
		let right = Vec3.Normalize(upwards.Cross(forward));
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
			let num = MathUtils.Sqrt(num8 + 1);
			quaternion.w = num * 0.5;
			num = 0.5 / num;
			quaternion.x = (m12 - m21) * num;
			quaternion.y = (m20 - m02) * num;
			quaternion.z = (m01 - m10) * num;
			return quaternion;
		}
		if ((m00 >= m11) &&
			(m00 >= m22)) {
			let num7 = MathUtils.Sqrt(1 + m00 - m11 - m22);
			let num4 = 0.5 / num7;
			quaternion.x = 0.5 * num7;
			quaternion.y = (m01 + m10) * num4;
			quaternion.z = (m02 + m20) * num4;
			quaternion.w = (m12 - m21) * num4;
			return quaternion;
		}
		if (m11 > m22) {
			let num6 = MathUtils.Sqrt(1 + m11 - m00 - m22);
			let num3 = 0.5 / num6;
			quaternion.x = (m10 + m01) * num3;
			quaternion.y = 0.5 * num6;
			quaternion.z = (m21 + m12) * num3;
			quaternion.w = (m20 - m02) * num3;
			return quaternion;
		}
		let num5 = MathUtils.Sqrt(1 + m22 - m00 - m11);
		let num2 = 0.5 / num5;
		quaternion.x = (m20 + m02) * num2;
		quaternion.y = (m21 + m12) * num2;
		quaternion.z = 0.5 * num5;
		quaternion.w = (m01 - m10) * num2;
		return quaternion;
	}

	/// <summary>
	///     <para>Creates a rotation with the specified /forward/ and /upwards/ directions.</para>
	/// </summary>
	/// <param name="view">The direction to look in.</param>
	/// <param name="up">The vector that defines in which direction up is.</param>
	public SetLookRotation(view: Vec3, up: Vec3): void {
		let rot: Quat = Quat.LookRotation(view, up);
		this.Set(rot.x, rot.y, rot.z, rot.w);
	}

	public Conjugate(): Quat {
		return new Quat(-this.x, -this.y, -this.z, this.w);
	}

	/// <summary>
	///     <para>Spherically numbererpolates between /a/ and /b/ by t. The parameter /t/ is clamped to the range [0, 1].</para>
	/// </summary>
	/// <param name="a"></param>
	/// <param name="b"></param>
	/// <param name="t"></param>
	public static Slerp(a: Quat, b: Quat, t: number): Quat {
		t = MathUtils.Clamp(t, 0, 1);
		return Quat.SlerpUnclamped(a, b, t);
	}

	/// <summary>
	///     <para>Spherically numbererpolates between /a/ and /b/ by t. The parameter /t/ is not clamped.</para>
	/// </summary>
	/// <param name="a"></param>
	/// <param name="b"></param>
	/// <param name="t"></param>
	public static SlerpUnclamped(a: Quat, b: Quat, t: number): Quat {
		// if either input is zero, return the other.
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
			b.xyz = Vec3.Negate(b.xyz);
			b.w = -b.w;
			cosHalfAngle = -cosHalfAngle;
		}

		let blendA: number;
		let blendB: number;
		if (cosHalfAngle < 0.99) {
			// do proper slerp for big angles
			let halfAngle = MathUtils.Acos(cosHalfAngle);
			let sinHalfAngle = MathUtils.Sin(halfAngle);
			let oneOverSinHalfAngle = 1.0 / sinHalfAngle;
			blendA = MathUtils.Sin(halfAngle * (1.0 - t)) * oneOverSinHalfAngle;
			blendB = MathUtils.Sin(halfAngle * t) * oneOverSinHalfAngle;
		}
		else {
			// do lerp if angle is really small.
			blendA = 1.0 - t;
			blendB = t;
		}

		let v = Vec3.Add(Vec3.MulN(a.xyz, blendA), Vec3.MulN(b.xyz, blendB));
		let result = new Quat(v.x, v.y, v.z, blendA * a.w + blendB * b.w);
		if (result.lengthSquared > 0.0)
			return Quat.Normalize(result);
		return Quat.identity;
	}

	/// <summary>
	///     <para>
	///         Interpolates between /a/ and /b/ by /t/ and normalizes the result afterwards. The parameter /t/ is clamped to
	///         the range [0, 1].
	///     </para>
	/// </summary>
	/// <param name="q1"></param>
	/// <param name="q2"></param>
	/// <param name="t"></param>
	public static Lerp(q1: Quat, q2: Quat, t: number): Quat {
		t = MathUtils.Clamp(t, 0, 1);
		return Quat.LerpUnclamped(q1, q2, t);
	}

	/// <summary>
	///     <para>
	///         Interpolates between /a/ and /b/ by /t/ and normalizes the result afterwards. The parameter /t/ is not
	///         clamped.
	///     </para>
	/// </summary>
	public static LerpUnclamped(q1: Quat, q2: Quat, t: number): Quat {
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

	/// <summary>
	///     <para>Rotates a rotation /from/ towards /to/.</para>
	/// </summary>
	/// <param name="from"></param>
	/// <param name="to"></param>
	/// <param name="maxDegreesDelta"></param>
	public static RotateTowards(from: Quat, to: Quat, maxDegreesDelta: number): Quat {
		let num = Quat.Angle(from, to);
		if (num == 0)
			return to;
		let t = MathUtils.Min(1, maxDegreesDelta / num);
		return Quat.SlerpUnclamped(from, to, t);
	}

	/// <summary>
	///     <para>Returns the Inverse of /rotation/.</para>
	/// </summary>
	/// <param name="rotation"></param>
	public static Invert(rotation: Quat): Quat {
		let lengthSq = rotation.lengthSquared;
		if (lengthSq != 0.0) {
			let i = 1.0 / lengthSq;
			let v = Vec3.MulN(rotation.xyz, -i);
			return new Quat(v.x, v.y, v.z, rotation.w * i);
		}
		return rotation;
	}

	public ToString(): string {
		return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
	}

	/// <summary>
	///     <para>Returns the angle in degrees between two rotations /a/ and /b/.</para>
	/// </summary>
	/// <param name="a"></param>
	/// <param name="b"></param>
	public static Angle(a: Quat, b: Quat): number {
		let f = Quat.Dot(a, b);
		return MathUtils.Acos(MathUtils.Min(MathUtils.Abs(f), 1)) * 2 * MathUtils.RAD_TO_DEG;
	}

	/// <summary>
	///     <para>
	///         Returns a rotation that rotates z degrees around the z axis, x degrees around the x axis, and y degrees
	///         around the y axis (in that order).
	///     </para>
	/// </summary>
	/// <param name="euler"></param>
	public static Euler(euler: Vec3): Quat {
		return Quat.FromEulerRad(Vec3.MulN(euler, MathUtils.DEG_TO_RAD));
	}

	private static ToEulerRad(rotation: Quat): Vec3 {
		let sqw = rotation.w * rotation.w;
		let sqx = rotation.x * rotation.x;
		let sqy = rotation.y * rotation.y;
		let sqz = rotation.z * rotation.z;
		let unit = sqx + sqy + sqz + sqw; // if normalised is one, otherwise is correction factor
		let test = rotation.x * rotation.w - rotation.y * rotation.z;
		let v: Vec3 = new Vec3();
		if (test > 0.4995 * unit) {
			// singularity at north pole
			v.y = 2 * MathUtils.Atan2(rotation.y, rotation.x);
			v.x = MathUtils.PI / 2;
			v.z = 0;
			return Quat.NormalizeAngles(Vec3.MulN(v, MathUtils.RAD_TO_DEG));
		}
		if (test < -0.4995 * unit) {
			// singularity at south pole
			v.y = -2 * MathUtils.Atan2(rotation.y, rotation.x);
			v.x = -MathUtils.PI / 2;
			v.z = 0;
			return Quat.NormalizeAngles(Vec3.MulN(v, MathUtils.RAD_TO_DEG));
		}
		let q = new Quat(rotation.w, rotation.z, rotation.x, rotation.y);
		v.y = MathUtils.Atan2(2 * q.x * q.w + 2 * q.y * q.z, 1 - 2 * (q.z * q.z + q.w * q.w)); // Yaw
		v.x = MathUtils.Asin(2 * (q.x * q.z - q.w * q.y)); // Pitch
		v.z = MathUtils.Atan2(2 * q.x * q.y + 2 * q.z * q.w, 1 - 2 * (q.y * q.y + q.z * q.z)); // Roll
		return Quat.NormalizeAngles(Vec3.MulN(v, MathUtils.RAD_TO_DEG));
	}

	private static NormalizeAngles(angles: Vec3): Vec3 {
		angles.x = Quat.NormalizeAngle(angles.x);
		angles.y = Quat.NormalizeAngle(angles.y);
		angles.z = Quat.NormalizeAngle(angles.z);
		return angles;
	}

	private static NormalizeAngle(angle: number): number {
		while (angle > 360)
			angle -= 360;
		while (angle < 0)
			angle += 360;
		return angle;
	}

	private static FromEulerRad(euler: Vec3): Quat {
		let yaw = euler.x;
		let pitch = euler.y;
		let roll = euler.z;
		let yawOver2 = yaw * 0.5;
		let cosYawOver2 = MathUtils.Cos(yawOver2);
		let sinYawOver2 = MathUtils.Sin(yawOver2);
		let pitchOver2 = pitch * 0.5;
		let cosPitchOver2 = MathUtils.Cos(pitchOver2);
		let sinPitchOver2 = MathUtils.Sin(pitchOver2);
		let rollOver2 = roll * 0.5;
		let cosRollOver2 = MathUtils.Cos(rollOver2);
		let sinRollOver2 = MathUtils.Sin(rollOver2);
		let result: Quat = new Quat();
		result.w = cosYawOver2 * cosPitchOver2 * cosRollOver2 + sinYawOver2 * sinPitchOver2 * sinRollOver2;
		result.x = sinYawOver2 * cosPitchOver2 * cosRollOver2 + cosYawOver2 * sinPitchOver2 * sinRollOver2;
		result.y = cosYawOver2 * sinPitchOver2 * cosRollOver2 - sinYawOver2 * cosPitchOver2 * sinRollOver2;
		result.z = cosYawOver2 * cosPitchOver2 * sinRollOver2 - sinYawOver2 * sinPitchOver2 * cosRollOver2;

		return result;
	}

	private static ToAxisAngleRad(q: Quat): any[] {
		if (MathUtils.Abs(q.w) > 1.0)
			q = Quat.Normalize(q);
		let angle = 2.0 * MathUtils.Acos(q.w); // angle
		let den = MathUtils.Sqrt(1.0 - q.w * q.w);
		let axis: Vec3;
		if (den > 0.0001)
			axis = Vec3.DivN(q.xyz, den);
		else {
			// This occurs when the angle is zero. 
			// Not a problem: just set an arbitrary normalized axis.
			axis = new Vec3(1, 0, 0);
		}
		return [angle, axis];
	}

	public static Equals(q1: Quat, q2: Quat): boolean {
		if (q1 == null || q2 == null)
			return false;
		return q1.x == q2.x && q1.y == q2.y && q1.z == q2.z && q1.w == q2.w;
	}

	public EqualsTo(q: Quat): boolean {
		return Quat.Equals(this, q);
	}

	public static Mul(lhs: Quat, rhs: Quat): Quat {
		return new Quat(lhs.w * rhs.x + lhs.x * rhs.w + lhs.y * rhs.z - lhs.z * rhs.y,
			lhs.w * rhs.y + lhs.y * rhs.w + lhs.z * rhs.x - lhs.x * rhs.z,
			lhs.w * rhs.z + lhs.z * rhs.w + lhs.x * rhs.y - lhs.y * rhs.x,
			lhs.w * rhs.w - lhs.x * rhs.x - lhs.y * rhs.y - lhs.z * rhs.z);
	}
}