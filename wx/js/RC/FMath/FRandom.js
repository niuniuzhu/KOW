import { FMathUtils } from "./FMathUtils";
export class FRandom {
    constructor(seed) {
        this._seed = seed || Math.random();
    }
    Next() {
        this._seed = (this._seed + 49297) % 233280;
        const result = FMathUtils.Div(this._seed, 233280.0);
        return result;
    }
    NextD(min, max) {
        const r = this.Next();
        return FMathUtils.Add(FMathUtils.Mul(r, FMathUtils.Sub(max, min)), min);
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
