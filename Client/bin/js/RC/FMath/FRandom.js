define(["require", "exports", "./FMathUtils"], function (require, exports, FMathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FRandom {
        constructor(seed) {
            this._seed = seed || Math.random();
        }
        Next() {
            this._seed = FMathUtils_1.FMathUtils.Mod(FMathUtils_1.FMathUtils.Add(FMathUtils_1.FMathUtils.Mul(this._seed, 9301), 49497), 233280);
            return FMathUtils_1.FMathUtils.Div(this._seed, 233280);
        }
        NextD(min, max) {
            this._seed = FMathUtils_1.FMathUtils.Mod(FMathUtils_1.FMathUtils.Add(FMathUtils_1.FMathUtils.Mul(this._seed, 9301), 49497), 233280);
            return FMathUtils_1.FMathUtils.Add(FMathUtils_1.FMathUtils.Mul(FMathUtils_1.FMathUtils.Div(this._seed, 233280), FMathUtils_1.FMathUtils.Sub(max, min)), min);
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