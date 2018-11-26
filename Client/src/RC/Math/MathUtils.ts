import Decimal from "../../Libs/decimal";
import { Quat } from "./Quat";
import { Vec2 } from "./Vec2";
import { Vec3 } from "./Vec3";



export class MathUtils {
	/// <summary>
	///     Tolerance value.
	/// </summary>
	public static readonly EPSILON: number = 0.0001;

	public static readonly MAX_VALUE: number = Number.MAX_VALUE;

	public static readonly MIN_VALUE: number = Number.MIN_VALUE;

	/// <summary>
	///     Represents the ratio of the circumference of a circle to its diameter, specified by the constant, π.
	/// </summary>
	public static readonly PI: number = Math.PI;

	/// <summary>
	///     Represents the ratio of the circumference of a circle to its diameter, specified by the constant, π, multiplied by
	///     2.
	/// </summary>
	public static readonly PI2: number = MathUtils.PI * 2;

	/// <summary>
	///     Represents the ratio of the circumference of a circle to its diameter, specified by the constant, π, multiplied by
	///     4.
	/// </summary>
	public static readonly PI4: number = MathUtils.PI * 4;

	/// <summary>
	///     Represents the ratio of the circumference of a circle to its diameter, specified by the constant, π, divided by 2.
	/// </summary>
	public static readonly PI_HALF: number = MathUtils.PI * 0.5;

	/// <summary>
	///     Represents the ratio of the circumference of a circle to its diameter, specified by the constant, π, divided by 4.
	/// </summary>
	public static readonly PI_QUARTER: number = MathUtils.PI * 0.25;

	/// <summary>
	///     Represents 1 divided by the ratio of the circumference of a circle to its diameter, specified by the constant, π.
	/// </summary>
	public static readonly PI_DELTA: number = 1 / MathUtils.PI;

	/// <summary>
	///     Represents 1 divided by the ratio of the circumference of a circle to its diameter, specified by the constant, π,
	///     divided by 2.
	/// </summary>
	public static readonly PI_HALF_DELTA: number = MathUtils.PI_DELTA * 2;

	/// <summary>
	///     Represents 1 divided by the ratio of the circumference of a circle to its diameter, specified by the constant, π,
	///     divided by 4.
	/// </summary>
	public static readonly PI_QUARTER_DELTA: number = MathUtils.PI_DELTA * 4;

	public static readonly DEG_TO_RAD: number = MathUtils.PI / 180;

	public static readonly RAD_TO_DEG: number = 180 / MathUtils.PI;

	/// <summary>
	///   <para>A representation of positive infinity (Read Only):onst .</para>
	/// </summary>
	public static readonly INFINITY: number = Number.POSITIVE_INFINITY;

	/// <summary>
	///   <para>A representation of negative infinity (Read Only):onst .</para>
	/// </summary>
	public static readonly NEGATIVE_INFINITY: number = Number.NEGATIVE_INFINITY;

	public static Random(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}

	public static RandomFloor(min: number, max: number): number {
		return this.Floor(this.Random(min, max));
	}

	public static RandomRound(min: number, max: number): number {
		return this.Round(this.Random(min, max));
	}

	public static RandomCeil(min: number, max: number): number {
		return this.Ceil(this.Random(min, max));
	}

	/// <summary>
	///   <para>Returns the sine of angle f in radians.</para>
	/// </summary>
	/// <param name="f">The argument as a radian.</param>
	/// <returns>
	///   <para>The return value between -1 and +1.</para>
	/// </returns>
	public static Sin(f: number): number {
		return Math.sin(f);
	}

