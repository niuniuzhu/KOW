export class FMathUtils {
	public static readonly EPSILON: number = 0.001;

	public static readonly MAX_VALUE: number = 3.4e+38;

	public static readonly MIN_VALUE: number = -FMathUtils.MAX_VALUE;

	public static readonly PI: number = 3.142;

	public static readonly DEG_TO_RAD: number = FMathUtils.Div(FMathUtils.PI, 180);

	public static readonly RAD_TO_DEG: number = FMathUtils.Div(180, FMathUtils.PI);

	public static DegToRad(deg: number): number {
		return FMathUtils.Mul(deg, FMathUtils.DEG_TO_RAD);
	}

	public static RadToDeg(rad: number): number {
		return FMathUtils.Mul(rad, FMathUtils.RAD_TO_DEG);
	}
	private static readonly FRACTIONAL_PLACES = 1000;
	private static readonly DIV_ONE = 0.001;

	public static ToFixed(value: number): number {
		return ((value * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
	}

	public static Max(v0: number, v1: number): number {
		return Math.max(v0, v1);
	}

	public static Min(v0: number, v1: number): number {
		return Math.min(v0, v1);
	}

	public static Add(v0: number, v1: number): number {
		const v = ((v0 + v1) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Sub(v0: number, v1: number): number {
		const v = ((v0 - v1) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Mul(v0: number, v1: number): number {
		const v = ((v0 * v1) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Div(v0: number, v1: number): number {
		const v = ((v0 / v1) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Mod(v0: number, v1: number): number {
		const v = ((v0 % v1) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Pow(v0: number, v1: number): number {
		const v = (Math.pow(v0, v1) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Sqrt(v0: number): number {
		const v = (Math.sqrt(v0) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Sin(v0: number): number {
		const v = (Math.sin(v0) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Cos(v0: number): number {
		const v = (Math.cos(v0) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Tan(v0: number): number {
		const v = (Math.tan(v0) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Asin(v0: number): number {
		const v = (Math.asin(v0) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Acos(v0: number): number {
		const v = (Math.acos(v0) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Atan(v0: number): number {
		const v = (Math.atan(v0) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Exp(v0: number): number {
		const v = (Math.exp(v0) * FMathUtils.FRACTIONAL_PLACES);
		if (v > 0xffffffff)
			throw Error(`overflow:${v}`);
		return (v >> 0) * FMathUtils.DIV_ONE;
	}

	public static Abs(v: number): number {
		return Math.abs(v);
	}

	public static Log(f: number): number {
		return Math.log(f);
	}

	public static Log2(f: number): number {
		return Math.log2(f);
	}

	public static Log10(f: number): number {
		return Math.log10(f);
	}

	public static Ceil(f: number): number {
		return Math.ceil(f);
	}

	public static Floor(f: number): number {
		return Math.floor(f);
	}

	public static Round(f: number): number {
		return Math.round(f);
	}

	public static Sign(f: number): number {
		return (f < 0) ? -1 : 1;
	}

	public static Clamp(value: number, min: number, max: number): number {
		if (value < min) {
			value = min;
		}
		else if (value > max) {
			value = max;
		}
		return value;
	}

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

	public static Lerp(a: number, b: number, t: number): number {
		return FMathUtils.Add(a, FMathUtils.Mul(FMathUtils.Sub(b, a), FMathUtils.Clamp01(t)));
	}

	public static LerpUnclamped(a: number, b: number, t: number): number {
		return FMathUtils.Add(a, FMathUtils.Mul(FMathUtils.Sub(b, a), t));
	}

	public static LerpAngle(a: number, b: number, t: number): number {
		let num = FMathUtils.Repeat(FMathUtils.Sub(b, a), 360);
		if (num > 180) {
			num -= 360;
		}
		return FMathUtils.Add(a, FMathUtils.Mul(num, FMathUtils.Clamp01(t)));
	}

	public static LerpAngleUnclamped(a: number, b: number, t: number): number {
		let num = FMathUtils.Repeat(FMathUtils.Sub(b, a), 360);
		if (num > 180) {
			num -= 360;
		}
		return FMathUtils.Add(a, FMathUtils.Mul(num, t));
	}

	public static InverseLerp(a: number, b: number, value: number): number {
		return a != b ? FMathUtils.Clamp01(FMathUtils.Div(FMathUtils.Sub(value, a), FMathUtils.Sub(b, a))) : 0;
	}

	public static Repeat(t: number, length: number): number {
		return FMathUtils.Clamp(FMathUtils.Sub(t, FMathUtils.Mul(FMathUtils.Floor(FMathUtils.Div(t, length)), length)), 0, length);
	}

	public static PingPong(t: number, length: number): number {
		t = FMathUtils.Repeat(t, FMathUtils.Mul(length, 2));
		return FMathUtils.Sub(length, FMathUtils.Abs(FMathUtils.Sub(t, length)));
	}
}