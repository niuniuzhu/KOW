import { FMathUtils } from "./FMathUtils";

export class FVec2 {
	public x: number;
	public y: number;

	public static get one(): FVec2 {
		return new FVec2(1, 1);
	}
	public static get minusOne(): FVec2 {
		return new FVec2(-1, -1);
	}
	public static get zero(): FVec2 {
		return new FVec2(0, 0);
	}
	public static get right(): FVec2 {
		return new FVec2(1, 0);
	};
	public static get left(): FVec2 {
		return new FVec2(-1, 0);
	};
	public static get up(): FVec2 {
		return new FVec2(0, 1);
	};
	public static get down(): FVec2 {
		return new FVec2(0, -1);
	};

	constructor(x: number = 0, y: number = 0) {
		this.Set(x, y);
	}

	public Set(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	public Clone(): FVec2 {
		let v = new FVec2();
		v.x = this.x;
		v.y = this.y;
		return v;
	}

	public CopyFrom(v: FVec2): void {
		this.x = v.x;
		this.y = v.y;
	}

	public Clamp(min: FVec2, max: FVec2): FVec2 {
		this.Set(FMathUtils.Clamp(this.x, min.x, max.x), FMathUtils.Clamp(this.y, min.y, max.y));
		return this;
	}

	public Add(v: FVec2): FVec2 {
		this.x = FMathUtils.Add(this.x, v.x);
		this.y = FMathUtils.Add(this.y, v.y);
		return this;
	}

	public AddN(n: number): FVec2 {
		this.x = FMathUtils.Add(this.x, n);
		this.y = FMathUtils.Add(this.y, n);
		return this;
	}

	public Sub(v: FVec2): FVec2 {
		this.x = FMathUtils.Sub(this.x, v.x);
		this.y = FMathUtils.Sub(this.y, v.y);
		return this;
	}

	public SubN(n: number): FVec2 {
		this.x = FMathUtils.Sub(this.x, n);
		this.y = FMathUtils.Sub(this.y, n);
		return this;
	}

	public SubN2(n: number): FVec2 {
		this.x = FMathUtils.Sub(n, this.x);
		this.y = FMathUtils.Sub(n, this.y);
		return this;
	}

	public Mul(v: FVec2): FVec2 {
		this.x = FMathUtils.Mul(this.x, v.x);
		this.y = FMathUtils.Mul(this.y, v.y);
		return this;
	}

	public MulN(n: number): FVec2 {
		this.x = FMathUtils.Mul(this.x, n);
		this.y = FMathUtils.Mul(this.y, n);
		return this;
	}

	public Div(v: FVec2): FVec2 {
		this.x = FMathUtils.Div(this.x, v.x);
		this.y = FMathUtils.Div(this.y, v.y);
		return this;
	}

	public DivN(n: number): FVec2 {
		this.x = FMathUtils.Div(this.x, n);
		this.y = FMathUtils.Div(this.y, n);
		return this;
	}

	public DivN2(n: number): FVec2 {
		this.x = FMathUtils.Div(n, this.x);
		this.y = FMathUtils.Div(n, this.y);
		return this;
	}

	public Negate(): FVec2 {
		this.x = -this.x;
		this.y = -this.y;
		return this;
	}

	public Dot(v: FVec2): number {
		return FMathUtils.Add(FMathUtils.Mul(this.x, v.x), FMathUtils.Mul(this.y, v.y));
	}

	public Magnitude(): number {
		return FMathUtils.Sqrt(this.SqrMagnitude());
	}

	public SqrMagnitude(): number {
		return FMathUtils.Add(FMathUtils.Mul(this.x, this.x), FMathUtils.Mul(this.y, this.y));
	}

	public Normalize(): void {
		let f = FMathUtils.Div(1, this.Magnitude());
		this.MulN(f);
	}

	public NormalizeSafe(): void {
		let f = this.Magnitude();
		if (f == 0)
			return;
		f = FMathUtils.Div(1, f);
		this.MulN(f);
	}

	public ClampMagnitude(maxLength: number): void {
		let sqrMagnitude = this.SqrMagnitude();
		if (sqrMagnitude > FMathUtils.Mul(maxLength, maxLength)) {
			let f = FMathUtils.Div(maxLength, FMathUtils.Sqrt(sqrMagnitude));
			this.MulN(f);
		}
	}

	public Distance(vector: FVec2): number {
		return FVec2.Sub(vector, this).Magnitude();
	}

	public DistanceSquared(vector: FVec2): number {
		return FVec2.Sub(vector, this).SqrMagnitude();
	}

	public AproxEqualsBox(vector: FVec2, tolerance: number): boolean {
		return FMathUtils.Abs(FMathUtils.Sub(this.x, vector.x)) <= tolerance &&
			FMathUtils.Abs(FMathUtils.Sub(this.y, vector.y)) <= tolerance;
	}

	public ApproxEquals(vector: FVec2, tolerance: number): boolean {
		return this.Distance(vector) <= tolerance;
	}

	public Angle(vector: FVec2): number {
		const vec = FVec2.Normalize(this);
		let val = vec.Dot(FVec2.Normalize(vector));
		val = val > 1 ? 1 : val;
		val = val < -1 ? -1 : val;
		return FMathUtils.Acos(val);
	}

	public static Angle(v1: FVec2, v2: FVec2): number {
		return v1.Angle(v2);
	}

	public Rotate(angle: number): void {
		const x = FMathUtils.Sub(FMathUtils.Mul(this.x, FMathUtils.Cos(angle)), FMathUtils.Mul(this.y, FMathUtils.Sin(angle)));
		const y = FMathUtils.Add(FMathUtils.Mul(this.x, FMathUtils.Sin(angle)), FMathUtils.Mul(this.y, FMathUtils.Cos(angle)));
		this.Set(x, y);
	}

	public static Rotate(v: FVec2, angle: number): FVec2 {
		const x = FMathUtils.Sub(FMathUtils.Mul(v.x, FMathUtils.Cos(angle)), FMathUtils.Mul(v.y, FMathUtils.Sin(angle)));
		const y = FMathUtils.Add(FMathUtils.Mul(v.x, FMathUtils.Sin(angle)), FMathUtils.Mul(v.y, FMathUtils.Cos(angle)));
		return new FVec2(x, y);
	}

	public EqualsTo(v: FVec2): boolean {
		return FVec2.Equals(this, v);
	}

	public ToString(): string {
		return `(${this.x}, ${this.y})`;
	}

	public static Add(v1: FVec2, v2: FVec2): FVec2 {
		v1 = v1.Clone();
		return v1.Add(v2);
	}

	public static AddN(v: FVec2, n: number): FVec2 {
		v = v.Clone();
		return v.AddN(n);
	}

	public static Sub(v1: FVec2, v2: FVec2): FVec2 {
		v1 = v1.Clone();
		return v1.Sub(v2);
	}

	public static SubN(v: FVec2, n: number): FVec2 {
		v = v.Clone();
		return v.SubN(n);
	}

	public static SubN2(n: number, v: FVec2): FVec2 {
		v = v.Clone();
		return v.SubN2(n);
	}

	public static Mul(v1: FVec2, v2: FVec2): FVec2 {
		v1 = v1.Clone();
		return v1.Mul(v2);
	}

	public static MulN(v: FVec2, n: number): FVec2 {
		v = v.Clone();
		return v.MulN(n);
	}

	public static Div(v1: FVec2, v2: FVec2): FVec2 {
		v1 = v1.Clone();
		return v1.Div(v2);
	}

	public static DivN(v: FVec2, n: number): FVec2 {
		v = v.Clone();
		return v.DivN(n);
	}

	public static DivN2(n: number, v: FVec2): FVec2 {
		v = v.Clone();
		return v.DivN2(n);
	}

	public static Negate(v: FVec2): FVec2 {
		v = v.Clone();
		return v.Negate();
	}

	public static Normalize(v: FVec2): FVec2 {
		return FVec2.MulN(v, FMathUtils.Div(1, v.Magnitude()));
	}

	public static NormalizeSafe(v: FVec2): FVec2 {
		let dis = v.Magnitude();
		if (dis == 0)
			return new FVec2();
		return FVec2.MulN(v, FMathUtils.Div(1, dis));
	}

	public static Dot(v0: FVec2, v1: FVec2): number {
		return v0.Dot(v1);
	}

	public static Distance(v0: FVec2, v1: FVec2): number {
		return v0.Distance(v1);
	}

	public static DistanceSquared(v0: FVec2, v1: FVec2): number {
		return v0.DistanceSquared(v1);
	}

	public static ClampMagnitude(v: FVec2, maxLength: number): FVec2 {
		let nor = v.Clone();
		let sqrMagnitude = nor.SqrMagnitude();
		if (sqrMagnitude > FMathUtils.Mul(maxLength, maxLength)) {
			let f = FMathUtils.Div(maxLength, FMathUtils.Sqrt(sqrMagnitude));
			nor.MulN(f);
		}
		return nor;
	}

	public static LerpUnclamped(from: FVec2, to: FVec2, t: number): FVec2 {
		return new FVec2(FMathUtils.Add(from.x, FMathUtils.Mul(FMathUtils.Sub(to.x, from.x), t)),
			FMathUtils.Add(from.y, FMathUtils.Mul(FMathUtils.Sub(to.y, from.y), t)));
	}

	public static Lerp(from: FVec2, to: FVec2, t: number): FVec2 {
		return t <= 0 ? from.Clone() : (t >= 1 ? to.Clone() : FVec2.LerpUnclamped(from, to, t));
	}

	public static SlopeXy(v: FVec2): number {
		return FMathUtils.Div(v.x, v.y);
	}

	public static SlopeYx(v: FVec2): number {
		return FMathUtils.Div(v.y, v.x);
	}

	public static DegToRad(v: FVec2): FVec2 {
		return new FVec2(FMathUtils.DegToRad(v.x), FMathUtils.DegToRad(v.y));
	}

	public static RadToDeg(v: FVec2): FVec2 {
		return new FVec2(FMathUtils.RadToDeg(v.x), FMathUtils.RadToDeg(v.y));
	}

	public static Abs(v: FVec2): FVec2 {
		return new FVec2(FMathUtils.Abs(v.x), FMathUtils.Abs(v.y));
	}

	public static Pow(v: FVec2, value: number): FVec2 {
		return new FVec2(FMathUtils.Pow(v.x, value), FMathUtils.Pow(v.y, value));
	}

	public static Floor(v: FVec2): FVec2 {
		return new FVec2(FMathUtils.Floor(v.x), FMathUtils.Floor(v.y));
	}

	public static Round(v: FVec2): FVec2 {
		return new FVec2(FMathUtils.Round(v.x), FMathUtils.Round(v.y));
	}

	public static Equals(v1: FVec2, v2: FVec2): boolean {
		if (v1 == null || v2 == null)
			return false;
		return v1.x == v2.x && v1.y == v2.y;
	}
}