	/// <summary>
	///   <para>Returns the cosine of angle f in radians.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Cos(f: number): number {
		return Math.cos(f);
	}

	/// <summary>
	///   <para>Returns the tangent of angle f in radians.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Tan(f: number): number {
		return Math.tan(f);
	}

	/// <summary>
	///   <para>Returns the arc-sine of f - the angle in radians whose sine is f.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Asin(f: number): number {
		return Math.asin(f);
	}

	/// <summary>
	///   <para>Returns the arc-cosine of f - the angle in radians whose cosine is f.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Acos(f: number): number {
		return Math.acos(f);
	}

	/// <summary>
	///   <para>Returns the arc-tangent of f - the angle in radians whose tangent is f.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Atan(f: number): number {
		return Math.atan(f);
	}

	/// <summary>
	///   <para>Returns the angle in radians whose Tan is y/x.</para>
	/// </summary>
	/// <param name="y"></param>
	/// <param name="x"></param>
	public static Atan2(y: number, x: number): number {
		return Math.atan2(y, x);
	}

	/// <summary>
	///   <para>Returns square root of f.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Sqrt(f: number): number {
		return Math.sqrt(f);
	}

	/// <summary>
	///   <para>Returns the absolute value of f.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Abs(f: number): number {
		return Math.abs(f);
	}

	/// <summary>
	///   <para>Returns the smallest of two or more values.</para>
	/// </summary>
	public static Min(a: number, b: number): number {
		return (a >= b) ? b : a;
	}

	/// <summary>
	///   <para>Returns the smallest of two or more values.</para>
	/// </summary>
	public static Min2(...values: number[]): number {
		if (values.length == 0)
			return 0;
		let num2 = values[0];
		for (let i = 1; i < values.length; i++) {
			if (values[i] < num2) {
				num2 = values[i];
			}
		}
		return num2;
	}

	/// <summary>
	///   <para>Returns largest of two or more values.</para>
	/// </summary>
	public static Max(a: number, b: number): number {
		return (a <= b) ? b : a;
	}

	/// <summary>
	///   <para>Returns largest of two or more values.</para>
	/// </summary>
	public static Max2(...values: number[]): number {
		if (values.length == 0)
			return 0;
		let num2 = values[0];
		for (let i = 1; i < values.length; i++) {
			if (values[i] > num2) {
				num2 = values[i];
			}
		}
		return num2;
	}

	/// <summary>
	///   <para>Returns f raised to power p.</para>
	/// </summary>
	/// <param name="f"></param>
	/// <param name="p"></param>
	public static Pow(f: number, p: number): number {
		return Math.pow(f, p);
	}

	/// <summary>
	///   <para>Returns e raised to the specified power.</para>
	/// </summary>
	/// <param name="power"></param>
	public static Exp(power: number): number {
		return Math.exp(power);
	}

	/// <summary>
	///   <para>Returns the natural (base e) logarithm of a specified number.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Log(f: number): number {
		return Math.log(f);
	}

	/// <summary>
	///   <para>Returns the smallest numbereger greater to or equal to f.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Ceil(f: number): number {
		return Math.ceil(f);
	}

	/// <summary>
	///   <para>Returns the largest numbereger smaller to or equal to f.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Floor(f: number): number {
		return Math.floor(f);
	}

	/// <summary>
	///   <para>Returns f rounded to the nearest numbereger.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Round(f: number): number {
		return Math.round(f);
	}

	/// <summary>
	///   <para>Returns the sign of f.</para>
	/// </summary>
	/// <param name="f"></param>
	public static Sign(f: number): number {
		return (f < 0) ? -1 : 1;
	}

	/// <summary>
	///   <para>Clamps value between min and max and returns value.</para>
	/// </summary>
	/// <param name="value"></param>
	/// <param name="min"></param>
	/// <param name="max"></param>
	public static Clamp(value: number, min: number, max: number): number {
		if (value < min) {
			value = min;
		}
		else if (value > max) {
			value = max;
		}
		return value;
	}

	/// <summary>
	///   <para>Clamps value between 0 and 1 and returns value.</para>
	/// </summary>
	/// <param name="value"></param>
	public static Clamp01(value: number): number {
		let result: number;
		if (value < 0) {
			result = 0;
		}
		else if (value > 1) {
			result = 1;
		}
		else {
			result = value;
		}
		return result;
	}

	/// <summary>
	///   <para>Linearly numbererpolates between a and b by t.</para>
	/// </summary>
	/// <param name="a">The start value.</param>
	/// <param name="b">The end value.</param>
	/// <param name="t">The numbererpolation value between the two numbers.</param>
	/// <returns>
	///   <para>The numbererpolated result:b:numberetween the two value:numbers.</para>
	/// </returns>
	public static Lerp(a: number, b: number, t: number): number {
		return a + (b - a) * MathUtils.Clamp01(t);
	}

	/// <summary>
	///   <para>Linearly numbererpolates between a and b by t with no limit to t.</para>
	/// </summary>
	/// <param name="a">The start value.</param>
	/// <param name="b">The end value.</param>
	/// <param name="t">The numbererpolation between the two numbers.</param>
	/// <returns>
	///   <para>The value:a:numbers a result from the linear numbererpolation.</para>
	/// </returns>
	public static LerpUnclamped(a: number, b: number, t: number): number {
		return a + (b - a) * t;
	}

	/// <summary>
	///   <para>Same as Lerp but makes sure the values numbererpolate correctly when they wrap around 360 degrees.</para>
	/// </summary>
	/// <param name="a"></param>
	/// <param name="b"></param>
	/// <param name="t"></param>
	public static LerpAngle(a: number, b: number, t: number): number {
		let num = MathUtils.Repeat(b - a, 360);
		if (num > 180) {
			num -= 360;
		}
		return a + num * MathUtils.Clamp01(t);
	}

	/// <summary>
	///   <para>Same as Lerp but makes sure the values numbererpolate correctly when they wrap around 360 degrees.</para>
	/// </summary>
	/// <param name="a"></param>
	/// <param name="b"></param>
	/// <param name="t"></param>
	public static LerpAngleUnclamped(a: number, b: number, t: number): number {
		let num = MathUtils.Repeat(b - a, 360);
		if (num > 180) {
			num -= 360;
		}
		return a + num * t;
	}

	/// <summary>
	///   <para>Moves a value current towards target.</para>
	/// </summary>
	/// <param name="current">The current value.</param>
	/// <param name="target">The value to move towards.</param>
	/// <param name="maxDelta">The maximum change that should be applied to the value.</param>
	public static MoveTowards(current: number, target: number, maxDelta: number): number {
		let result: number;
		if (MathUtils.Abs(target - current) <= maxDelta) {
			result = target;
		}
		else {
			result = current + MathUtils.Sign(target - current) * maxDelta;
		}
		return result;
	}

	/// <summary>
	///   <para>Same as MoveTowards but makes sure the values numbererpolate correctly when they wrap around 360 degrees.</para>
	/// </summary>
	/// <param name="current"></param>
	/// <param name="target"></param>
	/// <param name="maxDelta"></param>
	public static MoveTowardsAngle(current: number, target: number, maxDelta: number): number {
		let num = MathUtils.DeltaAngle(current, target);
		let result: number;
		if (-maxDelta < num && num < maxDelta) {
			result = target;
		}
		else {
			target = current + num;
			result = MathUtils.MoveTowards(current, target, maxDelta);
		}
		return result;
	}

	public static FromToDirection(from: Vec3, to: Vec3, t: number, forward: Vec3): Vec3 {
		let q1 = Quat.FromToRotation(forward, from);
		let q2 = Quat.FromToRotation(forward, to);
		let q3 = Quat.Lerp(q1, q2, t);
		return q3.Transform(forward);
	}

	/// <summary>
	///   <para>Interpolates between min and max with smoothing at the limits.</para>
	/// </summary>
	/// <param name="from"></param>
	/// <param name="to"></param>
	/// <param name="t"></param>
	public static SmoothStep(from: number, to: number, t: number): number {
		t = MathUtils.Clamp01(t);
		t = -2 * t * t * t + 3 * t * t;
		return to * t + from * (1 - t);
	}

	public static Gamma(value: number, absmax: number, gamma: number): number {
		let flag = value < 0;
		let num = MathUtils.Abs(value);
		let result: number;
		if (num > absmax)
			result = ((!flag) ? num : (-num));
		else {
			let num2 = MathUtils.Pow(num / absmax, gamma) * absmax;
			result = ((!flag) ? num2 : (-num2));
		}
		return result;
	}

	/// <summary>
	///   <para>Compares two numbering povalue:numbers and returns true if they are similar.</para>
	/// </summary>
	/// <param name="a"></param>
	/// <param name="b"></param>
	public static Approximately(a: number, b: number): boolean {
		return MathUtils.Abs(b - a) < MathUtils.Max(1E-06 * MathUtils.Max(MathUtils.Abs(a), MathUtils.Abs(b)), MathUtils.EPSILON * 8);
	}

	public static SmoothDamp(current: number, target: number, currentVelocity: number[], smoothTime: number, maxSpeed: number, deltaTime: number): number {
		smoothTime = MathUtils.Max(0.0001, smoothTime);
		let num = 2 / smoothTime;
		let num2 = num * deltaTime;
		let num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
		let num4 = current - target;
		let num5 = target;
		let num6 = maxSpeed * smoothTime;
		num4 = MathUtils.Clamp(num4, -num6, num6);
		target = current - num4;
		let num7 = (currentVelocity[0] + num * num4) * deltaTime;
		currentVelocity[0] = (currentVelocity[0] - num * num7) * num3;
		let num8 = target + (num4 + num7) * num3;
		if (num5 - current > 0 == num8 > num5) {
			num8 = num5;
			currentVelocity[0] = (num8 - num5) / deltaTime;
		}
		return num8;
	}

	public static SmoothDampAngle(current: number, target: number, currentVelocity: number[], smoothTime: number, maxSpeed: number, deltaTime: number): number {
		target = current + MathUtils.DeltaAngle(current, target);
		return MathUtils.SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
	}

	/// <summary>
	///   <para>Loops the value t, so that it is never larger than length and never smaller than 0.</para>
	/// </summary>
	/// <param name="t"></param>
	/// <param name="length"></param>
	public static Repeat(t: number, length: number): number {
		return MathUtils.Clamp(t - MathUtils.Floor(t / length) * length, 0, length);
	}

	/// <summary>
	///   <para>PingPongs the value t, so that it is never larger than length and never smaller than 0.</para>
	/// </summary>
	/// <param name="t"></param>
	/// <param name="length"></param>
	public static PingPong(t: number, length: number): number {
		t = MathUtils.Repeat(t, length * 2);
		return length - MathUtils.Abs(t - length);
	}

	/// <summary>
	///   <para>Calculates the linear parameter t that produces the numbererpolant value within the range [a, b].</para>
	/// </summary>
	/// <param name="a"></param>
	/// <param name="b"></param>
	/// <param name="value"></param>
	public static InverseLerp(a: number, b: number, value: number): number {
		return a != b ? MathUtils.Clamp01((value - a) / (b - a)) : 0;
	}

	/// <summary>
	///   <para>Calculates the numberest difference between two given angles given in degrees.</para>
	/// </summary>
	/// <param name="current"></param>
	/// <param name="target"></param>
	public static DeltaAngle(current: number, target: number): number {
		let num = MathUtils.Repeat(target - current, 360);
		if (num > 180) {
			num -= 360;
		}
		return num;
	}

	public static LineIntersection(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2, result: Vec2[]): boolean {
		let num = p2.x - p1.x;
		let num2 = p2.y - p1.y;
		let num3 = p4.x - p3.x;
		let num4 = p4.y - p3.y;
		let num5 = num * num4 - num2 * num3;
		let result2: boolean;
		if (num5 == 0) {
			result2 = false;
		}
		else {
			let num6 = p3.x - p1.x;
			let num7 = p3.y - p1.y;
			let num8 = (num6 * num4 - num7 * num3) / num5;
			result[0] = new Vec2(p1.x + num8 * num, p1.y + num8 * num2);
			result2 = true;
		}
		return result2;
	}

	public static LineSegmentIntersection(p1: Vec2, p2: Vec2, p3: Vec2, p4: Vec2, result: Vec2[]): boolean {
		let num = p2.x - p1.x;
		let num2 = p2.y - p1.y;
		let num3 = p4.x - p3.x;
		let num4 = p4.y - p3.y;
		let num5 = num * num4 - num2 * num3;
		let result2: boolean;
		if (num5 == 0) {
			result2 = false;
		}
		else {
			let num6 = p3.x - p1.x;
			let num7 = p3.y - p1.y;
			let num8 = (num6 * num4 - num7 * num3) / num5;
			if (num8 < 0 || num8 > 1) {
				result2 = false;
			}
			else {
				let num9 = (num6 * num2 - num7 * num) / num5;
				if (num9 < 0 || num9 > 1) {
					result2 = false;
				}
				else {
					result[0] = new Vec2(p1.x + num8 * num, p1.y + num8 * num2);
					result2 = true;
				}
			}
		}
		return result2;
	}

	public static DegToRad(deg: number): number {
		return deg * MathUtils.DEG_TO_RAD;
	}

	public static RadToDeg(rad: number): number {
		return rad * MathUtils.RAD_TO_DEG;
	}

	public static LinearToGammaSpace(value: number): number {
		return MathUtils.Pow(value, 1 / 2.2);
	}

	public static GammaToLinearSpace(value: number): number {
		return MathUtils.Pow(value, 2.2);
	}

	public static RubberDelta(overStretching: number, viewSize: number): number {
		return (1 - (1 / ((MathUtils.Abs(overStretching) * 0.55 / viewSize) + 1))) * viewSize * MathUtils.Sign(overStretching);
	}

	public static readonly D_ZERO: Decimal = new Decimal(0);
	public static readonly D_ONE: Decimal = new Decimal(1);
	public static readonly D_N_ONE: Decimal = new Decimal(-1);
	public static readonly D_SMALL: Decimal = new Decimal(0.01);
	public static readonly D_SMALL1: Decimal = new Decimal(0.001);
}