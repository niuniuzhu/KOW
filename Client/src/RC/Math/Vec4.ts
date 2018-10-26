import { MathUtils } from "./MathUtils";

export class Vec4 {
	public x: number;
	public y: number;
	public z: number;
	public w: number;

	public static get one(): Vec4 {
		return new Vec4(1, 1, 1, 1);
	}
	public static get minusOne(): Vec4 {
		return new Vec4(-1, -1, -1, -1);
	}
	public static get zero(): Vec4 {
		return new Vec4(0, 0, 0, 0);
	}
	public static get right(): Vec4 {
		return new Vec4(1, 0, 0, 0);
	};
	public static get left(): Vec4 {
		return new Vec4(-1, 0, 0, 0);
	};
	public static get up(): Vec4 {
		return new Vec4(0, 1, 0, 0);
	};
	public static get down(): Vec4 {
		return new Vec4(0, -1, 0, 0);
	};
	public static get forward(): Vec4 {
		return new Vec4(0, 0, 1, 0);
	};
	public static get height(): Vec4 {
		return new Vec4(0, 0, 0, 1);
	};
	public static get low(): Vec4 {
		return new Vec4(0, 0, 0, -1);
	};
	public static get backward(): Vec4 {
		return new Vec4(0, 0, -1, 0);
	};
	public static get positiveInfinityVector(): Vec4 {
		return new Vec4(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	};
	public static get negativeInfinityVector(): Vec4 {
		return new Vec4(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
	};

	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	public Clone(): Vec4 {
		let v = new Vec4();
		v.x = this.x;
		v.y = this.y;
		v.z = this.z;
		v.w = this.w;
		return v;
	}

	public CopyFrom(v: Vec4): void {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = v.w;
	}

	public Set(x: number, y: number, z: number, w: number): void {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	public Clamp(min: Vec4, max: Vec4): Vec4 {
		this.x = MathUtils.Clamp(this.x, min.x, max.x);
		this.y = MathUtils.Clamp(this.y, min.y, max.y);
		this.z = MathUtils.Clamp(this.z, min.z, max.z);
		this.w = MathUtils.Clamp(this.w, min.w, max.w);
		return this;
	}

	public Add(v: Vec4): Vec4 {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;
		return this;
	}

	public AddN(n: number): Vec4 {
		this.x += n;
		this.y += n;
		this.z += n;
		this.w += n;
		return this;
	}

	public Sub(v: Vec4): Vec4 {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;
		return this;
	}

	public SubN(n: number): Vec4 {
		this.x -= n;
		this.y -= n;
		this.z -= n;
		this.w -= n;
		return this;
	}

	public SubN2(n: number): Vec4 {
		this.x = n - this.x;
		this.y = n - this.y;
		this.z = n - this.z;
		this.w = n - this.w;
		return this;
	}

	public Mul(v: Vec4): Vec4 {
		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;
		this.w *= v.w;
		return this;
	}

	public MulN(n: number): Vec4 {
		this.x *= n;
		this.y *= n;
		this.z *= n;
		this.w *= n;
		return this;
	}

	public Div(v: Vec4): Vec4 {
		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;
		this.w /= v.w;
		return this;
	}

	public DivN(n: number): Vec4 {
		this.x /= n;
		this.y /= n;
		this.z /= n;
		this.w /= n;
		return this;
	}

	public DivN2(n: number): Vec4 {
		this.x = n / this.x;
		this.y = n / this.y;
		this.z = n / this.z;
		this.w = n / this.w;
		return this;
	}

	public Negate(): Vec4 {
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		this.w = -this.w;
		return this;
	}

	public ClampMagnitude(maxLength: number): void {
		let sqrMagnitude = this.SqrMagnitude();
		if (sqrMagnitude > (maxLength * maxLength)) {
			let f = maxLength / MathUtils.Sqrt(sqrMagnitude);
			this.x *= f;
			this.y *= f;
			this.z *= f;
			this.w *= f;
		}
	}

	public Magnitude(): number {
		return MathUtils.Sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}

	public SqrMagnitude(): number {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}

	public Distance(vector: Vec4): number {
		return Vec4.Sub(vector, this).Magnitude();
	}

	public DistanceSquared(vector: Vec4): number {
		return Vec4.Sub(vector, this).SqrMagnitude();
	}

	public Scale(scale: Vec4): void {
		this.x *= scale.x;
		this.y *= scale.y;
		this.z *= scale.z;
		this.w *= scale.w;
	}

	public Dot(vector: Vec4): number {
		return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
	}

	public Normalize(): void {
		let f = 1 / this.Magnitude();
		this.x *= f;
		this.y *= f;
		this.z *= f;
		this.w *= f;
	}

	public NormalizeSafe(): void {
		let f = this.Magnitude();
		if (f == 0)
			return;
		this.x *= f;
		this.y *= f;
		this.z *= f;
		this.w *= f;
	}

	public AproxEqualsBox(vector: Vec4, tolerance: number): boolean {
		return (MathUtils.Abs(this.x - vector.x) <= tolerance) &&
			(MathUtils.Abs(this.y - vector.y) <= tolerance) &&
			(MathUtils.Abs(this.z - vector.z) <= tolerance) &&
			(MathUtils.Abs(this.w - vector.w) <= tolerance);
	}

	public ApproxEquals(vector: Vec4, tolerance: number): boolean {
		return this.Distance(vector) <= tolerance;
	}

	public EqualsTo(v: Vec4): boolean {
		return Vec4.Equals(this, v);
	}

	public ToString(): string {
		return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
	}

	public static Add(v1: Vec4, v2: Vec4): Vec4 {
		v1 = v1.Clone();
		return v1.Add(v2);
	}

	public static AddN(v: Vec4, n: number): Vec4 {
		v = v.Clone();
		return v.AddN(n);
	}

	public static Sub(v1: Vec4, v2: Vec4): Vec4 {
		v1 = v1.Clone();
		return v1.Sub(v2);
	}

	public static SubN(v: Vec4, n: number): Vec4 {
		v = v.Clone();
		return v.SubN(n);
	}

	public static SubN2(n: number, v: Vec4): Vec4 {
		v = v.Clone();
		return v.SubN2(n);
	}

	public static Mul(v1: Vec4, v2: Vec4): Vec4 {
		v1 = v1.Clone();
		return v1.Mul(v2);
	}

	public static MulN(v: Vec4, n: number): Vec4 {
		v = v.Clone();
		return v.MulN(n);
	}

	public static Div(v1: Vec4, v2: Vec4): Vec4 {
		v1 = v1.Clone();
		return v1.Div(v2);
	}

	public static DivN(v: Vec4, n: number): Vec4 {
		v = v.Clone();
		return v.DivN(n);
	}

	public static DivN2(n: number, v: Vec4): Vec4 {
		v = v.Clone();
		return v.DivN2(n);
	}

	public static Equals(v1: Vec4, v2: Vec4): boolean {
		if (v1 == null || v2 == null)
			return false;
		return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z && v1.w == v2.w;
	}

	public static Distance(v0: Vec4, v1: Vec4): number {
		return Vec4.Sub(v1, v0).Magnitude();
	}

	public static DistanceSquared(v0: Vec4, v1: Vec4): number {
		return Vec4.Sub(v1, v0).SqrMagnitude();
	}

	public static ClampMagnitude(v: Vec4, maxLength: number): Vec4 {
		let nor = v.Clone();
		let sqrMagnitude = nor.SqrMagnitude();
		if (sqrMagnitude > (maxLength * maxLength))
			nor = Vec4.MulN(nor, (maxLength / MathUtils.Sqrt(sqrMagnitude)));
		return nor;
	}

	public static Normalize(v: Vec4): Vec4 {
		return Vec4.MulN(v, (1 / v.Magnitude()));
	}

	public static NormalizeSafe(v: Vec4): Vec4 {
		let f = v.Magnitude();
		if (f == 0)
			return new Vec4();
		return Vec4.MulN(v, (1 / f));
	}

	public static LerpUnclamped(from: Vec4, to: Vec4, t: number): Vec4 {
		return new Vec4(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t, from.z + (to.z - from.z) * t, from.w + (to.w - from.w) * t);
	}

	public static Lerp(from: Vec4, to: Vec4, t: number): Vec4 {
		return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec4.LerpUnclamped(from, to, t));
	}

	public static Abs(v: Vec4): Vec4 {
		return new Vec4(MathUtils.Abs(v.x), MathUtils.Abs(v.y), MathUtils.Abs(v.z), MathUtils.Abs(v.w));
	}

	public static Pow(v: Vec4, power: number): Vec4 {
		return new Vec4(MathUtils.Pow(v.x, power), MathUtils.Pow(v.y, power),
			MathUtils.Pow(v.z, power), MathUtils.Pow(v.w, power));
	}

	public static Floor(v: Vec4): Vec4 {
		return new Vec4(MathUtils.Floor(v.x), MathUtils.Floor(v.y), MathUtils.Floor(v.z),
			MathUtils.Floor(v.w));
	}

	public static Round(v: Vec4): Vec4 {
		return new Vec4(MathUtils.Round(v.x), MathUtils.Round(v.y), MathUtils.Round(v.z),
			MathUtils.Round(v.w));
	}
}