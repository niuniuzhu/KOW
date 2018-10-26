import { Vec3 } from "./Vec3";

import { Vec2 } from "./Vec2";

import { MathUtils } from "./MathUtils";

import { Mat2 } from "./Mat2";

import { Quat } from "./Quat";

import { Vec4 } from "./Vec4";

export class Mat3 {
	public x: Vec3;
	public y: Vec3;
	public z: Vec3;

	public static get identity(): Mat3 {
		return new Mat3(new Vec3(1, 0, 0), new Vec3(0, 1, 0), new Vec3(0, 0, 1))
	};

	constructor(x: Vec3 = Vec3.zero, y: Vec3 = Vec3.zero, z: Vec3 = Vec3.zero) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public CopyFrom(m: Mat3): void {
		this.x.CopyFrom(m.x);
		this.y.CopyFrom(m.y);
		this.z.CopyFrom(m.z);
	}

	public Clone(): Mat3 {
		let m = new Mat3();
		m.x = this.x.Clone();
		m.y = this.y.Clone();
		m.z = this.z.Clone();
		return m;
	}

	public Add(m: Mat3): Mat3 {
		this.x.Add(m.x);
		this.y.Add(m.y);
		this.z.Add(m.z);
		return this;
	}

	public AddN(n: number): Mat3 {
		this.x.AddN(n);
		this.y.AddN(n);
		this.z.AddN(n);
		return this;
	}

	public Sub(m: Mat3): Mat3 {
		this.x.Sub(m.x);
		this.y.Sub(m.y);
		this.z.Sub(m.z);
		return this;
	}

	public SubN(n: number): Mat3 {
		this.x.SubN(n);
		this.y.SubN(n);
		this.z.SubN(n);
		return this;
	}

	public SubN2(n: number): Mat3 {
		this.x.SubN2(n);
		this.y.SubN2(n);
		this.z.SubN2(n);
		return this;
	}

	public Mul(m: Mat3): Mat3 {
		let xx = this.x.x * m.x.x + this.x.y * m.y.x + this.x.z * m.z.x;
		let xy = this.x.x * m.x.y + this.x.y * m.y.y + this.x.z * m.z.y;
		let xz = this.x.x * m.x.z + this.x.y * m.y.z + this.x.z * m.z.z;
		let yx = this.y.x * m.x.x + this.y.y * m.y.x + this.y.z * m.z.x;
		let yy = this.y.x * m.x.y + this.y.y * m.y.y + this.y.z * m.z.y;
		let yz = this.y.x * m.x.z + this.y.y * m.y.z + this.y.z * m.z.z;
		let zx = this.z.x * m.x.x + this.z.y * m.y.x + this.z.z * m.z.x;
		let zy = this.z.x * m.x.y + this.z.y * m.y.y + this.z.z * m.z.y;
		let zz = this.z.x * m.x.z + this.z.y * m.y.z + this.z.z * m.z.z;
		this.x.x = xx;
		this.x.y = xy;
		this.x.z = xz;
		this.y.x = yx;
		this.y.y = yy;
		this.y.z = yz;
		this.z.x = zx;
		this.z.y = zy;
		this.z.z = zz;
		return this;
	}

	public Mul2(m: Mat3): Mat3 {
		let xx = m.x.x * this.x.x + m.x.y * this.y.x + m.x.z * this.z.x;
		let xy = m.x.x * this.x.y + m.x.y * this.y.y + m.x.z * this.z.y;
		let xz = m.x.x * this.x.z + m.x.y * this.y.z + m.x.z * this.z.z;
		let yx = m.y.x * this.x.x + m.y.y * this.y.x + m.y.z * this.z.x;
		let yy = m.y.x * this.x.y + m.y.y * this.y.y + m.y.z * this.z.y;
		let yz = m.y.x * this.x.z + m.y.y * this.y.z + m.y.z * this.z.z;
		let zx = m.z.x * this.x.x + m.z.y * this.y.x + m.z.z * this.z.x;
		let zy = m.z.x * this.x.y + m.z.y * this.y.y + m.z.z * this.z.y;
		let zz = m.z.x * this.x.z + m.z.y * this.y.z + m.z.z * this.z.z;
		this.x.x = xx;
		this.x.y = xy;
		this.x.z = xz;
		this.y.x = yx;
		this.y.y = yy;
		this.y.z = yz;
		this.z.x = zx;
		this.z.y = zy;
		this.z.z = zz;
		return this;
	}

