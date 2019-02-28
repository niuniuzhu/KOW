import { FMathUtils } from "./FMathUtils";
export class FRandom {
    constructor(seed) {
        this.seed = seed || Math.random();
    }
    Next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        const result = FMathUtils.Div(this.seed, 233280.0);
        return result;
    }
    NextDouble(min, max) {
        const r = this.Next();
        return FMathUtils.Add(FMathUtils.Mul(r, FMathUtils.Sub(max, min)), min);
    }
    NextFloor(min, max) {
        return FMathUtils.Floor(this.NextDouble(min, max));
    }
    NextRound(min, max) {
        return FMathUtils.Round(this.NextDouble(min, max));
    }
    NextCeil(min, max) {
        return FMathUtils.Ceil(this.NextDouble(min, max));
    }
}
