import { MathUtils } from "./MathUtils";
import { Vec3 } from "./Vec3";

export enum Axis {
	X, Y, Z
}
export class Bounds {
	private _center: Vec3;
	private _extents: Vec3;

	get center(): Vec3 { return this._center.Clone(); }
	set center(value: Vec3) { this._center = value.Clone(); }

	get size(): Vec3 { return Vec3.MulN(this._extents, 2); }
	set size(value: Vec3) { this._extents = Vec3.MulN(value, 0.5); }

	get extents(): Vec3 { return this._extents.Clone(); }
	set extents(value: Vec3) { this._extents = value.Clone(); }

	/// <summary>
	///   <para>The minimal poof:t:numberhe box. This is always equal to center-extents.</para>
	/// </summary>
	get min(): Vec3 { return Vec3.Sub(this.center, this.extents); }
	set min(value: Vec3) { this.SetMinMax(value, this.max); }

	/// <summary>
	///   <para>The maximal poof:t:numberhe box. This is always equal to center+extents.</para>
	/// </summary>
	get max(): Vec3 { return Vec3.Add(this.center, this.extents); }
	set max(value: Vec3) { this.SetMinMax(this.min, value); }

	constructor(center: Vec3, size: Vec3) {
		this._center = center;
		this._extents = Vec3.MulN(size, 0.5);
	}

	/// <summary>
	///   <para>Is pocontained:number in the bounding box?</para>
	/// </summary>
	/// <param name="ponumber"></param>
	public Contains(ponumber: Vec3): boolean {
		if (ponumber.x < this.min.x ||
			ponumber.y < this.min.y ||
			ponumber.z < this.min.z ||
			ponumber.x > this.max.x ||
			ponumber.y > this.max.y ||
			ponumber.z > this.max.z)
			return false;
		return true;
	}

	/// <summary>
	///   <para>The closest poon:t:numberhe bounding box.</para>
	/// </summary>
	/// <param name="ponumber">Arbitrary ponumber.</param>
	/// <param name="outDistance"></param>
	/// <returns>
	///   <para>The poon:t:numberhe bounding box || inside the bounding box.</para>
	/// </returns>
	public ClosestPonumber(point: Vec3, outDistance: number[]): Vec3 {
		let distance = 0;
		let t = Vec3.Sub(point, this.center);
		let closest: number[] = [t.x, t.y, t.z];
		let et: number[] = [this._extents.x, this._extents.y, this._extents.z];

		for (let i = 0; i < 3; i++) {
			let delta: number;
			let f = et[i];
			if (closest[i] < -f) {
				delta = closest[i] + f;
				distance = distance + delta * delta;
				closest[i] = -f;
			}
			else if (closest[i] > f) {
				delta = closest[i] - f;
				distance = distance + delta * delta;
				closest[i] = f;
			}
		}

		if (distance == 0)
			return point;

		let v = this.center.Clone();
		v.x += closest[0];
		v.y += closest[1];
		v.z += closest[2];
		return v;
	}

	/// <summary>
	///   <para>Sets the bounds to the min and max value of the box.</para>
	/// </summary>
	/// <param name="min"></param>
	/// <param name="max"></param>
	public SetMinMax(min: Vec3, max: Vec3): void {
		this._extents = Vec3.MulN(Vec3.Sub(max, min), 0.5);
		this._center = Vec3.Add(min, this.extents);
	}

	/// <summary>
	///   <para>Grows the Bounds to include the ponumber.</para>
	/// </summary>
	/// <param name="ponumber"></param>
	public Encapsulate(point: Vec3): void {
		this.SetMinMax(Vec3.Min(this.min, point), Vec3.Max(this.max, point));
	}

	/// <summary>
	///   <para>Grow the bounds to encapsulate the bounds.</para>
	/// </summary>
	/// <param name="bounds"></param>
	public EncapsulateBounds(bounds: Bounds): void {
		this.Encapsulate(Vec3.Sub(bounds.center, bounds.extents));
		this.Encapsulate(Vec3.Add(bounds.center, bounds.extents));
	}

	/// <summary>
	///   <para>Expand the bounds by increasing its size by amount aeach:number side.</para>
	/// </summary>
	/// <param name="amount"></param>
	public Expand(amount: Vec3): void {
		this._extents = Vec3.Add(this._extents, Vec3.MulN(amount, 0.5));
	}

	/// <summary>
	///   <para>Does another bounding box numberersect with this bounding box?</para>
	/// </summary>
	/// <param name="bounds"></param>
	public Intersect(bounds: Bounds, boundsIntersect: Bounds[]): boolean {
		if (this.min.x > bounds.max.x) return false;
		if (this.max.x < bounds.min.x) return false;
		if (this.min.y > bounds.max.y) return false;
		if (this.max.y < bounds.min.y) return false;
		if (this.min.z > bounds.max.z) return false;
		if (this.max.z < bounds.min.z) return false;

		boundsIntersect[0].min = Vec3.Max(this.min, bounds.min);
		boundsIntersect[0].max = Vec3.Max(this.max, bounds.max);

		return true;
	}