	public MulN(n: number): Mat3 {
		this.x.MulN(n);
		this.y.MulN(n);
		this.z.MulN(n);
		return this;
	}

	public Div(m: Mat3): Mat3 {
		this.x.Div(m.x);
		this.y.Div(m.y);
		this.z.Div(m.z);
		return this;
	}

	public DivN(n: number): Mat3 {
		this.x.DivN(n);
		this.y.DivN(n);
		this.z.DivN(n);
		return this;
	}

	public DivN2(n: number): Mat3 {
		this.x.DivN2(n);
		this.y.DivN2(n);
		this.z.DivN2(n);
		return this;
	}

	public Transform(v: Vec3): Vec3 {
		return new Vec3
			(
			v.x * this.x.x + v.y * this.y.x + v.z * this.z.x,
			v.x * this.x.y + v.y * this.y.y + v.z * this.z.y,
			v.x * this.x.z + v.y * this.y.z + v.z * this.z.z
			);
	}

	public TransformPoint(v: Vec2): Vec2 {
		return new Vec2
			(
			v.x * this.x.x + v.y * this.y.x + this.z.x,
			v.x * this.x.y + v.y * this.y.y + this.z.y
			);
	}

	public TransformVector(v: Vec2): Vec2 {
		return new Vec2
			(
			v.x * this.x.x + v.y * this.y.x,
			v.x * this.x.y + v.y * this.y.y
			);
	}

	public Identity(): Mat3 {
		this.x.x = 1;
		this.x.y = 0;
		this.x.z = 0;
		this.y.x = 0;
		this.y.y = 1;
		this.y.z = 0;
		this.z.x = 0;
		this.z.y = 0;
		this.z.z = 1;
		return this;
	}

	public Euler(): Vec3 {
		if (this.z.x < 1) {
			if (this.z.x > -1) {
				return new Vec3(MathUtils.Atan2(this.z.y, this.z.z), MathUtils.Asin(-this.z.x),
					MathUtils.Atan2(this.y.x, this.x.x));
			}
			return new Vec3(0, MathUtils.PI_HALF, -MathUtils.Atan2(this.y.z, this.y.y));
		}
		return new Vec3(0, -MathUtils.PI_HALF, MathUtils.Atan2(-this.y.z, this.y.y));
	}

	public Transpose(): Mat3 {
		let m00 = this.x.x;
		let m01 = this.y.x;
		let m02 = this.z.x;
		let m10 = this.x.y;
		let m11 = this.y.y;
		let m12 = this.z.y;
		let m20 = this.x.z;
		let m21 = this.y.z;
		let m22 = this.z.z;
		this.x.x = m00;
		this.x.y = m01;
		this.x.z = m02;
		this.y.x = m10;
		this.y.y = m11;
		this.y.z = m12;
		this.z.x = m20;
		this.z.y = m21;
		this.z.z = m22;
		return this;
	}

