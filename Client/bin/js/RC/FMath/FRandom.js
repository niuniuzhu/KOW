define(["require", "exports", "./FMathUtils"], function (require, exports, FMathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FRandom {
        constructor(seed) {
            this.seed = seed || Math.random();
        }
        Next() {
            this.seed = (this.seed * 9301 + 49297) % 233280;
            const result = FMathUtils_1.FMathUtils.Div(this.seed, 233280.0);
            return result;
        }
        NextD(min, max) {
            const r = this.Next();
            return FMathUtils_1.FMathUtils.Add(FMathUtils_1.FMathUtils.Mul(r, FMathUtils_1.FMathUtils.Sub(max, min)), min);
        }
        NextFloor(min, max) {
            return FMathUtils_1.FMathUtils.Floor(this.NextD(min, max));
        }
        NextRound(min, max) {
            return FMathUtils_1.FMathUtils.Round(this.NextD(min, max));
        }
        NextCeil(min, max) {
            return FMathUtils_1.FMathUtils.Ceil(this.NextD(min, max));
        }
    }
    exports.FRandom = FRandom;
});
//# sourceMappingURL=FRandom.js.map