	public IntersectMovingBoundsByAxis(bounds: Bounds, d: number, axis: Axis, outT: number[]): boolean {
		if (MathUtils.Approximately(d, 0.0)) {
			outT[0] = MathUtils.MAX_VALUE;
			return false;
		}
		let min00;
		let max00;
		let min01;
		let max01;
		let min10;
		let max10;
		let min11;
		let max11;
		let min20;
		let max20;
		let min21;
		let max21;
		switch (axis) {
			case Axis.X:
				min10 = this.min.y;
				max10 = this.max.y;
				min11 = bounds.min.y;
				max11 = bounds.max.y;
				min20 = this.min.z;
				max20 = this.max.z;
				min21 = bounds.min.z;
				max21 = bounds.max.z;
				break;

			case Axis.Y:
				min10 = this.min.z;
				max10 = this.max.z;
				min11 = bounds.min.z;
				max11 = bounds.max.z;
				min20 = this.min.x;
				max20 = this.max.x;
				min21 = bounds.min.x;
				max21 = bounds.max.x;
				break;

			default:
				min10 = this.min.x;
				max10 = this.max.x;
				min11 = bounds.min.x;
				max11 = bounds.max.x;
				min20 = this.min.y;
				max20 = this.max.y;
				min21 = bounds.min.y;
				max21 = bounds.max.y;
				break;
		}
		if (min10 >= max11 ||
			max10 <= min11 ||
			min20 >= max21 ||
			max20 <= min21) {
			outT[0] = MathUtils.MAX_VALUE;
			return false;
		}
		switch (axis) {
			case Axis.X:
				min00 = this.min.x;
				max00 = this.max.x;
				min01 = bounds.min.x;
				max01 = bounds.max.x;
				break;

			case Axis.Y:
				min00 = this.min.y;
				max00 = this.max.y;
				min01 = bounds.min.y;
				max01 = bounds.max.y;
				break;

			default:
				min00 = this.min.z;
				max00 = this.max.z;
				min01 = bounds.min.z;
				max01 = bounds.max.z;
				break;
		}
		let oneOverD = 1.0 / d;
		let enter = (min00 - max01) * oneOverD;
		let leave = (max00 - min01) * oneOverD;

		if (enter > leave) {
			let t = enter;
			enter = leave;
			leave = t;
		}

		outT[0] = enter;
		return enter < 1.0 && enter >= 0;
	}

	public IntersectMovingBounds(bounds: Bounds, d: Vec3): number {
		let tEnter = -MathUtils.MAX_VALUE;
		let tLeave = MathUtils.MAX_VALUE;

		if (MathUtils.Approximately(d.x, 0.0)) {
			if (this.min.x >= bounds.max.x ||
				this.max.x <= bounds.min.x)
				return MathUtils.MAX_VALUE;
		}
		else {
			let oneOverD = 1.0 / d.x;
			let xEnter = (this.min.x - bounds.max.x) * oneOverD;
			let xLeave = (this.max.x - bounds.min.x) * oneOverD;

			if (xEnter > xLeave) {
				let t = xEnter;
				xEnter = xLeave;
				xLeave = t;
			}

			if (xEnter > tEnter) tEnter = xEnter;
			if (xLeave < tLeave) tLeave = xLeave;
			if (tEnter > tLeave)
				return MathUtils.MAX_VALUE;
		}

		if (MathUtils.Approximately(d.y, 0.0)) {
			if (this.min.y >= bounds.max.y ||
				this.max.y <= bounds.min.y)
				return MathUtils.MAX_VALUE;
		}
		else {
			let oneOverD = 1.0 / d.y;
			let yEnter = (this.min.y - bounds.max.y) * oneOverD;
			let yLeave = (this.max.y - bounds.min.y) * oneOverD;

			if (yEnter > yLeave) {
				let t = yEnter;
				yEnter = yLeave;
				yLeave = t;
			}

			if (yEnter > tEnter) tEnter = yEnter;
			if (yLeave < tLeave) tLeave = yLeave;
			if (tEnter > tLeave)
				return MathUtils.MAX_VALUE;
		}

		if (MathUtils.Approximately(d.z, 0.0)) {
			if (this.min.z >= bounds.max.z ||
				this.max.z <= bounds.min.z)
				return MathUtils.MAX_VALUE;
		}
		else {
			let oneOverD = 1.0 / d.z;
			let zEnter = (this.min.z - bounds.max.z) * oneOverD;
			let zLeave = (this.max.z - bounds.min.z) * oneOverD;

			if (zEnter > zLeave) {
				let t = zEnter;
				zEnter = zLeave;
				zLeave = t;
			}

			if (zEnter > tEnter) tEnter = zEnter;
			if (zLeave < tLeave) tLeave = zLeave;
			if (tEnter > tLeave)
				return MathUtils.MAX_VALUE;
		}
		return tEnter;
	}

	public static Equals(b1: Bounds, b2: Bounds): boolean {
		if (b1 == null || b2 == null)
			return false;
		return (b1.center.EqualsTo(b2.center) && b1.extents.EqualsTo(b2.extents));

	}

	public EqualsTo(b: Bounds): boolean {
		return Bounds.Equals(this, b);
	}

	/// <summary>
	///   <para>Returns a nicely formatted string for the bounds.</para>
	/// </summary>
	public ToString(): string {
		return "(extents:" + this._extents.ToString() + "center:" + this._center.ToString() + ")";
	}
}