	public MultiplyTransposed(matrix: Mat3): Mat3 {
		return new Mat3
			(
			new Vec3
				(
				this.x.x * matrix.x.x + this.y.x * matrix.y.x + this.z.x * matrix.z.x,
				this.x.x * matrix.x.y + this.y.x * matrix.y.y + this.z.x * matrix.z.y,
				this.x.x * matrix.x.z + this.y.x * matrix.y.z + this.z.x * matrix.z.z
				),
			new Vec3
				(
				this.x.y * matrix.x.x + this.y.y * matrix.y.x + this.z.y * matrix.z.x,
				this.x.y * matrix.x.y + this.y.y * matrix.y.y + this.z.y * matrix.z.y,
				this.x.y * matrix.x.z + this.y.y * matrix.y.z + this.z.y * matrix.z.z
				),
			new Vec3
				(
				this.x.z * matrix.x.x + this.y.z * matrix.y.x + this.z.z * matrix.z.x,
				this.x.z * matrix.x.y + this.y.z * matrix.y.y + this.z.z * matrix.z.y,
				this.x.z * matrix.x.z + this.y.z * matrix.y.z + this.z.z * matrix.z.z
				)
			);
	}

	public Determinant(): number {
		return this.x.x * this.y.y * this.z.z + this.x.y * this.y.z * this.z.x + this.x.z * this.y.x * this.z.y -
			this.z.x * this.y.y * this.x.z - this.z.y * this.y.z * this.x.x - this.z.z * this.y.x * this.x.y;
	}

	public NonhomogeneousInvert(): Mat3 {
		let m2: Mat2 = new Mat2();
		m2.x.x = this.x.x;
		m2.x.y = this.x.y;
		m2.y.x = this.y.x;
		m2.y.y = this.y.y;
		m2.Invert();
		let o = Mat3.identity;
		this.x.x = m2.x.x;
		this.x.y = m2.x.y;
		this.y.x = m2.y.x;
		this.y.y = m2.y.y;
		let v = m2.Transform(new Vec2(this.z.x, this.z.y));
		this.z.x = -v.x;
		this.z.y = -v.y;
		return this;
	}

	public Invert(): Mat3 {
		let determinant = 1 / this.Determinant();
		let m00 = (this.y.y * this.z.z - this.y.z * this.z.y) * determinant;
		let m01 = (this.x.z * this.z.y - this.z.z * this.x.y) * determinant;
		let m02 = (this.x.y * this.y.z - this.y.y * this.x.z) * determinant;
		let m10 = (this.y.z * this.z.x - this.y.x * this.z.z) * determinant;
		let m11 = (this.x.x * this.z.z - this.x.z * this.z.x) * determinant;
		let m12 = (this.x.z * this.y.x - this.x.x * this.y.z) * determinant;
		let m20 = (this.y.x * this.z.y - this.y.y * this.z.x) * determinant;
		let m21 = (this.x.y * this.z.x - this.x.x * this.z.y) * determinant;
		let m22 = (this.x.x * this.y.y - this.x.y * this.y.x) * determinant;
		this.x.x = m00;
		this.x.y = m01;
		this.x.z = m02;
		this.y.x = m10;
		this.y.y = m11;
		this.y.z = m12;
		this.z.x = m20;
		this.z.y = m21;
		this.z.z = m22;
		return this;
	}

	public RotateAroundAxisX(angle: number): Mat3 {
		angle = MathUtils.DegToRad(angle);
		let tCos = MathUtils.Cos(angle);
		let tSin = MathUtils.Sin(angle);
		let m00 = this.x.x;
		let m01 = this.y.x * tCos - this.z.x * tSin;
		let m02 = this.y.x * tSin + this.z.x * tCos;
		let m10 = this.x.y;
		let m11 = this.y.y * tCos - this.z.y * tSin;
		let m12 = this.y.y * tSin + this.z.y * tCos;
		let m20 = this.x.z;
		let m21 = this.y.z * tCos - this.z.z * tSin;
		let m22 = this.y.z * tSin + this.z.z * tCos;
		this.x.x = m00;
		this.x.y = m01;
		this.x.z = m02;
		this.y.x = m10;
		this.y.y = m11;
		this.y.z = m12;
		this.z.x = m20;
		this.z.y = m21;
		this.z.z = m22;
		return this;
	}

