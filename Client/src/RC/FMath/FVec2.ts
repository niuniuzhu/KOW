import Decimal from "../../Libs/decimal";
import { MathUtils } from "../Math/MathUtils";

export class FVec2 {
	public x: Decimal;
	public y: Decimal;

	public static get one(): FVec2 {
		return new FVec2(MathUtils.D_ONE, MathUtils.D_ONE);
	}
	public static get minusOne(): FVec2 {
		return new FVec2(MathUtils.D_N_ONE, MathUtils.D_N_ONE);
	}
	public static get zero(): FVec2 {
		return new FVec2(MathUtils.D_ZERO, MathUtils.D_ZERO);
	}
	public static get right(): FVec2 {
		return new FVec2(MathUtils.D_ONE, MathUtils.D_ZERO);
	};
	public static get left(): FVec2 {
		return new FVec2(MathUtils.D_N_ONE, MathUtils.D_ZERO);
	};
	public static get up(): FVec2 {
		return new FVec2(MathUtils.D_ZERO, MathUtils.D_ONE);
	};
	public static get down(): FVec2 {
		return new FVec2(MathUtils.D_ZERO, MathUtils.D_N_ONE);
	};

	constructor(x?: Decimal, y?: Decimal) {
		this.x = new Decimal(x == null ? 0 : x);
		this.y = new Decimal(y == null ? 0 : y);
	}

	public Set(x: Decimal, y: Decimal): void {
		this.x = new Decimal(x);
		this.y = new Decimal(y);
	}

	public Clone(): FVec2 {
		const v = new FVec2();
		v.x = new Decimal(this.x);
		v.y = new Decimal(this.y);
		return v;
	}

	public CopyFrom(v: FVec2): void {
		this.x = new Decimal(v.x);
		this.y = new Decimal(v.y);
	}

	public Add(v: FVec2): FVec2 {
		this.x = this.x.add(v.x);
		this.y = this.y.add(v.y);
		return this;
	}

	public AddN(n: Decimal): FVec2 {
		this.x = this.x.add(n);
		this.y = this.y.add(n);
		return this;
	}

	public Sub(v: FVec2): FVec2 {
		this.x = this.x.sub(v.x);
		this.y = this.y.sub(v.y);
		return this;
	}

	public SubN(n: Decimal): FVec2 {
		this.x = this.x.sub(n);
		this.y = this.y.sub(n);
		return this;
	}

	public SubN2(n: Decimal): FVec2 {
		this.x = n.sub(this.x);
		this.y = n.sub(this.y);
		return this;
	}

	public Mul(v: FVec2): FVec2 {
		this.x = this.x.mul(v.x);
		this.y = this.y.mul(v.y);
		return this;
	}

	public MulN(n: Decimal): FVec2 {
		this.x = this.x.mul(n);
		this.y = this.y.mul(n);
		return this;
	}

	public Div(v: FVec2): FVec2 {
		this.x = this.x.div(v.x);
		this.y = this.y.div(v.y);
		return this;
	}

	public DivN(n: Decimal): FVec2 {
		this.x = this.x.div(n);
		this.y = this.y.div(n);
		return this;
	}

	public DivN2(n: Decimal): FVec2 {
		this.x = n.div(this.x);
		this.y = n.div(this.y);
		return this;
	}

	public Negate(): FVec2 {
		this.x = this.x.neg();
		this.y = this.y.neg();
		return this;
	}

	public Scale(scale: FVec2): void {
		this.x = this.x.mul(scale.x);
		this.y = this.y.mul(scale.y);
	}

	public Dot(v: FVec2): Decimal {
		return this.x.mul(v.x).add(this.y.mul(v.y));
	}

	public Normalize(): void {
		const f = MathUtils.D_ONE.div(this.Magnitude());
		this.x = this.x.mul(f);
		this.y = this.y.mul(f);
	}

	public NormalizeSafe(): void {
		const f = this.Magnitude();
		if (f.equals(MathUtils.D_ZERO))
			return;
		this.x = this.x.mul(f);
		this.y = this.y.mul(f);
	}

	public ClampMagnitude(maxLength: Decimal): void {
		const sqrMagnitude = this.SqrMagnitude();
		if (sqrMagnitude.greaterThan(maxLength.mul(maxLength))) {
			const f = maxLength.sub(sqrMagnitude.sqrt());
			this.x = this.x.mul(f);
			this.y = this.y.mul(f);
		}
	}

