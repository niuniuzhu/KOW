import { Vec2 } from "./Vec2";

export class Mat2 {
	public x: Vec2;
	public y: Vec2;

	public static get identity(): Mat2 {
		return new Mat2(new Vec2(1, 0), new Vec2(0, 1));
	}

	constructor(x: Vec2 = Vec2.zero, y: Vec2 = Vec2.zero) {
		this.x = x;
		this.y = y;
	}

	public CopyFrom(m: Mat2): void {
		this.x.CopyFrom(m.x);
		this.y.CopyFrom(m.y);
	}

	public Clone(): Mat2 {
		let m = new Mat2();
		m.x = this.x.Clone();
		m.y = this.y.Clone();
		return m;
	}

	public Add(p2: Mat2): Mat2 {
		this.x.Add(p2.x);
		this.y.Add(p2.y);
		return this;
	}
	public AddN(p2: number): Mat2 {
		this.x.AddN(p2);
		this.y.AddN(p2);
		return this;
	}

	public Sub(p2: Mat2): Mat2 {
		this.x.Sub(p2.x);
		this.y.Sub(p2.y);
		return this;
	}

	public SubN(p2: number): Mat2 {
		this.x.SubN(p2);
		this.y.SubN(p2);
		return this;
	}

	public SubN2(n: number): Mat2 {
		this.x.SubN2(n);
		this.y.SubN2(n);
		return this;
	}

	public Mul(m: Mat2): Mat2 {
		let xx = this.x.x * m.x.x + this.x.y * m.y.x;
		let xy = this.x.x * m.x.y + this.x.y * m.y.y;
		let yx = this.y.x * m.x.x + this.y.y * m.y.x;
		let yy = this.y.x * m.x.y + this.y.y * m.y.y;
		this.x.x = xx;
		this.x.y = xy;
		this.y.x = yx;
		this.y.y = yy;
		return this;
	}

	public Mul2(m: Mat2): Mat2 {
		let xx = m.x.x * this.x.x + m.x.y * this.y.x;
		let xy = m.x.x * this.x.y + m.x.y * this.y.y;
		let yx = m.y.x * this.x.x + m.y.y * this.y.x;
		let yy = m.y.x * this.x.y + m.y.y * this.y.y;
		this.x.x = xx;
		this.x.y = xy;
		this.y.x = yx;
		this.y.y = yy;
		return this;
	}

	public MulN(p2: number): Mat2 {
		this.x.MulN(p2);
		this.y.MulN(p2);
		return this;
	}

	public Div(p2: Mat2): Mat2 {
		this.x.Div(p2.x);
		this.y.Div(p2.y);
		return this;
	}

	public DivN(p2: number): Mat2 {
		this.x.DivN(p2);
		this.y.DivN(p2);
		return this;
	}

	public DivN2(n: number): Mat2 {
		this.x.DivN2(n);
		this.y.DivN2(n);
		return this;
	}

	public Identity(): void {
		this.x.x = 1;
		this.x.y = 0;
		this.y.x = 0;
		this.y.y = 1;
	}

	public Transform(v: Vec2): Vec2 {
		return new Vec2
			(
			v.x * this.x.x + v.y * this.y.x,
			v.x * this.x.y + v.y * this.y.y
			);
	}

	public Transpose(): Mat2 {
		let m00 = this.x.x;
		let m01 = this.y.x;
		let m10 = this.x.y;
		let m11 = this.y.y;
		this.x.x = m00;
		this.x.y = m01;
		this.y.x = m10;
		this.y.y = m11;
		return this;
	}

	public Determinant(): number {
		return this.x.x * this.y.y - this.x.y * this.y.x;
	}

	public Invert(): Mat2 {
		let determinant = 1 / (this.x.x * this.y.y - this.x.y * this.y.x);
		let m00 = this.y.y * determinant;
		let m01 = -this.x.y * determinant;
		let m10 = -this.y.x * determinant;
		let m11 = this.x.x * determinant;
		this.x.x = m00;
		this.x.y = m01;
		this.y.x = m10;
		this.y.y = m11;
		return this;
	}

	public EqualsTo(m: Mat2): boolean {
		return Mat2.Equals(this, m);
	}

	public ToString(): string {
		return `(${this.x.ToString()}, ${this.y.ToString()})`;
	}

	public static FromCross(xVector: Vec2): Mat2 {
		return new Mat2(xVector, new Vec2(-xVector.y, xVector.x));
	}

	public static Abs(m: Mat2): Mat2 {
		return new Mat2(Vec2.Abs(m.x), Vec2.Abs(m.y));
	}

	public static Transpose(m: Mat2): Mat2 {
		m = m.Clone();
		return m.Transpose();
	}

	public static Invert(m: Mat2): Mat2 {
		m = m.Clone();
		return m.Invert();
	}

	public static Add(m1: Mat2, m2: Mat2): Mat2 {
		m1 = m1.Clone();
		return m1.Add(m2);
	}

	public static AddN(m: Mat2, n: number): Mat2 {
		m = m.Clone();
		return m.AddN(n);
	}

	public static Sub(m1: Mat2, m2: Mat2): Mat2 {
		m1 = m1.Clone();
		return m1.Sub(m2);
	}

	public static SubN(m: Mat2, n: number): Mat2 {
		m = m.Clone();
		return m.SubN(n);
	}

	public static SubN2(n: number, m: Mat2): Mat2 {
		m = m.Clone();
		return m.SubN2(n);
	}

	public static Mul(m1: Mat2, m2: Mat2): Mat2 {
		m1 = m1.Clone();
		return m1.Mul(m2);
	}

	public static MulN(m: Mat2, n: number): Mat2 {
		m = m.Clone();
		return m.MulN(n);
	}

	public static Div(m1: Mat2, m2: Mat2): Mat2 {
		m1 = m1.Clone();
		return m1.Div(m2);
	}

	public static DivN(m: Mat2, n: number): Mat2 {
		m = m.Clone();
		return m.DivN(n);
	}

	public static DivN2(n: number, m: Mat2): Mat2 {
		m = m.Clone();
		return m.DivN2(n);
	}

	public static Equals(m1: Mat2, m2: Mat2): boolean {
		if (m1 == null || m2 == null)
			return false;
		return m1.x.EqualsTo(m2.x) && m1.y.EqualsTo(m2.y);
	}
}