	public RotateAroundAxisY(angle: number): Mat3 {
		angle = MathUtils.DegToRad(angle);
		let tCos = MathUtils.Cos(angle);
		let tSin = MathUtils.Sin(angle);
		let m00 = this.z.x * tSin + this.x.x * tCos;
		let m01 = this.y.x;
		let m02 = this.z.x * tCos - this.x.x * tSin;
		let m10 = this.z.y * tSin + this.x.y * tCos;
		let m11 = this.y.y;
		let m12 = this.z.y * tCos - this.x.y * tSin;
		let m20 = this.z.z * tSin + this.x.z * tCos;
		let m21 = this.y.z;
		let m22 = this.z.z * tCos - this.x.z * tSin;
		this.x.x = m00;
		this.x.y = m01;
		this.x.z = m02;
		this.y.x = m10;
		this.y.y = m11;
		this.y.z = m12;
		this.z.x = m20;
		this.z.y = m21;
		this.z.z = m22;
		return this;
	}

	public RotateAroundAxisZ(angle: number): Mat3 {
		angle = MathUtils.DegToRad(angle);
		let tCos = MathUtils.Cos(angle);
		let tSin = MathUtils.Sin(angle);
		let m00 = this.x.x * tCos - this.y.x * tSin;
		let m01 = this.x.x * tSin + this.y.x * tCos;
		let m02 = this.z.x;
		let m10 = this.x.y * tCos - this.y.y * tSin;
		let m11 = this.x.y * tSin + this.y.y * tCos;
		let m12 = this.z.y;
		let m20 = this.x.z * tCos - this.y.z * tSin;
		let m21 = this.x.z * tSin + this.y.z * tCos;
		let m22 = this.z.z;
		this.x.x = m00;
		this.x.y = m01;
		this.x.z = m02;
		this.y.x = m10;
		this.y.y = m11;
		this.y.z = m12;
		this.z.x = m20;
		this.z.y = m21;
		this.z.z = m22;
		return this;
	}

	public RotateAroundWorldAxisX(angle: number): Mat3 {
		angle = MathUtils.DegToRad(angle);
		angle = -angle;
		let tCos = MathUtils.Cos(angle);
		let tSin = MathUtils.Sin(angle);
		let m00 = this.x.x;
		let m01 = this.y.x;
		let m02 = this.z.x;
		let m10 = this.x.y * tCos - this.x.z * tSin;
		let m11 = this.y.y * tCos - this.y.z * tSin;
		let m12 = this.z.y * tCos - this.z.z * tSin;
		let m20 = this.x.y * tSin + this.x.z * tCos;
		let m21 = this.y.y * tSin + this.y.z * tCos;
		let m22 = this.z.y * tSin + this.z.z * tCos;
		this.x.x = m00;
		this.x.y = m01;
		this.x.z = m02;
		this.y.x = m10;
		this.y.y = m11;
		this.y.z = m12;
		this.z.x = m20;
		this.z.y = m21;
		this.z.z = m22;
		return this;
	}

	public RotateAroundWorldAxisY(angle: number): Mat3 {
		angle = MathUtils.DegToRad(angle);
		angle = -angle;
		let tCos = MathUtils.Cos(angle);
		let tSin = MathUtils.Sin(angle);
		let m00 = this.x.z * tSin + this.x.x * tCos;
		let m01 = this.y.z * tSin + this.y.x * tCos;
		let m02 = this.z.z * tSin + this.z.x * tCos;
		let m10 = this.x.y;
		let m11 = this.y.y;
		let m12 = this.z.y;
		let m20 = this.x.z * tCos - this.x.x * tSin;
		let m21 = this.y.z * tCos - this.y.x * tSin;
		let m22 = this.z.z * tCos - this.z.x * tSin;
		this.x.x = m00;
		this.x.y = m01;
		this.x.z = m02;
		this.y.x = m10;
		this.y.y = m11;
		this.y.z = m12;
		this.z.x = m20;
		this.z.y = m21;
		this.z.z = m22;
		return this;
	}

