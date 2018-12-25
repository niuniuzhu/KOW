import { Quat } from "./Quat";
import { Vec2 } from "./Vec2";
export class MathUtils {
    static Random(min = 0, max = 1) {
        return Math.random() * (max - min) + min;
    }
    static RandomFloor(min, max) {
        return this.Floor(this.Random(min, max));
    }
    static RandomRound(min, max) {
        return this.Round(this.Random(min, max));
    }
    static RandomCeil(min, max) {
        return this.Ceil(this.Random(min, max));
    }
    static Sin(f) {
        return Math.sin(f);
    }
    static Cos(f) {
        return Math.cos(f);
    }
    static Tan(f) {
        return Math.tan(f);
    }
    static Asin(f) {
        return Math.asin(f);
    }
    static Acos(f) {
        return Math.acos(f);
    }
    static Atan(f) {
        return Math.atan(f);
    }
    static Atan2(y, x) {
        return Math.atan2(y, x);
    }
    static Sqrt(f) {
        return Math.sqrt(f);
    }
    static Abs(f) {
        return Math.abs(f);
    }
    static Min(a, b) {
        return (a >= b) ? b : a;
    }
    static Min2(...values) {
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
    static Max(a, b) {
        return (a <= b) ? b : a;
    }
    static Max2(...values) {
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
    static Pow(f, p) {
        return Math.pow(f, p);
    }
    static Exp(power) {
        return Math.exp(power);
    }
    static Log(f) {
        return Math.log(f);
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
        return a + (b - a) * MathUtils.Clamp01(t);
    }
    static LerpUnclamped(a, b, t) {
        return a + (b - a) * t;
    }
    static LerpAngle(a, b, t) {
        let num = MathUtils.Repeat(b - a, 360);
        if (num > 180) {
            num -= 360;
        }
        return a + num * MathUtils.Clamp01(t);
    }
    static LerpAngleUnclamped(a, b, t) {
        let num = MathUtils.Repeat(b - a, 360);
        if (num > 180) {
            num -= 360;
        }
        return a + num * t;
    }
    static MoveTowards(current, target, maxDelta) {
        let result;
        if (MathUtils.Abs(target - current) <= maxDelta) {
            result = target;
        }
        else {
            result = current + MathUtils.Sign(target - current) * maxDelta;
        }
        return result;
    }
    static MoveTowardsAngle(current, target, maxDelta) {
        let num = MathUtils.DeltaAngle(current, target);
        let result;
        if (-maxDelta < num && num < maxDelta) {
            result = target;
        }
        else {
            target = current + num;
            result = MathUtils.MoveTowards(current, target, maxDelta);
        }
        return result;
    }
    static FromToDirection(from, to, t, forward) {
        let q1 = Quat.FromToRotation(forward, from);
        let q2 = Quat.FromToRotation(forward, to);
        let q3 = Quat.Lerp(q1, q2, t);
        return q3.Transform(forward);
    }
    static SmoothStep(from, to, t) {
        t = MathUtils.Clamp01(t);
        t = -2 * t * t * t + 3 * t * t;
        return to * t + from * (1 - t);
    }
    static Gamma(value, absmax, gamma) {
        let flag = value < 0;
        let num = MathUtils.Abs(value);
        let result;
        if (num > absmax)
            result = ((!flag) ? num : (-num));
        else {
            let num2 = MathUtils.Pow(num / absmax, gamma) * absmax;
            result = ((!flag) ? num2 : (-num2));
        }
        return result;
    }
    static Approximately(a, b) {
        return MathUtils.Abs(b - a) < MathUtils.Max(1E-06 * MathUtils.Max(MathUtils.Abs(a), MathUtils.Abs(b)), MathUtils.EPSILON * 8);
    }
    static SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
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
    static SmoothDampAngle(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
        target = current + MathUtils.DeltaAngle(current, target);
        return MathUtils.SmoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
    }
    static Repeat(t, length) {
        return MathUtils.Clamp(t - MathUtils.Floor(t / length) * length, 0, length);
    }
    static PingPong(t, length) {
        t = MathUtils.Repeat(t, length * 2);
        return length - MathUtils.Abs(t - length);
    }
    static InverseLerp(a, b, value) {
        return a != b ? MathUtils.Clamp01((value - a) / (b - a)) : 0;
    }
    static DeltaAngle(current, target) {
        let num = MathUtils.Repeat(target - current, 360);
        if (num > 180) {
            num -= 360;
        }
        return num;
    }
    static LineIntersection(p1, p2, p3, p4, result) {
        let num = p2.x - p1.x;
        let num2 = p2.y - p1.y;
        let num3 = p4.x - p3.x;
        let num4 = p4.y - p3.y;
        let num5 = num * num4 - num2 * num3;
        let result2;
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
    static LineSegmentIntersection(p1, p2, p3, p4, result) {
        let num = p2.x - p1.x;
        let num2 = p2.y - p1.y;
        let num3 = p4.x - p3.x;
        let num4 = p4.y - p3.y;
        let num5 = num * num4 - num2 * num3;
        let result2;
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
    static DegToRad(deg) {
        return deg * MathUtils.DEG_TO_RAD;
    }
    static RadToDeg(rad) {
        return rad * MathUtils.RAD_TO_DEG;
    }
    static LinearToGammaSpace(value) {
        return MathUtils.Pow(value, 1 / 2.2);
    }
    static GammaToLinearSpace(value) {
        return MathUtils.Pow(value, 2.2);
    }
    static RubberDelta(overStretching, viewSize) {
        return (1 - (1 / ((MathUtils.Abs(overStretching) * 0.55 / viewSize) + 1))) * viewSize * MathUtils.Sign(overStretching);
    }
}
MathUtils.EPSILON = 0.0001;
MathUtils.MAX_VALUE = Number.MAX_VALUE;
MathUtils.MIN_VALUE = -MathUtils.MAX_VALUE;
MathUtils.PI = Math.PI;
MathUtils.PI2 = MathUtils.PI * 2;
MathUtils.PI4 = MathUtils.PI * 4;
MathUtils.PI_HALF = MathUtils.PI * 0.5;
MathUtils.PI_QUARTER = MathUtils.PI * 0.25;
MathUtils.PI_DELTA = 1 / MathUtils.PI;
MathUtils.PI_HALF_DELTA = MathUtils.PI_DELTA * 2;
MathUtils.PI_QUARTER_DELTA = MathUtils.PI_DELTA * 4;
MathUtils.DEG_TO_RAD = MathUtils.PI / 180;
MathUtils.RAD_TO_DEG = 180 / MathUtils.PI;
MathUtils.INFINITY = Number.POSITIVE_INFINITY;
MathUtils.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
