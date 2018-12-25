import { FMathUtils } from "./FMathUtils";
export class FRandom {
    constructor(seed) {
        this._seed = seed || Math.random();
    }
    Next() {
        this._seed = FMathUtils.Mod(FMathUtils.Add(FMathUtils.Mul(this._seed, 9301), 49497), 233280);
        return FMathUtils.Div(this._seed, 233280);
    }
    NextD(min, max) {
        this._seed = FMathUtils.Mod(FMathUtils.Add(FMathUtils.Mul(this._seed, 9301), 49497), 233280);
        return FMathUtils.Add(FMathUtils.Mul(FMathUtils.Div(this._seed, 233280), FMathUtils.Sub(max, min)), min);
    }
    NextFloor(min, max) {
        return FMathUtils.Floor(this.NextD(min, max));
    }
    NextRound(min, max) {
        return FMathUtils.Round(this.NextD(min, max));
    }
    NextCeil(min, max) {
        return FMathUtils.Ceil(this.NextD(min, max));
    }
}