	public RotateAroundWorldAxisZ(angle: number): Mat3 {
		angle = MathUtils.DegToRad(angle);
		angle = -angle;
		let tCos = MathUtils.Cos(angle);
		let tSin = MathUtils.Sin(angle);
		let m00 = this.x.x * tCos - this.x.y * tSin;
		let m01 = this.y.x * tCos - this.y.y * tSin;
		let m02 = this.z.x * tCos - this.z.y * tSin;
		let m10 = this.x.x * tSin + this.x.y * tCos;
		let m11 = this.y.x * tSin + this.y.y * tCos;
		let m12 = this.z.x * tSin + this.z.y * tCos;
		let m20 = this.x.z;
		let m21 = this.y.z;
		let m22 = this.z.z;
		this.x.x = m00;
		this.x.y = m01;
		this.x.z = m02;
		this.y.x = m10;
		this.y.y = m11;
		this.y.z = m12;
		this.z.x = m20;
		this.z.y = m21;
		this.z.z = m22;
		return this;
	}

	public RotateAround(angle: number, axis: Vec3): Mat3 {
		// rotate numbero world space
		let quaternion = Quat.AngleAxis(0, axis).Conjugate();
		this.Mul2(Mat3.FromQuaternion(quaternion));

		// rotate back to matrix space
		quaternion = Quat.AngleAxis(angle, axis);
		let qMat = Mat3.FromQuaternion(quaternion);
		this.Mul2(qMat);
		return this;
	}

	public EqualsTo(m: Mat3): boolean {
		return Mat3.Equals(this, m);
	}

	public ToString(): string {
		return `(${this.x.ToString()}, ${this.y.ToString()}, ${this.z.ToString()})`;
	}

	public static FromScale(scale: Vec3): Mat3 {
		return new Mat3
			(
			new Vec3(scale.x, 0, 0),
			new Vec3(0, scale.y, 0),
			new Vec3(0, 0, scale.z)
			);
	}

	public static FromOuterProduct(vector1: Vec3, vector2: Vec3): Mat3 {
		return new Mat3
			(
			new Vec3(vector1.x * vector2.x, vector1.x * vector2.y, vector1.x * vector2.z),
			new Vec3(vector1.y * vector2.x, vector1.y * vector2.y, vector1.y * vector2.z),
			new Vec3(vector1.z * vector2.x, vector1.z * vector2.y, vector1.z * vector2.z)
			);
	}

	public static FromEuler(euler: Vec3): Mat3 {
		let x = MathUtils.DegToRad(euler.x);
		let y = MathUtils.DegToRad(euler.y);
		let z = MathUtils.DegToRad(euler.z);

		let cx = MathUtils.Cos(x);
		let sx = MathUtils.Sin(x);
		let cy = MathUtils.Cos(y);
		let sy = MathUtils.Sin(y);
		let cz = MathUtils.Cos(z);
		let sz = MathUtils.Sin(z);

		return new Mat3
			(new Vec3(cy * cz,
				cy * sz,
				-sy),
			new Vec3(cz * sx * sy - cx * sz,
				cx * cz + sx * sy * sz,
				cy * sx),
			new Vec3(cx * cz * sy + sx * sz,
				-cz * sx + cx * sy * sz,
				cx * cy)
			);
	}

