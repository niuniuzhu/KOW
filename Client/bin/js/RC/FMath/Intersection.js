define(["require", "exports", "./FMathUtils", "./FVec2"], function (require, exports, FMathUtils_1, FVec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IntersectionType;
    (function (IntersectionType) {
        IntersectionType[IntersectionType["Outside"] = 0] = "Outside";
        IntersectionType[IntersectionType["Inside"] = 1] = "Inside";
        IntersectionType[IntersectionType["Cling"] = 2] = "Cling";
    })(IntersectionType = exports.IntersectionType || (exports.IntersectionType = {}));
    class Intersection {
        static IntersectsCC(center0, radius0, center1, radius1) {
            const a = FVec2_1.FVec2.Sub(center1, center0).SqrMagnitude();
            let r = FMathUtils_1.FMathUtils.Add(radius0, radius1);
            r = FMathUtils_1.FMathUtils.Mul(r, r);
            if (a > r)
                return IntersectionType.Outside;
            if (a < r)
                return IntersectionType.Inside;
            return IntersectionType.Cling;
        }
        static IntersectsMovingCC(mCenter, mRadius, sCenter, sRadius, direction) {
            const e = FVec2_1.FVec2.Sub(sCenter, mCenter);
            const r = FMathUtils_1.FMathUtils.Add(mRadius, sRadius);
            const rSqrt = FMathUtils_1.FMathUtils.Mul(r, r);
            if (e.SqrMagnitude() <= rSqrt)
                return 0;
            const edotd = e.Dot(direction);
            const edote = e.Dot(e);
            const s = FMathUtils_1.FMathUtils.Add(FMathUtils_1.FMathUtils.Sub(FMathUtils_1.FMathUtils.Mul(edotd, edotd), edote), rSqrt);
            if (s < 0)
                return -1;
            const t = FMathUtils_1.FMathUtils.Sub(edotd, FMathUtils_1.FMathUtils.Sqrt(s));
            return t;
        }
    }
    exports.Intersection = Intersection;
});
//# sourceMappingURL=Intersection.js.map