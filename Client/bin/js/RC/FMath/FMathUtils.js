define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FMathUtils {
        static DegToRad(deg) {
            return FMathUtils.Mul(deg, FMathUtils.DEG_TO_RAD);
        }
        static RadToDeg(rad) {
            return FMathUtils.Mul(rad, FMathUtils.RAD_TO_DEG);
        }
        static ToFixed(value) {
            return ((value * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Max(v0, v1) {
            return Math.max(v0, v1);
        }
        static Min(v0, v1) {
            return Math.min(v0, v1);
        }
        static Add(v0, v1) {
            return (((v0 + v1) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Sub(v0, v1) {
            return (((v0 - v1) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Mul(v0, v1) {
            return (((v0 * v1) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Div(v0, v1) {
            return (((v0 / v1) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Mod(v0, v1) {
            return (((v0 % v1) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Pow(v0, v1) {
            return ((Math.pow(v0, v1) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Sqrt(v0) {
            return ((Math.sqrt(v0) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Sin(v0) {
            return ((Math.sin(v0) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Cos(v0) {
            return ((Math.cos(v0) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Tan(v0) {
            return ((Math.tan(v0) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Asin(v0) {
            return ((Math.asin(v0) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Acos(v0) {
            return ((Math.acos(v0) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Atan(v0) {
            return ((Math.atan(v0) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Exp(v0) {
            return ((Math.exp(v0) * FMathUtils.FRACTIONAL_PLACES) >> 0) * FMathUtils.DIV_ONE;
        }
        static Abs(v) {
            return Math.abs(v);
        }
        static Log(f) {
            return Math.log(f);
        }
        static Log2(f) {
            return Math.log2(f);
        }
        static Log10(f) {
            return Math.log10(f);
        }
        static Ceil(f) {
            return Math.ceil(f);
        }
        static Floor(f) {
            return Math.floor(f);
        }
        static Round(f) {
            return Math.round(f);
        }
        static Sign(f) {
            return (f < 0) ? -1 : 1;
        }
        static Clamp(value, min, max) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }
            return value;
        }
        static Clamp01(value) {
            let result;
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
        static Lerp(a, b, t) {
            return FMathUtils.Add(a, FMathUtils.Mul(FMathUtils.Sub(b, a), FMathUtils.Clamp01(t)));
        }
        static LerpUnclamped(a, b, t) {
            return FMathUtils.Add(a, FMathUtils.Mul(FMathUtils.Sub(b, a), t));
        }
        static LerpAngle(a, b, t) {
            let num = FMathUtils.Repeat(FMathUtils.Sub(b, a), 360);
            if (num > 180) {
                num -= 360;
            }
            return FMathUtils.Add(a, FMathUtils.Mul(num, FMathUtils.Clamp01(t)));
        }
        static LerpAngleUnclamped(a, b, t) {
            let num = FMathUtils.Repeat(FMathUtils.Sub(b, a), 360);
            if (num > 180) {
                num -= 360;
            }
            return FMathUtils.Add(a, FMathUtils.Mul(num, t));
        }
        static InverseLerp(a, b, value) {
            return a != b ? FMathUtils.Clamp01(FMathUtils.Div(FMathUtils.Sub(value, a), FMathUtils.Sub(b, a))) : 0;
        }
        static Repeat(t, length) {
            return FMathUtils.Clamp(FMathUtils.Sub(t, FMathUtils.Mul(FMathUtils.Floor(FMathUtils.Div(t, length)), length)), 0, length);
        }
        static PingPong(t, length) {
            t = FMathUtils.Repeat(t, FMathUtils.Mul(length, 2));
            return FMathUtils.Sub(length, FMathUtils.Abs(FMathUtils.Sub(t, length)));
        }
    }
    FMathUtils.EPSILON = 0.001;
    FMathUtils.MAX_VALUE = 3.4e+38;
    FMathUtils.MIN_VALUE = -FMathUtils.MAX_VALUE;
    FMathUtils.PI = 3.142;
    FMathUtils.DEG_TO_RAD = FMathUtils.Div(FMathUtils.PI, 180);
    FMathUtils.RAD_TO_DEG = FMathUtils.Div(180, FMathUtils.PI);
    FMathUtils.FRACTIONAL_PLACES = 1000;
    FMathUtils.DIV_ONE = 0.001;
    exports.FMathUtils = FMathUtils;
});
//# sourceMappingURL=FMathUtils.js.map