	public static FromQuaternion(quaternion: Quat): Mat3 {
		let squared = new Vec4(quaternion.x * quaternion.x, quaternion.y * quaternion.y, quaternion.z * quaternion.z,
			quaternion.w * quaternion.w);
		let invSqLength = 1 / (squared.x + squared.y + squared.z + squared.w);

		let temp1 = quaternion.x * quaternion.y;
		let temp2 = quaternion.z * quaternion.w;
		let temp3 = quaternion.x * quaternion.z;
		let temp4 = quaternion.y * quaternion.w;
		let temp5 = quaternion.y * quaternion.z;
		let temp6 = quaternion.x * quaternion.w;

		return new Mat3
			(
			new Vec3((squared.x - squared.y - squared.z + squared.w) * invSqLength,
				2 * (temp1 + temp2) * invSqLength,
				2 * (temp3 - temp4) * invSqLength),
			new Vec3(2 * (temp1 - temp2) * invSqLength,
				(-squared.x + squared.y - squared.z + squared.w) * invSqLength,
				2 * (temp5 + temp6) * invSqLength),
			new Vec3(2 * (temp3 + temp4) * invSqLength,
				2 * (temp5 - temp6) * invSqLength,
				(-squared.x - squared.y + squared.z + squared.w) * invSqLength)
			);
	}

	public static FromRotationAxis(angle: number, axis: Vec3): Mat3 {
		let quaternion = Quat.AngleAxis(angle, axis);
		return Mat3.FromQuaternion(quaternion);
	}

	public static LookAt(forward: Vec3, up: Vec3): Mat3 {
		let z = Vec3.Normalize(forward);
		let x = Vec3.Normalize(up.Cross(z));
		let y = z.Cross(x);

		return new Mat3(x, y, z);
	}

	public static FromCross(vector: Vec3): Mat3 {
		let result: Mat3 = new Mat3();
		result.x.x = 0;
		result.x.y = -vector.z;
		result.x.z = vector.y;

		result.y.x = vector.z;
		result.y.y = 0;
		result.y.z = -vector.x;

		result.z.x = -vector.y;
		result.z.y = vector.x;
		result.z.z = 0;
		return result;
	}

	public static NonhomogeneousInvert(m: Mat3): Mat3 {
		let m1 = m.Clone();
		m1.NonhomogeneousInvert();
		return m1;
	}

	public static Invert(m: Mat3): Mat3 {
		m = m.Clone();
		return m.Invert();
	}

	public static Transpose(m: Mat3): Mat3 {
		m = m.Clone();
		return m.Transpose();
	}

	public static Abs(m: Mat3): Mat3 {
		return new Mat3(Vec3.Abs(m.x), Vec3.Abs(m.y), Vec3.Abs(m.z));
	}

	public static Add(m1: Mat3, m2: Mat3): Mat3 {
		m1 = m1.Clone();
		return m1.Add(m2);
	}

	public static AddN(m1: Mat3, n: number): Mat3 {
		m1 = m1.Clone();
		return m1.AddN(n);
	}

	public static Sub(m1: Mat3, m2: Mat3): Mat3 {
		m1 = m1.Clone();
		return m1.Sub(m2);
	}

	public static SubN(m1: Mat3, n: number): Mat3 {
		m1 = m1.Clone();
		return m1.SubN(n);
	}

	public static SubN2(n: number, p: Mat3): Mat3 {
		p = p.Clone();
		return p.SubN2(n);
	}

	public static Mul(m1: Mat3, m2: Mat3): Mat3 {
		m1 = m1.Clone();
		return m1.Mul(m2);
	}

	public static Mul2(m1: Mat3, m2: Mat3): Mat3 {
		m1 = m1.Clone();
		return m1.Mul2(m2);
	}

	public static MulN(m: Mat3, n: number): Mat3 {
		m = m.Clone();
		return m.MulN(n);
	}

	public static Div(m1: Mat3, m2: Mat3): Mat3 {
		m1 = m1.Clone();
		return m1.Div(m2);
	}

	public static DivN(m: Mat3, n: number): Mat3 {
		m = m.Clone();
		return m.DivN(n);
	}

	public static DivN2(n: number, m: Mat3): Mat3 {
		m = m.Clone();
		return m.DivN2(n);
	}

	public static Equals(m1: Mat3, m2: Mat3): boolean {
		if (m1 == null || m2 == null)
			return false;
		return m1.x.EqualsTo(m2.x) && m1.y.EqualsTo(m2.y) && m1.z.EqualsTo(m2.z);
	}
}