	public Magnitude(): Decimal {
		return Decimal.sqrt(this.x.mul(this.x).add(this.y.mul(this.y)));
	}

	public SqrMagnitude(): Decimal {
		return this.x.mul(this.x).add(this.y.mul(this.y));
	}

	public Distance(vector: FVec2): Decimal {
		return FVec2.Sub(vector, this).Magnitude();
	}

	public DistanceSquared(vector: FVec2): Decimal {
		return FVec2.Sub(vector, this).SqrMagnitude();
	}

	public AproxEqualsBox(vector: FVec2, tolerance: Decimal): boolean {
		return (Decimal.abs(this.x.sub(vector.x)).lessThanOrEqualTo(tolerance)) &&
			(Decimal.abs(this.y.sub(vector.y)).lessThanOrEqualTo(tolerance));
	}

	public ApproxEquals(vector: FVec2, tolerance: Decimal): boolean {
		return this.Distance(vector).lessThanOrEqualTo(tolerance);
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

	public static AddN(v: FVec2, n: Decimal): FVec2 {
		v = v.Clone();
		return v.AddN(n);
	}

	public static Sub(v1: FVec2, v2: FVec2): FVec2 {
		v1 = v1.Clone();
		return v1.Sub(v2);
	}

	public static SubN(v: FVec2, n: Decimal): FVec2 {
		v = v.Clone();
		return v.SubN(n);
	}

	public static SubN2(n: Decimal, v: FVec2): FVec2 {
		v = v.Clone();
		return v.SubN2(n);
	}

	public static Mul(v1: FVec2, v2: FVec2): FVec2 {
		v1 = v1.Clone();
		return v1.Mul(v2);
	}

	public static MulN(v: FVec2, n: Decimal): FVec2 {
		v = v.Clone();
		return v.MulN(n);
	}

	public static Div(v1: FVec2, v2: FVec2): FVec2 {
		v1 = v1.Clone();
		return v1.Div(v2);
	}

	public static DivN(v: FVec2, n: Decimal): FVec2 {
		v = v.Clone();
		return v.DivN(n);
	}

	public static DivN2(n: Decimal, v: FVec2): FVec2 {
		v = v.Clone();
		return v.DivN2(n);
	}

	public static Negate(v: FVec2): FVec2 {
		v = v.Clone();
		return v.Negate();
	}

	public static Normalize(v: FVec2): FVec2 {
		return FVec2.MulN(v, (MathUtils.D_ONE.div(v.Magnitude())));
	}

	public static NormalizeSafe(v: FVec2): FVec2 {
		const dis = v.Magnitude();
		if (dis.equals(MathUtils.D_ZERO))
			return null;
		return FVec2.MulN(v, (MathUtils.D_ONE.div(dis)));
	}

	public static Dot(v0: FVec2, v1: FVec2): Decimal {
		return v0.x.mul(v1.x).add(v0.y.mul(v1.y));
	}

	public static Distance(v0: FVec2, v1: FVec2): Decimal {
		return FVec2.Sub(v1, v0).Magnitude();
	}

	public static DistanceSquared(v0: FVec2, v1: FVec2): Decimal {
		return FVec2.Sub(v1, v0).SqrMagnitude();
	}

	public static ClampMagnitude(v: FVec2, maxLength: Decimal): FVec2 {
		let nor = v.Clone();
		const sqrMagnitude = nor.SqrMagnitude();
		if (sqrMagnitude.greaterThan(maxLength.mul(maxLength)))
			nor = FVec2.MulN(nor, (maxLength.div(sqrMagnitude.sqrt())));
		return nor;
	}

	public static LerpUnclamped(from: FVec2, to: FVec2, t: Decimal): FVec2 {
		return new FVec2(from.x.add(to.x.sub(from.x).mul(t)), from.y.add(to.y.sub(from.y).mul(t)));
	}

	public static Lerp(from: FVec2, to: FVec2, t: Decimal): FVec2 {
		return t.lessThanOrEqualTo(MathUtils.D_ZERO) ? from.Clone() : (t.greaterThanOrEqualTo(MathUtils.D_ONE) ? to.Clone() : FVec2.LerpUnclamped(from, to, t));
	}

	public static Equals(v1: FVec2, v2: FVec2): boolean {
		if (v1 == null || v2 == null)
			return false;
		return v1.x == v2.x && v1.y == v2.y;
	}
}