import { FMathUtils } from "./FMathUtils";
import { FVec2 } from "./FVec2";
export var IntersectionType;
(function (IntersectionType) {
    IntersectionType[IntersectionType["Outside"] = 0] = "Outside";
    IntersectionType[IntersectionType["Inside"] = 1] = "Inside";
    IntersectionType[IntersectionType["Cling"] = 2] = "Cling";
})(IntersectionType || (IntersectionType = {}));
export class Intersection {
    static IntersectsCC(center0, radius0, center1, radius1) {
        const a = FVec2.Sub(center1, center0).SqrMagnitude();
        let r = FMathUtils.Add(radius0, radius1);
        r = FMathUtils.Mul(r, r);
        if (a > r)
            return IntersectionType.Outside;
        if (a < r)
            return IntersectionType.Inside;
        return IntersectionType.Cling;
    }
    static IntersectsMovingCC(mCenter, mRadius, sCenter, sRadius, direction) {
        const e = FVec2.Sub(sCenter, mCenter);
        const r = FMathUtils.Add(mRadius, sRadius);
        const rSqrt = FMathUtils.Mul(r, r);
        const edotd = e.Dot(direction);
        const edote = e.Dot(e);
        const s = FMathUtils.Add(FMathUtils.Sub(FMathUtils.Mul(edotd, edotd), edote), rSqrt);
        if (s < 0)
            return -1;
        const t = FMathUtils.Sub(edotd, FMathUtils.Sqrt(s));
        return t * 1000;
    }
}
