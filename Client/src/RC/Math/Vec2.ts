import { MathUtils } from "./MathUtils";

export class Vec2 {
	public x: number;
	public y: number;

	public static get one(): Vec2 {
		return new Vec2(1, 1);
	}
	public static get minusOne(): Vec2 {
		return new Vec2(-1, -1);
	}
	public static get zero(): Vec2 {
		return new Vec2(0, 0);
	}
	public static get right(): Vec2 {
		return new Vec2(1, 0);
	};
	public static get left(): Vec2 {
		return new Vec2(-1, 0);
	};
	public static get up(): Vec2 {
		return new Vec2(0, 1);
	};
	public static get down(): Vec2 {
		return new Vec2(0, -1);
	};
	public static get positiveInfinityVector(): Vec2 {
		return new Vec2(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	};
	public static get negativeInfinityVector(): Vec2 {
		return new Vec2(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
	};

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	public Set(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	public Clone(): Vec2 {
		let v = new Vec2();
		v.x = this.x;
		v.y = this.y;
		return v;
	}

	public CopyFrom(v: Vec2): void {
		this.x = v.x;
		this.y = v.y;
	}

	public Clamp(min: Vec2, max: Vec2): Vec2 {
		this.x = MathUtils.Clamp(this.x, min.x, max.x);
		this.y = MathUtils.Clamp(this.y, min.y, max.y);
		return this;
	}

	public Add(v: Vec2): Vec2 {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	public AddN(n: number): Vec2 {
		this.x += n;
		this.y += n;
		return this;
	}

	public Sub(v: Vec2): Vec2 {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	public SubN(n: number): Vec2 {
		this.x -= n;
		this.y -= n;
		return this;
	}

	public SubN2(n: number): Vec2 {
		this.x = n - this.x;
		this.y = n - this.y;
		return this;
	}

	public Mul(v: Vec2): Vec2 {
		this.x *= v.x;
		this.y *= v.y;
		return this;
	}

	public MulN(n: number): Vec2 {
		this.x *= n;
		this.y *= n;
		return this;
	}

	public Div(v: Vec2): Vec2 {
		this.x /= v.x;
		this.y /= v.y;
		return this;
	}

	public DivN(n: number): Vec2 {
		this.x /= n;
		this.y /= n;
		return this;
	}

	public DivN2(n: number): Vec2 {
		this.x = n / this.x;
		this.y = n / this.y;
		return this;
	}

	public Negate(): Vec2 {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	public Dot(v: Vec2): number {
		return this.x * v.x + this.y * v.y;
	}

	public Normalize(): void {
		let f = 1 / this.Magnitude();
		this.x *= f;
		this.y *= f;
	}

	public NormalizeSafe(): void {
		let f = this.Magnitude();
		if (f == 0)
			return;
		f = 1 / f;
		this.x *= f;
		this.y *= f;
	}

	public ClampMagnitude(maxLength: number): void {
		let sqrMagnitude = this.SqrMagnitude();
		if (sqrMagnitude > (maxLength * maxLength)) {
			let f = maxLength / MathUtils.Sqrt(sqrMagnitude);
			this.x *= f;
			this.y *= f;
		}
	}

	public Magnitude(): number {
		return MathUtils.Sqrt(this.x * this.x + this.y * this.y);
	}

	public SqrMagnitude(): number {
		return this.x * this.x + this.y * this.y;
	}

	public Distance(vector: Vec2): number {
		return Vec2.Sub(vector, this).Magnitude();
	}

	public DistanceSquared(vector: Vec2): number {
		return Vec2.Sub(vector, this).SqrMagnitude();
	}

	public AproxEqualsBox(vector: Vec2, tolerance: number): boolean {
		return (MathUtils.Abs(this.x - vector.x) <= tolerance) &&
			(MathUtils.Abs(this.y - vector.y) <= tolerance);
	}

	public ApproxEquals(vector: Vec2, tolerance: number): boolean {
		return this.Distance(vector) <= tolerance;
	}

	public Angle(vector: Vec2): number {
		const vec = Vec2.Normalize(this);
		let val = vec.Dot(Vec2.Normalize(vector));
		val = val > 1 ? 1 : val;
		val = val < -1 ? -1 : val;
		return MathUtils.Acos(val);
	}

	public static Angle(v1: Vec2, v2: Vec2): number {
		return v1.Angle(v2);
	}

	public Rotate(angle: number): void {
		const x = this.x * MathUtils.Cos(angle) - this.y * MathUtils.Sin(angle);
		const y = this.x * MathUtils.Sin(angle) + this.y * MathUtils.Cos(angle);
		this.Set(x, y);
	}

	public static Rotate(v: Vec2, angle: number): Vec2 {
		const x = v.x * MathUtils.Cos(angle) - v.y * MathUtils.Sin(angle);
		const y = v.x * MathUtils.Sin(angle) + v.y * MathUtils.Cos(angle);
		return new Vec2(x, y);
	}

	public EqualsTo(v: Vec2): boolean {
		return Vec2.Equals(this, v);
	}

	public ToString(): string {
		return `(${this.x}, ${this.y})`;
	}

	public static Add(v1: Vec2, v2: Vec2): Vec2 {
		v1 = v1.Clone();
		return v1.Add(v2);
	}

	public static AddN(v: Vec2, n: number): Vec2 {
		v = v.Clone();
		return v.AddN(n);
	}

	public static Sub(v1: Vec2, v2: Vec2): Vec2 {
		v1 = v1.Clone();
		return v1.Sub(v2);
	}

	public static SubN(v: Vec2, n: number): Vec2 {
		v = v.Clone();
		return v.SubN(n);
	}

	public static SubN2(n: number, v: Vec2): Vec2 {
		v = v.Clone();
		return v.SubN2(n);
	}

	public static Mul(v1: Vec2, v2: Vec2): Vec2 {
		v1 = v1.Clone();
		return v1.Mul(v2);
	}

	public static MulN(v: Vec2, n: number): Vec2 {
		v = v.Clone();
		return v.MulN(n);
	}

	public static Div(v1: Vec2, v2: Vec2): Vec2 {
		v1 = v1.Clone();
		return v1.Div(v2);
	}

	public static DivN(v: Vec2, n: number): Vec2 {
		v = v.Clone();
		return v.DivN(n);
	}

	public static DivN2(n: number, v: Vec2): Vec2 {
		v = v.Clone();
		return v.DivN2(n);
	}

	public static Negate(v: Vec2): Vec2 {
		v = v.Clone();
		return v.Negate();
	}

	public static Normalize(v: Vec2): Vec2 {
		return Vec2.MulN(v, (1 / v.Magnitude()));
	}

	public static NormalizeSafe(v: Vec2): Vec2 {
		let dis = v.Magnitude();
		if (dis == 0)
			return new Vec2();
		return Vec2.MulN(v, (1 / dis));
	}

	public static Dot(v0: Vec2, v1: Vec2): number {
		return v0.x * v1.x + v0.y * v1.y;
	}

	public static Distance(v0: Vec2, v1: Vec2): number {
		return Vec2.Sub(v1, v0).Magnitude();
	}

	public static DistanceSquared(v0: Vec2, v1: Vec2): number {
		return Vec2.Sub(v1, v0).SqrMagnitude();
	}

	public static ClampMagnitude(v: Vec2, maxLength: number): Vec2 {
		let nor = v.Clone();
		let sqrMagnitude = nor.SqrMagnitude();
		if (sqrMagnitude > (maxLength * maxLength))
			nor.MulN(maxLength / MathUtils.Sqrt(sqrMagnitude));
		return nor;
	}

	public static LerpUnclamped(from: Vec2, to: Vec2, t: number): Vec2 {
		return new Vec2(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
	}

	public static Lerp(from: Vec2, to: Vec2, t: number): Vec2 {
		return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : Vec2.LerpUnclamped(from, to, t));
	}

	public static SlopeXy(v: Vec2): number {
		return v.x / v.y;
	}

	public static SlopeYx(v: Vec2): number {
		return v.y / v.x;
	}

	public static DegToRad(v: Vec2): Vec2 {
		return new Vec2(MathUtils.DegToRad(v.x), MathUtils.DegToRad(v.y));
	}

	public static RadToDeg(v: Vec2): Vec2 {
		return new Vec2(MathUtils.RadToDeg(v.x), MathUtils.RadToDeg(v.y));
	}

	public static Abs(v: Vec2): Vec2 {
		return new Vec2(MathUtils.Abs(v.x), MathUtils.Abs(v.y));
	}

	public static Pow(v: Vec2, value: number): Vec2 {
		return new Vec2(MathUtils.Pow(v.x, value), MathUtils.Pow(v.y, value));
	}

	public static Floor(v: Vec2): Vec2 {
		return new Vec2(MathUtils.Floor(v.x), MathUtils.Floor(v.y));
	}

	public static Round(v: Vec2): Vec2 {
		return new Vec2(MathUtils.Round(v.x), MathUtils.Round(v.y));
	}

	public static Equals(v1: Vec2, v2: Vec2): boolean {
		if (v1 == null || v2 == null)
			return false;
		return v1.x == v2.x && v1.y == v2.y;
	}
}